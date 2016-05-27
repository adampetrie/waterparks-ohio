waterparks.Models.WaterPark = Backbone.Model.extend({

  mapMarkerJson: function() {
    return {
      "address": this.get('address'),
      "data": {
        "url": this.get('url'),
        "name": this.get('name')
      }
    };
  }
});
