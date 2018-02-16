import createPath from './create-path'
import typeConversion from './type-conversion'

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
			let data = { ...obj }
			data = typeConversion(data, config)
			path = createPath(path, data, config)
			path = `${config.dir}/${path}${config.fileExtension}`

			// Include/ignore data
			if(config.ignore){
				if (typeof config.ignore === 'string'){
					delete data[config.ignore]
				}
				else{
					config.ignore.forEach(key => {
						delete data[key]
					})
				}
			}
			else if (config.include) {
				let newData = {}
				if (typeof config.ignore === 'string') {
					config.include = [ config.include ]
				}
				config.include.forEach(key => {
					newData[key] = data[key]
				})
				data = newData
			}

			// Only output data
			if (!config.single) {
				if (!(path in output)) {
					output[path] = []
				}
				output[path].push(data)
			}
			// Add to array of outputdata
			else {
				if (!(path in output)) {
					output[path] = data
				}
			}
		})
	})
	return output
}

export default createDataMap