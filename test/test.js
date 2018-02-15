import { load as loadEnv } from 'envdotjs'
import { expect } from 'chai'
import fetchGoogleSheet from '../src/fetch-google-sheet'

loadEnv()

describe('Default module', () => {
	it('Should have content', async () => {
		const data = await fetchGoogleSheet(process.env)
		console.log(data)
		expect(data).to.not.be.empty
	})
})