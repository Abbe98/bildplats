bildPlats.app = {
  searchResult: undefined,
  imageNum: 0,
  numResults: undefined,
  currentUri: undefined,
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

    $.ajax({
      url: 'ajax.php',
      type: 'POST',
      data: {action: 'search', searchString: searchString},
      success: function(result) {
        if (result.result == 'error') {
          bildPlats.ui.message(result);
          bildPlats.ui.toggleLoader();
        } else {
          bildPlats.app.numResults = result.length;
          $('#num_results').text(bildPlats.app.numResults);
          bildPlats.app.searchResult = result;

          bildPlats.app.nextImage();
          bildPlats.ui.toggleLoader();

          if (callback !== undefined && typeof(callback) === 'function') {
            callback();
          };
        }
      }
    });
  },

  nextImage: function() {
    // #next_pic should be enabled by default disabling is done below
    $('#next_pic').attr('data-mode', 'enabled');
    $('#location_picker').text('Välj Plats');

    if (bildPlats.app.imageNum === bildPlats.app.numResults) {
      // kill #next_pic uses CSS to kill pointer events.
      $('#next_pic').attr('data-mode', 'disabled');
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
        $('#copyright').text(image.copyright);
      } else {
        $('#copyright').text('Okänd');
      }

      if (image.highres) {
        $('#image_holder').attr('src', image.highres);
      } else if (image.thumbnail) {
        $('#image_holder').attr('src', image.thumbnail);
      } else if (image.lowres) {
        $('#image_holder').attr('src', image.lowres);
      }

      $('#image').css('display', 'block');
      $('html,body').animate({
        scrollTop: $('#image').offset().top},
        'slow');

      bildPlats.app.imageNum = bildPlats.app.imageNum+1;

      // preload next image
      var preImage = bildPlats.app.searchResult[bildPlats.app.imageNum].presentation.images[0];
      if (preImage.highres) {
        bildPlats.app.preLoadImage(preImage.highres);
      } else if (preImage.thumbnail) {
        bildPlats.app.preLoadImage(preImage.thumbnail);
      } else if (preImage.lowres) {
        bildPlats.app.preLoadImage(preImage.lowres);
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

  checkLinkedUri: function() {
    if (bildPlats.app.searchResult[linkedResult].local.uri !== linkedUri) {
      message.message = 'Bilden ser redan ut att vara kartlagd.';
      message.error = 'correct';
      bildPlats.ui.message(message);
      bildPlats.app.imageNum = 0;
      bildPlats.app.nextImage();
    } else {
      bildPlats.app.imageNum = linkedResult;
      bildPlats.app.nextImage();
    }
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
