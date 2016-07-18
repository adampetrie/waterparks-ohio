waterparks.Models.WaterPark = Backbone.Model.extend({

  mapMarker: function(map) {
    return new google.maps.Marker({
      map: map,
      position: {
        lat: this.get('lat'),
        lng: this.get('lng')
      },
      name: this.get('name'),
      url: this.get('url')
    });
  },

  mapLatLng: function() {
    return new google.maps.LatLng(
      this.get('lat'),
      this.get('lng')
    );
  },

  weatherLatLng: function() {
    return this.get('lat') + ',' + this.get('lng');
  }
});
