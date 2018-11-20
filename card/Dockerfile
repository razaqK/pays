FROM node:8.12

RUN mkdir -p /var/log/application/card

COPY package*.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

# For development environment, we want to use pm2 to keep the code running
RUN npm install pm2@latest knex -g

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /usr/src/app && cp -R ./node_modules ./usr/src/app

WORKDIR /usr/src/app

# Map a volume for the log files and add a volume to override the code
VOLUME ["/usr/src/app", "/var/log/application/card"]

# Copy entire file to docker
COPY . /usr/src/app

COPY ./bin/run.sh /usr/src/app/bin/run.sh
RUN chmod +x ./bin/run.sh /usr/src/app/bin/run.sh

EXPOSE 80
CMD ["/usr/src/app/bin/run.sh"]