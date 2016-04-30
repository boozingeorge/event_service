function TopEventsController(APIClient, PopUp) {
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
      }).catch(function (err) {
        PopUp.Error();
      });
    } else {
      APIClient.joinToEvent(event.id).then(function () {
        ctrl.user.events.push(event.id);
        event.membersAmount++;
      }).catch(function (err) {
        PopUp.Error();
      });
    }
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
