FROM node

WORKDIR /app

EXPOSE 5173

CMD npm i; npm run docker-dev
