# grunt-avatarlabs-googlespreadsheetexporter

> Export langague file from Google Spreadsheet using your Google Account.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-avatarlabs-googlespreadsheetexporter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-avatarlabs-googlespreadsheetexporter');
```

## The "googlespreadsheetexporter" task

### Overview
In your project's Gruntfile, add a section named `googlespreadsheetexporter` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  googlespreadsheetexporter: {
    options: {
      // Task-specific options go here.
      username: '', //Google Account Email Address
      spreadSheetId: '',
      worksheetName: ['en_us', 'es_mx'],
      format: 'json'
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      dest: '[FILE SAVE LOCATION]'
    },
  },
});
```

### Options

#### options.username
Type: `String`
Required

Google Account email address.

#### options.spreadSheetId
Type: `String`
Required

The ID of your spreadsheet.

#### options.worksheetName
Type: `Array`
Required

The current name of your worksheet. This is will also be used as the generated file's name.

## Contributing
Coming soon.

## Release History
0.0.1 - Initial release of this plugin. Only exports JSON. Html characters are currently not supported.
