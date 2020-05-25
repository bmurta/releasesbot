FROM  node:12-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app/
CMD node bot.js