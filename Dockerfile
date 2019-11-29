# base image
FROM node:8-alpine

# contact me
MAINTAINER Ahmad Ardiansyah '<ahmad.ardiansyah@carsworld.id>'

# copy all project to docker
WORKDIR /opt/app
COPY . .

# install dependencies
RUN npm install

# open port
EXPOSE 3000

# start application
CMD ["npm", "start"]