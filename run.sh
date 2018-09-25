#!/bin/sh
echo '-----------------------------------'
echo 'Installing packages'
echo '-----------------------------------'
npm i

echo '-----------------------------------'
echo 'Linting Python code'
echo '-----------------------------------'
pycodestyle server/server.py
npm run lint

echo '-----------------------------------'
echo 'Creating dist files'
echo '-----------------------------------'
npm run build

echo '-----------------------------------'
echo 'Starting Flask server'
echo '-----------------------------------'
FLASK_APP=server.py flask run