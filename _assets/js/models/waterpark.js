waterparks.Models.WaterPark = Backbone.Model.extend({

  mapMarkerOptions: function() {
    return {
      lat: this.get('lat'),
      lng: this.get('lng'),
      data: {
        url: this.get('url'),
        name: this.get('name')
      }
    };
  }
});
