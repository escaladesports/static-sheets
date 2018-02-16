export default function includeIgnore(data, config){
	if (config.ignore) {
		if (typeof config.ignore === 'string') {
			delete data[config.ignore]
		}
		else {
			config.ignore.forEach(key => {
				delete data[key]
			})
		}
	}
	else if (config.include) {
		let newData = {}
		if (typeof config.ignore === 'string') {
			config.include = [config.include]
		}
		config.include.forEach(key => {
			newData[key] = data[key]
		})
		data = newData
	}
	return data
}