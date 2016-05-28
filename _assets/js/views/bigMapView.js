waterparks.Views.BigMapView = Backbone.View.extend({

  addMarkers: function() {
    this.mapMarkers = this.collection.mapMarkers(this.map);

    for(var i = 0; i < this.mapMarkers.length; i++) {
      this.mapMarkers[i].set('infoWindow', this.infoWindow);
      this.mapMarkers[i].addListener('click', this.markerClickHandler);
      this.mapMarkers[i].addListener('mouseover', this.markerMouseOver);
      this.mapMarkers[i].addListener('mouseout', this.markerMouseOut);
    };
  },

  markerClickHandler: function() {
    window.location.href = this.url;
  },

  markerMouseOver: function() {
    this.infoWindow.setContent(this.name);
    this.infoWindow.open(this.map, this);
  },

  markerMouseOut: function(){
    this.infoWindow.close();
  },

  render: function() {
    var mapNode = $(this.el)[0];
    this.map = new google.maps.Map(mapNode, {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 7,
      // Center on Toronto
      center: {lat: 43.653226, lng: -79.3831843}
    });

    this.infoWindow = new google.maps.InfoWindow();

    this.addMarkers()
  }
});
