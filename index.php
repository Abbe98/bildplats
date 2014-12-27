<?php
?>
<!doctype html>
<html lang="sv">
	<head>
		<title>Bild Utan Plats</title>
		<meta charset="UTF8" />

		<link rel="stylesheet" href="frontend/style.css" />
		<link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.css" />

		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script src="https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.js"></script>
	</head>
	<body>
		<div class="container">
			<header>
				<img src="frontend/img/header.jpg" />
			</header>
			<form>
				<label hidden for="search">Sök efter bilder här:</label>
				<button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59 1.41-1.41 6 6-6 6z"/><path d="M0-.25h24v24h-24z" fill="none"/></svg></button>
				<input type="text" id="search" placeholder="Sök Här!" autocomplete="off" />
				<div id="autocomplete">
					<span>test</span>
					<span>test</span>
					<span>test</span>
				</div>
			</form>
		</div>

		<section id="image" class="container">
			<p><span id="num_results">5</span> foton hittades...</p>
			<img src="http://kmb.raa.se/cocoon/bild/raa-image/16001000066146/normal/1.jpg" />
			<p id="img_text">Utsikt över Nyköping</p>
			<p id="location_text">Län: Södermanland, Kommun: Nyköping, Landskap: Södermanland, Socken: Nyköping</p>
			<p id="copyright">Utgången upphovsrätt</p>
			<div class="b_btn green">
				<div id="locate">Karta</div>
				<div id="next_pic">Ny Bild</div>
			</div>
		</section>

		<section id="map" class="container">
			<div id="leaflet"></div>
			<div class="b_btn blue">Välj Plats</div>
		</section>

		<footer>
			<p>Källkod _ API _ KSamsök</p>
		</footer>

		<script type="text/javascript">
		// Provide your access token
		L.mapbox.accessToken = 'pk.eyJ1IjoiYWJiZSIsImEiOiJmMUJVRkRrIn0.HFVLR_-KbhpiuV9DBkt7jw';
		// Create a map in the div #map
		L.mapbox.map('leaflet', 'abbe.kj42nfkg');

		var windowHeight = $(window).height();
		$('.container').css('height', windowHeight);

		$( window ).resize(function() {
		  var windowHeight = $(window).height();
		  $('.container').css('height', windowHeight);
		});

		// just demo auto complete
		$(document).ready(function() {
		  $('#search').focus(function() {
		    $('#autocomplete').slideDown('slow');
		  });

		  $('#search').focusout(function() {
		    $('#autocomplete').slideUp('slow');
		  });
		});
		</script>
	</body>
</html>