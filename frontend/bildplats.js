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

bildPlats = {
  init: function() {
    L.mapbox.accessToken = 'pk.eyJ1IjoiYWJiZSIsImEiOiJmMUJVRkRrIn0.HFVLR_-KbhpiuV9DBkt7jw';
    mapId = 'abbe.kj42nfkg';
  }
};

bildPlats.ui = {
  mapCreated: false,
  leafletMap: 'abbe.kj42nfkg',

  createMap: function() {
    bildPlats.ui.leafletMap = L.mapbox.map('leaflet', mapId);
    bildPlats.ui.mapCreated = true;
  },

  message: function(message) {
    if (message.result == 'error') {
      // it's a error
      $('#message').attr('data-message', 'error');
    } else {
      // it's great
      $('#message').attr('data-message', 'correct');
    }

    $('#message').text(message.message);
    $('#message').css('top', '10px');
    bildPlats.ui.resetMessage()
  },

  resetMessage: function() {
    setTimeout(function() {
      $('#message').css('top', '-300px');
      $('#message').text('');
    }, 5000)
  },

  toggleLoader: function() {
    $('.loader').slideToggle();
  }
};
