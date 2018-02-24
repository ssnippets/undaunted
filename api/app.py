from flask import Flask, request
import json

app = Flask('Access API')

from elasticsearch import Elasticsearch
es = Elasticsearch()

import config

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
        rtv['keyword'] = hit["_source"]["keyword"]
    return json.dumps(rtv)


if __name__ == '__main__':
    app.run(debug=True)

