import { remove, outputJson } from 'fs-extra'
import decamelize from 'decamelize'

function createDataMap(data, config){
	console.log('Creating data map...')
	let output = {}
	data.forEach(obj => {
		config.paths.forEach(path => {
			path = createPath(path, obj, config)
			path = `${config.dir}/${path}.json`
			if(!(path in output)){
				output[path] = []
			}
			output[path].push(obj)
		})
	})
	return output
}

function createPath(path, data, config){
	path = path.split('/')
	path = path.map(str => {
		if(str.charAt(0) === ':'){
			str = str.replace(':', '')
			if(data[str]){
				let dir = `${data[str]}`
				if(config.lowerCasePath){
					dir = dir.toLowerCase()
				}
				return dir
			}
		}
		return str
	})
	return path.join('/')
}

async function writeApi(data, config){
	console.log('Writing API...')
	await remove(config.dir)
	data = createDataMap(data, config)
	let promises = []
	for(let path in data){
		promises.push(outputJson(path, data[path], config.jsonOptions))
	}
	await Promise.all(promises)
}

export default writeApi