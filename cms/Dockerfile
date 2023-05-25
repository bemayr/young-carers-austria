FROM node:20-alpine AS builder

# enable pnpm

RUN apk update && apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@8.5.1 --activate 

# Create app directory
WORKDIR /app

# Copy everything to the container
COPY . .

# Install app dependencies
RUN pnpm install && pnpm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN pnpm install --production

ENV PAYLOAD_CONFIG_PATH="/app/dist/payload.config.js"
ENV NODE_ENV="production"

EXPOSE 3000
CMD [ "node", "dist/server.js" ]
