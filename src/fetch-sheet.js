import { ServiceAccount, GoogleSheet } from 'google-sheets-manager'

function findKey(config, key, env){
	let res = config[key] || process.env[env]
	if(res) return res
	console.log(`config.${key} or process.env.${env} required`)
	process.exit(1)
}

export default function fetchSheet(config){
	return new Promise((resolve, reject) => {
		let privateKey = findKey(config, 'privateKey', 'GOOGLE_SHEETS_PRIVATE_KEY')
		let clientEmail = findKey(config, 'clientEmail', 'GOOGLE_SHEETS_CLIENT_EMAIL')
		let spreadsheetId = findKey(config, 'spreadsheetId', 'GOOGLE_SHEETS_SPREADSHEET_ID')
		let sheetId = config.sheetId || process.env.GOOGLE_SHEETS_SPREADSHEET_ID || 0

		const authClass = new ServiceAccount({
			private_key: privateKey,
			client_email: clientEmail,
		})
		const sheetApi = new GoogleSheet(
			authClass,
			spreadsheetId,
			sheetId
		)
		sheetApi.getData((err, res) => {
			if (err) return reject(err)
			resolve(res)
		})
	})
}