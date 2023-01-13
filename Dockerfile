# Base image
FROM node:18-alpine AS base
RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM nginx AS deploy
COPY --from=build /app/dist/spa /usr/share/nginx/html

EXPOSE 80

ENV API_BASE_URL http://host.docker.internal:9085;

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
