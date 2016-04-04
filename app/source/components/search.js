function SearchController($timeout, $q, RxSubject) {

  var ctrl = this;
  ctrl.simulateQuery = false;
  ctrl.isDisabled = false;
  ctrl.firstView = firstView();
  ctrl.querySearch = querySearch;
  ctrl.newEvent = newEvent;

  function newEvent(event) {
    alert("Sorry! You'll need to create a Constituion for " + event + " first!");
  }

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
          value: event.title.toLowerCase(),
          display: event.title
        };
      });
    }
  }

  function firstView() {
    if (ctrl.events.length < 10) {
      return ctrl.events.map(function (event) {
        return {
          title: event.title
        };
      });
    }
    else {
      var results = [];
      for (var i = 0; i < 10; i++) {
        results[i] = {
          title: ctrl.events[i].title
        };
      }
      return results;
    }
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(event) {
      return (event.title.toLowerCase().indexOf(lowercaseQuery) === 0);
    };
  }
  
  RxSubject.subscribe(function(x) {
    if(x === 'events'){
      ctrl.firstView = firstView();
    }
  });
}

EventService.component('search', {
  templateUrl: 'templates/search.html',
  bindings: {
    events: '<'
  },
  controller: SearchController
});
