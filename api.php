<?php
require_once 'core/init.php';

if (isset($_GET['method'])) {
  header('Content-Type: text/plain; charset=utf-8');

  if ($_GET['method'] === 'object') {
    if (preg_match('/http:\/\/kulturarvsdata\.se\/.*/', $_GET['uri']) && !preg_match('/>|<|\'|"/', $_GET['uri'])) {
      $result = $db::getObject($_GET['uri']);
      if (!$result) {
        apiError('URI not found in database');
      } else {
        echo json_encode($result);
        die();
      }
    } else {
      apiError('Invalid URI or no URI parameter set');
    }
  } else {
    apiError('Invalid API method');
  }
} else if (isset($_POST['method'])) {
  if ($_POST['method'] === 'object') {
    if (preg_match('/http:\/\/kulturarvsdata\.se\/.*/', $_POST['uri']) && !preg_match('/>|<|\'|"/', $_POST['uri'])) {
      $result = $db::getObject($_POST['uri']);
      if (!$result) {
        apiError('URI not found in database');
      } else {
        echo json_encode($result);
        die();
      }
    } else {
      apiError('Invalid URI or no URI parameter set');
    }
  } else {
    apiError('Invalid API method');
  }
} else {
  apiError('No method specified');
}

function apiError($message) {
  echo '{ "error:": "' . $message . '"}';
}