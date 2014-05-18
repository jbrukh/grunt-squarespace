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
        compile: {
          src: ['lib', 'build']
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
        repo: {
          options: {
            branch: 'master'
          }
        }
      },

      gitpull: {
        repo: {
          options: {
            directory: repoDir,
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
    function() {
      grunt.file.exists(repoDir) && grunt.fail.warn('Sure you want to nuke the repo?');
      grunt.file.delete(repoDir);
      grunt.task.run('gitclone:repo');
    }
  );

  grunt.registerTask(
    'compile',
    'Collect, minify, and copy all bower assets.',
    ['bower']
  );

  grunt.registerTask('default', 'Default task.', ['compile']);
};