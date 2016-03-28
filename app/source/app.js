var EventService = angular.module('EventService',['ngMaterial']);

EventService.constant('primaryColor','#039BE5')
EventService.component('main', {
  template:'<map events="$ctrl.events" callofchild="$ctrl.callofchild"></map>' +
  '<div class="tools" layot="row">' +
    '<menu events="$ctrl.events" callofchild="$ctrl.callofchild"></menu>'+
    '<cards events="$ctrl.events" callofchild="$ctrl.callofchild"></cards>'+
  '</div>',
  transclude: false,
  controller:MainController
});
EventService.config(function ($mdThemingProvider, primaryColor) {
  var ESCTheme = $mdThemingProvider.extendPalette('blue', {
    '700': primaryColor
  });
  $mdThemingProvider.definePalette('ESCTheme', ESCTheme);
  $mdThemingProvider.theme('default')
    .primaryPalette('ESCTheme', {
      default: '700'
    });
});

function MainController($scope, $element, $attrs, $http, APIClient){
  var ctrl = this;
  
  ctrl.events = [];
  ctrl.callofchild = {};
  APIClient.getToken(function (err, token) {

    if (err) {
      alert(err.error_message);
      return;
    } else {
      getAllEvents(token);
    }

  });
  function getAllEvents(token) {
    $http({
      method: 'GET',
      url: 'http://52.193.244.203:8080/api/events?access_token='+token
    }).then(function (response) {
      ctrl.events = response.data.map(function (event) {
        return {
          name : event.title,
          desc : event.description,
          lat : event.lat,
          long : event.long
        };
      });
      //TO DO change to promise
      //bullshit
      ctrl.callofchild.addMarkers(ctrl.events);
      ctrl.callofchild.firstView(ctrl.events);
      console.log(ctrl.events);
    }, function(response){
      console.log(response);
    });
  }
}