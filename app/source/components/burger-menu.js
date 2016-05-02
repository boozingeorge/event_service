function BurgerController(Emitter) {
  var ctrl = this;
 
  ctrl.clickShowEventForm = function () {
    ctrl.cards.eventForm = true;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = false;
    ctrl.cards.eventDetailed = false;
  };

  ctrl.clickShowProfile = function () {
    ctrl.cards.eventForm = false;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = true;
    ctrl.cards.eventDetailed = false;
  };

  ctrl.clickShowTopEvents = function () {
    ctrl.cards.eventForm = false;
    ctrl.cards.topEvents = true;
    ctrl.cards.profile = false;
    ctrl.cards.eventDetailed = false;
  };
  
  Emitter.listen('eventOpened', function(event) {
    ctrl.cards.eventForm = false;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = false;
    ctrl.cards.eventDetailed = true;
    ctrl.eventOpened = event;
  });
  
  Emitter.listen('eventDeleted', function() {
    ctrl.cards.eventForm = false;
    ctrl.cards.topEvents = true;
    ctrl.cards.profile = false;
    ctrl.cards.eventDetailed = false;
  });
}

EventService.component('burgerMenu', {
  templateUrl: 'templates/burger-menu.html',
  bindings:{
    cards:'=',
    eventOpened: '='
  },
  controller: BurgerController
});

EventService.directive("eventDetailed", function ($mdDialog, APIClient, PopUp, Emitter) {
  return {
    restrict: "E",
    templateUrl: 'templates/event-detailed.html',
    scope: {
      event: '<',
      user: '<',
      events: '='
    },
    link: function ($scope, element, attributes) {
      $scope.toggleSubscribe = function (event) {
        var index,
          isSubsribed = false;

        if (Array.isArray($scope.user.events)) {
          index = $scope.user.events.indexOf(event.id);
          isSubsribed = (index === -1) ? false : true;
        } else {
          return PopUp.Error();
        }

        if (isSubsribed) {
          APIClient.leaveEvent(event.id).then(function () {
            $scope.user.events.splice(index, 1);
            event.membersAmount--;
            event.joined = false;
          }).catch(function (err) {
            PopUp.Error();
          });
        } else {
          APIClient.joinToEvent(event.id).then(function () {
            $scope.user.events.push(event.id);
            event.membersAmount++;
            event.joined = true;
          }).catch(function (err) {
            PopUp.Error();
          });
        }
      };
      $scope.editEvent = function (event) {
        
      };
      $scope.deleteEvent = function (e, event) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Вы уверены, что хотите удалить событие?')
          .textContent('Вы не сможете восстановить это событие после удаления.')
          .ariaLabel('Delete event')
          .targetEvent(e)
          .ok('Удалить')
          .cancel('Отмена');
        $mdDialog.show(confirm).then(function () {
          deleteEvent(event);
        });
      }; 
      
      function deleteEvent(event) {  
        for(var i in $scope.events) {
          if (event.id === $scope.events[i].id) {
            $scope.events.splice(i, 1);
          }
        }
        APIClient.deleteEvent(event.id).then(function () {
          $scope.user.events.splice($scope.user.events.indexOf(event.id), 1);
          Emitter.emit('eventDeleted', event);
        }).catch(function (err) {
          PopUp.Error();
        });
      };
    }
  };
});