waterparks.Views.BigMapView = Backbone.View.extend({

  mapOptions: {
    autofit: {},
    map: {
      options: {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 7,
        scrollwheel: false
      }
    }
  },

  initialize: function() {
    this.map = $(this.el).gmap3({
      infowindow:{
        open: false
      }
    });

    this.infoWindow = this.map.gmap3({get:{name:"infowindow"}});
  },

  markers: function() {
   return {
      marker: {
        values: this.collection.mapMarkerJson(),
        events: {
          click: this.markerClickHandler,
          mouseover: _.bind(this.markerMouseOver, this),
          mouseout: _.bind(this.markerMouseOut, this)
        }
      }
    };
  },

  markerClickHandler: function(marker, event, context) {
    window.location.href = context.data.url;
  },

  markerMouseOver: function(marker, event, context) {
    this.infoWindow.open(this.map.gmap3('get'), marker);
    this.infoWindow.setContent(context.data.name);
  },

  markerMouseOut: function(marker, event, context){
    this.infoWindow.close();
  },

  render: function() {
    var mapOptions = _.extend(this.markers(), this.mapOptions);
    this.map.gmap3(mapOptions);
  }
});
