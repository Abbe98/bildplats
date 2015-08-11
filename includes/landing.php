<?php
require_once 'core/init.php';
if (user::authorized()) {
?>
<!doctype html>
<html lang="sv">
	<head>
		<title>BildPlats</title>
		<meta charset="UTF8" />
	</head>
	<body>
		<header>
			<h1>BildPlats</h1>
			<p>Utforska, Upptäck, Bidra</p>
		</header>
		<main>
			<div class="youtube-container">
				
			</div>
			<div>
				<a href="#">Logga In</a>
				<a href="#">Utforska Bilder</a>
			</div>
		</main>
		<footer>
			<ul>
				<li><a href="#">Utforska Bilder</a></li>
				<li><a href="#">Användaravtal</a></li>
				<li><a href="#">Utvecklare</a></li>
			</ul>
			<ul>
				<li><a href="#">Källkod</a></li>
				<li><a href="#">Albin Larsson</a></li>
				<li><a href="#">K-Samsök</a></li>
			</ul>
		</footer>
	</body>
</html>
