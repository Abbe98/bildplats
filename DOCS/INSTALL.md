#INSTALL

##PHP

PHP 5.6+ is required.

##Composer

Run the following in the project location:

`composer install`

This will install the following libraries:

 - [Simple-PDO](https://github.com/Abbe98/Simple-PDO)
 - [KSamsök-PHP](https://github.com/Abbe98/ksamsok-php)

##Database Setup

###Database Configuration

You set your database configuration variables in `core/config.php`.

`define('HOST', '');
define('DBNAME', '');
define('USERNAME', '');
define('PASSWORD', '');`

###Supported Databases:

 - MySQL
 - MariaDB

###Database SQL

```
CREATE TABLE IF NOT EXISTS photos (
id int(11) NOT NULL,
  ksamsok varchar(150) COLLATE utf8mb4_bin NOT NULL,
  coord varchar(16) COLLATE utf8mb4_bin NOT NULL,
  created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=31 ;


ALTER TABLE photos
 ADD PRIMARY KEY (id);


ALTER TABLE photos
MODIFY id int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
```

##K-Samsök API

It's required that you have a API key for the K-Samsök API see the (official K-Samsök website)[http://www.ksamsok.se/in-english/]. 

For development you can use the API key `test`.

The API key variable is found in `core/config.php`.

`$kSamsokApiKey = '';`

##Mapbox

For the map you will need a free or premium (Mapbox account)[https://www.mapbox.com/].

You will need to create a new Mapbox [project](https://www.mapbox.com/projects/), style the map with the online editor, Mapbox Studio or TileMill 2. You will find a map id under your project title and you can create a new API key [here](https://www.mapbox.com/account/apps/).

You will need to set both your map id and Mapbox API key in `frontend/ui.js`:

`L.mapbox.accessToken = '';
mapId = '';`

[Example Map](https://api.tiles.mapbox.com/v4/abbe.kj42nfkg/page.html?access_token=pk.eyJ1IjoiYWJiZSIsImEiOiJmMUJVRkRrIn0.HFVLR_-KbhpiuV9DBkt7jw#13/59.3289/18.0660)
