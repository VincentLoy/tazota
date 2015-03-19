### tazota - projet CCC 2015

Author : @VincentLoy - @theobalkwill - @Squareseidh


## Tazota jQuery Plugin (dossier map/js/tazota.jquery.js)

###Dependances :

jQuery, leaflet, leaflet-oms.js (fichiers inclus dans /js ou via CDN dans la demo).

###Paremeters :

| Param        | Default           | description  |
| ------------- |:-------------:| -----:|
| zoom      | 6 | map default zoom |
| maxZoom      | 18      |   maximum zoom allowed |
| minZoom | 1      |    minimum zoom allowed |
| latitude | 31.79      |    latitude initiale |
| longitude | -7.09 |    longitude initiale |
| surroundCountry | true |    permet tracer une ligne autour du pays |
| geoJsonFilePath | js/MAR.geo.json | fichier format geoJSON permettant de tracer la ligne autour du pays |
| flickrAPIkey | votre clé API flickr | API key |
| flickrUserID | 131175339%40N05 | ID utilisateur flickr |
| geoJsonStyles | donées au format JSON | donnée pour donner une couleur, une opacité et un épaisseur a la ligne entourant le pays (seulement si surroundCountry == true |
| setBounds | true | Permet d'activer une 'frontiere a la map' si == true, vous devez préciser le parametre maxBounds |
| maxBounds | Longitudes et latitudes | southWest pour établire un point maximum au sub ouest, northEast pour le nord Est |
| nearbyOMSDistance | 50 | distance en pixel sur l'ecran entre deux photos proches, par defaut si l'on clique sur une photo, les autres photos a 50 pixels de distance s'éloignent pour l'aisser place a l'objet cliqué. s'il y a 150 photos au même endroit, forme un escargot. :) |

### exemple :

```javascript
$('#map-container').tazota({
   "zoom" : 6,
   "maxZoom" : 18,
   "minZoom" : 1,
   "latitude" : 31.791702,
   "longitude" : -7.092619999999999,
   "surroundCountry" : true,
   "geoJsonFilePath" : 'js/MAR.geo.json',
   "flickrAPIkey" : "d94910ea3a87e262d42db388b4cb73c4",
   "flickrUserID" : "131175339%40N05",
   "geoJsonStyles" : {
           "color": "rgba(52, 73, 94,0.4)",
           "weight": 5,
           "opacity": 1
       },
   "setBounds": true,
   "maxBounds" : {
       "southWest" : {
           "latitude" : 20.21066,
           "longitude" : -18.89648
       },
       "northEast" : {
           "latitude" : 40.01133,
           "longitude" :  0.10789
       }
   },
   "nearbyOMSDistance" : 50
});
```
