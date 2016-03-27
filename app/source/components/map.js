function MapController($scope, $element, $attrs, $timeout, APIClient){
  var ctrl = this;
  
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
      title: info.title
    });
    marker.content =
      '<p><i>Begin at: ' + info.begin_date + '</i></p>' +
      '<p><i>End at: ' + info.begin_date + '</i></p>' +
      '<div class="infoWindowContent">' + info.description + '</div>' +
      '<p>Already ' + info.subscribers_amount + ' subscribers</p>'
    ;

    google.maps.event.addListener(marker, 'mouseover', function(){
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open(ctrl.map, marker);
    });
    google.maps.event.addListener(marker, 'mouseout', function(){
      infoWindow.close();
    });
    ctrl.markers.push(marker);

  };
  
  APIClient.getToken(function (err, token) {
    
    if (err) {
      alert(err.error_message);
      return;
    } else {
      printMarkers(token, createMarker);
    }

  });
  
  ctrl.openInfoWindow = function(e, selectedMarker){
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
  };
}

function printMarkers(token, createMarker) {
  $.ajax({
    url: 'http://52.193.244.203:8080/api/events',
    data: {
      access_token: token
    },
    method: "GET",
    dataType: "json"
  }).done(function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      createMarker(data[i]);
    }
  })
}

EventService.component('map', {
  template:'<div id="map"></div>',
  controller:MapController
});