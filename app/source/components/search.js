function SearchController(Emitter) {
  var ctrl = this;
  
  ctrl.selectedItemChange = function (event) {
    if (event) {
      Emitter.emit('eventSelected', event);
    }
  };
  
  ctrl.searchTextChange = function (searchText) {
    if (ctrl.selectedItem && ctrl.selectedItem.title !== searchText) {
      Emitter.emit('eventUnselected');
    }
  };
  
  ctrl.querySearch = function (query) {
    return query ? ctrl.events.filter(createFilterFor(query)) : ctrl.events;
  };
  
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function (event) {
      return (event.title.toLowerCase().indexOf(lowercaseQuery) === 0);
    };
  };
}

EventService.component('search', {
  templateUrl: 'templates/search.html',
  bindings: {
    events: '<'
  },
  controller: SearchController
});
