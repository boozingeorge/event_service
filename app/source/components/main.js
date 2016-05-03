function MainController ($timeout, APIClient, PopUp, Emitter) {
  var ctrl = this;
  
  // TODO: Please check this code
  angular.element(document.querySelector('main')).ready(function () {
    angular.element(document.getElementById("preloader")).css('zIndex','0').css('display', 'none');
    angular.element(document.getElementsByClassName("tools")).css('display', 'block');
  });
  
  // TODO: We need find a more elegance solution to show/hide panels
  ctrl.cards = {
    topEvents: true,
    profile: false,
    eventForm: false
  };
  
  ctrl.events = [];
  
  Emitter.listen('tokenLoaded', function () {
    APIClient.getAllEvents().then(function (events) {
      ctrl.events = events;
      $timeout(function () {
        Emitter.emit('eventsLoaded', events);
      });
    }).catch(function (err) {
      PopUp.Error();
    });

    ctrl.user = {};
    APIClient.getProfile().then(function (user) {
      ctrl.user = user;
    }).catch(function (err) {
      PopUp.Error();
    });
  });
  
  APIClient.getToken().catch(function (err) {
    PopUp.Error();
  });
};

EventService.component('main', {
  templateUrl: 'templates/main.html',
  controller: MainController
});