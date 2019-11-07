const query = `PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX gn: <http://www.geonames.org/ontology#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

# let op: geeft aantal van unieke combinaties van ?date en ?landLabel
SELECT ?landLabel ?date (COUNT(?cho) AS ?choCount) WHERE {
   ?cho dct:created ?date;
        dct:spatial ?plaats .
 # We willen geen datums die de string [NI] bevatten
   FILTER (!REGEX(?date, "[NI]")) . #zorgt ervoor dat de string "NI" niet wordt meegenomen
 # geef het label van het land waar de plaats ligt
   ?plaats skos:exactMatch/gn:parentCountry ?land .
   ?land gn:name ?landLabel .
} GROUP BY ?date ?landLabel
ORDER BY DESC(?choCount)`
// URL for the API
const url = 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-04/sparql'

// The base of this code is Laurens. I changed it to suit my use case
runQuery(url, query)
let self = this
let apiData = null

function runQuery(url, query) {
  // Test if the endpoint is up and print result to page
  fetch(url)
  // Call the url with the query attached, output data
  fetch(url + '?query=' + encodeURIComponent(query) + '&format=json')
    .then(res => res.json())
    .then(json => {
      let fetchedData = json.results.bindings
      console.log('fetched data: ', fetchedData)

      // Replace "http" in the img url to "https". Wiebe helped me with this code.
      // fetchedData.forEach(item => {
      //   item.imageLink.value = item.imageLink.value.replace('http', 'https')
      // })

      self.apiData = fetchedData
      return fetchedData
    })
    .then(fetchedData => {
      cleanData(fetchedData)
    })
}


function cleanData (fetchedData) {
  fetchedData.forEach((item, count) => {
    item.date.value = item.date.value.toUpperCase()
    console.log(item.date.value)
  })
  return fetchedData
}


// let fetchedData = runQuery(url, query)
// console.log(fetchedData)
