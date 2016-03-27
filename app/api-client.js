function APIClient() {
  if (!store.enabled) {
    alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser');
    return;
  }
  store.clear();
};

APIClient.prototype.getToken = function (callback) {
  var token = store.get('token');
  var expiresIn = store.get('expires_in');
  var timestamp = store.get('timestamp');

  if (!token || !expiresIn || !timestamp) {
    $.ajax({
      url: '/api/get_access_token',
      method: "GET",
      dataType: "json"
    }).done(function (data) {
      store.set('token', data.token);
      store.set('timestamp', (new Date().getTime()));
      store.set('expires_in', data.expires_in);
      callback(null, data.token);
    }).fail(function (xhr, status, error) {
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