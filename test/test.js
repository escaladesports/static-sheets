import { load as loadEnv } from 'envdotjs'
import { expect } from 'chai'
import createApi from '../src'

loadEnv()

const config = {
	paths: {
		'review/:rowId': {
			single: true,
			include: [ 'reviewBody' ]
		},
		'product/:productSku': {
			ignore: [ 'reviewBody' ]
		},
	},
	types: {
		timestamp: Date,
		lengthOwned: Number,
		wouldRecommendProduct: Boolean,
		approved: Boolean,
	},
	jsonOptions: { spaces: '\t' },
	...process.env
}

describe('Default module', () => {
	it('Should have content', async () => {
		let data = await createApi(config)
		expect(data).to.not.be.empty
	}).timeout(10 * 60 * 1000)
})