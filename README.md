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
- [D3](https://d3js.org/)

# Installeren
1. Open je terminal op je computer
2. Maak een map aan waar je het project in wil hebben met `mkdir`
3. Clone de repo met 
```https://github.com/Coenmathijssen/functional-programming.git```
4. Navigeer via je terminal naar de repo met `cd`. Installeer vervolgens de benodigde dependencies met
```npm install```
5. Voor het builden, bundlen en compilen (om te publiceren) van de javascript gebruik
```npm run build```
6. Open de index.html in je browser om de website te bekijken

# De data


