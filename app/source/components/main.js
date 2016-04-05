EventService.component('main', {
  templateUrl: 'templates/main.html',
  transclude: false,
  controller: MainController
});

function MainController ($timeout, APIClient, PopUp, Emitter) {
  var ctrl = this;
  
  // TODO: Please check this code
  angular.element(document.querySelector('main')).ready(function () {
    angular.element(document.getElementById("preloader")).css('zIndex','0').css('display', 'none');
  });
  
  // TODO: We need find a more elegance solution to show/hide panels
  ctrl.cards = {
    topEvents: true,
    profile: false,
    eventForm: false
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
  APIClient.getProfile().then(function (response) {
    ctrl.user = {
      firstName: response.firstName,
      lastName: response.lastName,
      avatar: response.avatar,
      events: response.events
    };

    $timeout(function () {
      Emitter.emit('userload');
    });
  }).catch(function (err) {
    PopUp.ConnectError();
  });
};
