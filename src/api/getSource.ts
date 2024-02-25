import axios from 'axios'
import { Source } from '../types/sourceTypes'

export const getSource = async (sourceName: string) => {
	const response = await axios.get<Source[]>(`./../../DB/sources.json`)
	if (response.data && response.data.length > 0) {
		return response.data.find(
			(source: Source) =>
				source.name === sourceName.charAt(0).toUpperCase() + sourceName.slice(1)
		)
	}
	return
}
