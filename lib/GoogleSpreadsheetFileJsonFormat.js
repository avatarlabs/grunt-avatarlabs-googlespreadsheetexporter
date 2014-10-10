var _ = require('underscore');

function _isEmpty(value) {
  return value === null || value === undefined ? true : /^[\s\xa0]*$/.test(value);
}

function _createRootNode( root, child, value, attributes ) {
  if (attributes == undefined) {
    root[child] = value;
  }
  else {
    root[child] = {};

    _createAttributes(root[child], attributes);

    root[child]['value'] = value;
  }
}

function _createAttributes( root, attributes ) {
  attributes = attributes.split('|');

  attributes.forEach(function (attribute) {
    attribute = attribute.split('='); //key:value

    root[attribute[0]] = attribute[1];
  });
}

function _createObj(key, value, attributes) {
  var obj = {};

  if (!(attributes == undefined)) {
    obj[key] = {};
    obj[key].value = value;
    
    _createAttributes(obj[key], attributes);
  }
  else {
    obj[key] = value;
  }

  return obj;
}

function _writeJson(data) {
  var file = {};

  _.each(data, function (row, index) {
    /*
      Tag = 1
      Value = 2
      Attributes = 3
      Parent = 4
    */

    //make sure each row has the correct amount of keys based on guide above
    //if not, set a default of an empty string.
    row = _.defaults(row, {'1': '', '2': '', '3': undefined, '4': ''});

    //save a reference to each column to make things easier
    var child = row['1'], value = row['2'], attributes = row['3'], parent = row['4'];

    //create a root node if row is defined as so
    if (!_isEmpty(child) && (_isEmpty(value) && _isEmpty(parent))) {
      _createRootNode(file, child, {});
    }
    //check if row is defined as key/value pair on root node
    if ( (!_isEmpty(child) && !_isEmpty(value)) && _isEmpty(parent) ) {
      _createRootNode(file, child, value);
    }
    //check if row which has a parent exists
    if (_.has(file, parent)) {
      //if child has the same parent and parent is already
      //an array, push child.
      if (_.isArray(file[parent][child + 's'])) {
        var _temp = {};
        _createRootNode(_temp, child, value, attributes);

        file[parent][child + 's'].push(_temp[child]);
      }
      //if parent already has a child with the same name
      //convert parent to array to handle multiple childs
      //with same name
      else if (_.has(file[parent], child)) {
        var currentObj = file[parent];
        
        file[parent][child + 's'] = [currentObj[child]];

        var _temp = {};
        _createRootNode(_temp, child, value, attributes);

        file[parent][child + 's'].push(_temp[child]);  

        delete file[parent][child];
      }
      //just create child as a root node to parent
      else {
        _createRootNode(file[parent], child, value, attributes);
      }
    }
  });
  
  return file;
}

module.exports = _writeJson;