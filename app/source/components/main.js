EventService.component('main', {
  templateUrl: 'templates/main.html',
  transclude: false,
  controller: MainController
});

function MainController ($timeout, APIClient, PopUp, RxSubject) {
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
      RxSubject.onNext('eventsload');
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
      RxSubject.onNext('userload');
    });
  }).catch(function(err){
    PopUp.ConnectError();
  });
};
