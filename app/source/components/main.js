EventService.component('main', {
  template:'<map events="$ctrl.events" callofchild="$ctrl.callofchild"></map>' +
  '<div class="tools" layot="row">' +
    '<menu events="$ctrl.events" callofchild="$ctrl.callofchild"></menu>'+
    '<cards events="$ctrl.events" callofchild="$ctrl.callofchild"></cards>'+
  '</div>',
  transclude: false,
  controller:MainController
});
function MainController($scope, $element, $attrs, $http, APIClient, basicURL){
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
      url: basicURL + '/api/events?access_token='+token
    }).then(function (response) {
      ctrl.events = response.data.map(function (event) {
        return {
          name : event.title,
          desc : event.description,
          lat : event.lat,
          long : event.long
        };
      });
      // TODO: change to promise, bullshit
      ctrl.callofchild.addMarkers(ctrl.events);
      ctrl.callofchild.firstView(ctrl.events);
      console.log(ctrl.events);
    }, function(response){
      // TODO: show error in popup window
      console.log(response);
    });
  }
}