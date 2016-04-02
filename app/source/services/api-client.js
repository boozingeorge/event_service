EventService.factory('APIClient', APIClientService);

function APIClientService($http, $q,$timeout, basicURL) {

  function APIClient() {
    var self = this;
    self._token = null;
    self.observable = new Rx.Subject();
    if (!store.enabled) {
      throw new Error('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser');
    }
    store.clear();
  }

  APIClient.prototype.getToken = function () {
    var token = store.get('token');
    var expiresIn = store.get('expires_in');
    var timestamp = store.get('timestamp');
    var self = this;

    if (!token || !expiresIn || !timestamp) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/get_access_token'
      }).then(function (response) {
        store.set('token', response.data.token);
        store.set('timestamp', (new Date().getTime()));
        store.set('expires_in', response.data.expires_in);
        //callback(null, response.data.token);
        self._token = response.data.token;
        deferred.resolve(response.data.token);
      }, function (response) {
        //TODO: pop up
        deferred.reject(response);
      });
      return deferred.promise;
    } else {
      var deferred = $q.defer();
      var expiresInUpdated = expiresIn - Math.floor(((new Date().getTime()) - timestamp) / 1000);
      /*
       * TODO: if (expiresInUpdated < 0) refresh token if refresh_error
       */
      if (expiresInUpdated > 0) {
        deferred.resolve(token);
      } else {
        deferred.reject({
          error: 'token_expired',
          error_message: 'Token is expired'
        });
      }
      return deferred.promise;
    }
  };

  APIClient.prototype.getAllEvents = function(){
    var self = this;
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: basicURL + '/api/event.get?access_token=' + self._token
    }).then(function (response) {
      var events = response.data.response.map(function (event) {
        return {
          id : event.id,
          begin_at : event.begin_at,
          end_at : event.end_at,
          members_amount : event.members_amount,
          title : event.title,
          description : event.description,
          lat : event.lat,
          long : event.long,
          picture : event.picture
        };
      });
      deferred.resolve(events);
    }, function(response){
      // TODO: show error in popup window
      deferred.reject(response);
    });
    return deferred.promise;
  };
  APIClient.prototype.Connect = function(){
    var self = this;
    var deferred = $q.defer();
    self.getToken().then(function(response){
      self.getAllEvents().then(function(res){
        deferred.resolve(res);
        $timeout(function(){
          self.observable.onNext('events')
        });
      }, function(res){
        deferred.reject(res);
      });
    },function(response){
      var deferred = $q.defer();
      deferred.reject(response);
    });
    return deferred.promise;
  };

  return new APIClient();
}
