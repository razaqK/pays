#!/usr/bin/env bash

chown -R www-data:www-data /usr/src/app

mkdir -p /var/log/application && \
chmod -R 777 /var/log/application
chown -R www-data:www-data /var/log/application
export NODE_PATH=.
npm install

knex migrate:latest
npm start

pkill -f Rabbitmq