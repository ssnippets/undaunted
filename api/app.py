from flask import Flask, request
import json

app = Flask('Access API')

from elasticsearch import Elasticsearch
es = Elasticsearch()

import config
from flask_cors import CORS
CORS(app)

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    query = data['query']
    keywords = data['keywords']

    print (keywords)

    if len(keywords) > 0:
        for kw in keywords:
            query += ' +' + kw # add required keywords
    print query
    res = es.search(index=config.index_name, body={
            "query": {
                "query_string": {
                    "fields": ["keyword"],
                    "query": query
                    }
                }
            })

    rtv = {}
    for hit in res['hits']['hits']:
        print hit
        #rtv += "%s" % hit["_source"]["response"]
        rtv['response'] = hit["_source"]["response"]
        rtv['keyword'] = hit["_source"]["rkw"]
    return json.dumps(rtv)

@app.route('/contacts', methods=['POST'])
def contacts():
    data = request.get_json()
    lat = data['lat']
    lng = data['lng']
    res = es.search(index=config.contacts_name, body={
        "query": {
            "bool" : {
                "must" : {
                    "match_all" : {}
                },
                "filter" : {
                    "geo_distance" : {
                        "distance" : "50km",
                        "location" : {
                            "lat" : lat,
                            "lon" : lng
                        }
                    }
                }
            }
        }
    })
    rtv = []
    for hit in res['hits']['hits']:
        rtv.append({
            "name": hit['_source']['name'],
            "addr": hit['_source']['addr']
            })
    return json.dumps(rtv)


if __name__ == '__main__':
    app.run(debug=True)

