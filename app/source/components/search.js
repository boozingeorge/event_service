function SearchController($scope, $element, $attrs, $timeout, $log, $q) {

  var ctrl = this;
  ctrl.simulateQuery = false;
  ctrl.isDisabled = false;
  // list of `event` value/display objects
  //ctrl.events = loadAll();
  ctrl.firstView = firstView();
  ctrl.querySearch = querySearch;
  ctrl.selectedItemChange = selectedItemChange;
  ctrl.searchTextChange = searchTextChange;
  ctrl.newEvent = newEvent;
  function newEvent(event) {
    alert("Sorry! You'll need to create a Constituion for " + event + " first!");
  }

  // ******************************
  // Internal methods
  // ******************************
  /**
   * Search for events... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch(query) {
    var results = query ? ctrl.events.filter(createFilterFor(query)) : ctrl.firstView,
      deferred;
    if (ctrl.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () {
        deferred.resolve(results);
      }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results.map(function (event) {
        return {
          value: event.name.toLowerCase(),
          display: event.name
        };
      });
    }
  }

  function firstView() {
    if (ctrl.events.length < 10) {
      return ctrl.events.map(function (event) {
        return {
          name: event.name
        };
      });
    }
    else {
      var results = [];
      for (var i = 0; i < 10; i++) {
        results[i] = {
          name: ctrl.events[i].name
        }
      }
      return results;
    }
  }

  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }

  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }

  /**
   * Build `events` list of key/value pairs
   */
  function loadAll() {
    return ctrl.events.map(function (event) {
      return {
        value: event.name.toLowerCase(),
        display: event.name
      };
    });
  }

  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(event) {
      return (event.name.toLowerCase().indexOf(lowercaseQuery) === 0);
    };
  }
}
EventService.run(function ($templateCache) {
  $templateCache.put('search.html', '<form id="search" ng-submit="$event.preventDefault()">' +
    '<md-autocomplete ng-disabled="$ctrl.isDisabled" md-no-cache="$ctrl.noCache" md-selected-item="$ctrl.selectedItem"' +
    'md-search-text-change="$ctrl.searchTextChange($ctrl.searchText)"' +
    'md-search-text="$ctrl.searchText"' +
    'md-selected-item-change="$ctrl.selectedItemChange(item)"' +
    'md-items="item in $ctrl.querySearch($ctrl.searchText)"' +
    'md-item-text="item.display"' +
    'md-min-length="0"' +
    'placeholder="Поиск события">' +
    '<md-item-template>' +
    '<span md-highlight-text="$ctrl.searchText" md-highlight-flags="^i">{{item.display}}</span>' +
    '</md-item-template>' +
    '<md-not-found>' +
    'Не найдено  "{{$ctrl.searchText}}"' +
      //'<a ng-click="$ctrl.newEvent($ctrl.searchText)">Создать событие</a>' +
    '</md-not-found>' +
    '</md-autocomplete>' +
    '</form>');
});

EventService.component('search', {
  templateUrl: 'search.html',
  bindings: {
    events: '='
  },
  controller: SearchController
});
