import { load as loadEnv } from 'envdotjs'
import { expect } from 'chai'
import createApi from '../src'

loadEnv()

const config = {
	spreadsheetId: '1pUVUer7_y0-IzryIYXITQE2qlZO7G0d96kya4q_HgRY',
	paths: {
		'review/:rowId': {
			single: true,
			include: [
				'reviewBody',
				'rowId'
			]
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