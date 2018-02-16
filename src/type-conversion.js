function typeConversion(obj, config){
	for(let key in obj){
		let val = obj[key]
		// Type conversions
		switch (config.types[key]) {
			case Number:
				val = Number(val)
				break
			case Date:
				val = new Date(val).getTime()
				break
			case Boolean:
				val = val.toLowerCase()
				if (
					val == 'unchecked' ||
					val == 'no' ||
					val == 'false' ||
					val == '0' ||
					val == 0
				) {
					val = false
				}
				else {
					val = true
				}
				break
		}
		obj[key] = val
	}
	return obj
}
export default typeConversion