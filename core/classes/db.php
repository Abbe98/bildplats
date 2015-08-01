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
        if (self::objectExists($uri) === false) {
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

  public static function objectExists($uri) {
    // $uri is validated in $this->save()
    $database = SimplePDO::getInstance();
    $database->query("SELECT `ksamsok` FROM `photos` WHERE `ksamsok` = :uri");
    $database->bind(':uri', $uri);
    // will return false if it does not exist()
    return $database->single();
  }

  public static function getObject($uri) {
    $database = SimplePDO::getInstance();
    $database->query("SELECT * FROM `photos` WHERE `ksamsok` = :uri");
    $database->bind(':uri', $uri);

    return $database->single();
  }
}
