const query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX hdlh: <https://hdl.handle.net/20.500.11840/termmaster>
PREFIX wgs84: <http://www.w3.org/2003/01/geo/wgs84_pos#>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX gn: <http://www.geonames.org/ontology#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT * WHERE {
     # alle plaatsen in Afrika
     <https://hdl.handle.net/20.500.11840/termmaster3> skos:narrower* ?place .
     ?place skos:prefLabel ?placeName .

     # alle subcategorieen van sieraden
     <https://hdl.handle.net/20.500.11840/termmaster13201> skos:narrower* ?type .
     ?type skos:prefLabel ?typeName .

     # geef alle sieraden in Oceanie, met plaatje en lat/long van de plaats
     ?cho dct:spatial ?place ;
         edm:object ?type ;
         edm:isShownBy ?imageLink .

     ?place skos:exactMatch/wgs84:lat ?lat .
     ?place skos:exactMatch/wgs84:long ?long .
     ?cho dc:title ?title .
     ?cho dc:description ?desc .
     ?cho dct:created ?date .
}
GROUP BY ?type`
// URL for the API
const url = 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-04/sparql'

// Robbert helped me with this code. I use a callback function to get the data outside of the runQuery scope
let finalArray = runQuery(url, query, data => {
  let finalArray = data
  console.log('gaatgoe: ', finalArray)
  return finalArray
})

console.log('pls: ', finalArray)

// The base of this code is Laurens. I changed it to suit my use case
function runQuery (url, query, cb) {
  // Call the url with the query attached, output data
  fetch(url + '?query=' + encodeURIComponent(query) + '&format=json')
    .then(res => res.json())
    .then(json => {
      let fetchedData = json.results.bindings

      // Replace "http" in the img url to "https". Wiebe helped me with this code.
      // fetchedData.forEach(item => {
      //   item.imageLink.value = item.imageLink.value.replace('http', 'https')
      // })

      console.log('fetchedData: ', fetchedData)
      return fetchedData
    })
    .then(fetchedData => {
      console.log('fetched data: ', fetchedData)
      cb(cleanDataYear(fetchedData))
    })
}

function cleanDataYear (fetchedData) {
  let newData = fetchedData.map(item => {
    let itemDateValue = item.date.value

    // Transform all elements to uppercase
    item.date.value = itemDateValue.toUpperCase()

    // Replace all bc and ad with an empty string and turn the corresponding properties into true
    item = replaceChrist(item)

    // Replace all unnecessary characters with an empty string
    item.date.value = cleanCharacter(item)

    // Replace all 'eeuwen' en 'centuries' with an empty string
    item = replaceCenturies(item)

    // Clean data if they have this format: 12-03-1990, or this format: 1900-2000. Returns the (average) year
    item = convertToYear(item)

    // Convert all strings to numbers
    item = convertToNumber(item)

    return {
      id: item.choCount,
      date: {
        type: item.date.type,
        value: item.date.value,
        bc: item.date.bc,
        ad: item.date.ad,
        century: item.date.century
      },
      landLabel: item.landLabel
    }
  })

  // delete all items which don't fit the format by now
  const finalArray = deleteUnformattedData(newData)


  // finalArray.forEach(item => console.log('items: ', item.date.value))
  d3testing(finalArray)

  return finalArray
}

function deleteUnformattedData (array) {
  const finalArray = array.filter(item => {
    if (item.date.value.toString().length === 4) {
      return item
    }
  })
  return finalArray
}

function cleanCharacter (item) {
  let itemDateValue = item.date.value

  // Replace the dot, (, ) and /
  itemDateValue = replaceWithWhichString(itemDateValue, /\./g)
  itemDateValue = replaceWithWhichString(itemDateValue, /[()]/g)
  itemDateValue = replaceWithWhichString(itemDateValue, /[()]/g)
  itemDateValue = replaceWithWhichString(itemDateValue, /\s/g)
  itemDateValue = replaceWithWhichString(itemDateValue, /\?/g)
  itemDateValue = replaceWithWhichString(itemDateValue, /\//g, '-')

  // Replace all left letters with an empty string
  itemDateValue = replaceWithWhichString(itemDateValue, /([a-zA-Z ])/g)

  return itemDateValue
}

function replaceWithWhichString (item, specialCharacter, replacedString = '') {
  return item.replace(specialCharacter, replacedString)
}

function replaceChrist (item) {
  let itemDate = item.date
  if (itemDate.value.includes('BC')) {
    itemDate.bc = true
    itemDate.value = itemDate.value.replace('BC', '')
  }
  if (itemDate.value.includes('AD')) {
    itemDate.ad = true
    itemDate.value = itemDate.value.replace('AD', '')
  } else {
    itemDate.bc = false
    itemDate.ad = false
  }
  item.date = itemDate
  return item
}

function replaceCenturies (item) {
  let itemDate = item.date
  if (itemDate.value.includes('EEEUW') || itemDate.value.includes('EEUW') || itemDate.value.includes('CENTURY')) {
    itemDate.value = itemDate.value.replace('EEEUW', '')
    itemDate.value = itemDate.value.replace('EEUW', '')
    itemDate.value = itemDate.value.replace('CENTURY', '')
    itemDate.century = true
  } else if (itemDate.value.includes('TH')) {
    itemDate.value = itemDate.value.replace(/\t.*/, '')
    itemDate.century = true
  } else {
    itemDate.century = false
  }
  item.date = itemDate
  // console.log(itemDate)
  return item
}

function convertToYear (item) {
  let itemDateValue = item.date.value

  if (itemDateValue.length === 7) {
    let splittedArray = itemDateValue.split('-')
    // Check if the array has 3 items, only contain numbers and if the last item in the array is a year
    if (splittedArray[0] && splittedArray[1] && splittedArray[0].match(/^[0-9]+$/) != null && splittedArray[1].match(/^[0-9]+$/) != null) {
      if (splittedArray[1].length === 4) {
        item.date.value = splittedArray[0]
      }
    }
  }

  if (itemDateValue.length === 8) {
    let splittedArray = itemDateValue.split('-')
    // Check if the array has 3 items, only contain numbers and if the last item in the array is a year
    if (splittedArray[0] && splittedArray[1] && splittedArray[2] && splittedArray[0].match(/^[0-9]+$/) != null && splittedArray[1].match(/^[0-9]+$/) != null && splittedArray[2].match(/^[0-9]+$/) != null) {
      if (splittedArray[2].length === 4) {
        item.date.value = splittedArray[2]
      }
    }
  }

  if (itemDateValue.length === 9) {
    let splittedArray = itemDateValue.split('-')
    // Check if first array item is a year and only contains numbers
    if (splittedArray[0] && splittedArray[1] && splittedArray[0].match(/^[0-9]+$/) != null && splittedArray[1].match(/^[0-9]+$/) != null) {
      if (splittedArray[0].length === 4 && splittedArray[1].length === 4) {
        item.date.value = splitStringCalcAverage(itemDateValue)
      }
    }

    // Check if the array has 3 items, only contain numbers and if the last item in the array is a year
    if (splittedArray[0] && splittedArray[1] && splittedArray[2] && splittedArray[0].match(/^[0-9]+$/) != null && splittedArray[1].match(/^[0-9]+$/) != null && splittedArray[2].match(/^[0-9]+$/) != null) {
      if (splittedArray[2].length === 4) {
        item.date.value = splittedArray[2]
      }
    }
  }

  if (itemDateValue.length === 10) {
    let splittedArray = itemDateValue.split('-')
    if (splittedArray[2] && splittedArray[2].length === 4) {
      // console.log(item.date.value, splittedArray[2])
      item.date.value = splittedArray[2]
    } // Check if first array item is a year and only contains numbers
    if (splittedArray[0].length === 4 && splittedArray[0].match(/^[0-9]+$/) != null) {
      item.date.value = splittedArray[0]
    }
  }
  return item
}

// Merge two array
function splitStringCalcAverage (item) {
  let splittedArray = item.split('-')
  return average(splittedArray[0], splittedArray[1])
}
// Wiebe helped me with this function
function average (a, b) {
  // force the input as numbers *1
  return Math.round(((a * 1 + b * 1) / 2))
}

// Convert all left strings to number
function convertToNumber (item) {
  let itemDateValue = item.date.value
  item.date.value = parseInt(itemDateValue)
  return item
}








/////////////// D3 /////////////////////////////////////////////////////////////
function d3testing(finalArray) {
  let dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160]
  let svgWidth = 500, svgHeight = 300, barPadding = 5
  let barWidth = (svgWidth / dataset.length)

  let svg = d3.select('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)

  let barChart = svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('y', function (d) {
      return svgHeight - d
    })
    .attr('height', function (d) {
      return d
    })
    .attr('width', barWidth - barPadding)
    .attr('transform', function (d, i) {
        var translate = [barWidth * i, 0]
        return `translate(${translate})`
    })
// // Selecteert de eerste die d3 vindt
// d3.select()

// // Selecteert ze allemaal
// d3.selectAll()

// // Met style kan je kleur aanpassen
// d3.select('h1').style('color', 'red')
// // Class toevoegen
// .attr('class', 'heading')
// // Textcontent veranderen
// .text('updated h1 tag')

// // Appenden van een elementen
// d3.select('body')
// .append('p')
// .text('hoi')

// d3.select('body')
//   .selectAll('p')
//   // De data koppelen aan D3
//   .data(finalArray)
//   .enter()
//   .append('p')

//   // Een functie om de data weer te geven
//   .text(function(d) { return d.date})
}
