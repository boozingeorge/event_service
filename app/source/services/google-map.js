EventService.factory('GoogleMap', GoogleMapService);

function GoogleMapService(geoPoint, $compile, $rootScope) {

  function GoogleMap() {

    var self = this;
    
    self.markers = [];
    self.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: new google.maps.LatLng(geoPoint.lat, geoPoint.long),
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE
      }
    });
    self.infoWindow = new google.maps.InfoWindow();

    self.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    };
  }
  
  GoogleMap.prototype._displayMarker = function(event) {
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
    
    google.maps.event.addListener(marker, 'click', function(){
      var content = '<md-card style="box-shadow: 0px 0px 0px 0px">'+
        '<md-card-title>'+
        '<md-card-title-text>'+
        '<span class="md-headline">'+ event.title +'</span>'+
        '<span class="md-subhead">'+ event.description +'</span>'+
        '</md-card-title-text>'+
        '</md-card-title>'+
        '<md-card-actions layout="row" layout-align="end center">'+
        '<md-button>Подробнее</md-button>'+
        '<md-button>Пойду</md-button>'+
        '</md-card-actions>'+
        '</md-card>'+
        '';
      var compiled = $compile(content)($rootScope);
      self.infoWindow.setContent(compiled[0]);
      self.infoWindow.open(self.map, marker);
    });
    self.markers[event.id]= marker;
  };
  
  GoogleMap.prototype.addMarker = function(event) {
    this._displayMarker(event);
    this.map.setCenter({lat: event.lat, lng: event.long});
  };
  
  GoogleMap.prototype.displayOneMarker = function(event) {
    this.hideAll();
    this._displayMarker(event);
    this.map.setCenter({lat: event.lat, lng: event.long});
  };
  
  GoogleMap.prototype.displayMarkers = function(events){
    var self = this;

    for (var i = 0; i < events.length; i++){
      self._displayMarker(events[i]);
    }
  };
  
  GoogleMap.prototype.displayAll = function(events){
    var self = this;

    for(var i in self.markers){
      self.markers[i].setMap(self.map);
    }
  };

  GoogleMap.prototype.hideAll = function(){
    var self = this;

    for(var i in self.markers){
      self.markers[i].setMap(null);
    }
  };
  
  return new GoogleMap();
}
