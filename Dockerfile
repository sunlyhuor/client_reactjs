FROM node:16.10-alpine

WORKDIR /app

COPY ./package.json     /app

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev", "--", "--host" ]