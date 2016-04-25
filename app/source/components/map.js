function MapController(Emitter, GoogleMap){
  var ctrl = this;

  Emitter.listen('eventsload', function () {
    GoogleMap.CreateAllMarkers(ctrl.events);
  });
}
EventService.component('map', {
  templateUrl: 'templates/map.html',
  bindings:{
    events:'<'
  },
  controller:MapController
});
