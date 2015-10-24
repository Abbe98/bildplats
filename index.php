<?php
require_once 'core/init.php';
?>
<!doctype html>
<html lang="sv">
	<head>
		<title>BildPlats</title>
		<meta charset="UTF8" />

		<link rel="stylesheet" href="frontend/style.css" />
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
				<a href="#feed">Flöde</a>
				<a href="#map">Karta</a>
			</nav>
		</div>

		<script src="frontend/bildplats.js"></script>
		<script src="frontend/ui.js"></script>
		<script>
		  bildPlats.init();
		</script>
	</body>
</html>
