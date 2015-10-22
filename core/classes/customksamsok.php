<?php
class customKSamsok extends kSamsok {
  public function photoSearch($text, $n) {
    $startRecord = $n * 30;

    // build $urlQuery
    $urlQuery = $this->url . 'x-api=' . $this->key . '&method=search&startRecord=' . $startRecord . '&hitsPerPage=30&query=itemType="Foto"%20and%20text="' . $text . '"%20and%20mediaType="image/jpeg"%20and%20thumbnailExists=j&recordSchema=presentation';
    $urlQuery = $this->prepareUrl($urlQuery);

    $this->validResponse($urlQuery);
    // get the XML
    $xml = file_get_contents($urlQuery);
    // instead of using XPath to parse RDF just by pass it
    $xml = $this->killXmlNamespace($xml);
    $xml = new SimpleXMLElement($xml);

    // parse each record and push to $result array
    $result = array();
    foreach ($xml->records->record as $record) {
      $result[] = $this->parseRecord($record);
    }

    return $result;
  }

  public function singlePhotoSearch($uri) {
    $result = $this->object($uri);
    #TODO 
    // validate that this is a non georeferenced picture with thumbnalis, itemType=Foto and mediaType=image/jpeg
    return $result;
  }
}
