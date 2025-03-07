import React, { useEffect, useState, useCallback } from 'react'
import {
	Form,
	Input,
	DatePicker,
	Button,
	InputNumber,
	ConfigProvider,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent, editEvent, deleteEvent } from '../store/eventSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import 'moment/locale/ru'
import 'moment/locale/en-gb'
import { showNotification } from '../utils/notifications'
import enUS from 'antd/lib/locale/en_US'
import ruRU from 'antd/lib/locale/ru_RU'

const { RangePicker } = DatePicker

export const EventForm = () => {
	const { t, i18n } = useTranslation()
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const events = useSelector(state => state.events.items)
	const [currentEvent, setCurrentEvent] = useState(null)
	const [locale, setLocale] = useState(i18n.language === 'ru' ? ruRU : enUS)

	useEffect(() => {
		moment.locale(i18n.language === 'ru' ? 'ru' : 'en-gb')
		setLocale(i18n.language === 'ru' ? ruRU : enUS)
	}, [i18n.language])

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

	const handleSubmit = useCallback(
		values => {
			const eventData = {
				id: currentEvent?.id || Date.now().toString(),
				title: values.title,
				startTime: values.timeRange[0].format(),
				endTime: values.timeRange[1].format(),
				reminderMinutes: values.reminderMinutes,
			}

			if (currentEvent) {
				dispatch(editEvent(eventData))
				showNotification('success', t('success'), t('eventUpdated'))
			} else {
				dispatch(addEvent(eventData))
				showNotification('success', t('success'), t('eventCreated'))
			}

			navigate('/')
		},
		[currentEvent, dispatch, navigate, t]
	)

	const handleDelete = useCallback(() => {
		if (currentEvent) {
			dispatch(deleteEvent(currentEvent.id))
			showNotification('success', t('success'), t('eventDeleted'))
			navigate('/')
		}
	}, [currentEvent, dispatch, navigate, t])

	return (
		<ConfigProvider locale={locale}>
			<div>
				<h2>{currentEvent ? t('editEvent') : t('createEvent')}</h2>
				<Form
					form={form}
					onFinish={handleSubmit}
					layout='vertical'
					className='event-form'
					initialValues={{
						reminderMinutes: 30, // Добавляем значение по умолчанию
					}}
				>
					<Form.Item
						name='title'
						label={t('title')}
						rules={[{ required: true, message: t('enterTitle') }]}
					>
						<Input placeholder={t('enterTitle')} />
					</Form.Item>

					<Form.Item
						name='timeRange'
						label={t('timeRange')}
						rules={[
							{ required: true, message: t('pleaseSelectTime') },
							{
								validator: (_, value) => {
									if (
										value &&
										value[0] &&
										value[1] &&
										value[0].isAfter(value[1])
									) {
										return Promise.reject(
											new Error(t('startTimeMustBeBeforeEnd'))
										)
									}
									return Promise.resolve()
								},
							},
						]}
					>
						<RangePicker
							showTime={{ format: 'HH:mm' }}
							format='YYYY-MM-DD HH:mm'
							placeholder={[t('start'), t('end')]}
						/>
					</Form.Item>

					<Form.Item
						name='reminderMinutes'
						label={t('reminderMinutes')}
						rules={[
							{
								required: true,
								message: t('pleaseSetReminder'),
							},
							{
								type: 'number',
								min: 1,
								message: t('reminderMustBePositive'),
							},
						]}
					>
						<InputNumber min={1} placeholder={t('minutesBeforeStart')} />
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' className='submit-button'>
							{currentEvent ? t('save') : t('create')}
						</Button>

						{currentEvent && (
							<Button
								danger
								onClick={handleDelete}
								style={{ marginLeft: '8px' }}
							>
								{t('delete')}
							</Button>
						)}

						<Button
							className='cancel-button'
							onClick={() => navigate('/')}
							style={{ marginLeft: '8px' }}
						>
							{t('cancel')}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</ConfigProvider>
	)
}
