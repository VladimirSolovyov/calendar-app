import React from 'react'
// @ts-ignore
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// @ts-ignore
import { Layout, Menu } from 'antd'
import Calendar from './components/Calendar'
import EventForm from './components/EventForm'
// @ts-ignore
import { Provider } from 'react-redux'
import store from './store'
// @ts-ignore
import 'antd/dist/antd.css'

// @ts-ignore
const { Header, Content } = Layout

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Layout style={{ minHeight: '100vh' }}>
					<Header>
						<div className='logo' />
						<Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
							<Menu.Item key='1'>
								<Link to='/'>Календарь</Link>
							</Menu.Item>
							<Menu.Item key='2'>
								<Link to='/new-event'>Новое событие</Link>
							</Menu.Item>
						</Menu>
					</Header>
					<Content style={{ padding: '50px' }}>
						<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
							<Routes>
								<Route path='/' element={<Calendar />} />
								<Route path='/new-event' element={<EventForm />} />
								<Route path='/edit-event/:id' element={<EventForm />} />
							</Routes>
						</div>
					</Content>
				</Layout>
			</Router>
		</Provider>
	)
}

export default App
