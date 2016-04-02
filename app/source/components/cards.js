function CardsController() {

  var ctrl = this;
}

EventService.component('cards', {
  templateUrl: 'templates/cards.html',
  bindings:{
    events:'<'
  },
  controller: CardsController
});
