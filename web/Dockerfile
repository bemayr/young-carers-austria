FROM node:20-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy everything to the container
COPY . .

# Install app dependencies
RUN cp -r /usr/src/app /usr/src/writable-app/ && cd /usr/src/writable-app && echo $PWD && ls && npm ci && npm run build

# Build the actial (really small) image
FROM lipanski/docker-static-website:2.1.0

COPY --from=builder /usr/src/writable-app/_site .
