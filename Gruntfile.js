'use strict';

module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // ---------------------------------------------------------------------- //
    watch: {
      jshint: {
        files: ['Gruntfile.js', 'app/**/*.js'],
        tasks: ['jshint:all', 'copy:js']
      },
      jade: {
        files: ['app/**/*.jade'],
        tasks: ['jade:build']
      },
      less: {
        files: ['app/**/*.less'],
        tasks: ['less:build']
      },
      media: {
        files: ['app/media/**'],
        tasks: ['copy:media']
      }
    },
    // ---------------------------------------------------------------------- //
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app/**/*.js'
      ]
    },
    // ---------------------------------------------------------------------- //
    copy: {
      js: {
        cwd: 'app',
        src: ['**/*.js'],
        dest: 'public',
        expand: true
      },
      media: {
        cwd: 'app/media',
        src: ['**'],
        dest: 'public/media',
        expand: true
      }
    },
    // ---------------------------------------------------------------------- //
    jade: {
      build: {
        files: [{
          cwd: 'app',
          src: '**/*.jade',
          dest: 'public',
          ext: '.html',
          expand: true
        }]
      }
    },
    // ---------------------------------------------------------------------- //
    less: {
      build: {
        files: [{
          cwd: 'app',
          src: '**/*.less',
          dest: 'public',
          ext: '.css',
          expand: true
        }]
      }
    },
    // ---------------------------------------------------------------------- //
    clean: {
      server: 'public'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['clean', 'jshint:all', 'copy:js', 'jade:build', 'less:build', 'copy:media']);
  grunt.registerTask('default', ['build', 'watch']);
};

