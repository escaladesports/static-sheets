export default function sortData(arr, config){
	if(!config.sort) return arr
	if(typeof config.sort === 'function'){
		return arr.sort(config.sort)
	}
	return arr.sort((a, b) => {
		for(let key in config.sort){
			let dir = config.sort[key]
			let aKey = a[key]
			let bKey = b[key]
			if(typeof aKey === 'string'){
				aKey = aKey.toLowerCase()
			}
			if (typeof bKey === 'string'){
				bKey = bKey.toLowerCase()
			}
			if(dir === 'ascending'){
				if (aKey < bKey) return -1
				else if (aKey > bKey) return 1
			}
			else {
				if (aKey < bKey) return 1
				else if (aKey > bKey) return -1
			}
		}
		return 0
	})
}