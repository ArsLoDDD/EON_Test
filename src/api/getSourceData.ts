import axios from 'axios'
import { SourceDataPosts } from '../types/sourceTypes'

export const getSourceData = async (sourceName: string) => {
	const response = await axios.get<SourceDataPosts[]>(
		`./../../DB/sourcesData/${sourceName}Data.json`
	)
	return response.data
}
