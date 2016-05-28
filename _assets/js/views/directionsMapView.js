waterparks.Views.DirectionsMapView = Backbone.View.extend({

  initialize: function(options) {
    this.destination = new google.maps.LatLng(
      options.waterpark.get('lat'),
      options.waterpark.get('lng')
    );
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
  },

  locateUser: function() {
    var geoLocateCallback = _.bind(this.locateUserCallback, this);
    navigator.geolocation.getCurrentPosition(geoLocateCallback);
  },

  locateUserCallback: function(position) {
    if(position) {
      this.userLocation = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
      this.getRoute();
    } else {
      alert('Unable to determine your location. Directions cannot be provided.');
    }
  },

  getRoute: function() {
    var directionData = {
      origin: this.userLocation,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }

    this.directionsService.route(
      directionData,
      _.bind(this.getRouteCallback, this)
    );
  },

  getRouteCallback: function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      this.directions = response;
      this.render();
    } else {
      alert('Directions request failed due to ' + status);
    }
  },

  render: function() {
    var mapNode = this.$el[0];
    this.map = new google.maps.Map(mapNode, {
      zoom: 7,
      center: this.userLocation
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel($('.directions')[0]);
    this.directionsDisplay.setDirections(this.directions);

    $('.getting-there div.col-md-6').css('display', 'block');
    $('.getting-there div.loading').css('display', 'none');
  }
});
