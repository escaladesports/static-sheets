function createPath(path, data, config) {
	path = path.split('/')
	path = path.map(str => {
		if (str.charAt(0) === ':') {
			str = str.replace(':', '')
			if (str in data) {
				let dir = `${data[str]}`
				if (config.lowerCasePath) {
					dir = dir.toLowerCase()
				}
				return dir
			}
			return false
		}
		return str
	})
	for(let i = path.length; i--;){
		if(path[i] === false) return false
	}
	return path.join('/')
}

export default createPath