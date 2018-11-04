#!/bin/sh
echo '-----------------------------------'
echo 'Installing packages'
echo '-----------------------------------'
yarn

echo '-----------------------------------'
echo 'Linting Python code'
echo '-----------------------------------'
pycodestyle server.py
npm run lint -s

echo '-----------------------------------'
echo 'Creating dist files'
echo '-----------------------------------'
npm run build -s

echo '-----------------------------------'
echo 'Starting Flask server'
echo '-----------------------------------'
FLASK_APP=server.py flask run