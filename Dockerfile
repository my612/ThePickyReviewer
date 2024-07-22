FROM node:18.18.2

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./

# RUN npm install -g npm@10.8.1

RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]