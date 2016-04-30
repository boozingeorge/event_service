function EventFormController(GoogleMap, $timeout, $scope, Config, PopUp, APIClient, EventDatetime, Emitter) {
  var ctrl = this;

  ctrl.event = {};
  initEventForm();

  ctrl.setLocation = function () {
    ctrl.locationDisabled = true;
    var locationOnClick = google.maps.event.addListener(GoogleMap.map, 'click', function (event) {
      $timeout(function () {
        ctrl.event.lat = event.latLng.lat();
        ctrl.event.long = event.latLng.lng();
        ctrl.viewLocation = event.latLng.lat().toFixed(4) + ', ' + event.latLng.lng().toFixed(4);
        ctrl.locationDisabled = false;
      });
      locationOnClick.remove();
    });
  };

  ctrl.createEvent = function () {
    ctrl.event.beginAt = ctrl.beginAt.getDatetime();
    ctrl.event.endAt = ctrl.endAt.getDatetime();
    if (!ctrl.event.picture) {
      delete ctrl.event['picture'];
    }

    APIClient.createEvent(ctrl.event).then(function (response) {
      if (response.data.error) {
        throw new Error(response.data.error.error_message);
      }
      var event = {
        id: response.data.response.id,
        beginAt: ctrl.event.beginAt,
        endAt: ctrl.event.endAt,
        title: ctrl.event.title,
        description: ctrl.event.description,
        picture: ctrl.event.picture,
        lat: ctrl.event.lat,
        long: ctrl.event.long,
        membersAmount: 0
      };
      Emitter.emit('eventAdded', event);
      ctrl.events.push(event);
      initEventForm();
    }).catch(function (err) {
      PopUp.Error();
    });
  };

  function initEventForm() {
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + Config.endDateInterval);
    var maxDate = new Date();
    maxDate.setDate(endDate.getDate() + Config.maxDateInterval);
    var nowDate = new Date();

    ctrl.beginAt = new EventDatetime(new Date(), nowDate, maxDate);
    ctrl.endAt = new EventDatetime(endDate, nowDate, maxDate);

    ctrl.locationDisabled = false;
    ctrl.event.title = ctrl.event.description = ctrl.event.picture = ctrl.viewLocation = '';
    if (ctrl.eventForm) {
      ctrl.eventForm.$setPristine();
      ctrl.eventForm.$setUntouched();
      // Reset description input char counter to 0/<max_chars>
      $timeout(function () {
        var descriptionCounterEl = angular.element(document.getElementsByClassName('md-char-counter'));
        var counterVal = descriptionCounterEl.html().split('/');
        counterVal[0] = '0';
        descriptionCounterEl.html(counterVal.join('/'));
      });
    }
  }
}

EventService.component('eventForm', {
  templateUrl: 'templates/event-form.html',
  bindings: {
    events: '='
  },
  controller: EventFormController
});

EventService.directive("validDatetime", function () {
  return {
    restrict: "A",
    scope: {
      onDatetimeChange: '=',
      form: '=',
      beginAt: '=',
      endAt: '='
    },
    link: function ($scope, element, attributes) {
      $scope.onDatetimeChange = function () {
        if ($scope.beginAt.getDatetime() >= $scope.endAt.getDatetime()) {
          $scope.form.datetime.$setTouched();
          $scope.form.datetime.$setValidity('datetime', false);
        } else {
          $scope.form.datetime.$setValidity('datetime', true);
        }
      }
    }
  };
});

EventService.directive("validPictureUpload", function () {
  return {
    restrict: "A",
    scope: {
      onUrlChange: '=',
      form: '=',
      picture: '='
    },
    link: function ($scope, element, attributes) {
      $scope.onUrlChange = function (e) {
        if ($scope.picture && !$scope.picture.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/ig)) {
          $scope.form.picture.$setValidity('url', false);
        } else {
          $scope.form.picture.$setValidity('url', true);
        }
      };
    }
  };
});