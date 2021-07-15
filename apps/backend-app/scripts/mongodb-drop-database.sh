#!/bin/bash

docker exec -t mongodb mongo sendmemoney --eval "db.dropDatabase()"
