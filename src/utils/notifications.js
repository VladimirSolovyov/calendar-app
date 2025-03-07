import { notification } from 'antd'
import i18n from '../i18n'
import { MINUTE_IN_MS, THIRTY_SECONDS_IN_MS } from '../constants/time'

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
			startTime.getTime() - event.reminderMinutes * MINUTE_IN_MS
		)

		if (Math.abs(now - reminderTime) < THIRTY_SECONDS_IN_MS) {
			showNotification(
				'info',
				i18n.t('reminder'),
				i18n.t('eventReminder', {
					title: event.title,
					minutes: event.reminderMinutes,
				})
			)
		}
	})
}
