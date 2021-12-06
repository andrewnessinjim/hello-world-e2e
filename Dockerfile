FROM  node:17-bullseye-slim

ENV NODE_ENV=development

#Express port
EXPOSE 3000

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
COPY --chown=node:node package*.json ./
USER node

RUN npm ci && \
    npm cache clean --force 

COPY --chown=node:node . .

ENV PATH=/app/node_modules/.bin:$PATH
RUN gulp server:build

ENV NODE_ENV=development
RUN npm ci \
    && npm cache clean --force

CMD ["node", "/app/run.js"]