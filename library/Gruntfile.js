module.exports = function(grunt) {
  grunt.initConfig({
      browserify: {
          '../dist/app.js': ['../javascripts/*.js'],
      options: {
        transform: ["hbsfy"],
        browserifyOptions: {
          paths: [
          "./node_modules"
          ]
        }
      }
    },
    jshint: {
      files: ['../javascripts/**/*.js'], //location of javascript files
      options: {
        predef: ["document", "console", "$" ], //allows for predefined things not found in js
        esnext: true, //allows for ES6
        globalstrict: true,
        globals: {"Sandwich":true}, //name value pairs, allows to define global vars used in many files.
        browserify: true
      },
    },
    sass: { //setup sass compilation
      dist: {
        files: {
          '../css/main.css': '../scss/main.scss'
        }
      }
    },
    watch: { //automatically watch for changes
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['../scss/**/*.scss'],
        tasks: ['sass']
      },
      browserify: {
        files: ['../javascripts/*.js'],
        tasks: ["browserify"]
      },
      hbs: {
        files: ['../templates/**/*.hbs'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'watch']); //watch must be last
};