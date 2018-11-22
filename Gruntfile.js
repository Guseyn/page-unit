module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.es6.js'],
          dest: 'out',
          ext: '.js'
        }]
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['babel']);

};
