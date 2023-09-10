FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm build

FROM node:18-alpine as api
WORKDIR /app
RUN npm i -g pnpm
COPY package.json pnpm-lock.yaml /app
COPY --from=builder /app/node_modules/ /app/node_modules/

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/dist /app/dist
RUN pnpm install --force --frozen-lockfile --prod
CMD ["pnpm", "start"]

FROM nginx as n
COPY ./templates/nest.conf /etc/nginx/conf.d/default.conf