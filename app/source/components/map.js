function MapController($scope, $compile, RxSubject, geoPoint){
  var ctrl = this;
  RxSubject.subscribe(function(x) {
    if(x === 'events'){
      CreateAllMarkers();
    }
  });
}
EventService.component('map', {
  templateUrl: 'templates/map.html',
  bindings:{
    events:'<'
  },
  controller:MapController
});
