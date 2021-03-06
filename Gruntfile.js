module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
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
          'bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
          'bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
          'bower_components/lightbox2/dist/js/lightbox.min.js',
          'bower_components/slick-carousel/slick/slick.min.js',
          'bower_components/simpleWeather/jquery.simpleWeather.min.js',
          'bower_components/moment/min/moment.min.js',
          'bower_components/underscore/underscore-min.js',
          'bower_components/backbone/backbone.js',
          '_assets/js/main.js',
          '_assets/js/*/*.js'
        ],
        dest: 'public/assets/js/main.min.js'
      },
      css: {
        src: [
          'bower_components/lightbox2/dist/css/lightbox.min.css',
          'bower_components/slick-carousel/slick/slick.css',
          'public/assets/css/style.css'
        ],
        dest: 'public/assets/css/style.css'
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
          cwd: 'bower_components/lightbox2/dist/images',
          src: ['**/*'],
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
            'bower_components/slick-carousel/slick/slick.min.js',
            'bower_components/simpleWeather/jquery.simpleWeather.min.js',
            'bower_components/moment/min/moment.min.js',
            'bower_components/underscore/underscore-min.js',
            'bower_components/backbone/backbone.js',
            '_assets/js/main.js',
            '_assets/js/*/*.js'
          ]
        }
      }
    },

    imagemin: {
      jpg: {
        files: [{
          expand: true,
          cwd: '_assets/images',
          src: ['**/*.jpg'],
          dest: 'public/assets/images/'
        }]
      }
    },

    watch: {
      javascript: {
        files: ['_assets/js/**/*.js'],
        tasks: ['concat:javascript']
      },
      css: {
        files: ['_assets/css/**/*.scss'],
        tasks: ['build_css']
      },
      images: {
        files: ['_assets/images/**/*'],
        copy: ['copy:images']
      }
    },

    exec: {
      serve: {
        cmd: 'jekyll serve'
      },
      deploy: {
        cmd: 'JEKYLL_ENV=production jekyll build && s3_website push'
      }
    },

    concurrent: {
      serve: ['exec:serve', 'watch'],
      options: {
          logConcurrentOutput: true
      }
    }
  });

  // Default task(s).
  grunt.registerTask('build_css', ['sass:dev', 'concat:css'])
  grunt.registerTask('serve', ['sass:dev', 'copy', 'imagemin', 'concat', 'concurrent:serve']);
  grunt.registerTask('deploy', ['sass:dev', 'copy', 'uglify', 'concat:css', 'exec:deploy']);

};
