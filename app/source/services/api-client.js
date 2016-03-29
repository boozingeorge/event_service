EventService.factory('APIClient', APIClientService);

function APIClientService($http) {

  function APIClient() {
    if (!store.enabled) {
      throw new Error('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser');
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
      }).then(function (response) {
        store.set('token', response.data.token);
        store.set('timestamp', (new Date().getTime()));
        store.set('expires_in', response.data.expires_in);
        callback(null, response.data.token);
      }, function (xhr, status, error) {
        // TODO: response code
        console.log('/api/get_access_token -- failed');
        var error = JSON.parse(xhr.responseText);
        callback({
          error: error.error || 'internal_server_error',
          error_message: error.error_message || 'Internal server error'
        });
      });
    } else {
      var expiresInUpdated = expiresIn - Math.floor(((new Date().getTime()) - timestamp) / 1000);
      /*
       * TODO: if (expiresInUpdated < 0) refresh token if refresh_error
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
