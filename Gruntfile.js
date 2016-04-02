module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        options: {
          targetDir: './app/bower',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.registerTask('default', ['bower']);
};
