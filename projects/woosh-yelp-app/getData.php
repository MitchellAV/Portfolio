<?php

// Yelp Constants
$CLIENT_ID = "6Qa116LDdVq00JO5wZ3JUg";
$API_KEY = "uri5ycXySLMuBIt6SsLyarJ4PW3xHf3LuyI7FEn3NJtzIJFjYQU5ijqiwlXxmwSUTmR5_RUh3DopmOwZMqSHU4dxjgcjCS1aPgvL4QKdgb71BSBobsMLcAy4QfK5WnYx";
//assert($API_KEY, "Please supply your API key.");
$API_HOST = "https://api.yelp.com";
$SEARCH_PATH = "/v3/businesses/search";
$BUSINESS_PATH = "/v3/businesses/";  // Business ID will come after slash.
$SEARCH_LIMIT = 50; // max 50
// Radius in m
$WALK_RADIUS = 1200; // .75 miles
$BIKE_RADIUS = 5000; // 3 miles
$DRIVE_RADIUS = 12000; // 7.5 miles
// sorting
$SORT_BEST_MATCH = "best_match";
$SORT_RATING = "rating";
$SORT_REVIEW_COUNT = "review_count";
$SORT_DISTANCE = "distance";

//session_start();

// Get location
if (isset($_POST["lat"]) && isset($_POST["lon"])) {
  $lat = sanitizeString($_POST["lat"]);
  $lon = sanitizeString($_POST["lon"]);
  $price = sanitizeString($_POST["price"]);
  $radius = sanitizeString($_POST["radius"]);
  $sort = sanitizeString($_POST["sort"]);
  $term = sanitizeString($_POST["term"]);

  $options = getOptions($lat, $lon, $radius, $price, $sort, $term);
  $response = request($API_HOST, $SEARCH_PATH, $options);
  $response = json_decode($response);
  echo json_encode($response);
}

function getOptions($lat, $lon, $radius, $price, $sort, $term){
  $url_params = array();
  $url_params['term'] = $term;
  // $url_params['location'] = $location;
  $url_params['latitude'] = $lat;
  $url_params['longitude'] = $lon;
  $url_params['radius'] = getRadius($radius);
  $url_params['limit'] = $GLOBALS['SEARCH_LIMIT'];
  $url_params['sort_by'] = getSort($sort);
  $url_params['price'] = $price;
  $url_params['open_now'] = true;

  return $url_params;
}

function getRadius($radius){
  if ($radius == '1') {
    $radius = $GLOBALS['WALK_RADIUS'];
  }
  elseif ($radius == '2') {
    $radius = $GLOBALS['BIKE_RADIUS'];
  }
  elseif ($radius == '3') {
    $radius = $GLOBALS['DRIVE_RADIUS'];
  }
  return $radius;
}

function getSort($sort){
  if ($sort == '1') {
    $sort = $GLOBALS['SORT_BEST_MATCH'];
  }
  elseif ($sort == '2') {
    $sort = $GLOBALS['SORT_RATING'];
  }
  elseif ($sort == '3') {
    $sort = $GLOBALS['SORT_REVIEW_COUNT'];
  }
  elseif ($sort == '4') {
    $sort = $GLOBALS['SORT_DISTANCE'];
  }
  return $sort;
}

function request($host, $path, $options){
  $curl = curl_init();
  $url = $host.$path."?".http_build_query($options);
  curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,  // Capture response.
    CURLOPT_ENCODING => "",  // Accept gzip/deflate/whatever.
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      "authorization: Bearer " . $GLOBALS['API_KEY'],
      "cache-control: no-cache",
    ),
  ));
  $response = curl_exec($curl);
  curl_close($curl);
  return $response;
}

function sanitizeString($var) {
    if(get_magic_quotes_gpc()) $var = stripslashes($var);
    $var = strip_tags($var);
    $var = htmlentities($var);
    return $var;
  }
?>
