# functional-programming
<img width="1148" alt="Screenshot 2019-11-14 at 18 04 08" src="https://user-images.githubusercontent.com/43337909/68879212-4e6ba900-0709-11ea-957c-be3ceb97770d.png">

# Het concept
![idee generatie-2](https://user-images.githubusercontent.com/43337909/68127703-b276bc00-ff16-11e9-8d27-709fa0efcf81.jpg)
Bij het rad van fortuin zijn twee schijven aanwezig. Één voor jaartallen (tussen jaartal X en Y) en één voor een bepaalde categorie. Met een spin gaan beide schijven draaien en stoppen ze op een willekeurige waarde. Vervolgens worden hier de bijpassende objecten voor opgehaald en geplaatst op de wereldkaart via GEO coördinaten. Om te voorkomen dat er alleen maar objecten op dezelfde plek wordt weergegeven, worden er maar 3 tot 5 items weeergegeven per continent. Ook is er een toggle aanwezig. Deze toggled om alle objecten te laten zien, of alle objecten die al ooit tentoon zijn gesteld. Zo kan de gebruiker kiezen of hij objecten wil zien waar het museum trots op is of om te bekijken wat de enorme collectie allemaal te bieden heeft.

### Waarom dit concept:
- Dit concept past het beste bij de eisen van Rick. Ondanks dat dit niet nodig is, vind ik het wel leuk om aan de eisen van alle stakeholders te voldoen. Met dit concept is er én een presentatie van alle objecten binnen de collectie én is het interactief.
- Met het rad van fortuin komt er een spelelement in de visualisatie. Zo wordt het interactief en wat minder stoffig. Ook kom je zo via een willekeurige manier op objecten die je waarschijnlijk anders niet had gevonden. Daarnaast is de interactiviteit aanwezig en is het (denk ik) haalbaar om te maken met D3.

### Benodigde data
- Titel
- Description
- Afbeelding
- Jaartal (tijdvak) van het object
- Categorie en subcategorieën 
- Geolocatie

# Features
- [API data opschonen](https://github.com/Coenmathijssen/functional-programming/wiki/API-data-opschonen)
- [D3 visualisatie](https://github.com/Coenmathijssen/functional-programming/wiki/D3)
-[SPARQL](#)


# Gebruikte tools
- [API stichting museum voor wereldculturen](https://collectie.wereldculturen.nl/) - API voor data
- [SparQl](https://www.w3.org/TR/rdf-sparql-query/) - SpaQl taal van de database
- [Node](https://nodejs.org/en/) - Dependency Management
- [Rollup](https://rollupjs.org/) - Pagebuilder
- [D3](https://d3js.org/) - Een Javascript library voor het maken van data visualisaties

# Installeren
1. Open je terminal op je computer
2. Maak een map aan waar je het project in wil hebben met `mkdir`
3. Clone de repo met 
<br></br>
`https://github.com/Coenmathijssen/functional-programming.git`
<br></br>
4. Navigeer via je terminal naar de repo met `cd`. Installeer vervolgens de benodigde dependencies met
<br></br>
`npm install`
<br></br>
5. Voor het builden, bundlen en compilen (om te publiceren) van de javascript gebruik
<br></br>
`npm run build`
<br></br>
6. Open de index.html in je browser om de website te bekijken

# Deployment
De website live zetten kan via GitHub Pages. 
1. Maak een repository aan en zet daar de bundle.js, html en css bestanden in. 
2. Ga naar instellingen (rechter tab in je repo).
3. Scroll naar Github Pages en activeer dit.

# De data
## Wat voor data?
De data is afkomstig van de Stichting Nationaal Museum van Wereldculturen. Zij hebben een enorme collectie met wel 500.000 objecten. Dit is een verzameling van allerlei soorten objecten van over de hele wereld. De objecten kunnen zo uit zijn als honderden jaren voor Christus, tot objecten van deze eeuw. De objecten zijn enorm divers en zijn bijvoorbeeld wapens, kledij, instrumenten, religieuze objecten, etc. De meeste objecten komen uit Indonesië door het koloniale verleden.

## De ruwe data
De data van het NMVW krijg ik binnen via een fetch van de API met een endpoint. De database van deze API is gebouwd met SPARQL. Er is dus een SPARQL query nodig om deze data te fetchen. Lees hoe ik dat doe op de [SOARQL pagina](https://github.com/Coenmathijssen/functional-programming/wiki/SPARQL). De data die je hieruit terugkrijgt is behoorlijk ruw. De API geeft de data in deze vorm terug:
<img width="1083" alt="Screenshot 2019-11-14 at 18 29 05" src="https://user-images.githubusercontent.com/43337909/68881040-ad7eed00-070c-11ea-8632-3a05db9557ca.png">
<br></br>

## Wat heb ik nodig?
Ik heb objecten tussen een bepaald tijdvak binnen een bepaalde categorie nodig. Dus bijvoorbeeld: wapens van 1400 tot 1500. Dit variëert per categorie en jaartal. Maar in ieder geval heb ik van de objecten het volgende dingen nodig:
- Titel
- Description
- Afbeelding
- Jaartal (tijdvak) van het object
- Categorie en subcategorieën 
- Geolocatie

## Databewerking
Voor mijn specifieke project heb ik opgeschoonde jaartallen nodig. Daarom heb ik de jaartallen bewerkt zodat het allemaal één jaartal is. Daarnaast heb ik de objecten opgeschoond zodat ik alleen de properties terugkrijg die ik nodig heb. Om te zien hoe ik deze data heb bewerkt, zie [API data opschonen](https://github.com/Coenmathijssen/functional-programming/wiki/API-data-opschonen)

Hier komt de volgende opgeschoonde array met objecten uit voort:
<img width="1067" alt="Screenshot 2019-11-14 at 18 40 07" src="https://user-images.githubusercontent.com/43337909/68881880-419d8400-070e-11ea-9dd3-412c2d8d9524.png">

## Auteur 
[Coen Mathijssen - GitHub](https://github.com/Coenmathijssen/)

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Wiebsonice/functional-programming/blob/master/LICENSE) file for details

