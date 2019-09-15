<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Yelp App</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBaMkpJOAqddBYRCf34SakSeSfT6x8uPJQ' defer></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="script.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
  <link href="style.css" rel="stylesheet">
</head>
<body id="container">
  <div id="search">
    Term:
    <select id="term" name="term">
      <option id="food" value="food">Food</option>
      <option id="drinks" value="drinks">Drinks</option>
      <option id="attractions" value="attractions">Attractions</option>
    </select><br>
    Price:
    <select id="price" name="price">
      <option id="price0" value="1, 2, 3, 4">Don't care</option>
      <option id="price1" value="1">$</option>
      <option id="price2" value="2">$$</option>
      <option id="price3" value="3">$$$</option>
      <option id="price4" value="4">$$$$</option>
    </select><br>
    Distance:
    <select id="radius" name="radius">
      <option id="walk" value="1">Walk</option>
      <option id="bike" value="2">Bike</option>
      <option id="car" value="3">Drive</option>
    </select><br>
    Sort By:
    <select id="sort" name="sort">
      <option id="best_match" value="1">Best Match</option>
      <option id="rating" value="2">Rating</option>
      <option id="review_count" value="3">Review Count</option>
      <option id="distance" value="4">Distance</option>
    </select><br>
    <input id="lat" type="hidden" name="lat">
    <input id="lon" type="hidden" name="lon">
    <input type="submit" onclick="onSubmit()" value="Submit">
  </div>

  <div id="tinder" class="carousel slide" data-ride="carousel" data-interval="false">
    <!-- Indicators -->
    <!-- <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
    </ol> -->
    <!-- Wrapper for slides -->
    <div id="tinder-inner" class="carousel-inner">
    </div>
    <!-- Left and right controls -->
    <!-- data-slide="prev" -->
    <a class="left carousel-control" href="#tinder"  onclick="found()">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#tinder" data-slide="next" onclick="next()">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  <div id="map"></div>
</body>

</html>
