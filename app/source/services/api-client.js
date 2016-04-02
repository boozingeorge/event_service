EventService.factory('APIClient', APIClientService);

function APIClientService($http, $q, $timeout, basicURL) {

  function APIClient() {
    var self = this;
    self._basicURL = basicURL;
    self._token = null;
    self.observable = new Rx.Subject();
  }

  APIClient.prototype.getToken = function () {
    var self = this;
    var deferred = $q.defer();
    
    if (!self._token) {
      
      $http({
        method: 'GET',
        url: '/api/get_access_token'
      }).then(function (response) {
        self._token = {
          value: response.data.token,
          expires_in: response.data.expires_in,
          timestamp: new Date().getTime()
        };
        deferred.resolve(response.data.token);
      }, function (response) {
        deferred.reject(response);
      });
      
    } else {
      var expiresInUpdated = self._token.expires_in - Math.floor(((new Date().getTime()) - self._token.timestamp) / 1000);
      /*
       * TODO: if (expiresInUpdated < 0) refresh token if refresh_error
       */
      if (expiresInUpdated > 0) {
        deferred.resolve(self._token.value);
      } else {
        deferred.reject({
          error: 'token_expired',
          error_message: 'Token is expired'
        });
      }
    }
    return deferred.promise;
  };

  APIClient.prototype.getAllEvents = function () {
    var self = this;
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: self._basicURL + '/api/event.get?access_token=' + self._token
    }).then(function (response) {
      var events = response.data.response.map(function (event) {
        return {
          id: event.id,
          begin_at: event.begin_at,
          end_at: event.end_at,
          members_amount: event.members_amount,
          title: event.title,
          description: event.description,
          lat: event.lat,
          long: event.long,
          picture: event.picture
        };
      });
      deferred.resolve(events);
    }, function (response) {
      deferred.reject(response);
    });
    return deferred.promise;
  };
  
  APIClient.prototype.Connect = function () {
    var self = this;
    var deferred = $q.defer();
    self.getToken().then(function (response) {
      return self.getAllEvents();
    }, function (response) {
      var deferred = $q.defer();
      deferred.reject(response);
    }).then(function (response) {
      deferred.resolve(response);
      $timeout(function () {
        self.observable.onNext('events');
      });
    }, function (response) {
      deferred.reject(response);
    });
    
    return deferred.promise;
  };

  return new APIClient();
}
