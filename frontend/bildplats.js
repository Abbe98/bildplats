bildPlats = {
  init: function() {
    window.L.mapbox.accessToken = 'pk.eyJ1IjoiYWJiZSIsImEiOiJmMUJVRkRrIn0.HFVLR_-KbhpiuV9DBkt7jw';
    window.mapId = 'abbe.kj42nfkg';
  }
};

bildPlats.ui = {
  mapCreated: false,
  leafletMap: 'abbe.kj42nfkg',

  createMap: function() {
    this.leafletMap = L.mapbox.map('leaflet', mapId);
    this.mapCreated = true;
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
    this.resetMessage()
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
