module.exports = function(grunt) {

  var configFile = 'squarespace.json';
  var repoDir = 'repo';

  grunt.initConfig({
      /*
      Read the Squarespace configuration file.
      */
      squarespace: grunt.file.readJSON(configFile) || grunt.fail.fatal(
        'Please create a squarespace.json file.'),

      clean: {
        /* make sure to warn before nuking repo */
        repo: {
          src: (function() {
            grunt.file.exists(repoDir) && grunt.fail.warn('Really want to nuke the repo?');
            return [repoDir]
          })()
        },

        build: {
          src: ['build']
        }
      },

      gitclone: {
        repo: {
          options: {
            repository: '<%= squarespace.repo %>',
            branch: 'master',
            directory: 'repo'
          }
        }
      },

      gitpush: {
        push: {
          options: {
            branch: 'master'
          }
        }
      },

      bower: {
        compile: {
          options: {
            targetDir: 'lib',
            layout: 'byType'
          }
        }
      }

    });

  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');

  grunt.registerTask(
    'clone', 
    'Clone the Squarespace git repo.',
    ['clean:repo', 'gitclone:repo']
  );

  grunt.registerTask(
    'compile',
    'Collect, minify, and copy all bower assets.',
    ['bower']
  );
};