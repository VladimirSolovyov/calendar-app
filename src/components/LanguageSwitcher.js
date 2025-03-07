import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import './LanguageSwitcher.css'

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation()

	const changeLanguage = lng => {
		i18n.changeLanguage(lng)
	}

	return (
		<div className='language-switcher'>
			<Button
				type={i18n.language === 'ru' ? 'primary' : 'default'}
				size='small'
				onClick={() => changeLanguage('ru')}
				style={{ marginRight: 8 }}
			>
				RU
			</Button>
			<Button
				type={i18n.language === 'en' ? 'primary' : 'default'}
				size='small'
				onClick={() => changeLanguage('en')}
			>
				EN
			</Button>
		</div>
	)
}
