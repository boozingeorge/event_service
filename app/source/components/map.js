function MapController(Emitter, GoogleMap){
  var ctrl = this;
  
  Emitter.listen('eventsLoaded', function () {
    GoogleMap.displayMarkers(ctrl.events);
  });
  
  Emitter.listen('eventAdded', function (event) {
    GoogleMap.addMarker(event);
  });
  
  Emitter.listen('eventSelected', function (event) {
    GoogleMap.displayOneMarker(event);
  });
  
  Emitter.listen('eventUnselected', function (event) {
    GoogleMap.displayAll();
  });
}
EventService.component('map', {
  templateUrl: 'templates/map.html',
  bindings:{
    events:'<'
  },
  controller:MapController
});
