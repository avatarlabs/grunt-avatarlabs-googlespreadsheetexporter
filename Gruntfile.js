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
        format: 'json',
        "oauth2": {
          "client_id": "751010553762-3numb6hsojh9h3ha8fdlldpdj48nb9v8.apps.googleusercontent.com",
          "client_secret": "oIW02KT5UVxOiHjwjfY-rhUp",
          "refresh_token": "1/lwGNQaNuVr8gyNuD4MMNLv3orkpP9DCqqDGWKE_BDtQ"
        }
      },
      dev: {
        dest: '.tmp/files/data/'
      }
    }
  });

  grunt.loadTasks('tasks');
};
