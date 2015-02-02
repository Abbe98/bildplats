// Provide your access token and map id
L.mapbox.accessToken = 'pk.eyJ1IjoiYWJiZSIsImEiOiJmMUJVRkRrIn0.HFVLR_-KbhpiuV9DBkt7jw';
mapId = 'abbe.kj42nfkg';

var mapCreated = false;
var leafletMap;
function createMap() {
  // Create a map in the div #map
  leafletMap = L.mapbox.map('leaflet', mapId);
  mapCreated = true;
}

var windowHeight = $(window).height();
$('.container').css('height', windowHeight);

function centerContent() {
  setTimeout(function() {
    var contentHeight = $('#result_wrapper').height();
    var containerHeight = $('.container').height();

    var imageMaxHeight = containerHeight - 170;
    $('#image_holder').css('max-height', imageMaxHeight);

    if (contentHeight < containerHeight) {
      var padding = containerHeight - contentHeight;
      padding = padding / 2;

      $('#result_wrapper').css('padding-top', padding);
    } else {
      $('#result_wrapper').css('padding-top', '0px');
    }
  }, 300);
}

$(window).resize(function() {
  var windowHeight = $(window).height();
  $('.container').css('height', windowHeight);
});

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