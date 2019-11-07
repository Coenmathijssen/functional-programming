const debtString = `1000-5000
Geen studieschuld
5000-10000
Geen studieschuld
1000-5000
Geen studieschuld
20000-25000
Geen studieschuld
Geen studieschuld

Geen studieschuld
15000-20000
10000-15000
Geen studieschuld
Geen studieschuld
Geen studieschuld
5000-10000
15000-20000
15000-20000

Meer dan 25000
5000-10000
15000-20000
Geen studieschuld
5000-10000
5000-10000; 15000-20000
Geen studieschuld
Geen studieschuld
Geen studieschuld
10000-15000
5000-10000
20000-25000
10000-15000
1000-5000
1000-5000
Geen studieschuld
1000-5000

Geen studieschuld
Geen studieschuld
Geen studieschuld
10000-15000
Meer dan 25000
10000-15000
Geen studieschuld
15000-20000
5000-10000
1000-5000
Geen studieschuld
Meer dan 25000
1000-5000
Meer dan 25000
15000-20000
10000-15000
5000-10000
5000-10000
15000-20000
5000-10000
Geen studieschuld
Meer dan 25000
20000-25000
20000-25000
1000-5000
10000-15000
Geen studieschuld
Geen studieschuld
Geen studieschuld
Geen studieschuld
1000-5000
1000-5000

Geen studieschuld
5000-10000
20000-25000
1000-5000
15000-20000
Geen studieschuld
Geen studieschuld
Meer dan 25000
Geen studieschuld
Geen studieschuld
10000-15000`

const splitStringToArray = (string, splitOnKey) => {
  return string.split(splitOnKey)
}

// debtArray.forEach((item, count) => {
//   if (typeof item === 'string' && item !== '') {
//     let seperatedDebtArray = item.split('-')
//     let averageNumber = (parseInt(seperatedDebtArray[0]) + parseInt(seperatedDebtArray[1])) / 2
//     debtArray[count] = averageNumber
//   }
//   if (item === 'Meer dan 25000') {
//     debtArray[count] = 27500
//   }
//   if (item === 'Geen studieschuld' || item === '') {
//     debtArray[count] = 0
//   }
// })

// console.log(debtArray)

// IN FUNCTION FORM
const multiplyTwoNumbersInString = (array, splitOnKey) => {
  array.forEach((item, count) => {
    if (typeof item === 'string' && item !== '') {
      let splittedArray = item.split(splitOnKey)
      let averageNumber = (parseInt(splittedArray[0]) + parseInt(splittedArray[1])) / 2
      array[count] = averageNumber
    }
    if (item === 'Meer dan 25000') {
      array[count] = 27500
    }
    if (item === 'Geen studieschuld' || item === '') {
      array[count] = 0
    }
  })
  return array
}

let averageDebtArray = multiplyTwoNumbersInString(splitStringToArray(debtString, '\n'), '-')
console.log('uitkomst: ', averageDebtArray)

const totalAmountOfDebt = averageDebtArray.reduce((accumulator, currentValue) => accumulator + currentValue)
console.log('De totale studieschuld van de studenten is ongeveer: ' + totalAmountOfDebt)
