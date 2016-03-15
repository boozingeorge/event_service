module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: './public/bower',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: true,
        },
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.registerTask('default', ['bower']);
};