import createPath from './create-path'
import typeConversion from './type-conversion'
import includeIgnore from './include-ignore'

function createDataMap(data, config) {
	console.log('Creating data map...')
	let output = {}
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

			// Add to array of output data
			if (!config.single) {
				if (config.paginate) {
					addToPaginated(output, path, data, config.paginate)
				}
				else {
					if (!(path in output)) {
						output[path] = []
					}
					output[path].push(data)
				}
			}
			// Only return a single object
			else {
				if (!(path in output)) {
					output[path] = data
				}
			}
		})
	})
	return output
}

function addToPaginated(output, path, data, limit){
	let i = 1
	let added = false
	let page
	while(!added){
		page = `${path}/${i}`
		if (!output[page] || !output[page].meta){
			output[page] = {
				results: [],
				meta: {
					page: i,
					limit: limit,
				}
			}
		}
		if (output[page].results.length < limit){
			output[page].results.push(data)
			added = true
		}
		else{
			i++
		}
	}
	// Update number of pages in all meta
	let pages = i
	while(i >= 1){
		console.log(`${path}/${i}`)
		output[`${path}/${i}`].meta.pages = pages
		i--
	}
}

export default createDataMap