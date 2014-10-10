/*
 * grunt-avatarlabs-googlespreadsheetexporter
 * https://github.com/jleplomet/grunt-avatarlabs-googlespreadsheetexporter
 *
 * Copyright (c) 2014 Jeff Leplomet
 * Licensed under the MIT license.
 */

'use strict';

var async                 = require('async');
var read                  = require('read');
var keychain              = require('keychain');
var _                     = require('underscore');
var GoogleSpreadsheet     = require('edit-google-spreadsheet');
var GoogleSpreadsheetFile = require('../lib/GoogleSpreadsheetFile');

var done;

function Task (grunt) {
  grunt.registerMultiTask('googlespreadsheetexporter', 'Export language file from Google Spreadsheets using your Google Account.', function () {
    done = this.async();

    // var task = this;
    var options = this.options();
    options.dest = this.data.dest;

    // Make sure grunt creates the destination folders if they don't exist
    if (!grunt.file.exists(options.dest)) {
      grunt.file.mkdir(options.dest)
    }

    //check user's password exists in the keychain, if not, request.
    //we can define the password in grunt options but that might
    //suck if projects are shared. It will be a dev known option only.
    if (!_.has(options, 'password')) {
      keychain.getPassword({account: options.username, service: 'google_spreadsheet_exporter', type: 'internet'}, function (err, password) {
        if (err) {
          grunt.log.warn('WARNING: ' + err.message);

          return Task.askForPassword(grunt, options);
        }

        options.password = password;

        Task.runTask(grunt, options);
      });
    }
    else {
      Task.runTask(grunt, options);
    }
  });
}

Task.askForPassword = function (grunt, options) {
  read({
    prompt: 'Google Account password: ',
    silent: true
  }, function (error, password) {
    if (error) {
      return grunt.fail.warn(error.message);
    }

    if (!password || password == '') {
      grunt.log.warn('Please enter your password.');

      return Task.askForPassword(grunt, options);
    }

    //save users password to keychain for later use.
    keychain.setPassword({ account: options.username, service: 'google_spreadsheet_exporter', type: 'internet', password: password }, function (error) {
      if (error) {
        return grunt.fail.warn(error.message);
      }

      //save password to options
      options.password = password;

      Task.runTask(grunt, options);
    });
  })
}

Task.runTask = function (grunt, options) {
<<<<<<< HEAD
  GoogleSpreadsheet.load({
    debug: false,
    spreadsheetId: options.spreadSheetId,
    worksheetName: options.worksheetName,
    username: options.username,
    password: options.password
  }, function (error, spreadsheet) {
=======
  async.eachSeries(options.worksheetName, function (sheet, callback) {
    GoogleSpreadsheet.load({
      debug: false,
      spreadsheetId: options.spreadSheetId,
      worksheetName: sheet,
      username: options.username,
      password: options.password,
      useCellTextValues: (_.has(options, 'useCellTextValues')) ? options.useCellTextValues : true
    }, function (error, spreadsheet) {
      if (error) {
        throw error;
      }

      spreadsheet.receive(function (error, rows, info) {
        if (error) {
          throw error;
        }

        //write file.
        GoogleSpreadsheetFile.createFile(rows, options.format, options.dest, sheet, callback);
      });
    });
  }, function (error) {
>>>>>>> FETCH_HEAD
    if (error) {
      throw error;
    }

    spreadsheet.receive(function (error, rows, info) {
      if (error) throw error;

      var sheetHeaders = rows['1'];

      sheetHeaders = _.invert(sheetHeaders);
      
      async.eachSeries(options.languages, function (language, callback) {
        var languageRows = [];

        //create an object based on the language
        _.each(rows, function (row, index) {
          //skip first row
          if (index == 1) return;

          var languageRowObj = {};

          //Tag will always exist
          languageRowObj[sheetHeaders.TAG] = row[sheetHeaders.TAG];

          if (_.has(row, sheetHeaders.VALUE)) {
            languageRowObj[sheetHeaders.VALUE] = ( _.has(row, sheetHeaders[language]) ) ? row[ sheetHeaders[language] ] : row[sheetHeaders.VALUE];
          }

          if (_.has(row, sheetHeaders.ATTRIBUTES)) {
            languageRowObj[sheetHeaders.ATTRIBUTES] = row[sheetHeaders.ATTRIBUTES];
          }

          if (_.has(row, sheetHeaders.PARENT)) {
            languageRowObj[sheetHeaders.PARENT] = row[sheetHeaders.PARENT];
          }

          languageRows.push(languageRowObj);
        });

        GoogleSpreadsheetFile.createFile(languageRows, options.format, options.dest, language, callback);
      }, function (error) {
        if (error) throw error;

        done();
      })
    })
  });
}


module.exports = Task;