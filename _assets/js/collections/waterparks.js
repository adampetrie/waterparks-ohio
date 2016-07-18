waterparks.Collections.WaterParks = Backbone.Collection.extend({
  initialize: function () {
    this.model = waterparks.Models.WaterPark;
  },

  mapMarkers: function(map) {
    var markers = [];
    _.each(this.models, function(waterpark) {
      markers.push(waterpark.mapMarker(map));
    });

    return markers;
  }
});
