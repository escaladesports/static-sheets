# Google Sheets Static API Generator

WIP

Builds a static API with any Google Sheet.

## Installation

```bash
npm install --global static-sheets
```

## Usage

Create a `static-sheets.config.js` file in the root directory of your project. Supply your [Google Sheets API credentials](https://developers.google.com/sheets/api/guides/authorizing#APIKey), as well as the spreadsheet ID and worksheet ID.

Your spreadsheet ID is the long string of characters in the URL. For example: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit#gid=0`.

The worksheet ID is the name of the tab at the bottom that you want to use.

```javascript
// static-sheets.config.js
'use strict'
module.exports = {
	privateKey: '',
	cilentEmail: '',
	spreadsheetId: '',
	worksheetId: '',
}
```

Then run in your terminal:

```bash
static-sheets
```

This should output all your JSON files in the `dist` directory. For more CLI options, run `static-sheets --help`.