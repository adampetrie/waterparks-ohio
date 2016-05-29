module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.initConfig({
    sass: {
      dev: {
        options: {
          style: 'expanded',
          loadPath: [
            'bower_components/bootstrap-sass/assets/stylesheets',
            'bower_components/weather-icons/sass',
            'bower_components/font-awesome/scss'
          ],
        },
        files: {
          'public/assets/css/style.css': '_assets/css/style.scss'
        },
      },
    },

    concat: {
      javascript: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
          'bower_components/lightbox2/dist/js/lightbox.min.js',
          'bower_components/simpleWeather/jquery.simpleWeather.min.js',
          'bower_components/moment/min/moment.min.js',
          'bower_components/underscore/underscore-min.js',
          'bower_components/backbone/backbone.js',
          '_assets/js/main.js',
          '_assets/js/*/*.js'
        ],
        dest: 'public/assets/js/main.min.js'
      }
    },

    copy: {
      fonts: {
        files: [
          {
            expand: true,
            cwd: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/',
            src: ['*'],
            dest: 'public/assets/fonts/bootstrap/'
          },
          {
            expand: true,
            cwd: 'bower_components/weather-icons/font/',
            src: ['*'],
            dest: 'public/assets/fonts/weather-icons/'
          },
          {
            expand: true,
            cwd: 'bower_components/font-awesome/fonts/',
            src: ['*'],
            dest: 'public/assets/fonts/font-awesome/'
          },
        ]
      },
      images: {
        files: [{
          expand: true,
          cwd: '_assets/images',
          src: ['**'],
          dest: 'public/assets/images/'
        }]
      }
    },

    uglify: {
      javascript: {
        files: {
          'public/assets/js/main.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
            'bower_components/lightbox2/dist/js/lightbox.min.js',
            'bower_components/simpleWeather/jquery.simpleWeather.min.js',
            'bower_components/underscore/underscore-min.js',
            'bower_components/backbone/backbone.js',
            '_assets/js/main.js',
            '_assets/js/*/*.js'
          ]
        }
      }
    },

    watch: {
      files: ['_assets/js/**/*.js'],
      tasks: ['concat'],
    },

    exec: {
      serve: {
        cmd: 'jekyll serve --watch'
      },
      deploy: {
        cmd: 'JEKYLL_ENV=production jekyll build && s3_website push'
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['sass:dev', 'copy']);
  grunt.registerTask('serve', ['default', 'concat', 'exec:serve']);
  grunt.registerTask('deploy', ['default', 'uglify', 'exec:deploy']);

};
