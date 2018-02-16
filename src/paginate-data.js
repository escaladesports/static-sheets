export default function paginateData(path, output, arr, config){
	if(!config.paginate) return
	let cur = []
	let res = [ cur ]
	arr.forEach(data => {
		if(cur.length === config.paginate){
			cur = []
			res.push(cur)
		}
		cur.push(data)
	})

	let totalPages = res.length
	res.forEach((arr, key) => {
		let page = key + 1
		output[`${path}/${page}`] = {
			results: arr,
			meta: {
				limit: config.paginate,
				totalPages,
				page
			}
		}
	})
	delete output[path]
}