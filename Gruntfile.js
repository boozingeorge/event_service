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
    },
    ngtemplates: {
      templates: {
        cwd:  './app/source/templates',
        src:  ['**/*.html'],
        dest: './app/source/templates/templates.js',
        options: {
          base:   '.',
          module: 'EventService',
          prefix: 'templates/'
        }
      }
    },
    watch: {
      dev: {
        files: ['app/source/templates/**/*.html'],
        tasks: ['ngtemplates']
      }
    },
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.registerTask('default', ['bower', 'ngtemplates']);
};
