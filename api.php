<?php
require_once 'core/init.php';

if (isset($_GET['method'])) {
  header('Content-Type: text/plain; charset=utf-8');

  if ($_GET['method'] === 'object') {
    $uri = $KSamsok->uriFormat($_GET['uri'], 'rawurl');

    // if the URI is valid
    if ($uri !== false) {
      $result = $db::getObject($uri);

      if (!$result) {
        apiError('An object with this URI does not exists in the database.');
      } else {
        echo json_encode($result);
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
      echo json_encode($result);
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
}
