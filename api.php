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
  } else {
    apiError('Invalid API method.');
  }
} else {
  apiError('No method specified.');
}

function apiError($message) {
  echo '{ "error:": "' . $message . '"}';
}
