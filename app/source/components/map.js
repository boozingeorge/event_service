function MapController($scope, $compile, RxSubject, GoogleMap){
  var ctrl = this;
  RxSubject.subscribe(function(x) {
    if(x === 'events'){
      GoogleMap.CreateAllMarkers(ctrl.events);
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
