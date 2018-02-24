#!/bin/bash
curl localhost:5000/contacts -XPOST -H"content-type: application/json" -d'{"lat": 39.75, "lng": -84.17}'
