import { combineReducers } from 'redux'
import mainSlice from './slices/mainSlice'
import menuSlice from './slices/menuSlice'
import userSlice from './slices/userSlice'

const rootReducer = combineReducers({
	main: mainSlice,
	menu: menuSlice,
	user: userSlice,
})

export default rootReducer
