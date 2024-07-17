### build stage ###
FROM node:22.4.1-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

### run stage ###
FROM node:22.4.1-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app/build
EXPOSE 80
ENTRYPOINT serve -s -p 80 build