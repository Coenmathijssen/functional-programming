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
// Selecteert de eerste die d3 vindt
d3.select()

// Selecteert ze allemaal
d3.selectAll()

// Met style kan je kleur aanpassen
d3.select('h1').style('color', 'red')
// Class toevoegen
.attr('class', 'heading')
// Textcontent veranderen
.text('updated h1 tag')

// Appenden van een elementen
d3.select('body')
.append('p')
.text('hoi')

d3.select('body')
  .selectAll('p')
  // De data koppelen aan D3
  .data(finalArray)
  .enter()
  .append('p')

  // Een functie om de data weer te geven
  .text(function(d) { return d.date})
