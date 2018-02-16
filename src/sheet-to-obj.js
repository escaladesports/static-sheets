import camelCase from 'camelcase'

const nonAlpha = /[^0-9a-z\-_ ]/gi

export default function sheetToObj(arr, config){
	let keys = arr.shift()
	let camel = keys.map(key => {
		key = key.replace(nonAlpha, '')
		return camelCase(key)
	})
	arr = arr.map(data => {
		let obj = {}
		data.forEach((val, key) => {
			key = camel[key]
			// Type conversions
			switch (config.schema[key]){
				case Number:
					val = Number(val)
					break
				case Date:
					val = new Date(val).getTime()
					break
				case Boolean:
					val = val.toLowerCase()
					if(
						val == 'unchecked' ||
						val == 'no' ||
						val == 'false' ||
						val == '0' ||
						val == 0
					){
						val = false
					}
					else{
						val = true
					}
					break
			}
			obj[key] = val
		})
		return obj
	})
	return arr
}