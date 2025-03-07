import React, { useState, useEffect } from 'react'
import { Calendar as AntCalendar, Badge, notification, Button } from 'antd'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { showNotification } from '../utils/notifications'

const Calendar = () => {
	const events = useSelector(state => state.events.items)
	const navigate = useNavigate()
	const [selectedDate, setSelectedDate] = useState(moment())

	// Проверка напоминаний
	useEffect(() => {
		const checkReminders = () => {
			const now = new Date()

			events.forEach(event => {
				const startTime = new Date(event.startTime)
				const reminderTime = new Date(
					startTime.getTime() - event.reminderMinutes * 60000
				)

				// Проверяем, нужно ли показать напоминание
				if (Math.abs(now - reminderTime) < 30000) {
					showNotification(
						'info',
						'Напоминание',
						`У вас запланировано "${event.title}" через ${event.reminderMinutes} минут`
					)
				}
			})
		}

		const interval = setInterval(checkReminders, 30000)
		return () => clearInterval(interval)
	}, [events])

	const dateCellRender = value => {
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
							style={{ cursor: 'pointer' }}
						/>
					</li>
				))}
			</ul>
		)
	}

	const onSelect = date => {
		setSelectedDate(date)

		// Получаем события на выбранный день
		const dayEvents = events.filter(
			event =>
				moment(event.startTime).format('YYYY-MM-DD') ===
				date.format('YYYY-MM-DD')
		)

		if (dayEvents.length > 0) {
			showNotification(
				'success',
				'События на день',
				`У вас ${dayEvents.length} событий на ${date.format('DD.MM.YYYY')}`
			)
		}
	}

	return (
		<div>
			<Button
				type='primary'
				onClick={() => navigate('/new-event')}
				style={{ marginBottom: 16 }}
			>
				Добавить событие
			</Button>

			<AntCalendar
				dateCellRender={dateCellRender}
				onSelect={onSelect}
				value={selectedDate}
			/>
		</div>
	)
}

export default Calendar
