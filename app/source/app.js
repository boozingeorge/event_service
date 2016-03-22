var EventService = angular.module('EventService',['ngMaterial']);
function MainController($scope, $element, $attrs){

}
EventService.component('main', {
  template:'<map></map>' +
  '<menu></menu>',
  transclude: true,
  controller:MainController
});
