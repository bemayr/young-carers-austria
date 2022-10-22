FROM node:18 AS builder

# Create app directory
WORKDIR /app

# Copy everything to the container, there might be a better caching strategy
COPY . .

# Install app dependencies
RUN npm install

RUN npm run prod:build

FROM node:18

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.keystone ./.keystone
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/schema.prisma ./

# Set the Database URL for `prisma migrate deploy`
ENV DATABASE_URL="file:./database/yc.db"
ENV NODE_ENV="production"

EXPOSE 3000
CMD [ "npm", "run", "prod:start" ]
