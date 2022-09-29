FROM node:15.13-alpine

WORKDIR /core

ENV PATH="./node_modules/.bin:$PATH"

COPY . .  

RUN npm install --legacy-peer-deps

RUN npm run build

CMD [ "node", "./server/index.js" ]
