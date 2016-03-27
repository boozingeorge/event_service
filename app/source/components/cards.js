function CardsController($scope, $element, $attrs, $timeout, $log, $q) {

  var ctrl = this;
  console.log(ctrl.events);
}
EventService.run(function ($templateCache) {
  $templateCache.put('cards.html', '<md-card style="position: relative" flex="100"  ng-repeat="event in $ctrl.events">'+
    '<md-card-title>'+
    '<md-card-title-text>'+
      '<span class="md-headline">{{event.name}}</span>'+
      '<span class="md-subhead">{{event.desc}}</span>'+
    '</md-card-title-text>'+
    '<md-card-title-media>'+
    '<div class="md-media-sm card-media"></div>'+
    '</md-card-title-media>'+
    '</md-card-title>'+
      '<md-card-actions layout="row" layout-align="end center">'+
        '<md-button>Подробнее</md-button>'+
        '<md-button>Пойду</md-button>'+
      '</md-card-actions>'+
    '</md-card>');
});

EventService.component('cards', {
  templateUrl: 'cards.html',
  bindings:{
    events:'='
  },
  controller: CardsController
});
