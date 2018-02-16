# Google Sheets Static API Generator

WIP

Builds a static API with any Google Sheet.

## Installation

```bash
npm install --global static-sheets
```

## Basic Usage

To start, you'll need your secret key and client email from your [Google Sheets API credentials](https://developers.google.com/sheets/api/guides/authorizing#APIKey) as well as your spreadsheet ID. Your spreadsheet ID is the long string of characters in the URL. For example: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit#gid=0`.

Make sure that you have a header row in your spreadsheet. The headers will be camel cased and used as keys in your data objects. Example:

![Header Example](https://github.com/escaladesports/static-sheets/blob/master/img/header.png)


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
		'product/:commentId': {}
	}
	...
}
```

## Pagination

## Sorting

## Limit/Offset

## Querying

## Options
