EventService.factory('APIClient', APIClientService);

function APIClientService($http, $q, Config, Emitter) {

  function APIClient() {
    var self = this;
    self._basicURL = Config.basicURL;
    self._token = null;
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
        Emitter.emit('tokenLoaded');
        deferred.resolve(response.data.token);
      }).catch(function (response) {
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
    self.getToken().then(function (response) {
      return $http({
        method: 'GET',
        url: self._basicURL + '/api/event.get?access_token=' + self._token.value
      });
    }, function (response) {
      deferred.reject(response);
    }).then(function (response) {
      var events = response.data.response.map(function (event) {
        return {
          id: event.id,
          title: event.title,
          description: event.description,
          posterId: event.poster_id,
          beginAt: event.begin_at,
          endAt: event.end_at,
          membersAmount: event.members_amount,
          picture: event.picture,
          lat: event.lat,
          long: event.long
        };
      });
      deferred.resolve(events);
    }, function (response) {
      deferred.reject(response);
    });
    return deferred.promise;
  };

  APIClient.prototype.getProfile = function () {
    var self = this;
    var deferred = $q.defer();
    self.getToken().then(function (response) {
      return $http({
        method: 'GET',
        url: self._basicURL + '/api/user.getById?access_token=' + self._token.value
      });
    }, function (response) {
      deferred.reject(response);
    }).then(function (response) {
      if (response.data.error) {
        deferred.reject(response);
        return;
      }
      deferred.resolve({
        id: response.data.response.id,
        firstName: response.data.response.first_name,
        lastName: response.data.response.last_name,
        avatar: response.data.response.avatar,
        events: response.data.response.events
      });
    }, function (response) {
      deferred.reject(response);
    });
    return deferred.promise;
  };

  APIClient.prototype.joinToEvent = function (id) {
    var self = this;
    var deferred = $q.defer();
    self.getToken().then(function (response) {
      return $http({
        method: 'POST',
        url: self._basicURL + '/api/event.join',
        data: 'id=' + id + '&access_token=' + self._token.value,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }, function (response) {
      deferred.reject(response);
    }).then(function (response) {
      deferred.resolve((response.data.error) ? true : false);
    }, function (response) {
      deferred.reject(response);
    });
    return deferred.promise;
  };

  APIClient.prototype.leaveEvent = function (id) {
    var self = this;
    var deferred = $q.defer();
    self.getToken().then(function (response) {
      return $http({
        method: 'POST',
        url: self._basicURL + '/api/event.leave',
        data: 'id=' + id + '&access_token=' + self._token.value,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }, function (response) {
      deferred.reject(response);
    }).then(function (response) {
      deferred.resolve((response.data.error) ? false : true);
    }, function (response) {
      deferred.reject(response);
    });
    return deferred.promise;
  };

  APIClient.prototype.createEvent = function(event) {
    var self = this;
    var deferred = $q.defer();
    var data = 'begin_at=' + event.beginAt + '&end_at=' + event.endAt + '&title=' + event.title + '&description=' + event.description +
      '&lat=' + event.lat + '&long=' + event.long + '&access_token=' + self._token.value;
    if (event.picture) {
      data += '&picture=' + event.picture;
    }
    self.getToken().then(function (response) {
      return $http({
        method: 'POST',
        url: self._basicURL + '/api/event.create',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }).then(function(response){
      if (response.data.error) {
        deferred.reject(response);
        return;
      }
      deferred.resolve(response);
    }).catch(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
  };

  APIClient.prototype.deleteEvent = function (id) {
    var self = this;
    var deferred = $q.defer();
    self.getToken().then(function (response) {
      return $http({
        method: 'POST',
        url: self._basicURL + '/api/event.delete',
        data: 'id=' + id + '&access_token=' + self._token.value,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }).then(function (response) {
      deferred.resolve((response.data.error) ? false : true);
    }, function (response) {
      deferred.reject(response);
    });
    return deferred.promise;
  };
  
  APIClient.prototype.editEvent = function(event) {
    var self = this;
    var deferred = $q.defer();
    var data = 'id=' + event.id + '&begin_at=' + event.beginAt + '&end_at=' + event.endAt + '&title=' + event.title + '&description=' + event.description +
      '&lat=' + event.lat + '&long=' + event.long + '&access_token=' + self._token.value;
    if (event.picture) {
      data += '&picture=' + event.picture;
    }
    self.getToken().then(function (response) {
      return $http({
        method: 'POST',
        url: self._basicURL + '/api/event.edit',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    }).then(function(response){
      if (response.data.error) {
        deferred.reject(response);
        return;
      }
      deferred.resolve(response);
    }).catch(function(err){
      deferred.reject(err);
    });

    return deferred.promise;
  };
  
  return new APIClient();
}
