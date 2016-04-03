function TopEventsController() {

  var ctrl = this;
}

EventService.component('topEvents', {
  templateUrl: 'templates/top-events.html',
  bindings:{
    events:'<'
  },
  controller: TopEventsController
});
