$('#search').keyup(function() {
  searchHintCall();
});

$('#search').focus(function() {
  var val = $('#search').val();
  if (val !== '') {
    searchHintCall();
  };
});

$('#search').focusout(function() {
  $('#autocomplete').slideUp('slow');
});

$('#form').submit(function(e) {
  e.preventDefault();
  var searchString = $('#search').val();
  searchImages(searchString);
});

// global

var searchResult;
var imageNum;
var numResults;
var currentUri;

// counts searchHintCall() ajax calls
var currentSearchCall = 0;

function searchHintCall() {
  // sets this call to the global hint calls count value and increase the global value by one
  var searchHintCallId = currentSearchCall;
  currentSearchCall = currentSearchCall + 1;

  var val = $('#search').val();
  $.ajax({
    url: 'ajax.php',
    type: 'POST',
    data: {action: 'searchHint', searchString: val},
    success: function(result) {
      // if this hint call was the last ajax call to be made display it
      if (searchHintCallId === currentSearchCall - 1) {
        $('#autocomplete').html(result);
        $('#autocomplete').slideDown('slow');
      };
    }
  });
}

function searchImages(searchString) {
  $.ajax({
    url: 'ajax.php',
    type: 'POST',
    data: {action: 'search', searchString: searchString},
    success: function(result) {
      if (result.result == 'error') {
        message(result);
      } else {
        numResults = result.length;
        $('#num_results').text(numResults);
        imageNum = 0;
        searchResult = result;

        nextImage();
      }
    }
  });
}


function nextImage() {
  // #next_pic should be enabled by default disabling is done below
  $('#next_pic').attr('data-mode', 'enabled');
  $('#location_picker').text('Välj Plats');

  if (imageNum === numResults) {
    // kill #next_pic uses CSS to kill pointer events.
    $('#next_pic').attr('data-mode', 'disabled');
  } else {
    // set uri
    currentUri = searchResult[imageNum].presentation.uri;

    if (searchResult[imageNum].presentation.description) {
      $('#img_text').text(searchResult[imageNum].presentation.description);
    } else {
      $('#img_text').text('Ingen beskrivning är tillgänglig.');
    }

    if (searchResult[imageNum].presentation.contexts[0].place_label) {
      $('#location_text').text(searchResult[imageNum].presentation.contexts[0].place_label);
    } else {
      $('#location_text').text('Ingen plats beskriven.');
    }

    var image = searchResult[imageNum].presentation.images[0];

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

    imageNum = imageNum+1;
    centerContent();
  }
}

function prepareMap() {
  $('#map').css('display', 'block');
  if (!mapCreated) {
    createMap();
  }

  $('html,body').animate({
    scrollTop: $('#map').offset().top},
    'slow');
}

function getLocation() {
  $('#leaflet').css('cursor', 'crosshair');

  $('#location_picker').text('Klicka på Kartan');

  leafletMap.on('click', function(e) {
    leafletMap.off('click');
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
      data: {action: 'save', uri: currentUri, location: location.val()},
      success: function(result) {
        if (result.result == 'error') {
          message(result);
          $('#location_picker').text(':-(');
        } else {
          message(result);
          $('#location_picker').text('Sparat!');

          nextImage();
          $('html,body').animate({
            scrollTop: $('#image').offset().top},
            'slow');
        }
      }
    });
  });
}