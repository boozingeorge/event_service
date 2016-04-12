function EventFormController(GoogleMap, $timeout, $scope) {

  var ctrl = this;
  ctrl.event = {
    title:'',
    description:'',
    picture: '',
    location: {
      lat: null,
      long: null
    }
  };
  ctrl.viewLocation = '';

  var nowDate = new Date();
  ctrl.startDate = new DateEvent(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours()));
  ctrl.finishDate = new DateEvent(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours() + 1));
  ctrl.failDate = false;

  ctrl.SetLocation = function () {
    var locationOnClick = google.maps.event.addListener(GoogleMap.map, 'click', function (event) {
      $timeout(function(){
        ctrl.event.location.lat = event.latLng.lat();
        ctrl.event.location.long = event.latLng.lng();
        ctrl.viewLocation = event.latLng.lat().toFixed(3) + ', ' + event.latLng.lng().toFixed(3);
      });
      console.log("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
      locationOnClick.remove();
    });
  };
  ctrl.createEvent = function(){
    console.log(ctrl.event);
  };
  function DateEvent(date){
    var self = this;
    self.minute = date.getMinutes();
    self.date = date;
    self.minDate =date;
    self.maxDate =  new Date(
      date.getFullYear(),
      date.getMonth() + 2,
      date.getDate()
    );
    self.hour = function(value){
      return arguments.length ? (this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), value)) : self.date.getHours();
    };
    /*Object.defineProperty(this, "hour", {
      get: function() {
        return this.date.getHours();
      },
      set: function(value){
        console.log(value);
        this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), value);
      }
    });*/
  }
}

EventService.component('eventForm', {
  templateUrl: 'templates/event-form.html',
  bindings: {
    cards: '='
  },
  controller: EventFormController
});
EventService.directive("validStartHour", ['Emitter', function(Emitter) {
  return {
    restrict: "A",

    require: "ngModel",
    scope:{
      startDate: '<',
      finishDate:'<'
    },

    link: function(scope, element, attributes, ngModel) {
      var self = this;
      ngModel.$parsers.unshift(function(viewValue){
        scope.startDate.hour(viewValue);
        if(scope.startDate.date >= scope.finishDate.date){
          ngModel.$setValidity('startHour', false);
          console.log('start - false');
          Emitter.emit('startdate');
          return viewValue;
        }else{
          ngModel.$setValidity('startHour', true);
          Emitter.emit('startdate');
          console.log('start - true');
          return viewValue;
        }
      });
    }
  };
}]);

EventService.directive("validFinishHour", ['Emitter', function(Emitter) {
  return {
    restrict: "A",

    require: "ngModel",
    scope:{
      startDate: '<',
      finishDate:'<'
    },

    link: function(scope, element, attributes, ngModel) {
      var self = this;
      ngModel.$parsers.unshift(validate);

      Emitter.listen('startdate', function () {
        if(typeof ngModel.$viewValue == 'undefined' || isNaN(ngModel.$viewValue)){
          return validate(scope.finishDate.hour());
        }else{
          return validate(ngModel.$viewValue);
        }
      });
      function validate(viewValue){
        scope.finishDate.hour(viewValue);
        if(scope.startDate.date >= scope.finishDate.date){
          ngModel.$setValidity('finishHour', false);
          console.log('finish - false');
          return viewValue;
        }else{
          ngModel.$setValidity('finishHour', true);
          console.log('finish - true');
          return viewValue;
        }
      }
    }
  };
}]);

