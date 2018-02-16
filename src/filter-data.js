import { filter } from 'filter-objects'

export default function sortData(arr, config) {
	if (!config.filter) return arr
	return filter(config.filter, arr)
}