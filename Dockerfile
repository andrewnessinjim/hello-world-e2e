FROM  node:17-bullseye-slim

ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH

#Express port
EXPOSE 3000

WORKDIR /app

COPY package*json ./
RUN npm ci && npm cache clean --force

WORKDIR /app/sourcecode

EXPOSE 9229

#Hack to solve cypress perm error
RUN chmod 777 /root

CMD gulp server:dev 