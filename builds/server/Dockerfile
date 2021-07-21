FROM node:14

# Set environment
ENV NODE_ENV development
ENV PORT 5000

# Create app directory.
WORKDIR /app

# Build dependencies.
COPY ["package.json", "./"]

RUN yarn install

COPY . .

# Expose the port
EXPOSE 5000

CMD ["bash", "./scripts/init-server-dev.sh"]