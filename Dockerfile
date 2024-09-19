ARG NODE_VERSION=20.13.1

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install

COPY . .
# Run the build script.
RUN npm run build

EXPOSE 6070

CMD ["npm", "start"]
