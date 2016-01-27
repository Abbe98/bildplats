<?php
require_once 'core/init.php';

if (isset($_GET['uri'])) {
  $uri = $KSamsok->uriFormat($_GET['uri'], 'rawurl');
  if ($uri !== false) {
    $result = db::getObject($uri);
    if (!$result) {
      header('Location: app.php?uri=' . $uri);
    } else {
      $record = $KSamsok->object($uri);
    }
  } else {
    #TODO
    // 404 page
    echo '404';
  }
} else {
  #TODO
  // 404 page
  echo '404';
}
?>
<!doctype html>
<html lang="sv">
	<head>
		<title><?php echo $KSamsok->uriFormat($result['ksamsok'], 'raw'); ?></title>
		<meta charset="UTF8" />

		<link rel="stylesheet" href="frontend/style.css" />
		<link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.css" />

		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script src="https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.js"></script>
	</head>
	<body>

		<script src="frontend/bildplats.js"></script>
		<script src="frontend/ui.js"></script>
		<script src="frontend/app.js"></script>
	</body>
</html>
