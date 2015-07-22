/**
 * Created by nghi on 19.7.2015.
 */
//Created manually
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8000,
          base: 'src'
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: false,
        plugins:[ //this helps solving the problem of "Can not load "coverage", it is not registered!"
          'karma-jasmine',
          'karma-coverage',
          'karma-phantomjs-launcher'
        ]
      }
    },
    protractor: {
      e2e: {
        options: {
          args: {
            specs: ['test/e2e/**/*.js']
          },
          configFile: 'protractor.conf.js',
          keepAlive: true
        }
      }
    },
    protractor_webdriver: {
      start: {
        options: {
          path: './node_modules/protractor/bin/',
          command: 'webdriver-manager start',
        },
      }
    }
  });
  grunt.registerTask('test', [
    'karma:unit'
  ]);
  grunt.registerTask('e2e', [
    'connect:server',
    'protractor_webdriver:start',
    'protractor:e2e'
  ]);
}