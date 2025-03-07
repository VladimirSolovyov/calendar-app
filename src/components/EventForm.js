import React, { useEffect, useState } from 'react'
import { Form, Input, DatePicker, Button, InputNumber, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent, editEvent, deleteEvent } from '../store/eventSlice'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { showNotification } from '../utils/notifications'

const { RangePicker } = DatePicker

const EventForm = () => {
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const events = useSelector(state => state.events.items)
	const [currentEvent, setCurrentEvent] = useState(null)

	useEffect(() => {
		if (id) {
			const event = events.find(e => e.id === parseInt(id) || e.id === id)
			if (event) {
				setCurrentEvent(event)
				form.setFieldsValue({
					title: event.title,
					timeRange: [moment(event.startTime), moment(event.endTime)],
					reminderMinutes: event.reminderMinutes,
				})
			}
		}
	}, [id, events, form])

	const handleSubmit = values => {
		const eventData = {
			id: currentEvent?.id || Date.now().toString(),
			title: values.title,
			startTime: values.timeRange[0].format(),
			endTime: values.timeRange[1].format(),
			reminderMinutes: values.reminderMinutes,
		}

		if (currentEvent) {
			dispatch(editEvent(eventData))
			showNotification('success', 'Успешно', 'Событие обновлено')
		} else {
			dispatch(addEvent(eventData))
			showNotification('success', 'Успешно', 'Событие создано')
		}

		navigate('/')
	}

	const handleDelete = () => {
		if (currentEvent) {
			dispatch(deleteEvent(currentEvent.id))
			showNotification('success', 'Успешно', 'Событие удалено')
			navigate('/')
		}
	}

	return (
		<div>
			<h2>
				{currentEvent ? 'Редактировать событие' : 'Создать новое событие'}
			</h2>
			<Form
				form={form}
				onFinish={handleSubmit}
				layout='vertical'
				style={{ maxWidth: 600 }}
			>
				<Form.Item
					name='title'
					label='Название'
					rules={[
						{ required: true, message: 'Пожалуйста, введите название события' },
					]}
				>
					<Input placeholder='Введите название события' />
				</Form.Item>

				<Form.Item
					name='timeRange'
					label='Время начала и окончания'
					rules={[{ required: true, message: 'Пожалуйста, выберите время' }]}
				>
					<RangePicker
						showTime={{ format: 'HH:mm' }}
						format='YYYY-MM-DD HH:mm'
						placeholder={['Начало', 'Окончание']}
					/>
				</Form.Item>

				<Form.Item
					name='reminderMinutes'
					label='Напомнить за (минут)'
					rules={[
						{
							required: true,
							message: 'Пожалуйста, укажите время напоминания',
						},
					]}
				>
					<InputNumber min={1} placeholder='Минут до начала' />
				</Form.Item>

				<Form.Item>
					<Button type='primary' htmlType='submit' style={{ marginRight: 8 }}>
						{currentEvent ? 'Сохранить' : 'Создать'}
					</Button>

					{currentEvent && (
						<Button danger onClick={handleDelete}>
							Удалить
						</Button>
					)}

					<Button style={{ marginLeft: 8 }} onClick={() => navigate('/')}>
						Отмена
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default EventForm
