FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

COPY packages ./packages

RUN yarn install

EXPOSE 4000

ENTRYPOINT ["sh", "./entrypoint.sh"]