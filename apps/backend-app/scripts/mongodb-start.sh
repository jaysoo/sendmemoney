#!/bin/bash

docker ps -a | grep mongodb

STATUS=$?

if [ $STATUS -ne 0 ]; then
  docker pull mongo:4.2.13
  docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.2.13
else
  docker restart mongodb
fi
