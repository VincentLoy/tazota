/*!
 * jquery Tazota v1.0.0
 * generate a leaflet map with lots of awesome parameters
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
        };

        var parameters=$.extend(defauts, options);


        return this.each(function()
        {

            $(this).append('<div id="tazota-map"></div>');
            $(this).append('<div class="map-overlay map-overlay-hidden">'+
            '<div class="map-overlay-content">'+
                '<a class="close-overlay">Fermer</a>'+
            '</div></div>');
            /* Default vars */
            var map, markers, oms;

            var $container = $(this);

            var mapID = 'tazota-map';
            var lat = parameters.latitude;
            var lng = parameters.longitude;

            map = L.map(mapID).setView([lat, lng], parameters.zoom);
            markers = L.layerGroup();

            L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'examples.map-i875mjb7'
            }).addTo(map);

            map._layersMaxZoom= parameters.maxZoom;
            map._layersMinZoom= parameters.minZoom;

            oms = new OverlappingMarkerSpiderfier(map, {
                keepSpiderfied: true,
                nearbyDistance: parameters.nearbyOMSDistance
            });

            /**
             * Gestion des frontières de la map
             */
            if(parameters.setBounds) {
                var southWest = L.latLng(parameters.maxBounds.southWest.latitude, parameters.maxBounds.southWest.longitude),
                    northEast = L.latLng(parameters.maxBounds.northEast.latitude, parameters.maxBounds.northEast.longitude),
                    bounds = L.latLngBounds(southWest, northEast);

                map.setMaxBounds(bounds);
            }

            /**
             * Gestion du contour du pays choisis / chargement du geoJSON
             */
            if(parameters.surroundCountry) {

                $.getJSON(parameters.geoJsonFilePath, function(data){
                    console.dir(data);
                    L.geoJson(data, parameters.geoJsonStyles).addTo(map);

                }).fail(function(jqxhr, textStatus, error){
                    console.error(error+" : "+textStatus);
                });
            }

            /**
             * Gestion des photos a poser sur la map
             */
            $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key='+parameters.flickrAPIkey+'&user_id='+parameters.flickrUserID+'&extras=geo,url_sq,url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o, comments&format=json&nojsoncallback=1;', function (data) {
                console.dir(data);

                $(data.photos.photo).each(function () {

                    var $details = '<a class="details-btn" data-id="'+this.id+'">Voir cette photo</a>';

                    var popupContent = '<strong>'+this.title+'</strong>'+
                        '<br/><img src="'+this.url_s+'"/><br/>'+$details;

                    var imgMarker = L.icon({
                        iconUrl: this.url_sq,
                        iconSize: [35,35],
                        iconAnchor: [17,35],
                        popupAnchor: [0,-35]
                    });

                    console.log("name : "+this.title+" / lat :"+this.latitude+" / lng : "+this.longitude+" / sq : "+this.url_s);
                    var marker = L.marker([this.latitude, this.longitude], {icon: imgMarker}).addTo(markers);
                    marker.bindPopup(popupContent);

                    oms.addMarker(marker); //overlapping Marker Spiderfier

                });
                markers.addTo(map);

                $('.close-overlay').click(function(){
                    $('.map-overlay').addClass('map-overlay-hidden');
                });
            });

            $container.on('click', '.details-btn', function(){
                var pictID = $(this).attr('data-id');
                displayPictureDetails(pictID);
            });

            function displayPictureDetails(img) {
                $('.map-overlay').removeClass('map-overlay-hidden');
            }



        });
    };
}(jQuery));