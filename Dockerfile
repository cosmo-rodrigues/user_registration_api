FROM node:17-alpine
WORKDIR /usr/src/server
COPY packege*.json .
RUN yarn install --frozen-lockfile
COPY . .
# CMD ["yarn", "start"]
CMD ["yarn", "run", "dev"]
