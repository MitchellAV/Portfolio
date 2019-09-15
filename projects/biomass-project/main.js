$(document).ready(function() {
  let jsonData;

  $.getJSON("/BiomassProject/query.php", function(json) {
    console.log(json);
    jsonData = json;
    let data = [[]];
    for (var i = 0; i < json.length; i++) {
      data[0][i]=json[i].id;
      data[1][i]=json[i].data;
    }
    console.log(data);


    $("#amb").append("17 C");
    $("#tank").append("17 C");
    $("#ad").append("17 C");
    $("#irradiance").append("17 W/m^2");
    $("#scfm").append("17");
    $("#cfm").append("17");
    $("#massflow").append("17 g/s");
    $("#ph").append("17");
    $("#rpm").append("17");
  });

  $(".button").click(function() {
    $("#visual").children().addClass("hidden");
    var el = this.classList[0];
    console.log(el);
    $("#" + el).removeClass("hidden");
  });
});
