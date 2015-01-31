// Provide your access token and map id
L.mapbox.accessToken = 'pk.eyJ1IjoiYWJiZSIsImEiOiJmMUJVRkRrIn0.HFVLR_-KbhpiuV9DBkt7jw';
mapId = 'abbe.kj42nfkg';

var mapCreated = false;
function createMap() {
  // Create a map in the div #map
  L.mapbox.map('leaflet', mapId);
  mapCreated = true;
}

var windowHeight = $(window).height();
$('.container').css('height', windowHeight);

function centerContent() {
  setTimeout(function() {
    var contentHeight = $('#result_wrapper').height();
    var containerHeight = $('.container').height();

    var imageMaxHeight = containerHeight - 160;
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