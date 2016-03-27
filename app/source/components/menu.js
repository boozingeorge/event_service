function MenuController($scope, $element, $attrs,$timeout){
  $scope.isOpen = false;
  $scope.demo = {
    isOpen: false,
    count: 1,
    direction: 'right'
  };
}
EventService.component('menu', {
  template:'<md-grid-list id="menu" md-cols="5" md-gutter="1em" md-row-height="4:3">' +
  '<md-fab-toolbar md-open="demo.isOpen" count="demo.count" md-direction="right">' +
  '<md-fab-trigger class="align-with-text">' +
  '<md-button aria-label="menu" class="md-fab md-primary">'+
'<md-icon md-svg-src="ic_menu_24px.svg"></md-icon>'+
  '</md-button>'+
  '</md-fab-trigger>'+
  '<md-toolbar>'+
  '<md-fab-actions class="md-toolbar-tools">'+
  '<md-button aria-label="comment" class="md-icon-button">'+
  '<md-icon md-svg-src="ic_account_box_48px.svg"></md-icon>'+
  '</md-button>'+
  '<md-button aria-label="label" class="md-icon-button">'+
  '<md-icon md-svg-src="ic_add_location_48px.svg"></md-icon>'+
  '</md-button>'+
  '<md-button aria-label="photo" class="md-icon-button">'+
  '<md-icon md-svg-src="ic_search_48px.svg"></md-icon>'+
  '</md-button>'+
  '</md-fab-actions>'+
  '</md-toolbar>'+
  '</md-fab-toolbar>'+
  '</md-grid-list>',
  controller:MenuController
});
