#!/bin/bash

# Инициализация Git-репозитория
git init

# Добавление всех файлов, кроме исключенных в .gitignore
git add .

# Первый коммит
git commit -m "Initial commit"

# Инструкции для подключения к удаленному репозиторию
echo "Репозиторий инициализирован. Для подключения к GitHub выполните:"
echo "git remote add origin https://github.com/ваш-аккаунт/calendar-app.git"
echo "git push -u origin master" 