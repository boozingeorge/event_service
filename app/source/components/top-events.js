function TopEventsController(APIClient, PopUp, Emitter) {
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
  
  ctrl.openEvent = function (event) {
    Emitter.emit('eventOpened', event);
  };
}

EventService.component('topEvents', {
  templateUrl: 'templates/top-events.html',
  bindings: {
    events: '<',
    user: '<'
  },
  controller: TopEventsController
});
