EventService.factory('GoogleMap', GoogleMapService);

function GoogleMapService(geoPoint, $compile, $rootScope) {

  function GoogleMap() {

    var self = this;

    var mapOptions = {
      zoom: 14,
      center: new google.maps.LatLng(geoPoint.lat, geoPoint.long),
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      mapTypeControl:false,
      streetViewControl: false,
      zoomControlOptions: {
        style:google.maps.ZoomControlStyle.LARGE
      }
    };

    self.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    self.infoWindow = new google.maps.InfoWindow();

    self.openInfoWindow = function(e, selectedMarker){
      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
    };
  }

  GoogleMap.prototype.CreateMarker = function(info){
    var self = this;
    var marker = new google.maps.Marker({
      map: self.map,
      position: new google.maps.LatLng(info.lat, info.long),
      title: info.title
    });

    google.maps.event.addListener(marker, 'click', function(){
      var content = '<md-card style="box-shadow: 0px 0px 0px 0px">'+
        '<md-card-title>'+
        '<md-card-title-text>'+
        '<span class="md-headline">'+ marker.title +'</span>'+
        '<span class="md-subhead">'+ info.description +'</span>'+
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
  };
  
  GoogleMap.prototype.AddMarker = function(event) {
    this.CreateMarker(event);
  };
  
  GoogleMap.prototype.CreateAllMarkers = function(events){
    var self = this;

    for (var i = 0; i < events.length; i++){
      self.CreateMarker(events[i]);
    }
  };

  return new GoogleMap();
}
