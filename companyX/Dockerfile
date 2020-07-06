FROM node:7
RUN npm install -g sails
WORKDIR /app
COPY package.json /app
COPY . /app
CMD npm start
EXPOSE 1337