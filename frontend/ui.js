bildPlats.ui = {
  mapCreated: false,
  leafletMap: 'abbe.kj42nfkg',
  menuState: false,

  createMap: function() {
    bildPlats.ui.leafletMap = L.mapbox.map('leaflet', mapId);
    bildPlats.ui.mapCreated = true;
  },

  setImage: function(url) {
    $('#image_holder').attr('src', url);
  },

  setCopyright: function(copyString) {
    $('#copyright').text(copyString);
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
  },

  toggleFeedMap: function(landingElement) {
    if (landingElement === 'feed') {
      $('#feed').css('display', 'block');
      $('#leaflet').css('display', 'none');
      $('#feed-btn').attr('data-mode', 'active');
      $('#leaflet-btn').attr('data-mode', 'inactive');
    } else {
      if (bildPlats.ui.mapCreated) {
        $('#leaflet').css('display', 'block');
      } else {
        $('#leaflet').css('display', 'block');
        bildPlats.ui.createMap();
      }
      $('#feed').css('display', 'none');
      $('#feed-btn').attr('data-mode', 'inactive');
      $('#leaflet-btn').attr('data-mode', 'active');
    }
  },

  toggleMenu: function() {
    if (!bildPlats.ui.menuState) {
     document.getElementById('menu').className = 'open';
      bildPlats.ui.menuState = true;
    } else {
      document.getElementById('menu').className = 'close';
      bildPlats.ui.menuState = false;
    }
  }
};
