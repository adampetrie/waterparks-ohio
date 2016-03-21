/* global 
    google
*/
(function ($) {
    'use strict';

    /* Google map
    ----------------------------------------------*/
    $('.map').each(function () {

        var data_zoom = 17;

        if ($(this).attr('data-zoom') !== undefined) {
            data_zoom = parseInt($(this).attr('data-zoom'), 10);
        }

        $(this).gmap3({
            marker: {
                values: [{
                    address: $(this).attr('data-address'),
                    data: $(this).attr('data-address-details')
                }],
                options: {
                    draggable: false
                },
                events: {
                    click: function (marker, event, context) {
                        var map = $(this).gmap3('get'),
                            infowindow = $(this).gmap3({get: {name: 'infowindow'}});
                        if (infowindow) {
                            infowindow.open(map, marker);
                            infowindow.setContent(context.data);
                        } else {
                            $(this).gmap3({
                                infowindow: {
                                    anchor: marker,
                                    options: {content: context.data}
                                }
                            });
                        }
                    }
                }
            },
            map: {
                options: {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: data_zoom,
                    scrollwheel: false
                }
            }
        });
    });
})(jQuery);
