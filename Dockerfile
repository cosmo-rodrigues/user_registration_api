FROM node:16.15.0
WORKDIR /usr/src/server
COPY package.json .
RUN yarn
COPY . .
# CMD ["yarn", "start"]
EXPOSE 3001
CMD ["yarn", "run", "dev"]
