function BurgerController(Emitter) {
  var ctrl = this;
 
  ctrl.clickShowEventForm = function () {
    ctrl.cards.eventForm = true;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = false;
    ctrl.cards.eventDetailed = false;
    Emitter.emit('eventAdd');
  };

  ctrl.clickShowProfile = function () {
    ctrl.cards.eventForm = false;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = true;
    ctrl.cards.eventDetailed = false;
  };

  ctrl.clickShowTopEvents = function () {
    ctrl.cards.eventForm = false;
    ctrl.cards.topEvents = true;
    ctrl.cards.profile = false;
    ctrl.cards.eventDetailed = null;
  };
  
  Emitter.listen('eventOpened', function(event) {
    ctrl.cards.eventForm = false;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = false;
    ctrl.cards.eventDetailed = true;
    ctrl.eventOpened = event;
  });
  
  Emitter.listen('eventDeleted', function() {
    ctrl.cards.eventForm = false;
    ctrl.cards.topEvents = true;
    ctrl.cards.profile = false;
    ctrl.cards.eventDetailed = false;
  });
  
  Emitter.listen('eventEdit', function() {
    ctrl.cards.eventForm = true;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = false;
    ctrl.cards.eventDetailed = false;
  });
}

EventService.component('burgerMenu', {
  templateUrl: 'templates/burger-menu.html',
  bindings:{
    cards:'=',
    eventOpened: '='
  },
  controller: BurgerController
});