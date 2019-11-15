(function () {
  'use strict';

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
GROUP BY ?type
LIMIT 500`;
  // URL for the API
  const url = 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-04/sparql';

  // // Robbert helped me with this code. I use a callback function to get the data outside of the runQuery scope
  // console.log('cleanedData: ', runQuery(url, query, data => {
  //   return data
  // }))

  runQuery(url, query);

  // The base of this code is Laurens. I changed it to suit my use case
  function runQuery (url, query) {
    // Call the url with the query attached, output data
    fetch(url + '?query=' + encodeURIComponent(query) + '&format=json')
      .then(res => res.json())
      .then(json => {
        let fetchedData = json.results.bindings;

        //Replace "http" in the img url to "https". Wiebe helped me with this code.
        fetchedData.forEach(item => {
          item.imageLink.value = item.imageLink.value.replace('http', 'https');
        });

        console.log('fetchedData: ', fetchedData);
        return fetchedData
      })
      .then(fetchedData => {
        let newData = cleanDataYear(fetchedData);
        console.log('cleaned data: ', newData);
      });
  }

  function cleanDataYear (fetchedData) {
    let newData = fetchedData.map(item => {
      let itemDateValue = item.date.value;

      // Transform all elements to uppercase
      item.date.value = itemDateValue.toUpperCase();

      // Replace all bc and ad with an empty string and turn the corresponding properties into true
      item = replaceChrist(item);

      // Replace all unnecessary characters with an empty string
      item.date.value = cleanCharacter(item);

      // Replace all 'eeuwen' en 'centuries' with an empty string
      item = replaceCenturies(item);

      // Replace all left letters with an empty string
      itemDateValue = replaceWithWhichString(itemDateValue, /([a-zA-Z ])/g);

      // Clean data if they have this format: 12-03-1990, or this format: 1900-2000. Returns the (average) year
      item = convertToYear(item);

      // Convert all strings to numbers
      item = convertToNumber(item);

      return {
        id: item.cho.value,
        image: item.imageLink.value,
        title: item.title.value,
        description: item.desc.value,
        year: item.date.value,
        dateInfo: {
          type: item.date.type,
          bc: item.date.bc,
          ad: item.date.ad,
          century: item.date.century
        },
        country: item.placeName.value,
        geoLocation: {
          long: item.long.value,
          lat: item.lat.value
        }
      }
    });

    // delete all items which don't fit the format by now
    const finalArray = deleteUnformattedData(newData);

    // finalArray.forEach(item => console.log('items: ', item.date.value))

    return finalArray
  }

  function deleteUnformattedData (array) {
    const finalArray = array.filter(item => {
      if (item.year.toString().length === 4) {
        return item
      }
    });
    return finalArray
  }

  // Cleans all data which contain a before and after Christ.
  // I create a property to the keep in mind that the year was before or after Christ. I will need this later in my data cleaning.
  function replaceChrist (item) {
    let itemDate = item.date;
    if (itemDate.value.includes('BC')) {
      itemDate.bc = true;
      itemDate.value = itemDate.value.replace('BC', '');
    }
    if (itemDate.value.includes('AD')) {
      itemDate.ad = true;
      itemDate.value = itemDate.value.replace('AD', '');
    } else {
      itemDate.bc = false;
      itemDate.ad = false;
    }
    item.date = itemDate;
    return item
  }

  // Here I clean all weird characters which don't belong. I replace all with an empty string. I replace the '/' with a '-' to
  // get a consistent format.
  function cleanCharacter (item) {
    let itemDateValue = item.date.value;

    // Replace the dot, (, ) and /
    itemDateValue = replaceWithWhichString(itemDateValue, /\./g);
    itemDateValue = replaceWithWhichString(itemDateValue, /[()]/g);
    itemDateValue = replaceWithWhichString(itemDateValue, /[()]/g);
    itemDateValue = replaceWithWhichString(itemDateValue, /\s/g);
    itemDateValue = replaceWithWhichString(itemDateValue, /\?/g);
    itemDateValue = replaceWithWhichString(itemDateValue, /\//g, '-');

    return itemDateValue
  }

  // A function for replacing a character with a string. The replaced string will be empty by default,
  // because this happens most of the time.
  function replaceWithWhichString (item, specialCharacter, replacedString = '') {
    return item.replace(specialCharacter, replacedString)
  }

  // Here I replace all years which has a century in them with an empty string. Again, I create a property to keep in mind
  // it had a century in it. I will need this later for the data cleaning
  function replaceCenturies (item) {
    let itemDate = item.date;
    if (itemDate.value.includes('EEEUW') || itemDate.value.includes('EEUW') || itemDate.value.includes('CENTURY')) {
      itemDate.value = itemDate.value.replace('EEEUW', '');
      itemDate.value = itemDate.value.replace('EEUW', '');
      itemDate.value = itemDate.value.replace('CENTURY', '');
      itemDate.century = true;
    } else if (itemDate.value.includes('TH')) {
      itemDate.value = itemDate.value.replace(/\t.*/, '');
      itemDate.century = true;
    } else {
      itemDate.century = false;
    }
    item.date = itemDate;
    // console.log(itemDate)
    return item
  }

  // Here I convert every workable/convertable date to a single year.
  function convertToYear (item) {
    let itemDateValue = item.date.value;

    // Here I check if the date has this format: '01-2005'. I only keep the year (last four numbers)
    if (itemDateValue.length === 7) {
      let splittedArray = itemDateValue.split('-');
      if (splittedArray[0] &&
       splittedArray[1] &&
       // https://stackoverflow.com/questions/14783196/how-to-check-in-javascript-that-a-string-contains-alphabetical-characters
        splittedArray[0].match(/[a-z]/) === null &&
        splittedArray[1].match(/[a-z]/) === null) {
        if (splittedArray[1].length === 4) {
          item.date.value = splittedArray[0];
        }
      }
    }

    // Here I check if the date has this format: '1-2-2005'. I only keep the year (last four numbers)
    if (itemDateValue.length === 8) {
      let splittedArray = itemDateValue.split('-');
      // Check if the array has 3 items, only contain numbers and if the last item in the array is a year
      if (splittedArray[0] &&
        splittedArray[1] &&
        splittedArray[2] &&
        splittedArray[0].match(/[a-z]/) === null &&
        splittedArray[1].match(/[a-z]/) === null &&
        splittedArray[2].match(/[a-z]/) === null) {
        if (splittedArray[2].length === 4) {
          item.date.value = splittedArray[2];
        }
      }
    }

    if (itemDateValue.length === 9) {
      let splittedArray = itemDateValue.split('-');
      // Here I check if the date has this format: '1900-2000'. I split the two, count them up and divide them by 2.
      // So I only keep one average number
      if (splittedArray[0] &&
        splittedArray[1] &&
        splittedArray[0].match(/[a-z]/) === null &&
        splittedArray[1].match(/[a-z]/) === null) {
        if (splittedArray[0].length === 4 && splittedArray[1].length === 4) {
          item.date.value = splitStringCalcAverage(itemDateValue);
        }
      }

      // Here I check if the date has this format: '02-4-2000' or this format '2-04-2000'. I only keep the year (last four numbers)
      if (splittedArray[0] &&
        splittedArray[1] &&
        splittedArray[2] &&
        splittedArray[0].match(/[a-z]/) === null &&
        splittedArray[1].match(/[a-z]/) === null &&
        splittedArray[2].match(/[a-z]/) === null) {
        if (splittedArray[2].length === 4) {
          item.date.value = splittedArray[2];
        }
      }
    }

    // Here I check if the date has this format: '02-05-2000'. I only keep the year (last four numbers)
    if (itemDateValue.length === 10) {
      let splittedArray = itemDateValue.split('-');
      if (splittedArray[2] &&
        splittedArray[2].length === 4) {
        // console.log(item.date.value, splittedArray[2])
        item.date.value = splittedArray[2];
      } // Check if first array item is a year and only contains numbers
      if (splittedArray[0].length === 4 &&
        splittedArray[0].match(/^[0-9]+$/) != null) {
        item.date.value = splittedArray[0];
      }
    }
    return item
  }

  // Merge the two arrays into one with the average function
  function splitStringCalcAverage (item) {
    let splittedArray = item.split('-');
    return average(splittedArray[0], splittedArray[1])
  }
  // Wiebe helped me with this function
  function average (a, b) {
    // Multiply by 1 to make sure it's a number
    return Math.round(((a * 1 + b * 1) / 2))
  }

  // Convert all left strings to number
  function convertToNumber (item) {
    let itemDateValue = item.date.value;
    item.date.value = parseInt(itemDateValue);
    return item
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////// D3 /////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}());
