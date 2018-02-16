import { join } from 'path'
import { pathExists, readJson } from 'fs-extra'

import fetchSheet from './fetch-sheet'
import sheetToObj from './sheet-to-obj'
import dataMap from './data-map'
import writeApi from './write-api'

async function createApi(config){
	// Get config
	let configPath = join(process.cwd(), './static-sheets.config.js')
	if (typeof config !== 'object' && await pathExists(configPath)){
		config = await import(configPath)
	}
	config = {
		dir: `dist`,
		paths: [ `:rowId` ],
		outputJson: true,
		lowerCasePath: true,
		fileExtension: '.json',
		schema: {},
		...config
	}

	// Create API
	let data = await fetchSheet(process.env)
	data = sheetToObj(data, config)
	data = dataMap(data, config)
	if(config.outputJson){
		await writeApi(data, config)
	}
	return data
}

export default createApi