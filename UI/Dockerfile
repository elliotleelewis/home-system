FROM node:14-alpine AS build-env
WORKDIR /app

# Install api dependencies
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

# Copy everything else and build
COPY . .
RUN yarn build

# Build runtime image
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build-env /app/dist/ .
