#!/bin/bash
curl localhost:5000/query -XPOST -H"content-type: application/json" -d"{\"query\":\"$1\", \"keywords\":$2}"

