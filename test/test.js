import { load as loadEnv } from 'envdotjs'
import { expect } from 'chai'
import createApi from '../src'

loadEnv()

describe('Default module', () => {
	it('Should have content', async () => {
		let data = await createApi(process.env)
		console.log(data)
		expect(data).to.not.be.empty
	})
})