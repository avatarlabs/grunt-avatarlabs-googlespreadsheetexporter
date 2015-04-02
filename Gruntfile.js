/*
 * grunt-avatarlabs-googlespreadsheetexporter
 * https://github.com/jleplomet/grunt-avatarlabs-googlespreadsheetexporter
 *
 * Agency: Avatarlabs
 * Developer: Jeff Leplomet <jeff@avatarlabs.com>
 */
'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: {
      name: 'grunt-avatarlabs-googlespreadsheetexporter'
    },

    googlespreadsheetexporter: {
      options: {
        spreadSheetId: '1zUoZEpZW2x5JTknjswAARUghNBf8fx0gX7BzaVMoLwQ',
        worksheetName: 'lang',
        languages: ['eng', 'es'],
        useCellTextValues: false,
        format: 'json'
      },
      dev: {
        dest: '.tmp/files/data/'
      }
    }
  });

  grunt.loadTasks('tasks');
};
