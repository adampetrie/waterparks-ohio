waterparks.Views.DirectionsMapView = Backbone.View.extend({

  initialize: function(options) {
    this.map = $(this.el).gmap3();
    this.destination = options.destination;
  },

  handleGeoLocation: function(latLng) {
    if (latLng) {
      this.userLatLng = latLng;
      this.getRoute();
    }
  },

  getRoute: function() {
    this.map.gmap3({
      getroute: {
        options: {
          origin: this.userLatLng,
          destination: this.destination,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        },
        callback: _.bind(this.drawRoute, this)
      }
    });
  },

  drawRoute: function(directions) {
    $('.getting-there div.col-md-6').css('display', 'block');
    $('.getting-there div.loading').css('display', 'none');

    this.map.gmap3({
      map:{
        options:{
          zoom: 13
        }
      },
      directionsrenderer:{
        container: $('.directions'),
        options:{
          directions:directions
        } 
      }
    });
  },

  render: function() {
    this.map.gmap3({
      getgeoloc: {
        callback: _.bind(this.handleGeoLocation, this)
      }
    });
  }
});
