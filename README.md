# static-sheets

## A Google Sheets Static API Generator

Builds a static API with any Google Sheet.

## Installation

```bash
npm install --global static-sheets
```

## Basic Usage

To start, you'll need your secret key and client email from your [Google Sheets API credentials](https://developers.google.com/sheets/api/guides/authorizing#APIKey) as well as your spreadsheet ID. Your spreadsheet ID is the long string of characters in the URL. For example: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit#gid=0`.

Make sure that you have a header row in your spreadsheet. The headers will be camel cased and used as keys in your data objects. Example:

![Header Example](https://raw.githubusercontent.com/escaladesports/static-sheets/master/img/header.png)


Then create a `static-sheets.config.js` file in the root directory of your project.

```javascript
// static-sheets.config.js
module.exports = {
	privateKey: 'YOUR_SHEETS_PRIVATE_KEY',
	cilentEmail: 'YOUR_SHEETS_CLIENT_EMAIL',
	spreadsheetId: 'YOUR_SPREADSHEET_ID',
}
```

Run  static-sheets in your terminal:

```bash
static-sheets
```

## Endpoints

By default, there will only be a single endpoint for each row. You can add more endpoints in your config:

```javascript
// static-sheets.config.js
module.exports = {
	paths: {
		'api/:categoryName': {},
		'api/:categoryName/:productId': {},
	}
	...
}
```

This might generate filepaths similar to:

```
/api/apples.json
/api/pears.json
/api/apples/apl-01.json
/api/apples/apl-02.json
/api/pears/pr-01.json
/api/pears/pr-02.json
```

Remember to camelcase your headers when writing your paths. For example, a header of `Comment ID` could be used in a path like:

```javascript
// static-sheets.config.js
module.exports = {
	paths: {
		'comments/:commentId': {}
	}
	...
}
```

## Options

Options can be supplied to individual paths, or in the config object if you want the option to apply to all paths.

### Pagination

To paginate into multiple paths:

```javascript
// static-sheets.config.js
...
paths: {
	'category/:categoryId': {
		paginate: 5
	}
}
...
```

This will limit the number of rows in a file to 5 and might generate filepaths similar to:

```
/category/apples/1.json
/category/apples/2.json
/category/apples/3.json
```

### Single Object

Set `single` to true if you only want to return a single object rather than an array.

### Type Conversion

By default, all Google sheets data comes through as a string. But if you need other types, static-sheets can convert them for you.

```javascript
// static-sheets.config.js
...
paths: {
	'reviews/:productId': {}
},
types: {
	timestamp: Date,
	rating: Number,
	approved: Boolean
}
...
```

### Sorting

Supply an key to sort by the return:

```javascript
// static-sheets.config.js
...
paths: {
	'reviews/:productId': {
		sort: {
			timestamp: 'ascending',
		},
	}
}
...
```

If you need more control over sorting, you can also supply a [sort function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

```javascript
// static-sheets.config.js
...
paths: {
	'reviews/:productId': {
		sort: function(a, b){
			if(a.timestamp > b.timestamp){
				return -1
			}
			if(a.timestamp < b.timestamp){
				return 1
			}
			return 0
		}
	}
}
...
```

### Filtering

To limit results, you can pass in a filter object. If the result doesn't match the filter object, it will not be included in the results.

```javascript
...
paths: {
	'reviews/:productId': {
		filter: {
			approved: true
		}
	}
}
...
```