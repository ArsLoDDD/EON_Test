import axios from 'axios'
import { Keyword } from '../redux/slices/keywordsSlice'

export const fetchKeywords = async (): Promise<Keyword[]> => {
	const { data } = await axios.get(`./../../DB/keywords.json`)
	if (localStorage.getItem('userKeywords')) {
		const newData = JSON.parse(localStorage.getItem('userKeywords') || '[]')
		const filteredData = newData.filter(
			(word: string) => !data.data.includes(word)
		)
		return [...data.data, ...filteredData]
	}
	return data.data
}
