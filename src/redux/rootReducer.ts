import { combineReducers } from 'redux'
import menuSlice from './slices/menuSlice'
import userSlice from './slices/userSlice'
import authSlice from './slices/authSlice'
import keywordsSlice from './slices/keywordsSlice'

const rootReducer = combineReducers({
	menu: menuSlice,
	user: userSlice,
	auth: authSlice,
	keywords: keywordsSlice,
})

export default rootReducer
