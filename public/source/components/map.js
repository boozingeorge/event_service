function MapController($scope, $element, $attrs,$timeout){
  var ctrl = this;
  var cities = [
    {
      city : 'Event 1',
      desc : 'Desciption',
      lat : 54.991993,
      long : 73.363718
    },
    {
      city : 'Event 2',
      desc : 'Desciption',
      lat : 54.998222,
      long : 73.355696
    },
    {
      city : 'Event 3',
      desc : 'Desciption',
      lat : 54.990148,
      long : 73.366974
    },
    {
      city : 'Event 4',
      desc : 'Desciption',
      lat : 54.983804,
      long : 73.375183
    }/*,
    {
      city : 'Event 5 ',
      desc : 'Desciption',
      lat : 54.989431,
      long : 73.373681
    }*/
  ];
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(54.993437, 73.365768),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControl:false,
    streetViewControl: false,
    zoomControlOptions: {
      style:google.maps.ZoomControlStyle.LARGE
    }
  };

  ctrl.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  ctrl.markers = [];

  var infoWindow = new google.maps.InfoWindow();

  var createMarker = function (info){

    var marker = new google.maps.Marker({
      map: ctrl.map,
      position: new google.maps.LatLng(info.lat, info.long),
      title: info.city
    });
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

    google.maps.event.addListener(marker, 'mouseover', function(){
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open(ctrl.map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function(){
      infoWindow.close();
    });
    ctrl.markers.push(marker);

  };

  for (var i = 0; i < cities.length; i++){
    createMarker(cities[i]);
  }

  ctrl.openInfoWindow = function(e, selectedMarker){
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
  };
  function CustomMarker(latlng, map, args) {
    this.latlng = latlng;
    this.args = args;
    this.setMap(map);
  }

  CustomMarker.prototype = new google.maps.OverlayView();

  CustomMarker.prototype.draw = function() {

    var self = this;

    var div = this.div;

    if (!div) {

      div = this.div = document.createElement('div');

      div.className = 'marker';

      div.style.position = 'absolute';
      div.style.cursor = 'pointer';
      div.style.width = self.args.radius + 'px';
      div.style.height = self.args.radius + 'px';
      div.style.background = 'blue';
      div.style.borderRadius = '50%';

      if (typeof(self.args.marker_id) !== 'undefined') {
        div.dataset.marker_id = self.args.marker_id;
      }

      google.maps.event.addDomListener(div, "click", function(event) {
        google.maps.event.trigger(self, "click");
        var infowindow = new google.maps.InfoWindow({
          content: '<h2>' + 'asdasd' + '</h2>' + 'asdasd',
          pixelOffset: new google.maps.Size(0, -self.args.radius / 2)
        });
        infowindow.open(ctrl.map, self);
      });

      var panes = this.getPanes();
      panes.overlayImage.appendChild(div);
    }

    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

    if (point) {
      div.style.left = point.x - self.args.radius / 2  +'px';
      div.style.top = point.y - self.args.radius / 2 + 'px';
    }
  };

  CustomMarker.prototype.remove = function() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  };

  CustomMarker.prototype.getPosition = function() {
    return this.latlng;
  };
  var myLatlng = new google.maps.LatLng(54.989431,73.373681);
  var overlay = new CustomMarker(
    myLatlng,
    ctrl.map,
    {
      marker_id: '123',
      radius: 20
    }
  );

}
EventService.component('map', {
  template:'<div id="map"></div>',
  controller:MapController
});
