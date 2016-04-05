EventService.factory('RxSubject', function () {
  var RxSubject = new Rx.Subject();
  
  RxSubject.callbacks = {
    eventsload: [],
    userload: []
  };
  
  RxSubject.subscribe(function(x) {
    if(x === 'eventsload'){
      RxSubject.callbacks['eventsload'].forEach(function (callback) {
        callback();
      });
    }
    if(x === 'userload'){
      RxSubject.callbacks['userload'].forEach(function (callback) {
        callback();
      });
    }
  });
  
  RxSubject.on = function (name, callback) {
    if (!this.callbacks[name]) {
      throw new Error('Unknown event "' + name + '"');
    }
    this.callbacks[name].push(callback);
  };
  
  return RxSubject;
});
