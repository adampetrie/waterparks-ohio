waterparks.Models.Review = Backbone.Model.extend({

  authorImage: function() {
    var image;
    if (_.isUndefined(this.get('authorPhoto'))) {
      image = '<span class="avatar">' + this.get('author').charAt(0).toUpperCase() + '</span>';
    } else {
      image = '<img class="avatar" src="' + this.get('authorPhoto') + '"/>';
    }

    return image;
  },

  date: function() {
    return 'Reviewed ' + moment(this.get('time')*1000).fromNow() + '.';
  },

  rating: function() {
    var rating = '';

    for(var i = 0; i < 5; i++) {
      if(i < this.get('rating')) {
        rating += '<i class="glyphicon glyphicon-star"></i>';
      } else {
        rating += '<i class="glyphicon glyphicon-star-empty"></i>';
      }
    };

    return rating;
  }

});
