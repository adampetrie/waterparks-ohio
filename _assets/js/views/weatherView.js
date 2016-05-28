waterparks.Views.weatherView = Backbone.View.extend({

  initialize: function(options) {
    this.template = _.template($(options.template).text());
    this.waterpark = options.waterpark
    this.location = this.getLocation();
  },

  getLocation: function() {
    var lat = this.waterpark.get('lat'),
        lng = this.waterpark.get('lng');

    return lat + ',' + lng;
  },

  outputWeather: function(weather) {
    weather.forecast.splice(5);
    $(this.el).html(this.template(weather));
  },

  outputError: function(error) {
    $(this.el).html('<p>' + error + '</p>');
  },

  render: function() {
    $.simpleWeather({
      location: this.location,
      unit: 'c',
      success: _.bind(this.outputWeather, this),
      error: _.bind(this.outputError, this)
    });
  }
});
