import { ServiceAccount, GoogleSheet } from 'google-sheets-manager'

export default function fetchSheet(creds){
	return new Promise((resolve, reject) => {
		console.log('Fetching sheet...')
		const authClass = new ServiceAccount(creds)
		const sheetApi = new GoogleSheet(authClass, '1pUVUer7_y0-IzryIYXITQE2qlZO7G0d96kya4q_HgRY', 0)
		sheetApi.getData((err, res) => {
			if (err) return reject(err)
			resolve(res)
		})
	})
}