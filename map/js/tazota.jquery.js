/*!
 * jquery Tweet Parser v1.1.1
 * Parse an element containing a tweet and turn URLS, @user & #hashtags into urls
 * MIT License
 * by Vincent Loy
 * http://vincent-loy.fr
 */
(function($)
{
    "use strict";

    $.fn.tazota=function(options)
    {

        var defauts=
        {
            "zoom" : 6,
            "maxZoom" : 18,
            "minZoom" : 1,
            "latitude" : 31.791702,
            "longitude" : -7.092619999999999,
            "surroundCountry" : true,
            "geoJsonFilePath" : 'js/MAR.geo.json',
            "flickrAPIkey" : "ea7d94db5e099cd59bc86a7460b563b1",
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
                    "latitude" : 37.01133,
                    "longitude" :  0.08789
                }
            }
        };

        var parameters=$.extend(defauts, options);


        return this.each(function()
        {


            /* Default vars */
            var map, markers;

            var mapID = $(this).attr('id');
            var lat = parameters.latitude;
            var lng = parameters.longitude;

            map = L.map(mapID).setView([lat, lng], parameters.zoom);
            //markers = L.layerGroup();

            L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'examples.map-i875mjb7'
            }).addTo(map);

            L.marker([lat, lng]).addTo(map)
                .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();



            map._layersMaxZoom= parameters.maxZoom;
            map._layersMinZoom= parameters.minZoom;

            if(parameters.setBounds) {
                var southWest = L.latLng(parameters.maxBounds.southWest.latitude, parameters.maxBounds.southWest.longitude),
                    northEast = L.latLng(parameters.maxBounds.northEast.latitude, parameters.maxBounds.northEast.longitude),
                    bounds = L.latLngBounds(southWest, northEast);

                map.setMaxBounds(bounds);
            }

            if(parameters.surroundCountry) {

                $.getJSON(parameters.geoJsonFilePath, function(data){
                    console.dir(data);
                    L.geoJson(data, parameters.geoJsonStyles).addTo(map);

                }).fail(function(jqxhr, textStatus, error){
                    console.error(error+" : "+textStatus);
                });
            }

            var popup = L.popup();

            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(map);
            }

            map.on('click', onMapClick);



        });
    };
}(jQuery));