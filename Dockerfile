FROM node:6.2

WORKDIR /src

RUN npm install -g yarn

ADD ./package.json /src

ADD ./yarn.lock /src

RUN yarn
