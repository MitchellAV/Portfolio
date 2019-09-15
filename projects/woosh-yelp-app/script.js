// Radius in m
const $WALK_RADIUS = 1200; // .75 miles
const $BIKE_RADIUS = 5000; // 3 miles
const $DRIVE_RADIUS = 12000; // 7.5 miles

let response;
let places = [];
let locations = [];
let markers = [];
let map;
let lat;
let lon;
$(document).ready(function() {
  $.getScript("maps.js");
  $("#tinder").hide();
  getLocation();

  $(".active .img").bind("click", function() {
    window.open('https://maps.google.com/?saddr='+lat+','+lon+'&daddr=' + escape($(".active .addr").text()));
    console.log("clicked");
  });
});


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      $("#lat").val(lat);
      $("#lon").val(lon);
    });
  } else {
    alert("Could not retrieve location.\nPlease enable location services and try again.");
    getLocation();
  }
}

function Buisiness(json) {
  this.id = json.id;
  this.title = json.name;
  this.lat = json.coordinates.latitude;
  this.lon = json.coordinates.longitude;
  this.icon = json.image_url;
  this.category = getCategories(json);
  this.distance = json.distance;
  this.address = json.location.display_address[0] + "<br>" + json.location.display_address[1];
  this.phone = '<b>Phone: </b><a href="tel:' + json.phone + '" class="phone">' + json.display_phone + '</a>';
  this.rating = json.rating;
  this.review_count = json.review_count;
  this.url = json.url;
  this.price = json.price;

}

function getCategories(json) {
  let list = "";
  for (var i = 0; i < json.categories.length; i++) {
    if (json.categories.length != i + 1) {
      list += json.categories[i].title + ", ";
    } else {
      list += json.categories[i].title;
    }
  }
  return list;
};

function onSubmit() {
  let data = {
    lat: $("#lat").val(),
    lon: $("#lon").val(),
    price: $("#price").val(),
    radius: $("#radius").val(),
    sort: $("#sort").val(),
    term: $("#term").val()
  };
  $.ajax({
    type: "POST",
    url: "getData.php",
    dataType: "json",
    data: data,
    success: function(result) {
      response = result;
      places = result.businesses;
      for (var i = 0; i < places.length; i++) {
        locations[i] = new Buisiness(places[i]);
      }
      console.log(locations);
      locations = filterDistance(locations);
      console.log(locations);
      locations = filterRating(locations);
      console.log(locations);
      locations = filterPrice(locations);
      if (locations.length != 0) {
        $("#tinder-inner").empty();
        for (var i = 0; i < locations.length; i++) {
          $("#tinder-inner").append(
            '<div class="item"><img src="' + locations[i].icon + '" class="img"><div class="carousel-caption">' + '<p><b>' + locations[i].title + '</b></p><p class="addr">' + locations[i].address + '</p><p>' + locations[i].phone + '</p><p><b>Category:</b> ' + locations[i].category + '</p><p><b>Distance:</b> ' + toMile(locations[i].distance) + ' Miles</p>' +'<p class="loc" type="hidden">'+locations[i].lat + ','+ locations[i].lon +'</p>'+'</div>'
          );
        }
        $("#tinder-inner .item").first().addClass("active");
        $("#tinder").show();
        initMap();
      } else {
        alert("No search results found.");
      }

      console.log(locations);
    }
  });
  //$("#search").hide();
}

function toMile(m) {
  let mile = m / 1609.34;
  return mile.toFixed(1);
}

function next() {

}



function found() {
//  $("#tinder").hide();
  window.open('https://maps.google.com/?saddr='+lat+','+lon+'&daddr=' + $(".active .loc").text());
}
