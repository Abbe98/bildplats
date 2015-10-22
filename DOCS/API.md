#API

Bildplats provides a basic API supporting `GET` requests for retrieving data, the response is currently JSON only.

##Endpoint

All API calls should go to `api.php`.

##Methods

###Object

This method is used to return the location based on a URI provided by K-Samsök:

The object URI is set using the `uri` parameter. The API supports all types of K-Samsök URIs:

 - raw
 - rawurl
 - xml
 - xmlurl
 - rdf
 - rdfurl
 - html
 - htmlurl

####Example Calls

Example request:

`http://example.com/api.php?method=object&uri=http://kulturarvsdata.se/raa/kmb/16000200096441`

This could trigger the following response:

```
{
  "id":"2",
  "ksamsok": "http://kulturarvsdata.se/raa/kmb/16000200096441",
  "coord": "59.31708, 18.099",
  "created": "2015-02-02 10:32:04",
    "user":"Abbe98"
}
```

This request would work just as well:

`http://example.com/api.php?method=object&uri=raa/kmb/16000200096441`

###Box

The `box` method is used to retrieve all objects within a bounding box. All parameters is required.

####Example Calls

Example request:

`http://example.com/api.php?method=box&south=38.00000&east=40.00000&north=58.80000&west=0.00000`

This could trigger the following response:

```
[
  {
    "id":"31",
    "ksamsok":"http://kulturarvsdata.se/raa/kmb/16001000066124",
    "coord":"58.76046, 17.005",
    "created":"2015-02-06 19:18:35",
    "user":"Abbe98"
  }
]
```

###User

The `user` method returns all objects by an specific user. All parameters is required.

####Example Calls

Example request:

`http://example.com/api.php?method=user&user=Abbe98`

This could trigger the following response:

```
[
  {
    "id":"31",
    "ksamsok":"http://kulturarvsdata.se/raa/kmb/16001000066124",
    "coord":"58.76046, 17.005",
    "created":"2015-02-06 19:18:35",
    "user":"Abbe98"
  }
]
```

##Errors

A error is formated JSON describing  the error. Example:

`{ "error:": "URI not found in database"}`

Note that this is still a HTTP status 200 response.

###List of Errors

 - `An object with this URI does not exists in the database.`
 - `Invalid URI or no URI parameter set.`
 - `Invalid parameters or parameter values.`
 - `No objects exist within this bounding box.`
 - `Invalid API method.`
 - `No method specified.`
 - `Missing user parameter or invalid user/user has no images.`
