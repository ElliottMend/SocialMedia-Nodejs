FROM node:14-alpine3.13
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --quiet
COPY . .
EXPOSE 5000