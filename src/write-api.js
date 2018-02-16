import { remove, outputJson } from 'fs-extra'

async function writeApi(data, config){
	console.log('Writing API...')
	await remove(config.dir)
	let promises = []
	for(let path in data){
		promises.push(outputJson(`${path}${config.fileExtension}`, data[path], config.jsonOptions))
	}
	await Promise.all(promises)
}

export default writeApi