import { join } from 'path'
import { pathExists, readJson } from 'fs-extra'

import fetchSheet from '../src/fetch-sheet'
import sheetToObj from '../src/sheet-to-obj'

async function createApi(config){
	let configPath = join(process.cwd(), './static-sheets.config.js')
	if (!config && await pathExists(configPath)){
		config = await import(configPath)
	}
	config = {
		schema: {},
		...config
	}

	let data = await fetchSheet(process.env)
	data = sheetToObj(data, config)
	return data
}

export default createApi