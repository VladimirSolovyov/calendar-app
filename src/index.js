import React from 'react'
// @ts-ignore
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// @ts-ignore
import 'antd/dist/antd.css' // Для Ant Design v4

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
