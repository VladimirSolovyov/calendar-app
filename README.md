# Календарь событий

Календарь событий с поддержкой русского и английского языков.

## Возможности

- Создание и управление событиями
- Напоминания
- Поддержка двух языков (🇷🇺/en)
- Адаптивный дизайн

## Технологии

- React + Redux
- React Router
- Ant Design
- i18next
- Moment.js

## Структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── LanguageSwitcher.js # Переключатель языков
│   └── Logo.js         # Логотип
├── pages/              # Страницы приложения
│   ├── Calendar.js     # Календарь
│   └── EventForm.js    # Форма событий
├── i18n/               # Локализация
├── store/              # Redux store
└── utils/              # Утилиты
```

## Установка

```bash
npm install
npm start
```

[Демо версия](https://vladimirsolovyov.github.io/calendar-app)

## Сборка

```bash
npm run build
```
