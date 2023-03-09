FROM node:18.15-slim

RUN apt-get -qy update && apt-get -qy install openssl

WORKDIR /university-management/

COPY package.json package-lock.json /university-management/

RUN npm ci --silent

COPY . .

CMD npm run start:dev