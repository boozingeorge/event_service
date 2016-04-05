function CreateEventController(GoogleMap, $timeout) {

  var ctrl = this;
  ctrl.location = {
    lat: null,
    long: null
  };

  ctrl.nowDate = new Date();
  ctrl.startDate = {
    date : ctrl.nowDate,
    minDate :new Date(
      ctrl.nowDate.getFullYear(),
      ctrl.nowDate.getMonth(),
      ctrl.nowDate.getDate()
    ),
    maxDate : new Date(
      ctrl.nowDate.getFullYear(),
      ctrl.nowDate.getMonth() + 2,
      ctrl.nowDate.getDate()
    ),
    hour: 12,
    minute: 30
  };
  ctrl.finishDate = {
    date : ctrl.nowDate,
    minDate :new Date(
      ctrl.nowDate.getFullYear(),
      ctrl.nowDate.getMonth(),
      ctrl.nowDate.getDate()
    ),
    maxDate : new Date(
      ctrl.nowDate.getFullYear(),
      ctrl.nowDate.getMonth() + 2,
      ctrl.nowDate.getDate()
    ),
    hour: 13,
    minute: 30
  };

  ctrl.SetLocation = function () {
    var locationOnClick = google.maps.event.addListener(GoogleMap.map, 'click', function (event) {
      $timeout(function(){
        ctrl.location.lat = event.latLng.lat();
        ctrl.location.long = event.latLng.lng();
      });
      console.log("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
      locationOnClick.remove();
    });
  };

  function Event(event) {
    var self = this;
    self.id = event.id;
    self.begin_at = event.begin_at;
    self.end_at = event.end_at;
    self.members_amount = event.members_amount;
    self.title = event.title;
    self.description = event.description;
    self.lat = event.lat;
    self.long = event.long;
    self.picture = event.picture;
  }
}

EventService.component('createEvent', {
  templateUrl: 'templates/create-event.html',
  bindings: {
    cards: '='
  },
  controller: CreateEventController
});
