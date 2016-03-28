function BurgerController($scope, $element, $attrs, $timeout, $log, $q) {

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
    //console.log(angular.element(searchElem).prop('offsetWidth') + ' + ' + searchElem.getBoundingClientRect().left);
  });
  ctrl.ada = function($event){
    console.log($event);
  };
}
EventService.run(function ($templateCache) {
  $templateCache.put('burger.html', '<md-fab-toolbar id="burger-toolbar" md-open="$ctrl.demo.isOpen" count="$ctrl.demo.count" md-direction="right">' +
    '<md-fab-trigger class="align-with-text">' +
    '<md-button ng-click="$ctrl.ada($event)" aria-label="menu" class="md-fab md-primary">' +
    '<md-icon md-svg-src="svg/ic_menu_24px.svg"></md-icon>' +
    '</md-button>' +
    '</md-fab-trigger>' +
    '<md-toolbar>' +
    '<md-fab-actions class="md-toolbar-tools">' +
    '<md-button aria-label="label" class="md-icon-button">' +
    '<md-icon md-svg-src="svg/ic_add_location_48px.svg"></md-icon>' +
    '</md-button>' +
    '<md-button aria-label="comment" class="md-icon-button">' +
    '<md-icon md-svg-src="svg/ic_account_box_48px.svg"></md-icon>' +
    '</md-button>' +
    '<a href="/logout">' +
    '<md-button aria-label="photo" class="md-icon-button">' +
    '<md-icon md-svg-src="svg/ic_exit_to_app_48px.svg"></md-icon>' +
    '</md-button>' +
    '</a>' +
    '</md-fab-actions>' +
    '</md-toolbar>' +
    '</md-fab-toolbar>');
});

EventService.component('burger', {
  templateUrl: 'burger.html',
  controller: BurgerController
});
