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
        username: 'jeff@avatarlabs.com',
        spreadSheetId: '0AqGGDjzAOsLPdFdxdGdFaHpaMzA5b2d3a1lLRzFMdWc',
        worksheetName: ['en_us'],
        format: 'json'
      },
      dev: {
        dest: '.tmp/files/data/'
      }
    }
  });

  grunt.loadTasks('tasks');
};