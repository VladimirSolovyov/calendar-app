import React, { useState, useEffect, useCallback } from 'react'
import { Calendar as AntCalendar, Badge, Button, ConfigProvider } from 'antd'
import { useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/ru'
import 'moment/locale/en-gb'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { showNotification } from '../utils/notifications'
import { MINUTE_IN_MS, THIRTY_SECONDS_IN_MS } from '../constants/time'
import enUS from 'antd/lib/locale/en_US'
import ruRU from 'antd/lib/locale/ru_RU'

export const Calendar = () => {
	const { t, i18n } = useTranslation()
	const events = useSelector(state => state.events.items)
	const navigate = useNavigate()
	const [selectedDate, setSelectedDate] = useState(moment())
	const [locale, setLocale] = useState(i18n.language === 'ru' ? ruRU : enUS)

	useEffect(() => {
		moment.locale(i18n.language === 'ru' ? 'ru' : 'en-gb')
		setLocale(i18n.language === 'ru' ? ruRU : enUS)
	}, [i18n.language])

	useEffect(() => {
		const checkReminders = () => {
			const now = new Date()
			const upcomingEvents = events.filter(event => {
				const startTime = new Date(event.startTime)
				return startTime > now
			})

			upcomingEvents.forEach(event => {
				const startTime = new Date(event.startTime)
				const reminderTime = new Date(
					startTime.getTime() - event.reminderMinutes * MINUTE_IN_MS
				)

				if (Math.abs(now - reminderTime) < THIRTY_SECONDS_IN_MS) {
					showNotification(
						'info',
						t('reminder'),
						t('eventReminder', {
							title: event.title,
							minutes: event.reminderMinutes,
						})
					)
				}
			})
		}

		checkReminders()
		const interval = setInterval(checkReminders, THIRTY_SECONDS_IN_MS)
		return () => clearInterval(interval)
	}, [events, t])

	const dateCellRender = useCallback(
		value => {
			const dayEvents = events.filter(
				event =>
					moment(event.startTime).format('YYYY-MM-DD') ===
					value.format('YYYY-MM-DD')
			)

			return (
				<ul className='events'>
					{dayEvents.map(event => (
						<li key={event.id}>
							<Badge
								status='success'
								text={event.title}
								onClick={() => navigate(`/edit-event/${event.id}`)}
								className='event-badge'
							/>
						</li>
					))}
				</ul>
			)
		},
		[events, navigate]
	)

	const onSelect = useCallback(
		date => {
			setSelectedDate(date)

			const dayEvents = events.filter(
				event =>
					moment(event.startTime).format('YYYY-MM-DD') ===
					date.format('YYYY-MM-DD')
			)

			if (dayEvents.length > 0) {
				showNotification(
					'success',
					t('eventsForDay'),
					t('youHaveEvents', {
						count: dayEvents.length,
						date: date.format('DD.MM.YYYY'),
					})
				)
			}
		},
		[events, t]
	)

	return (
		<ConfigProvider locale={locale}>
			<div>
				<Button
					type='primary'
					onClick={() => navigate('/new-event')}
					className='add-event-button'
				>
					{t('addEvent')}
				</Button>

				<AntCalendar
					dateCellRender={dateCellRender}
					onSelect={onSelect}
					value={selectedDate}
				/>
			</div>
		</ConfigProvider>
	)
}
