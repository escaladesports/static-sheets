function createPath(path, data, config) {
	path = path.split('/')
	path = path.map(str => {
		if (str.charAt(0) === ':') {
			str = str.replace(':', '')
			if (data[str]) {
				let dir = `${data[str]}`
				if (config.lowerCasePath) {
					dir = dir.toLowerCase()
				}
				return dir
			}
		}
		return str
	})
	return path.join('/')
}

export default createPath