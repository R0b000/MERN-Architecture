FROM node:20-alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache netcat-openbsd

EXPOSE 3000 5000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
