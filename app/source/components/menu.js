function MenuController($scope, $element, $attrs,$timeout, $log, $q){
}
EventService.component('menu', {
  template:'<div id="menu" layout="row" layout-align="start center">' +
    '<div id="burger-grid"><burger></burger></div>'+
    '<div flex="100" id="search-grid"><search events="$ctrl.events" callofchild="$ctrl.callofchild"></search></div>'+
  '</div>',
  bindings:{
    events:'=',
    callofchild: '='
  },
  controller:MenuController
});
/*EventService.run(function($templateCache) {
  $templateCache.put('menu.html', 'This is the content of the template');
});*/
/*EventService.component('menu', {
 template:'<md-grid-list id="menu" md-cols-gt-md="20" md-cols-md="20" md-cols-sm="14" md-cols="8" md-row-height-md="1:1" md-row-height-gt-md="1:1" md-row-height="1:1" md-gutter-gt-md="1px" md-gutter-md="1px" md-gutter="1px" >' +
 '<md-grid-tile md-colspan-gt-md="1" md-colspan-md="1" md-colspan-sm="1" md-colspan="1" style="background: red;" id="burger-grid"><burger></burger></md-grid-tile>'+
 '<md-grid-tile md-colspan-gt-md="4" md-colspan-md="4" md-colspan-sm="4" md-colspan="4" style="background: red;" ><search></search></md-grid-tile>'+
 '</md-grid-list>',
 controller:MenuController
 });*/
