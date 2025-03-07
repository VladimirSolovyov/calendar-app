import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { useTranslation } from 'react-i18next'

export const Navigation = ({ selectedKey }) => {
	const { t } = useTranslation()

	return (
		<Menu theme='dark' mode='horizontal' selectedKeys={[selectedKey]}>
			<Menu.Item key='1'>
				<Link to='/'>{t('calendar')}</Link>
			</Menu.Item>
			<Menu.Item key='2'>
				<Link to='/new-event'>{t('newEvent')}</Link>
			</Menu.Item>
		</Menu>
	)
}
