#!/bin/bash
IDX=undaunted
curl -XPUT "elastic_search:9200/${IDX}?pretty" -H 'Content-Type: application/json' -d'
{
    "mappings": {
      "doc": {
            "properties": {
                "keyword": {
                  "type": "text",
                  "analyzer": "english"
                }
            }
          }
    }
}'

curl -XPUT "elastic_search:9200/contacts?pretty" -H "Content-Type: application/json" -d'
{
  "mappings": {
    "doc": {
      "properties": {
        "location": {
          "type": "geo_point"
        }
      }
    }
  }
}'
