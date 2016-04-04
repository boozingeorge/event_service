function TopEventsController(APIClient, PopUp) {
  var ctrl = this;
  
  ctrl.toggleSubscribe = function (event) {
    APIClient.joinToEvent(event.id).then(function (isSubsribed) {
      if (isSubsribed) {
        return APIClient.leaveEvent(event.id).then(function () {
          event.membersAmount--;
        });
      } else {
        event.membersAmount++;
      }
    }).catch(function (e) {
      PopUp.Error();
    });
  };
}

EventService.component('topEvents', {
  templateUrl: 'templates/top-events.html',
  bindings:{
    events:'<'
  },
  controller: TopEventsController
});
