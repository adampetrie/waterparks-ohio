waterparks.Collections.WaterParks = Backbone.Collection.extend({
  initialize: function () {
    this.model = waterparks.Models.WaterPark;
  },

  mapMarkers: function(map) {
    var markers = [];
    _.each(this.models, function(waterpark) {

      var marker = new google.maps.Marker({
        map: map,
        position: {
          lat: waterpark.get('lat'),
          lng: waterpark.get('lng')
        },
        name: waterpark.get('name'),
        url: waterpark.get('url')
      });

      markers.push(marker);
    });

    return markers;
  }
});
