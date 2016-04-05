EventService.component('main', {
  templateUrl: 'templates/main.html',
  transclude: false,
  controller: MainController
});

function MainController ($timeout, APIClient, PopUp, RxSubject) {
  var ctrl = this;
  angular.element(document.querySelector('main')).ready(function () {
    angular.element(document.getElementById("preloader")).css('zIndex','0').css('display', 'none');
  });
  ctrl.events = [];
  ctrl.cards = {
    topEvents: true,
    profile: false,
    createEvent: false
  };
  APIClient.getAllEvents().then(function (events) {
    ctrl.events = events;
    $timeout(function () {
      RxSubject.onNext('events');
    });
  }).catch(function (err) {
    PopUp.Error();
  });
};
