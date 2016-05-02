function GoogleMapService($compile, Config) {
  var ctrl = this;
  function GoogleMap() {

    var self = this;

    self.markers = [];
    self.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: new google.maps.LatLng(Config.location.lat, Config.location.long),
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE
      }
    });
    self.infoWindow = new google.maps.InfoWindow();

    self.openInfoWindow = function (e, selectedMarker) {
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    };
  }

  GoogleMap.prototype._displayMarker = function (event, scope) {
    var self = this;

    var marker = self.markers[event.id];
    if (marker) {
      if (!marker.getMap()) {
        self.markers[event.id].setMap(self.map);
      }
      return;
    }

    marker = new google.maps.Marker({
      map: self.map,
      position: new google.maps.LatLng(event.lat, event.long),
      title: event.title
    });

    google.maps.event.addListener(marker, 'click', function () {
      if (parseInt(angular.element(self.infoWindow.getContent()).attr('event-id')) !== event.id) {
        var compiled = $compile('<div map-card event-id="' + event.id + '" class="map-card"></div>')(scope);
        self.infoWindow.setContent(compiled[0]);
      }
      self.infoWindow.open(self.map, marker);
    });
    self.markers[event.id] = marker;
  };

  GoogleMap.prototype.addMarker = function (event, scope) {
    this._displayMarker(event, scope);
    this.map.setCenter({lat: event.lat, lng: event.long});
  };
  
  GoogleMap.prototype.deleteMarker = function (event) {
    this.infoWindow.close();
    this.markers[event.id].setMap(null);
  };
  
  GoogleMap.prototype.displayOneMarker = function (event, scope) {
    this.hideAll();
    this._displayMarker(event, scope);
    this.map.setCenter({lat: event.lat, lng: event.long});
  };

  GoogleMap.prototype.displayMarkers = function (events, scope) {
    var self = this;

    for (var i = 0; i < events.length; i++) {
      self._displayMarker(events[i], scope);
    }
  };

  GoogleMap.prototype.displayAll = function () {
    var self = this;

    for (var i in self.markers) {
      self.markers[i].setMap(self.map);
    }
  };

  GoogleMap.prototype.hideAll = function () {
    var self = this;

    for (var i in self.markers) {
      self.markers[i].setMap(null);
    }
  };

  return new GoogleMap();
}

EventService.factory('GoogleMap', GoogleMapService);