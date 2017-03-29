FROM node:7-alpine

MAINTAINER 1256573276@qq.com

COPY ./ /home/work/project/json-server

WORKDIR /home/work/project/json-server

RUN npm i
RUN npm run build

CMD npm start

EXPOSE 3000
