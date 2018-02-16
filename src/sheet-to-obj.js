import camelCase from 'camelcase'

const nonAlpha = /[^0-9a-z\-_ ]/gi

export default function sheetToObj(arr, config){
	console.log('Converting sheet data to object...')
	let keys = arr.shift()
	let camel = keys.map(key => {
		key = key.replace(nonAlpha, '')
		return camelCase(key)
	})
	arr = arr.map((data, rowId) => {
		let obj = {}
		data.forEach((val, key) => {
			key = camel[key]
			obj[key] = val
		})
		if(!obj.rowId){
			obj.rowId = rowId
		}
		return obj
	})
	return arr
}