# grunt-avatarlabs-googlespreadsheetexporter

> Export langague file from Google Spreadsheet using your Google Account.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install --save-dev https://github.com/jleplomet/grunt-avatarlabs-googlespreadsheetexporter/archive/0.6.0.tar.gz
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
      spreadSheetId: '',
      worksheetName: 'lang',
      languages: ['eng', 'es']
      format: 'json',
      "oauth2": {
        "client_id": "751010553762-3numb6hsojh9h3ha8fdlldpdj48nb9v8.apps.googleusercontent.com",
        "client_secret": "oIW02KT5UVxOiHjwjfY-rhUp",
        "refresh_token": "1/lwGNQaNuVr8gyNuD4MMNLv3orkpP9DCqqDGWKE_BDtQ"
      }
    },
    your_target: {
      // Target-specific file lists and/or options go here.
      dest: '[FILE SAVE LOCATION]'
    },
  },
});
```

### Authentication

This plugin now uses oauth2 to login to Google. Please include oauth2 from above overview and keep it private as its an Avatarlabs specific login.

### Options

#### options.spreadSheetId
Type: `String`
Required

The ID of your spreadsheet.

#### options.worksheetName
Type: `String`
Required

The current name of your worksheet.

#### options.languages
Type: `Array`
Required

The current supported languages. In your sheet, this will be a column. This is will also be used as the generated file's name.
