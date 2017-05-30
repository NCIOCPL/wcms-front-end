FROM node:6

#RUN apt-get -y update \
#    && apt-get -y install git

WORKDIR /build

COPY . .

RUN npm install -g grunt
RUN npm install