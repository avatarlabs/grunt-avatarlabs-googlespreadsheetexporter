/*
 * grunt-avatarlabs-googlespreadsheetexporter
 * https://github.com/jleplomet/grunt-avatarlabs-googlespreadsheetexporter
 *
 * Copyright (c) 2014 Jeff Leplomet
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: {
      name: 'grunt-avatarlabs-googlespreadsheetexporter'
    },

    googlespreadsheetexporter: {
      options: {
        spreadSheetId: '1nI8gLC2OaPjWwbt5m2G8mzi1oY1Hrchl6O13YxuGECY',
        worksheetName: 'lang',
        languages: ['eng', 'es', 'de'],
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