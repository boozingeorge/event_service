EventService.component('main', {
  templateUrl: 'templates/main.html',
  transclude: false,
  controller: MainController
});

function MainController ($timeout, APIClient, PopUp, Emitter) {
  var ctrl = this;
  
  ctrl.cards = {
    topEvents: true,
    profile: false,
    createEvent: false
  };
  
  ctrl.events = [];
  APIClient.getAllEvents().then(function (events) {
    ctrl.events = events;
    $timeout(function () {
      Emitter.emit('eventsload');
    });
  }).catch(function (err) {
    PopUp.Error();
  });
  
  ctrl.user = {};
  APIClient.getProfile().then(function(response){
    ctrl.user = {
      firstName: response.firstName,
      lastName: response.lastName,
      avatar: response.avatar,
      events: response.events
    };
    
    $timeout(function () {
      Emitter.emit('userload');
    });
  }).catch(function(err){
    PopUp.ConnectError();
  });
};
