<?php
require_once 'core/init.php';

// new API connection
$KSamsok = new customKSamsok($kSamsokApiKey);

// check for action ignore random calls
if (isset($_POST['action'])) {
  if ($_POST['action'] === 'searchHint') {
    if (isset($_POST['searchString'])) {
      header('Content-Type: text/plain; charset=utf-8');
      // API call based on current search string
      $hints = $KSamsok->searchHint($_POST['searchString'], '3');
      if ($hints !== false) {
        // loop $hints and output as HTML
        foreach ($hints as $hint) {
          // onclick event trigger search
          echo '<span onclick="searchImages(\'' . $hint['value'] . '\');">' . ucfirst($hint['value']) . '</span>';
        }
      } else {
        echo '';
      }
    }
  }

  if ($_POST['action'] === 'search') {
    if (isset($_POST['searchString'])) {
      $results = $KSamsok->photoSearch($_POST['searchString']);

      if (!empty($results)) {
        //check if results has coords
        $i = 0;
        foreach ($results as $result) {
          if (empty($result->coordinates)) {
            $searchResult[$i] = $result;
            $i++;
          }
        }
        // output result as JSON
        if (isset($searchResult)) {
          header('Content-type: application/json');
          echo json_encode($searchResult);
        } else {
          #TODO
          // no results error
        }
      } else {
        #TODO
        // no results error
      }
    }
  }
}
