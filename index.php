<?php
require_once 'core/init.php';
?>
<!doctype html>
<html lang="sv">
	<head>
		<title>BildPlats</title>
		<meta charset="UTF8" />

		<link rel="stylesheet" href="frontend/style.css" />
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
		<link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.css" />

		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script src="https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.js"></script>
	</head>
	<body class="dark-background">
		<div class="slim-container">
			<div class="login-box">
				<h1>BildPlats</h1>
				<p>Logga in med...</p>
				<button><img src="frontend/img/commons-logo.svg" /><span>Wikimedia Commons</span></button>
			</div>
			<nav class="tabs">
				<div id="feed-btn" onclick="bildPlats.ui.toggleFeedMap('feed')" data-mode="active">Flöde</div>
				<div id="leaflet-btn" onclick="bildPlats.ui.toggleFeedMap('leaflet')" data-mode="inactive">Karta</div>
			</nav>
			<main>
				<section class="main-section" id="feed">#stuff</section>
				<section class="main-section" id="leaflet"></section>
			</main>
		</div>

		<nav class="menu">
			<ul id="menu">
				<li data-hint="Hem" aria-label="Hem"><i class="material-icons" style="line-height: 40px !important;">home</i></li>
				<li data-hint="Profil" aria-label="Profil"><i class="material-icons" style="line-height: 40px !important;">person</i></li>
				<li data-hint="Bidra" aria-label="Bidra"><i class="material-icons" style="line-height: 40px !important;">photo</i></li>
			</ul>
			<span onclick="bildPlats.ui.toggleMenu()"><i class="material-icons" style="line-height: 50px !important;">menu</i></span>
		</nav>

		<script src="frontend/bildplats.js"></script>
		<script src="frontend/ui.js"></script>
		<script>
		  bildPlats.init();
		</script>
	</body>
</html>
