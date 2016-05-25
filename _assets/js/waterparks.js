(function ($) {
    'use strict';

  var $big_map = $('.big-map');

  if ($big_map.length) {
    $big_map.gmap3({
        marker: {
            values: waterparks,
            events: {
              click: function(marker, event, context) {
                window.location.href = context.data.url;
              },
              mouseover: function(marker, event, context){
                var map = $(this).gmap3("get"),
                    infowindow = $(this).gmap3({get:{name:"infowindow"}});
                if (infowindow){
                  infowindow.open(map, marker);
                  infowindow.setContent(context.data.name);
                } else {
                  $(this).gmap3({
                    infowindow:{
                      anchor:marker,
                      options:{content: context.data.name}
                    }
                  });
                }
              },
              mouseout: function(){
                var infowindow = $(this).gmap3({get:{name:"infowindow"}});
                if (infowindow){
                  infowindow.close();
                }
              }
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
  }
})(jQuery);
