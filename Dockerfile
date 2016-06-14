FROM node:6.2

WORKDIR /src

RUN apt-get update && apt-get install libelf1

ADD ./package.json /src

ADD ./npm-shrinkwrap.json /src

RUN npm install
