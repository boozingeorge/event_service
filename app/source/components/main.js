EventService.component('main', {
  template:'<map events="$ctrl.events"></map>' +
  '<div class="tools" layot="row">' +
  '<menu events="$ctrl.events"></menu>'+
  '<cards events="$ctrl.events"></cards>'+
  '</div>',
  transclude: false,
  controller:MainController
});
function MainController($scope, $element, $attrs, $http, APIClient, basicURL){
  var ctrl = this;
  ctrl.events = [];

  APIClient.observable.subscribe(function(x) {
    console.log('onNext main: %s', x)
  },function(e){
    console.log('onError: %s', e)
  },function(){
    console.log('onCompleted')
  });
  APIClient.getToken();
  APIClient.Connect().then(function(response){
    ctrl.events = response;
  }, function(response){
    console.log(response);
  });
}
