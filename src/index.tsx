import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
//router
import { BrowserRouter } from 'react-router-dom'
//redux
import { Provider } from 'react-redux'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)
