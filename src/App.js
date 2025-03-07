import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { AppContent } from './components/AppContent'

export const App = () => {
	return (
		<Provider store={store}>
			<Router basename={process.env.PUBLIC_URL}>
				<AppContent />
			</Router>
		</Provider>
	)
}
