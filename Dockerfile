FROM node:18-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

ENV NODE_ENV development

# prepare only node_modules and prisma client
# src will be mounted via volume
# build at runtime, not here
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY prisma ./prisma

# dev dependencies for api integration testing
RUN npm install
RUN npx prisma generate

RUN rm -rf prisma

# volumes folders must be created and chowned before docker-compose creates them as root
# create them during docker build
RUN mkdir -p .next dist
RUN chown node:node . node_modules .next dist
RUN chown -R node:node node_modules/.prisma

CMD [ "npm run dev" ]