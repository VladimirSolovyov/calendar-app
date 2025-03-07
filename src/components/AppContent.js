import React, { useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Layout, ConfigProvider } from 'antd'
import { useTranslation } from 'react-i18next'
import { Calendar } from '../pages/Calendar'
import { EventForm } from '../pages/EventForm'
import { Logo } from './Logo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Navigation } from './Navigation'
import enUS from 'antd/lib/locale/en_US'
import ruRU from 'antd/lib/locale/ru_RU'

const { Header, Content } = Layout

const ROUTES = {
	CALENDAR: ['/', '/calendar-app', '/calendar-app/'],
	NEW_EVENT: ['/new-event', '/calendar-app/new-event'],
}

export const AppContent = () => {
	const location = useLocation()
	const { i18n } = useTranslation()

	const locale = useMemo(
		() => (i18n.language === 'ru' ? ruRU : enUS),
		[i18n.language]
	)

	const selectedKey = useMemo(() => {
		const path = location.pathname
		if (ROUTES.CALENDAR.includes(path)) return '1'
		if (ROUTES.NEW_EVENT.includes(path)) return '2'
		if (path.includes('/edit-event/')) return ''
		return '1'
	}, [location.pathname])

	return (
		<ConfigProvider locale={locale}>
			<Layout className='app-layout'>
				<Header>
					<Logo language={i18n.language} />
					<LanguageSwitcher />
					<Navigation selectedKey={selectedKey} />
				</Header>
				<Content className='content-wrapper'>
					<div className='content-container'>
						<Routes>
							<Route path='/' element={<Calendar />} />
							<Route path='/calendar-app' element={<Calendar />} />
							<Route path='/new-event' element={<EventForm />} />
							<Route path='/edit-event/:id' element={<EventForm />} />
						</Routes>
					</div>
				</Content>
			</Layout>
		</ConfigProvider>
	)
}
