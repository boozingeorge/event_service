var EventService = angular.module('EventService',['ngMaterial']);
function MainController($scope, $element, $attrs){
  var ctrl = this;
  ctrl.events = [
    {
      name : 'Event 1',
      desc : 'Desciption',
      lat : 54.991993,
      long : 73.363718
    },
    {
      name : 'Event 2',
      desc : 'Desciption',
      lat : 54.998222,
      long : 73.355696
    },
    {
      name : 'Event 3',
      desc : 'Desciption',
      lat : 54.990148,
      long : 73.366974
    },
    {
      name : 'String ',
      desc : 'Desciption',
      lat : 54.989431,
      long : 73.373681
    }
  ];
}
EventService.component('main', {
  template:'<map events="$ctrl.events"></map>' +
  '<div class="tools" layot="row">' +
    '<menu events="$ctrl.events"></menu>'+
    '<cards events="$ctrl.events"></cards>'+
  '</div>',
  transclude: false,
  controller:MainController
});
