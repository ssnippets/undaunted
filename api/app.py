from flask import Flask, request
import json

app = Flask('Access API')

from elasticsearch import Elasticsearch
es = Elasticsearch()

index='undaunted'

@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    query = data['query']
    print (query)

    #res = es.search(index='undaunted', body={"_source": ["keyword"], "query": {"query_string": {"query": query}}})
    res = es.search(index='undaunted', body={"query": {"query_string": {"fields" : ["keyword"],"query": query}}})
    rtv = {}
    for hit in res['hits']['hits']:
        print hit
        #rtv += "%s" % hit["_source"]["response"]
        rtv['response'] = hit["_source"]["response"]
        rtv['keyword'] = hit["_source"]["keyword"]
    return json.dumps(rtv)


if __name__ == '__main__':
    app.run(debug=True)

