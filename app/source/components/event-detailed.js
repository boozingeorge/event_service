function EventDetailedController($mdDialog, APIClient, PopUp, Emitter) {
  var ctrl = this;
  
  ctrl.toggleSubscribe = function (event) {
    var index,
      isSubsribed = false;
    if (Array.isArray(ctrl.user.events)) {
      index = ctrl.user.events.indexOf(event.id);
      isSubsribed = (index === -1) ? false : true;
    } else {
      return PopUp.Error();
    }

    if (isSubsribed) {
      APIClient.leaveEvent(event.id).then(function () {
        ctrl.user.events.splice(index, 1);
        event.membersAmount--;
        event.joined = false;
      }).catch(function (err) {
        PopUp.Error();
      });
    } else {
      APIClient.joinToEvent(event.id).then(function () {
        ctrl.user.events.push(event.id);
        event.membersAmount++;
        event.joined = true;
      }).catch(function (err) {
        PopUp.Error();
      });
    }
  };
  ctrl.editEvent = function (event) {
    Emitter.emit('eventEdit', event);
  };
  ctrl.deleteEvent = function (e, event) {
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
    for (var i in ctrl.events) {
      if (event.id === ctrl.events[i].id) {
        ctrl.events.splice(i, 1);
      }
    }
    APIClient.deleteEvent(event.id).then(function () {
      ctrl.user.events.splice(ctrl.user.events.indexOf(event.id), 1);
      Emitter.emit('eventDeleted', event);
    }).catch(function (err) {
      PopUp.Error();
    });
  }
}

EventService.component('eventDetailed', {
  templateUrl: 'templates/event-detailed.html',
  bindings: {
    event: '<',
    user: '<',
    events: '='
  },
  controller: EventDetailedController
});