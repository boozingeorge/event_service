EventService.component('main', {
  templateUrl: 'templates/main.html',
  transclude: false,
  controller:MainController
});
function MainController(APIClient, PopUp){
  var ctrl = this;
  ctrl.events = [];
  ctrl.cards = {
    topEvents: true,
    profile: false,
    createEvent: false
  };
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
    PopUp.ConnectError();
  });
}
