# base image
FROM node:8-alpine

# contact me
MAINTAINER Ahmad Ardiansyah '<ahmad.ardiansyah@carsworld.id>'

# copy all project to docker
WORKDIR /opt/app
COPY . .
COPY env.json.production env.json

# install dependencies
RUN npm install

# open port
EXPOSE 4000

# start application
CMD ["npm", "start"]