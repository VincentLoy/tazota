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
            "longitude" : -7.092619999999999
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
            map._layersMaxZoom= parameters.maxZoom;
            map._layersMinZoom= parameters.minZoom;


        });
    };
}(jQuery));