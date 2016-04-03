function MenuController(){
}
EventService.component('menu', {
  templateUrl: 'templates/menu.html',
  bindings:{
    events:'<',
    cards:'='
  },
  controller:MenuController
});
