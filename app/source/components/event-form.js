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
  console.log('in ctrl');
  //console.log(ctrl.startDate.hour);


  ctrl.changeStartHour = function(newValue){
    ctrl.startDate.date.setHours(newValue);
    if(ctrl.startDate.date > ctrl.finishDate.date){
      ctrl.eventForm.hour.$error.validationError = true;
      //ctrl.eventForm.$invalid =  true;
    }else{
      //ctrl.eventForm.$invalid =  false;
      ctrl.eventForm.hour.$error.validationError = false;
    }
  };
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
EventService.directive("dateValidation", function() {
  return {
    restrict: "A",

    require: "ngModel",
    scope:{
      startDate: '=',
      finishDate:'='
    },

    link: function(scope, element, attributes, ngModel) {
      var self = this;

     ngModel.$validators.dateValidation = function(modelValue) {
       console.log(scope);
        /*if(scope.startDate.date >= scope.finishDate.date){
          scope.startDate.hour(0);
          //return false;
          return true;
        }else{
          console.log('true');*/
          return true;
        //}
      }
    }
  };
});
