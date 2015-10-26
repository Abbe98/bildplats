<?php
class db {
  public static function save($uri, $location, $KSamsok) {
    // location should be valid if expression does not match
    if (!preg_match('[^0-9 \. , -]', $location)) {

      // get the raw object URL
      $uri = $KSamsok->uriFormat($uri, 'rawurl');

      // if valid URI process
      if (!$uri === false) {
        // if uri does not exist in db add it and return true
        if (self::getObject($uri) === false) {
          $database = SimplePDO::getInstance();
          $database->query("INSERT INTO `photos` (ksamsok, coord) VALUES (:uri, :location)");
          $database->bind(':uri', $uri);
          $database->bind(':location', $location);
          $database->execute();

          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public static function getObject($uri) {
    $database = SimplePDO::getInstance();
    $database->query("SELECT * FROM `photos` WHERE `ksamsok` = :uri");
    $database->bind(':uri', $uri);

    return $database->single();
  }

  public static function boxSearch($box) {
    $database = SimplePDO::getInstance();
    $database->query("SELECT * FROM `photos`");
    $result = $database->resultSet();


    foreach ($result as $image) {
      $lonlat = explode(', ', $image['coord']);

      if ($lonlat[0] >= $box[0] && $lonlat[0] <= $box[2] && $lonlat[1] >= $box[3] && $lonlat[1] <= $box[2]) {
        $endResult[] = $image;
      }
    }

    if (isset($endResult)) {
      return $endResult;
    } else {
      return false;
    }
  }

  public static function getObjectsByUsername($username) {
    $database = SimplePDO::getInstance();
    $database->query("SELECT * FROM `photos` WHERE `user` = :user");
    $database->bind(':user', $username);

    return $database->resultSet();
  }

  public static function getObjectsByDate($startDate, $endDate) {
    $database = SimplePDO::getInstance();
    $database->query("SELECT * FROM `photos` WHERE `created` >= :startDate AND `created` < :endDate ORDER BY `created` DESC");
    $database->bind(':startDate', $startDate);
    $database->bind(':endDate', $endDate);

    return $database->resultSet();
  }
}
