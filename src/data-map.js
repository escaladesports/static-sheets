import createPath from './create-path'
import typeConversion from './type-conversion'
import includeIgnore from './include-ignore'
import sortData from './sort-data'
import paginateData from './paginate-data'

function createDataMap(data, config) {
	console.log('Creating data map...')
	let output = {}
	let configsObj = {}
	data.forEach(obj => {

		// Get paths and configs
		let paths
		let configs
		if (!Array.isArray(config.paths)) {
			paths = []
			configs = []
			for (let i in config.paths) {
				paths.push(i)
				configs.push({
					...config,
					...config.paths[i]
				})
			}
		}
		else {
			paths = config.paths
			configs = paths.map(() => {
				return { ...config }
			})
		}

		paths.forEach((path, key) => {
			let config = configs[key]
			delete config.paths
			let data = { ...obj }
			data = typeConversion(data, config)
			data = includeIgnore(data, config)
			path = createPath(path, data, config)
			if(path === false) return
			path = `${config.dir}/${path}`
			configsObj[path] = config

			// Add to array of output data
			if (!config.single) {
				if (!(path in output)) {
					output[path] = []
				}
				output[path].push(data)
			}
			// Only return a single object
			else {
				if (!(path in output)) {
					output[path] = data
				}
			}
		})
	})

	for (let path in output) {
		if(!Array.isArray(output[path])) continue
		sortData(output[path], configsObj[path])
		paginateData(path, output, output[path], configsObj[path])
	}

	return output
}


export default createDataMap