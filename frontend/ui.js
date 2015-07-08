// Provide your access token and map id
L.mapbox.accessToken = 'pk.eyJ1IjoiYWJiZSIsImEiOiJmMUJVRkRrIn0.HFVLR_-KbhpiuV9DBkt7jw';
mapId = 'abbe.kj42nfkg';

// global
var mapCreated = false;
var leafletMap;

function createMap() {
  // Create a map in the div #map
  leafletMap = L.mapbox.map('leaflet', mapId);
  mapCreated = true;
}

function message(message) {
  if (message.result == 'error') {
    // it's a error
    $('#message').attr('data-message', 'error');
  } else {
    // it's great
    $('#message').attr('data-message', 'correct');
  }

  $('#message').text(message.message);
  $('#message').css('top', '10px');
  resetMessage()
}

function resetMessage() {
  setTimeout(function() {
    $('#message').css('top', '-300px');
    $('#message').text('');
  }, 5000)
}

function toggleLoader() {
  $('.loader').slideToggle();
}
