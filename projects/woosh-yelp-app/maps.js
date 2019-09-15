function getRadius($radius){
  if ($radius == '1') {
    $radius = $WALK_RADIUS;
  }
  else if ($radius == '2') {
    $radius = $BIKE_RADIUS;
  }
  else if ($radius == '3') {
    $radius = $DRIVE_RADIUS;
  }
  return $radius;
}

function filterDistance(locations) {
  let radius = $("#radius").val();
  radius = getRadius(radius);
  filtered = locations.filter(function(value, index) {
    return locations[index].distance < radius;
  });
  return filtered;
}

function filterRating(locations) {
  let maxRating = 3;
  filtered = locations.filter(function(value, index) {
    return locations[index].rating > maxRating;
  });
  return filtered;
}

function filterPrice(locations) {
  let price = $("#price").val();
  if (price == "1, 2, 3, 4") {
    return locations;
  }
  price = getPrice(price);
  filtered = locations.filter(function(value, index) {
    return locations[index].price == price;
  });
  return filtered;
}

function getPrice($price){
  if ($price == '1') {
    $price = "$";
  }
  else if ($price == '2') {
    $price = "$$";
  }
  else if ($price == '3') {
    $price = "$$$";
  }
  else if ($price == '4') {
    $price = "$$$$";
  }

  return $price;
}

function initMap() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  let mobile = w/5;
  if (mobile < 200) {
    mobile = 200;
  }

  $("#map").css({
    "height": h,
    "width": w
  });
  removeMarkers();
  let myLocation =  {
    lat: lat,
    lng: lon
  };
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLocation,
    zoom: 15
  });
  let marker = new google.maps.Marker({
    position: myLocation,
    map: map,
    clickable: true,
    animation: google.maps.Animation.DROP,
    label: {
      color: "white",
      text: String.fromCharCode(11088)
    },
    title: 'You are here'
  });
  markers.push(marker);
  let infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(marker, 'click', (function(marker) {
    return function() {
      infowindow.setContent("You are Here");
      infowindow.open(map, marker);
    }
  })(marker));

  for (let i = 0; i < locations.length; i++) {
   marker = addMarker(map, locations[i], i);
   markers.push(marker);

   let content = '<div class="infowindow"><p><b>'+locations[i].title + '</b></p><img src="' + locations[i].icon + '"><p>' + locations[i].address+'</p><p>'+ locations[i].phone+'</p><p><b>Category:</b> '+ locations[i].category+'</p></div>';


   google.maps.event.addListener(marker, 'click', (function(marker, i) {
     return function() {
       infowindow.setContent(content);
       infowindow.setOptions({
         maxWidth: mobile
       });
       infowindow.open(map, marker);
     }
   })(marker, i));
  }

  setZoom(map, markers);
}

function addMarker(map, place, i) {
  let marker = new google.maps.Marker({
    position: {lat: place.lat, lng: place.lon},
    map: map,
    clickable: true,
    animation: google.maps.Animation.DROP,
    label: {
      color: "white",
      text: String(i+1)
    },
    title: place.title
  });

  return marker;
}

function removeMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function setZoom(map, markers) {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
   bounds.extend(markers[i].getPosition());
  }
  map.fitBounds(bounds);
}
