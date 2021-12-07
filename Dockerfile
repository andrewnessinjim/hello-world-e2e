FROM  node:17-bullseye-slim

#Express port
EXPOSE 3000

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

COPY --chown=node:node . .

ENV NODE_ENV=production

CMD ["node", "/app/src/server/hello.js"]