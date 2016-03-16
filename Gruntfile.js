module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: './app/bower',
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