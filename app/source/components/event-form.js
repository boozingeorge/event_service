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
  ctrl.changeStartHour = function(newValue){
    ctrl.startDate.date.setHours(newValue);
    if(ctrl.startDate.date > ctrl.finishDate.date){
      ctrl.eventForm.hour.$error.validationError = true;
      ctrl.eventForm.$invalid =  true;
    }else{
      ctrl.eventForm.$invalid =  false;
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
    self.hour = date.getHours();
    self.minute = date.getMinutes();
    self.date = date;
    self.minDate =date;
    self.maxDate =  new Date(
      date.getFullYear(),
      date.getMonth() + 2,
      date.getDate()
    );
  }
}

EventService.component('eventForm', {
  templateUrl: 'templates/event-form.html',
  bindings: {
    cards: '='
  },
  controller: EventFormController
});
EventService.directive("odd", function() {
  return {
    restrict: "A",

    require: "ngModel",

    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.odd = function(modelValue) {
        return modelValue % 2 === 1;
      }
    }
  };
});
