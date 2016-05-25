(function ($) {
  'use strict';

  var $weather = $('.weather'),
      template = _.template($('#weather-template').text());

  $.simpleWeather({
    location: $weather.attr('data-location'),
    unit: 'c',
    success: function(weather) {
      weather.forecast.splice(5);
      $weather.children('.weather-output').html(template(weather));
    },
    error: function(error) {
      $('.weather-loading').html('<p>' + error + '</p>');
    }
  });

  $(".directions-map").gmap3({
    getgeoloc:{
      callback : function(latLng){
        if (latLng){
          $(this).gmap3({
            getroute:{
              options:{
                  origin: latLng,
                  destination: $(this).attr('data-location'),
                  travelMode: google.maps.DirectionsTravelMode.DRIVING
              },
              callback: function(results){
                if (!results) return;
                $('.getting-there div.col-md-6').css('display', 'block');
                $('.getting-there div.loading').css('display', 'none');
                $(this).gmap3({
                  map:{
                    options:{
                      zoom: 13
                    }
                  },
                  directionsrenderer:{
                    container: $('.directions'),
                    options:{
                      directions:results
                    } 
                  }
                });
              }
            }
          });
        }
      }
    }
  });
})(jQuery);
