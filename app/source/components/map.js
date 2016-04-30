function MapController(Emitter, GoogleMap){
  Emitter.listen('eventsLoaded', function (events) {
    GoogleMap.displayMarkers(events);
  });
  
  Emitter.listen('eventAdded', function (event) {
    GoogleMap.addMarker(event);
  });
  
  Emitter.listen('eventSelected', function (event) {
    GoogleMap.displayOneMarker(event);
  });
  
  Emitter.listen('eventUnselected', function () {
    GoogleMap.displayAll();
  });
}

EventService.component('map', {
  templateUrl: 'templates/map.html',
  controller:MapController
});
