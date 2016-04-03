function BurgerController() {

  var ctrl = this;
  ctrl.isOpen = false;
  ctrl.demo = {
    isOpen: false,
    count: 1,
    direction: 'right'
  };
  angular.element(document.querySelector('search')).ready(function () {
    var searchElem = document.querySelector('#search');
    var burgerWidth = angular.element(searchElem).prop('offsetWidth') +
      searchElem.getBoundingClientRect().left - document.querySelector('#burger-grid').getBoundingClientRect().left;
    angular.element(document.querySelector('#burger-toolbar')).css('width',burgerWidth + 'px');
  });
  ctrl.clickCreateEvent = function(){
    ctrl.cards.createEvent = true;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = false;
  };

  ctrl.clickShowProfile = function(){
    ctrl.cards.createEvent = false;
    ctrl.cards.topEvents = false;
    ctrl.cards.profile = true;
  };

  ctrl.clickShowTopEvents = function(){
    ctrl.cards.createEvent = false;
    ctrl.cards.topEvents = true;
    ctrl.cards.profile = false;
  };
}

EventService.component('burger', {
  templateUrl: 'templates/burger.html',
  bindings:{
    cards:'='
  },
  controller: BurgerController
});
