var EventService = angular.module('EventService',['ngMaterial']);
function MainController($scope, $element, $attrs, $http, APIClient){
  var ctrl = this;
  /*ctrl.events = [
    {
      name : 'Event 1',
      desc : 'Desciption',
      lat : 54.991993,
      long : 73.363718
    },
    {
      name : 'Event 2',
      desc : 'Desciption',
      lat : 54.998222,
      long : 73.355696
    },
    {
      name : 'Event 3',
      desc : 'Desciption',
      lat : 54.990148,
      long : 73.366974
    },
    {
      name : 'String ',
      desc : 'Desciption',
      lat : 54.989431,
      long : 73.373681
    }
  ];*/
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
EventService.component('main', {
  template:'<map events="$ctrl.events" callofchild="$ctrl.callofchild"></map>' +
  '<div class="tools" layot="row">' +
    '<menu events="$ctrl.events" callofchild="$ctrl.callofchild"></menu>'+
    '<cards events="$ctrl.events" callofchild="$ctrl.callofchild"></cards>'+
  '</div>',
  transclude: false,
  controller:MainController
});
EventService.factory('APIClient', APIClientService);
function APIClientService($http){
  function APIClient() {
    if (!store.enabled) {
      alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser');
      return;
    }
    store.clear();
  }

  APIClient.prototype.getToken = function (callback) {
    var token = store.get('token');
    var expiresIn = store.get('expires_in');
    var timestamp = store.get('timestamp');

    if (!token || !expiresIn || !timestamp) {
      $http({
        method: 'GET',
        url: '/api/get_access_token'
      }).then(function (response){
        store.set('token', response.data.token);
        store.set('timestamp', (new Date().getTime()));
        store.set('expires_in', response.data.expires_in);
        callback(null, response.data.token);
      }, function(xhr, status, error){
        //TO DO response code
        console.log('/api/get_access_token -- failed');
        var error = JSON.parse(xhr.responseText);
        callback({
          error: error.error || 'internal_server_error',
          error_message: error.error_message || 'Internal server error'
        });
      });
    } else {
      var expiresInUpdated = expiresIn - Math.floor(((new Date().getTime()) - timestamp) / 1000);
      /**
       * if (expiresInUpdated < 0) refresh token if refresh_error
       */
      if (expiresInUpdated > 0) {
        callback(null, token);
      } else {
        callback({
          error: 'token_expired',
          error_message: 'Token is expired'
        });
      }
    }
  };

  return new APIClient();
}
