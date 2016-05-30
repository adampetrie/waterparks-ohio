waterparks.Collections.Reviews = Backbone.Collection.extend({

  initialize: function(options) {
    this.model = waterparks.Models.Review;
    this.waterpark = options.waterpark;

    var placesServiceNode = $(options.node)[0]
    this.placesService = new google.maps.places.PlacesService(placesServiceNode);

    this.fetchReviews();
  },

  fetchReviews: function() {
    var placeRequest = {
      placeId: this.waterpark.get('placeId')
    };

    this.placesService.getDetails(
      placeRequest,
      _.bind(this.parseReviews, this)
    );
  },

  parseReviews: function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var reviews = [];

      if(_.isUndefined(results.reviews)) {
        this.reset([]);
        return;
      }

      for(var i = 0; i < results.reviews.length; i++) {
        var review = results.reviews[i];

        reviews.push(new waterparks.Models.Review({
          author: review.author_name,
          authorPhoto: review.profile_photo_url,
          rating: review.rating,
          text: review.text,
          time: review.time
        }));
      };

      this.reset(reviews);
    }
  }
});
