function BurgerController() {

  var ctrl = this;
  ctrl.isOpen = false;
  ctrl.demo = {
    isOpen: false,
    count: 1,
    direction: 'right'
  };
  
  // TODO: Please check this code
  angular.element(document.querySelector('search')).ready(function () {
    var searchElem = document.querySelector('#search');
    var burgerWidth = angular.element(searchElem).prop('offsetWidth') +
      searchElem.getBoundingClientRect().left - document.querySelector('#burger-grid').getBoundingClientRect().left;
    angular.element(document.querySelector('#burger-toolbar')).css('width', burgerWidth + 'px');
  });
  
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

EventService.component('burger', {
  templateUrl: 'templates/burger.html',
  bindings: {
    cards: '='
  },
  controller: BurgerController
});
