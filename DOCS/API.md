#API

Bildplats provides a basic API supporting both `GET` and `POST` for getting data, the response is JSON only.

##End Point

All API calls should go to `api.php`.

##Methods 

The only current method is `object` this is used to return the location based on a URI provided by K-Samsök:

K-Samsök call(XML/RDF): `<pres:entityUri>`

kSamsök-PHP: `['presentation']['uri']`

This URI is set using the `uri` parameter.

##Example Call

Example `GET` request:

`http://example.com/api.php?method=object&uri=http://kulturarvsdata.se/raa/kmb/16000200096441`

This could trigger the following response:

```
{
  "ksamsok": "http://kulturarvsdata.se/raa/kmb/16000200096441",
  "coord": "59.31708, 18.099",
  "created": "2015-02-02 10:32:04"
}
```

or a error.

##Errors

A error is formated JSON describing  the error. Example:

`{ "error:": "URI not found in database"}`

Note that this is still a HTTP status 200 response.

###List of Errors

 - `URI not found in database`
 - `Invalid URI or no URI parameter set`
 - `Invalid API method`
 - `No method specified`
