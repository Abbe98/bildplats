<?php
class customKSamsok extends kSamsok {
  public function photoSearch($text) {
    // build $urlQuery
    $text = str_replace(' ', '%20', $text);
    $urlQuery = $this->url . 'x-api=' . $this->key . '&method=search&hitsPerPage=250&query=itemType="Foto"%20and%20text="' . $text . '"%20and%20mediaType="image/jpeg"%20and%20thumbnailExists=j&recordSchema=presentation';
    $urlQuery = utf8_decode($urlQuery);

    $this->validXml($urlQuery);
    // get the XML
    $xml = file_get_contents($urlQuery);
    // instead of using XPath to parse RDF just by pass it
    $xml = $this->killXmlNamespace($xml);
    $xml = new SimpleXMLElement($xml);

    // parse each record and push to $result array
    foreach ($xml->records->record as $record) {
      $result[] = $this->parseRecord($record);
    }

    return $result;
  }
}