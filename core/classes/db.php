<?php
class db {
  public static function save($uri, $location) {
    $contibruterIp = $_SERVER['REMOTE_ADDR'];
    // location should be valid if expression does not match
    if (!preg_match('[^0-9 \. , -]', $location)) {
      // location should be valid
      // if http://kulturarvsdata.se/ does not exist in string it's fake data also look for evil chars
      if (preg_match('/http:\/\/kulturarvsdata\.se\/.*/', $uri) && !preg_match('/>|<|\'|"/', $uri)) {
        // the uri should be valid
        // both uri and location should be valid

        // if uri does not exist in db add it and return true
        if (self::objectExists($uri) === false) {
          $database = SimplePDO::getInstance();
          $database->query("INSERT INTO `photos` (ksamsok, coord, ip) VALUES (:uri, :location, :ip)");
          $database->bind(':uri', $uri);
          $database->bind(':location', $location);
          $database->bind(':ip', $contibruterIp);
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
    $database->query("SELECT `ksamsok`, `coord`, `created` FROM `photos` WHERE `ksamsok` = :uri");
    $database->bind(':uri', $uri);

    return $database->single();
  }
}
