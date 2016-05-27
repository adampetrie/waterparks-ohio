waterparks.Collections.WaterParks = Backbone.Collection.extend({
  initialize: function () {
    this.model = waterparks.Models.WaterPark;
  },

  mapMarkerJson: function() {
    var markerData = [];
    _.each(this.models, function(waterpark) {
      markerData.push(waterpark.mapMarkerJson());
    });

    return markerData;
  }
});
