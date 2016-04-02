EventService.component('main', {
  templateUrl: 'templates/main.html',
  transclude: false,
  controller:MainController
});
function MainController(APIClient){
  var ctrl = this;
  ctrl.events = [];

  APIClient.observable.subscribe(function(x) {
    //TODO: handler for change
  },function(e){
    //TODO: handler for error
  },function(){
    //TODO: handler for complete
  });
  APIClient.Connect().then(function(response){
    ctrl.events = response;
  }, function(response){
    //TODO: pop up
  });
}
