EventService.component('main', {
  templateUrl: 'templates/main.html',
  transclude: false,
  controller: MainController
});

function MainController ($timeout, APIClient, PopUp, RxSubject) {
  var ctrl = this;
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
