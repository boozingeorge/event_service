function MapController($scope, $compile, APIClient, geoPoint, GoogleMap){
  var ctrl = this;
  APIClient.observable.subscribe(function(x) {
    if(x == 'events'){
      GoogleMap.CreateAllMarkers(ctrl.events);
    }
  },function(e){
    //TODO: handler for error
  },function(){
    //TODO: handler for complete
  });
}
EventService.component('map', {
  templateUrl: 'templates/map.html',
  bindings:{
    events:'<'
  },
  controller:MapController
});
