FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Copy everything to the container
COPY . .

# Install app dependencies
RUN npm ci && npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

RUN npm install --production

ENV PAYLOAD_CONFIG_PATH="/app/dist/payload.config.js"
ENV NODE_ENV="production"

EXPOSE 3000
CMD [ "node", "dist/server.js" ]
