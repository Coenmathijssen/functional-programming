// https://stackoverflow.com/questions/32311081/check-for-special-characters-in-string
let formatSpecialCharacters = /[ !@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

const colorString = `#306B6D
#0CBCB6
#FFD733
#f5e2e3
#b02727
#309E9E
#5E80CE
#b23535
#00a2ff

#E7CC84
#562f7e
#64e5c9
#71EADB
#00ffef
#cecb9f
#000218
#40E0D0
#77dd77

#eb9c98
#ff6781
#000000
#AAF0D1
#555756
#17AB98
#2271b3
#008080
#01BABA
#BBD3DF
#28d37e
#333333
#172D55
#ff793f
#ff0000
#926000
#0c0075
alle kleuren op zijn tijd
#45150d
#00d5eb
#a85418
#ffa4b5
#346d0c
#F83064
#57AFE2
#cc7833
#ED8FAD
#0014d0
#f8bdc6
#00ffe1
#5a005a
#006699
#40E0D0
#1caed3
FCE900
#2c3e50

#832032
#567787
#e7b0f7
#24bbe0
296a9d[
#f98b88]
#000000
#FF0000
#000080
#FFFFF
#000000
#654321
#7F0000
#0163B1
#2a476f
D0021B
#55168c
#000000
#0042b5
5BBBE8

#a8ceeb
#72313e
#f2ecdf
#48d1cc`

const splitStringToArray = (string, splitOnKey) => {
  return string.split(splitOnKey)
}

const cleanColorHex = (array, specialCharacter) => {
  for (let item in array) {
    if (array[item].indexOf(specialCharacter) !== -1 && array[item].length === 7) {
      if (formatSpecialCharacters.test(array[item])) {
        array[item] = 'Wrong input'
      } else {
        array[item] = array[item].toUpperCase()
      }
    }
    if (array[item].indexOf(specialCharacter) === -1 && array[item].length === 6) {
      if (formatSpecialCharacters.test(array[item])) {
        array[item] = 'Wrong input'
      } else {
        array[item] = `#${array[item]}`
      }
    }
    if (array[item].length < 6 || array[item].length > 7) {
      array[item] = 'Wrong input'
    }
    if (formatSpecialCharacters.test(array[item])) {
      array[item] = 'Wrong input'
    }
  }
  return array
}

console.log(cleanColorHex((splitStringToArray(colorString, '\n')), '#'))
