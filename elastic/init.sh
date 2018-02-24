#!/bin/bash
IDX=undaunted
curl -XPUT "localhost:9200/${IDX}?pretty" -H 'Content-Type: application/json' -d'
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
curl -XPUT "localhost:9200/${IDX}/doc/1?pretty" -H 'Content-Type: application/json' -d'
{
    "keyword" : "eviction",
    "response" : "Why are you getting evicted?"
}
'
curl -XPUT "localhost:9200/${IDX}/doc/1?pretty" -H 'Content-Type: application/json' -d'
{
    "keyword" : "eviction money",
    "response" : "Money response"
}
'
curl -XGET "localhost:9200/${IDX}/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "query" : {"query_string": {"query": "I am getting evicted, what do I do?"}},
  "size": 1
}
'
