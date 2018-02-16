import { join } from 'path'
import { pathExists, readJson } from 'fs-extra'

import fetchSheet from './fetch-sheet'
import sheetToObj from './sheet-to-obj'
import dataMap from './data-map'
import writeApi from './write-api'

async function createApi(config, configFile = 'static-sheets.config.js'){
	// Get config
	let configPath = join(process.cwd(), configFile)
	if (typeof config !== 'object' && await pathExists(configPath)){
		config = await import(configPath)
	}
	config = {
		dir: `dist`,
		paths: {
			':rowId': {
				single: true
			}
		},
		outputJson: true,
		fileExtension: `.json`,
		lowerCasePath: true,
		schema: {},
		...config
	}

	// Create API
	let data = await fetchSheet(config)
	data = sheetToObj(data, config)
	data = dataMap(data, config)
	if(config.outputJson){
		await writeApi(data, config)
	}
	return data
}

export default createApi