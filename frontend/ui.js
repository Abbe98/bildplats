var mapCreated = false;
// Provide your access token
L.mapbox.accessToken = 'pk.eyJ1IjoiYWJiZSIsImEiOiJmMUJVRkRrIn0.HFVLR_-KbhpiuV9DBkt7jw';

function createMap() {
  // Create a map in the div #map
  L.mapbox.map('leaflet', 'abbe.kj42nfkg');
  mapCreated = true;
}

var windowHeight = $(window).height();
$('.container').css('height', windowHeight);

$( window ).resize(function() {
  var windowHeight = $(window).height();
  $('.container').css('height', windowHeight);
});