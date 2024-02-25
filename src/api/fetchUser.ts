// npms
import axios from 'axios'
// Types
import { IUser, UserToken } from '../types/userTypes'

export const fetchUserInfo = async (
	id: number,
	token: UserToken
): Promise<IUser> => {
	const { data } = await axios.get(`./../../DB/users.json`)
	const newData: IUser = data.find((user: IUser) => user.id === id)
	return newData
}
