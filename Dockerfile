FROM node:16.15.0
WORKDIR /usr/src/server
COPY yarn.lock .
COPY package.json .
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3001
CMD ["yarn", "run", "start"]
# CMD ["yarn", "run", "dev"]
