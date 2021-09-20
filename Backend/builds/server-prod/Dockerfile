FROM node:14

# Install global files
RUN ["yarn", "global", "add",  "knex"]
RUN ["yarn", "global", "add",  "typescript"]
RUN ["yarn", "global", "add",  "pm2"]

# Create app directory.
WORKDIR /app

# Build dependencies.
COPY ["package.json", "./"]

RUN yarn install

COPY . .

# Expose the port
EXPOSE 8000

CMD ["bash", "./scripts/init-server-prod.sh"]