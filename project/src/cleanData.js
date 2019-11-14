// export function cleanDataYear (fetchedData) {
//   let newData = fetchedData.map(item => {
//     let itemDateValue = item.date.value

//     // Transform all elements to uppercase
//     item.date.value = itemDateValue.toUpperCase()

//     // Replace all bc and ad with an empty string and turn the corresponding properties into true
//     item = replaceChrist(item)

//     // Replace all unnecessary characters with an empty string
//     item.date.value = cleanCharacter(item)

//     // Replace all 'eeuwen' en 'centuries' with an empty string
//     item = replaceCenturies(item)

//     // Clean data if they have this format: 12-03-1990, or this format: 1900-2000. Returns the (average) year
//     item = convertToYear(item)

//     // Convert all strings to numbers
//     item = convertToNumber(item)

//     return {
//       id: item.cho.value,
//       image: item.imageLink.value,
//       title: item.title.value,
//       description: item.desc.value,
//       year: item.date.value,
//       dateInfo: {
//         type: item.date.type,
//         bc: item.date.bc,
//         ad: item.date.ad,
//         century: item.date.century
//       },
//       country: item.placeName.value,
//       geoLocation: {
//         long: item.long.value,
//         lat: item.lat.value
//       }
//     }
//   })

//   // delete all items which don't fit the format by now
//   const finalArray = deleteUnformattedData(newData)

//   // finalArray.forEach(item => console.log('items: ', item.date.value))

//   return finalArray
// }

// function deleteUnformattedData (array) {
//   const finalArray = array.filter(item => {
//     if (item.year.toString().length === 4) {
//       return item
//     }
//   })
//   return finalArray
// }

// function cleanCharacter (item) {
//   let itemDateValue = item.date.value

//   // Replace the dot, (, ) and /
//   itemDateValue = replaceWithWhichString(itemDateValue, /\./g)
//   itemDateValue = replaceWithWhichString(itemDateValue, /[()]/g)
//   itemDateValue = replaceWithWhichString(itemDateValue, /[()]/g)
//   itemDateValue = replaceWithWhichString(itemDateValue, /\s/g)
//   itemDateValue = replaceWithWhichString(itemDateValue, /\?/g)
//   itemDateValue = replaceWithWhichString(itemDateValue, /\//g, '-')

//   // Replace all left letters with an empty string
//   itemDateValue = replaceWithWhichString(itemDateValue, /([a-zA-Z ])/g)

//   return itemDateValue
// }

// function replaceWithWhichString (item, specialCharacter, replacedString = '') {
//   return item.replace(specialCharacter, replacedString)
// }

// function replaceChrist (item) {
//   let itemDate = item.date
//   if (itemDate.value.includes('BC')) {
//     itemDate.bc = true
//     itemDate.value = itemDate.value.replace('BC', '')
//   }
//   if (itemDate.value.includes('AD')) {
//     itemDate.ad = true
//     itemDate.value = itemDate.value.replace('AD', '')
//   } else {
//     itemDate.bc = false
//     itemDate.ad = false
//   }
//   item.date = itemDate
//   return item
// }

// function replaceCenturies (item) {
//   let itemDate = item.date
//   if (itemDate.value.includes('EEEUW') || itemDate.value.includes('EEUW') || itemDate.value.includes('CENTURY')) {
//     itemDate.value = itemDate.value.replace('EEEUW', '')
//     itemDate.value = itemDate.value.replace('EEUW', '')
//     itemDate.value = itemDate.value.replace('CENTURY', '')
//     itemDate.century = true
//   } else if (itemDate.value.includes('TH')) {
//     itemDate.value = itemDate.value.replace(/\t.*/, '')
//     itemDate.century = true
//   } else {
//     itemDate.century = false
//   }
//   item.date = itemDate
//   // console.log(itemDate)
//   return item
// }

// function convertToYear (item) {
//   let itemDateValue = item.date.value

//   if (itemDateValue.length === 7) {
//     let splittedArray = itemDateValue.split('-')
//     // Check if the array has 3 items, only contain numbers and if the last item in the array is a year
//     if (splittedArray[0] &&
//      splittedArray[1] &&
//       splittedArray[0].match(/^[0-9]+$/) != null &&
//       splittedArray[1].match(/^[0-9]+$/) != null) {
//       if (splittedArray[1].length === 4) {
//         item.date.value = splittedArray[0]
//       }
//     }
//   }

//   if (itemDateValue.length === 8) {
//     let splittedArray = itemDateValue.split('-')
//     // Check if the array has 3 items, only contain numbers and if the last item in the array is a year
//     if (splittedArray[0] && splittedArray[1] && splittedArray[2] && splittedArray[0].match(/^[0-9]+$/) != null && splittedArray[1].match(/^[0-9]+$/) != null && splittedArray[2].match(/^[0-9]+$/) != null) {
//       if (splittedArray[2].length === 4) {
//         item.date.value = splittedArray[2]
//       }
//     }
//   }

//   if (itemDateValue.length === 9) {
//     let splittedArray = itemDateValue.split('-')
//     // Check if first array item is a year and only contains numbers
//     if (splittedArray[0] && splittedArray[1] && splittedArray[0].match(/^[0-9]+$/) != null && splittedArray[1].match(/^[0-9]+$/) != null) {
//       if (splittedArray[0].length === 4 && splittedArray[1].length === 4) {
//         item.date.value = splitStringCalcAverage(itemDateValue)
//       }
//     }

//     // Check if the array has 3 items, only contain numbers and if the last item in the array is a year
//     if (splittedArray[0] && splittedArray[1] && splittedArray[2] && splittedArray[0].match(/^[0-9]+$/) != null && splittedArray[1].match(/^[0-9]+$/) != null && splittedArray[2].match(/^[0-9]+$/) != null) {
//       if (splittedArray[2].length === 4) {
//         item.date.value = splittedArray[2]
//       }
//     }
//   }

//   if (itemDateValue.length === 10) {
//     let splittedArray = itemDateValue.split('-')
//     if (splittedArray[2] && splittedArray[2].length === 4) {
//       // console.log(item.date.value, splittedArray[2])
//       item.date.value = splittedArray[2]
//     } // Check if first array item is a year and only contains numbers
//     if (splittedArray[0].length === 4 && splittedArray[0].match(/^[0-9]+$/) != null) {
//       item.date.value = splittedArray[0]
//     }
//   }
//   return item
// }

// // Merge two array
// function splitStringCalcAverage (item) {
//   let splittedArray = item.split('-')
//   return average(splittedArray[0], splittedArray[1])
// }
// // Wiebe helped me with this function
// function average (a, b) {
//   // force the input as numbers *1
//   return Math.round(((a * 1 + b * 1) / 2))
// }

// // Convert all left strings to number
// function convertToNumber (item) {
//   let itemDateValue = item.date.value
//   item.date.value = parseInt(itemDateValue)
//   return item
// }
