#!/bin/bash
IDX=undaunted
curl -XPUT "localhost:9200/${IDX}?pretty" -H 'Content-Type: application/json' -d'
{
    "settings" : {
        "index" : {
            "number_of_shards" : 1,
            "number_of_replicas" : 1
        },
        "mappings": {
           "_doc": {
              "properties": {
              "text": { 
              "type": "text",
              "fields": {
                "topic": { 
                  "type":     "text",
                  "analyzer": "english"
            }
          }
        }
      }
    }
  }
}
'
curl -XPUT "localhost:9200/${IDX}/doc/1?pretty" -H 'Content-Type: application/json' -d'
{
    "keyword" : "eviction",
    "reponse" : "Why are you getting evicted?"
}
'

curl -XGET "localhost:9200/${IDX}/_search?pretty" -H 'Content-Type: application/json' -d'
{
  "query" : {"query_string": {"query": "I am getting evicted, what do I do?"}},
  "size": 1
}
'


