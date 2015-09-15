bildPlats = {
  init: function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJiZSIsImEiOiJmMUJVRkRrIn0.HFVLR_-KbhpiuV9DBkt7jw';
    mapId = 'abbe.kj42nfkg';
  }
};

$('#search').keyup(function() {
  bildPlats.app.searchHintCall();
});

$('#search').focus(function() {
  bildPlats.app.searchHintCall();
});

$('#search').focusout(function() {
  $('#autocomplete').slideUp('slow');
});

$('#form').submit(function(e) {
  e.preventDefault();
  var searchString = $('#search').val();
  bildPlats.app.searchImages(searchString);
});
