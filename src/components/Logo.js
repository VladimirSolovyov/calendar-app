import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoEnSvg from '../assets/images/gazprombank-logo.svg'
import logoRuSvg from '../assets/images/gazprombank-logo-ru.svg'

export const Logo = ({ language = 'ru' }) => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	const handleClick = () => {
		navigate('/')
	}

	const logoSrc = language === 'ru' ? logoRuSvg : logoEnSvg
	const logoText = t('common.bankName')

	return (
		<div className='logo' onClick={handleClick}>
			<img
				src={logoSrc}
				alt={logoText}
				title={logoText}
				className='logo-image'
			/>
		</div>
	)
}
