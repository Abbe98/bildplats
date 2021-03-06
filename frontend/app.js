bildPlats.app = {
  searchResult: undefined,
  imageNum: 0,
  currentUri: undefined,
  activeSearchString: undefined,
  // counts searches with this active search string
  searchN: 0,
  // counts searchHintCall() ajax calls
  currentSearchCall: 0,

  searchHintCall: function() {
    // sets this call to the global hint calls count value and increase the global value by one
    var searchHintCallId = bildPlats.app.currentSearchCall;
    bildPlats.app.currentSearchCall = bildPlats.app.currentSearchCall + 1;

    var val = $('#search').val();
    $.ajax({
      url: 'ajax.php',
      type: 'POST',
      data: {action: 'searchHint', searchString: val},
      success: function(result) {
        // if this hint call was the last ajax call to be made display it
        if (searchHintCallId === bildPlats.app.currentSearchCall - 1) {
          $('#autocomplete').html(result);
          $('#autocomplete').slideDown('slow');
        };
      }
    });
  },

  searchImages: function(searchString, callback) {
    var val = $('#search').val(searchString);
    bildPlats.ui.toggleLoader();

    if (searchString === bildPlats.app.activeSearchString) {
      bildPlats.app.searchN +=1;
    } else {
      bildPlats.app.searchN = 0;
    }

    $.ajax({
      url: 'ajax.php',
      type: 'POST',
      data: {action: 'search', searchString: searchString, searchN: bildPlats.app.searchN},
      success: function(result) {
        if (result.result == 'error') {
          bildPlats.ui.message(result);
          bildPlats.ui.toggleLoader();
        } else {
          if (bildPlats.app.searchResult !== undefined && searchString === bildPlats.app.activeSearchString) {
            bildPlats.app.searchResult = bildPlats.app.searchResult.concat(result);
          } else {
            bildPlats.app.searchResult = result;
          }

          bildPlats.app.activeSearchString = searchString;

          bildPlats.app.nextImage();
          bildPlats.ui.toggleLoader();

          if (callback !== undefined && typeof(callback) === 'function') {
            callback();
          };
        }
      }
    });
  },

  nextImage: function(type) {
    $('#location_picker').text('Välj Plats');
    if (type != 'single') {
      $('#next_pic').attr('data-mode', 'enabled');
    }

    if (bildPlats.app.imageNum === bildPlats.app.searchResult.length) {
      // load more images and move to the next one using callback
      bildPlats.app.searchImages(bildPlats.app.activeSearchString, bildPlats.app.nextImage);
    } else {
      // set uri
      bildPlats.app.currentUri = bildPlats.app.searchResult[bildPlats.app.imageNum].presentation.uri;

      if (bildPlats.app.searchResult[bildPlats.app.imageNum].presentation.description) {
        $('#img_text').text(bildPlats.app.searchResult[bildPlats.app.imageNum].presentation.description);
      } else {
        $('#img_text').text('Ingen beskrivning är tillgänglig.');
      }

      if (typeof bildPlats.app.searchResult[bildPlats.app.imageNum].presentation.contexts !== 'undefined') {
        if (bildPlats.app.searchResult[bildPlats.app.imageNum].presentation.contexts[0].place_label) {
          $('#location_text').text(bildPlats.app.searchResult[bildPlats.app.imageNum].presentation.contexts[0].place_label);
        } else {
          $('#location_text').text('Ingen plats beskriven.');
        }
      } else {
        $('#location_text').text('Ingen plats beskriven.');
      }

      var image = bildPlats.app.searchResult[bildPlats.app.imageNum].presentation.images[0];

      if (image.by_line) {
        $('#by').text(image.by_line);
      } else {
        $('#by').text('Okänd');
      }

      if (image.copyright) {
        bildPlats.ui.setCopyright(image.copyright);
      } else {
        bildPlats.ui.setCopyright('Okänd');
      }

      if (image.highres) {
        bildPlats.ui.setImage(image.highres);
      } else if (image.lowres) {
        bildPlats.ui.setImage(image.lowres);
      } else if (image.thumbnail) {
        bildPlats.ui.setImage(image.thumbnail);
      }

      $('#image').css('display', 'block');
      $('html,body').animate({
        scrollTop: $('#image').offset().top},
        'slow');

      bildPlats.app.imageNum = bildPlats.app.imageNum+1;

      // preload next image
      if (bildPlats.app.searchResult[bildPlats.app.imageNum] < bildPlats.app.searchResult.length - 1) {
        var preImage = bildPlats.app.searchResult[bildPlats.app.imageNum].presentation.images[0];
        if (preImage.highres) {
          bildPlats.app.preLoadImage(preImage.highres);
        } else if (preImage.thumbnail) {
          bildPlats.app.preLoadImage(preImage.thumbnail);
        } else if (preImage.lowres) {
          bildPlats.app.preLoadImage(preImage.lowres);
        }
      }
    }
  },

  prepareMap: function() {
    $('#map').css('display', 'block');
    if (!bildPlats.ui.mapCreated) {
      bildPlats.ui.createMap();
    }

    $('html,body').animate({
      scrollTop: $('#map').offset().top},
      'slow');
  },

  preLoadImage: function(url) {
    var image = new Image();
    image.src = url;
  },

  objectSearch: function(uri) {
    bildPlats.ui.toggleLoader();

    $.ajax({
      url: 'ajax.php',
      type: 'POST',
      data: {action: 'object', uri: uri},
      success: function(result) {
        if (result.result == 'error') {
          bildPlats.ui.message(result);
          bildPlats.ui.toggleLoader();
        } else {
          bildPlats.app.searchResult = result;
          $('#next_pic').attr('data-mode', 'disabled');
          bildPlats.ui.toggleLoader();
          bildPlats.app.nextImage('single');
        }
      }
    });
  },

  getLocation: function() {
    $('#leaflet').css('cursor', 'crosshair');

    $('#location_picker').text('Klicka på Kartan');

    bildPlats.ui.leafletMap.on('click', function(e) {
      bildPlats.ui.leafletMap.off('click');
      var l = e.latlng.toString();
      l = l.substr(0, l.length-1);
      l = l.substr(7);

      locationPickerState = false;

      $('#location').val(l);
      $('#location_picker').text('Sparar..');
      $('#leaflet').css('cursor', 'move');

      var location = $('#location').val(l);

      $.ajax({
        url: 'ajax.php',
        type: 'POST',
        data: {action: 'save', uri: bildPlats.app.currentUri, location: location.val()},
        success: function(result) {
          if (result.result == 'error') {
            bildPlats.ui.message(result);
            $('#location_picker').text(':-(');
          } else {
            bildPlats.ui.message(result);
            $('#location_picker').text('Sparat!');

            bildPlats.app.nextImage();
            $('html,body').animate({
              scrollTop: $('#image').offset().top},
              'slow');
          }
        }
      });
    });
  }
}
