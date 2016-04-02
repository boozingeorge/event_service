function MenuController(){
}
EventService.component('menu', {
  templateUrl: 'templates/menu.html',
  bindings:{
    events:'<'
  },
  controller:MenuController
});
