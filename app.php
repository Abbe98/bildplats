<?php
require_once 'core/init.php';
if (user::authorized()) {
?>
<!doctype html>
<html lang="sv">
	<head>
		<title>Hitta Bilder</title>
		<meta charset="UTF8" />

		<link rel="stylesheet" href="frontend/style.css" />
		<link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.css" />

		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script src="https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.js"></script>
	</head>
	<body>
		<div class="container">
			<p id="message" data-message="correct"></p>
			<header>
				<img src="frontend/img/header.jpg" />
			</header>
			<form id="form" class="search-form">
				<label hidden for="search">Sök efter bilder här:</label>
				<button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59 1.41-1.41 6 6-6 6z"/><path d="M0-.25h24v24h-24z" fill="none"/></svg></button>
				<input type="text" id="search" placeholder="Sök Här!" autocomplete="off" />
				<div aria-hidden="true" id="autocomplete">
				</div>
			</form>
		</div>

		<section id="image" class="container">
			<div class="wrapper-one">
				<span class="result-count" id="num_results"></span>
				<img id="image_holder" src="" />
			</div>
			<div class="wrapper-two">
				<p id="img_text"></p>
				<p id="location_text"></p>
				<p>Fotograf: <span id="by"></span></p>
				<p>Copyright: <span id="copyright"></span></p>
				<div class="btn-container two">
					<div class="btn green" onclick="prepareMap()">Välj Plats</div>
					<div class="btn green" id="next_pic" onclick="nextImage()" data-mode="enabled">Nästa</div>
				</div>
			</div>
		</section>

		<section id="map" class="container">
			<input hidden type="text" id="location" value="" />
			<input hidden type="text" id="current_uri" value="" />
			<div id="leaflet"></div>
			<div class="btn-container single">
				<div class="btn blue" id="location_picker" onclick="getLocation()">Välj Plats</div>
			</div>
		</section>

		<div aria-hidden="true" class="loader">
			<div class="loader-circle"></div>
		</div>

		<script src="frontend/bildplats.js"></script>
		<script src="frontend/app.js"></script>
		<script>
		  bildPlats.init();
		</script>
<?php
if (isset($_GET['search'])) {
  if (isset($_GET['result'])) {
    if (isset($_GET['uri'])) {
       echo '<script>searchImages(\'' . $_GET['search'] . '\', checkLinkedUri); var linkedResult = \'' . $_GET['result'] . '\'; var linkedUri = \'' . $_GET['uri'] . '\';</script>';
    } else {
      echo '<script>searchImages(\'' . $_GET['search'] . '\'); imageNum = ' . $_GET['result'] . ';</script>';
    }
  } else {
    echo '<script>searchImages(\'' . $_GET['search'] . '\');</script>';
  }
}
?>
	</body>
</html>
<?php

} else {
  #TODO
  // send to login page
}
