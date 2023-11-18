# Stage 1: create node image w/ pnpm installed
FROM node:18-alpine AS base
RUN npm i -g pnpm

# Stage 2: install dependencies
FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Stage 3: build, build, build
FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

# This will allow us to specify which build script to use. Defaults to just `build`.
ARG BUILD_SCRIPT_NAME=build

RUN pnpm $BUILD_SCRIPT_NAME
RUN pnpm prune --prod

# Stage 4: actually deploy the thing via nginx
FROM nginx AS deploy
COPY --from=build /app/dist/spa /usr/share/nginx/html
COPY nginx/templates /etc/nginx/templates

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
