// @ts-ignore
import { notification } from 'antd'

export const showNotification = (type, message, description) => {
	notification[type]({
		message,
		description,
		placement: 'topRight',
		duration: 4,
	})
}

export const checkEventReminders = events => {
	const now = new Date()

	events.forEach(event => {
		const startTime = new Date(event.startTime)
		const reminderTime = new Date(
			startTime.getTime() - event.reminderMinutes * 60000
		)

		if (Math.abs(now - reminderTime) < 30000) {
			// Проверяем каждые 30 секунд
			showNotification(
				'info',
				'Напоминание о событии',
				`Событие "${event.title}" начнется через ${event.reminderMinutes} минут`
			)
		}
	})
}
