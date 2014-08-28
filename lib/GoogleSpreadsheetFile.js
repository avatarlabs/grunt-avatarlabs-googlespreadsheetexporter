
var fs = require('fs');

//FORMATS
const JSONFILE = 'json';

var FileJsonFormat = require('./GoogleSpreadsheetFileJsonFormat');

function _createFile(rows, format, dest, name, callback) {
  var formatter, file;

  switch(format) {
    // case JSONFILE:
    //   formatter = FileJsonFormat;
    //   break;
    default:
      name += '.json';
      formatter = FileJsonFormat;
      break;
  }

  file = formatter(rows);

  _writeFile(file, dest, name, callback);
}

function _writeFile(file, dest, name, callback) {
  var output = dest + name;

  console.log("creating file: " + output);

  fs.writeFile(output, JSON.stringify(file), function (error) {
    if (error) {
      throw error;
    }

    callback();
  });
}

module.exports = {
  createFile: _createFile
};