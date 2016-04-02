function MenuController($scope, $element, $attrs,$timeout, $log, $q){
}
EventService.component('menu', {
  template:'<div id="menu" layout="row" layout-align="start center">' +
  '<div id="burger-grid"><burger></burger></div>'+
  '<div flex="100" id="search-grid"><search events="$ctrl.events"></search></div>'+
  '</div>',
  bindings:{
    events:'<'
  },
  controller:MenuController
});
