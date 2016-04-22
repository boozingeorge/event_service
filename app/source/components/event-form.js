function EventFormController(GoogleMap, $timeout, $scope, APIClient) {

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
    ctrl.event.begin_at = ctrl.startDate.date;
    ctrl.event.end_at = ctrl.finishDate.date;
    console.log(ctrl.event);
    APIClient.createEvent(ctrl.event).then(function(response){
      console.log("------suc------");
      console.log(response);
      console.log("------suc------");
      clearEventForm();
    }, function(response){
      console.log("------fail------");
      console.log(response);
      console.log("------fail------");
      clearEventForm();
    });
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

  function clearEventForm(){
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
    ctrl.startDate = new DateEvent(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours()));
    ctrl.finishDate = new DateEvent(new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), nowDate.getHours() + 1));
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
      ngModel.$parsers.unshift(validate);
      Emitter.listen('finishdate', function () {
        if(typeof ngModel.$viewValue == 'undefined' || isNaN(ngModel.$viewValue)){
          return onChangeFinishHour(scope.finishDate.hour());
        }else{
          return onChangeFinishHour(ngModel.$viewValue);
        }
      });
      function validate(viewValue){
        scope.startDate.hour(viewValue);
        if(scope.startDate.date >= scope.finishDate.date){
          ngModel.$setValidity('startHour', false);
          Emitter.emit('startdate');
          return viewValue;
        }else{
          ngModel.$setValidity('startHour', true);
          Emitter.emit('startdate');
          return viewValue;
        }
      }
      function onChangeFinishHour(value){
        scope.startDate.hour(value);
        if(scope.startDate.date >= scope.finishDate.date){
          ngModel.$setValidity('startHour', false);
          Emitter.emit('startdate');
          return value;
        }else{
          ngModel.$setValidity('startHour', true);
          Emitter.emit('startdate');
          return value;
        }
      }
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
          return onChangeStartHour(scope.finishDate.hour());
        }else{
          return onChangeStartHour(ngModel.$viewValue);
        }
      });
      function validate(viewValue){
        scope.finishDate.hour(viewValue);
        if(scope.startDate.date >= scope.finishDate.date){
          ngModel.$setValidity('finishHour', false);
          Emitter.emit('finishdate');
          return viewValue;
        }else{
          ngModel.$setValidity('finishHour', true);
          Emitter.emit('finishdate');
          return viewValue;
        }
      }
      function onChangeStartHour(value){
        scope.finishDate.hour(value);
        if(scope.startDate.date >= scope.finishDate.date){
          ngModel.$setValidity('finishHour', false);
          return value;
        }else{
          ngModel.$setValidity('finishHour', true);
          return value;
        }
      }
    }
  };
}]);

