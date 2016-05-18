/* global 
    google
*/
(function ($) {
    'use strict';

  $('#big-map').gmap3({
      marker: {
          values: waterparks,
          events: {
            click: function(marker, event, context) {
              window.location.href= context.data.url;
            },
          },
      },
      autofit:{},
      map: {
          options: {
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              zoom: 7,
              scrollwheel: false
          }
      }
  });
})(jQuery);
