function MapController($scope, Emitter, GoogleMap) {
  Emitter.listen('eventsLoaded', function (events) {
    GoogleMap.displayMarkers(events, $scope);
  });

  Emitter.listen('eventAdded', function (event) {
    GoogleMap.addMarker(event, $scope);
  });
  
  Emitter.listen('eventDeleted', function (event) {
    GoogleMap.deleteMarker(event);
  });
  
  Emitter.listen('eventSelected', function (event) {
    GoogleMap.displayOneMarker(event, $scope);
  });

  Emitter.listen('eventUnselected', function () {
    GoogleMap.displayAll();
  });
}

EventService.component('map', {
  templateUrl: 'templates/map.html',
  bindings: {
    events: '<',
    user: '<'
  },
  controller: MapController
});

EventService.directive("mapCard", function (APIClient, PopUp, Emitter) {
  return {
    restrict: "A",
    template:
      '<md-card>' +
      '<md-card-title>' +
      '<md-card-title-text>' +
      '<span class="md-headline" ng-bind="event.title"></span>' +
      '<span class="md-subhead" ng-bind="event.description"></span>' +
      '</md-card-title-text>' +
      '<md-card-title-media>' +
      '<div class="md-media-sm card-media" style="background-image: url(\'{{event.picture}}\');"></div>' +
      '</md-card-title-media>' +
      '</md-card-title>' +
      '<md-card-actions layout="row" layout-align="end center">' +
      '<md-button ng-click="openEvent(event)">Подробнее</md-button>' +
      '<md-button ng-click="joinToEvent(event)" ng-show="!event.joined">Пойду</md-button>' +
      '</md-card-actions>' +
      '</md-card>',
    scope: {
      eventId: '='
    },
    link: function ($scope, element, attributes) {
      var ctrl = $scope.$parent.$ctrl;
      for (var i in ctrl.events) {
        if (parseInt(attributes.eventId) === ctrl.events[i].id) {
          $scope.event = ctrl.events[i];
          if (ctrl.user.events && ctrl.user.events.indexOf(ctrl.events[i].id) !== -1) {
            $scope.event.joined = true;
          }
        }
      }
      $scope.joinToEvent = function (event) {
        APIClient.joinToEvent(event.id).then(function () {
          ctrl.user.events.push(event.id);
          event.membersAmount++;
          event.joined = true;
        }).catch(function (err) {
          PopUp.Error();
        });
      };
      $scope.openEvent = function (event) {
        Emitter.emit('eventOpened', event);
      };
    }
  };
});