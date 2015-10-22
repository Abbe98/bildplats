<?php
require_once 'core/init.php';

if (isset($_GET['method'])) {
  header('Content-Type: application/json; charset=utf-8');

  if ($_GET['method'] === 'object') {
    $uri = $KSamsok->uriFormat($_GET['uri'], 'rawurl');

    // if the URI is valid
    if ($uri !== false) {
      $result = $db::getObject($uri);

      if (!$result) {
        apiError('An object with this URI does not exists in the database.');
      } else {
        echo json_encode($result, JSON_UNESCAPED_SLASHES);
        die();
      }
    } else {
      apiError('Invalid URI or no URI parameter set.');
    }
  } elseif ($_GET['method'] === 'box') {
    $box[] = $_GET['south'];
    $box[] = $_GET['east'];
    $box[] = $_GET['north'];
    $box[] = $_GET['west'];

    foreach ($box as $coord) {
      if (!is_numeric($coord)) {
        apiError('Invalid parameters or parameter values.');
        die();
      }
    }

    $result = $db::boxSearch($box);

    if (!$result) {
      apiError('No objects exist within this bounding box.');
    } else {
      echo json_encode($result, JSON_UNESCAPED_SLASHES);
      die();
    }
  } elseif ($_GET['method'] === 'user') {
    //
    $result = db::getObjectsByUsername($_GET['user']);
    if (!$result) {
      apiError('Missing user parameter or invalid user/user has no images.');
    } else {
      echo json_encode($result, JSON_UNESCAPED_SLASHES);
      die();
    }
  } else {
    apiError('Invalid API method.');
  }
} else {
  apiError('No method specified.');
}

function apiError($message) {
  echo '{ "error:": "' . $message . '"}';
  die();
}
