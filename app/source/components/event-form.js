function EventFormController(GoogleMap, $timeout, $scope, PopUp, APIClient, EventDatetime) {

  var ctrl = this;

  initEventForm();

  ctrl.setLocation = function () {
    var locationOnClick = google.maps.event.addListener(GoogleMap.map, 'click', function (event) {
      $timeout(function () {
        ctrl.event.location.lat = event.latLng.lat();
        ctrl.event.location.long = event.latLng.lng();
        ctrl.viewLocation = event.latLng.lat().toFixed(4) + ', ' + event.latLng.lng().toFixed(4);
      });
      locationOnClick.remove();
    });
  };

  ctrl.createEvent = function () {
    ctrl.event.begin_at = ctrl.beginAt.getDatetime();
    ctrl.event.end_at = ctrl.endAt.getDatetime();
    if (!ctrl.event.picture) {
      delete ctrl.event['picture'];
    }
    APIClient.createEvent(ctrl.event).then(function (response) {
      if (response.data.error) {
        throw new Error(response.data.error.error_message);
      }
      /**
       * TODO: Display event on the map
       * displayEvent();
       */
      initEventForm();
    }).catch(function (err) {
      PopUp.Error();
    });
  };

  function initEventForm() {
    ctrl.event = {
      title: '',
      description: '',
      picture: '',
      location: {
        lat: null,
        long: null
      }
    };
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    var maxDate = new Date();
    maxDate.setDate(endDate.getDate() + 365);
    var nowDate = new Date();

    ctrl.beginAt = new EventDatetime(new Date(), nowDate, maxDate);
    ctrl.endAt = new EventDatetime(endDate, nowDate, maxDate);
    ctrl.viewLocation = '';
  }
}

EventService.component('eventForm', {
  templateUrl: 'templates/event-form.html',
  controller: EventFormController
});

EventService.directive("validDatetime", function () {
  return {
    restrict: "A",
    scope: {
      changeDatetimeHandler: '=',
      form: '=',
      beginAt: '=',
      endAt: '='
    },
    link: function ($scope, element, attributes) {
      $scope.changeDatetimeHandler = function () {
        if ($scope.beginAt.getDatetime() >= $scope.endAt.getDatetime()) {
          $scope.form.Datetime.$setTouched();
          $scope.form.Datetime.$setValidity('Datetime', false);
        } else {
          $scope.form.Datetime.$setValidity('Datetime', true);
        }
      }
    }
  };
});