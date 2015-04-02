/*
 * grunt-avatarlabs-googlespreadsheetexporter
 * https://github.com/jleplomet/grunt-avatarlabs-googlespreadsheetexporter
 *
 * Agency: Avatarlabs
 * Developer: Jeff Leplomet <jeff@avatarlabs.com>
 */

'use strict';

var async                 = require('async');
var read                  = require('read');
var keychain              = require('keychain');
var _                     = require('underscore');
var GoogleSpreadsheet     = require('edit-google-spreadsheet');
var GoogleSpreadsheetFile = require('../lib/GoogleSpreadsheetFile');

var done,
    KEYCHAIN_ACCOUNT = "google_spreadsheet_exporter_account",
    KEYCHAIN_SERVICE = "google_spreadsheet_exporter",
    KEYCHAIN_TYPE    = "internet";

function Task (grunt) {
  grunt.registerMultiTask('googlespreadsheetexporter', 'Export language file from Google Spreadsheets using your Avatarlabs Google Account.', function () {
    done = this.async();

    // var task = this;
    var options = this.options();
    options.dest = this.data.dest;

    // Make sure grunt creates the destination folders if they don't exist
    if (!grunt.file.exists(options.dest)) {
      grunt.file.mkdir(options.dest)
    }

    //check user's email, password exists in the keychain, if not, request.

    keychain.getPassword({ account: KEYCHAIN_ACCOUNT, service: KEYCHAIN_SERVICE, type: KEYCHAIN_TYPE }, function ( err, password ) {
      if (err) {
        grunt.log.warn('WARNING: ' + err.message);

        return Task.askForEmail(grunt, options);
      }

      var gAccount = password.split(":"), gEmail = gAccount[0], gPass = gAccount[1];

      options.username = gEmail;
      options.password = gPass;

      Task.runTask(grunt, options);
    });
  });
}

Task.askForEmail = function (grunt, options) {
  // read user's email
  read({
    prompt: 'Google Account Email: '
  }, function (error, email) {
    if (error) return grunt.fail.warn(error.message);

    if (!email || email === '') {
      grunt.log.warn('Please enter your email.');

      return Task.askForEmail(grunt, options);
    }

    options.username = email;

    Task.askForPassword(grunt, options);
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
    var gAccount = options.username + ":" + password;

    keychain.setPassword({ account: KEYCHAIN_ACCOUNT, service: KEYCHAIN_SERVICE, type: KEYCHAIN_TYPE, password: gAccount}, function (error) {
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
  GoogleSpreadsheet.load({
    debug: false,
    spreadsheetId: options.spreadSheetId,
    worksheetName: options.worksheetName,
    username: options.username,
    password: options.password,
    useCellTextValues: (_.has(options, 'useCellTextValues')) ? options.useCellTextValues : true
  }, function (error, spreadsheet) {

    if (error) throw error;

    spreadsheet.receive(function (error, rows, info) {
      if (error) throw error;

      var sheetHeaders = rows['1'];

      // TAG, VALUE, ATTRIBUTES, PARENT
      sheetHeaders = _.invert(sheetHeaders);

      async.eachSeries(options.languages, function (language, callback) {
        var languageRows = [];

        //create an object based on the language
        _.each(rows, function (row, index) {
          //skip first row, we do not need the sheet headers
          if (index == 1) return;

          var languageRowObj = {};

          //Tag will always exist
          languageRowObj[sheetHeaders.TAG] = row[sheetHeaders.TAG];

          if (_.has(row, sheetHeaders.VALUE)) {
            // each column to the right of the sheetHeaders will represent
            // a language code and each row will contain a value for language
            // if not, we will default to the original value of the row.
            languageRowObj[sheetHeaders.VALUE] = ( _.has(row, sheetHeaders[language]) ) ? row[ sheetHeaders[language] ] : row[sheetHeaders.VALUE];
          }

          if (_.has(row, sheetHeaders.ATTRIBUTES)) {
            // check if a language also has a value for language attributes
            var languageAttributesId = language + "_ATTRIBUTES";

            languageRowObj[sheetHeaders.ATTRIBUTES] = (_.has(row, sheetHeaders[languageAttributesId])) ? row[sheetHeaders[languageAttributesId]] : row[sheetHeaders.ATTRIBUTES];
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
