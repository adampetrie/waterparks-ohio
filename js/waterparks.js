/* global 
    google
*/
(function ($) {
    'use strict';

    /* Google map
    ----------------------------------------------*/
    $('#big-map').each(function () {

        var data_zoom = 17;

        if ($(this).attr('data-zoom') !== undefined) {
            data_zoom = parseInt($(this).attr('data-zoom'), 10);
        }

        $(this).gmap3({
            marker: {
                values: waterparks
            },
            map: {
                options: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: data_zoom,
                    scrollwheel: true
                }
            }
        });
    });
})(jQuery);
