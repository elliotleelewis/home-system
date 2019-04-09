FROM node:10
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
