FROM node:17-alpine
WORKDIR /usr/src/server
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
# CMD ["yarn", "start"]
EXPOSE 3001
CMD ["yarn", "run", "dev"]
