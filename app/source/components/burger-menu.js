function BurgerController() {
  var ctrl = this;
 
  ctrl.clickShowEventForm = function () {
    ctrl.cards.eventForm = true;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = false;
  };

  ctrl.clickShowProfile = function () {
    ctrl.cards.eventForm = false;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = true;
  };

  ctrl.clickShowTopEvents = function () {
    ctrl.cards.eventForm = false;
    ctrl.cards.topEvents = true;
    ctrl.cards.profile = false;
  };
}

EventService.component('burgerMenu', {
  templateUrl: 'templates/burger-menu.html',
  bindings:{
    cards:'='
  },
  controller: BurgerController
});
