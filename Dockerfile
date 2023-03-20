FROM node

WORKDIR /app

EXPOSE 5173

CMD make docker-dev
