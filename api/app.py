from flask import Flask
app = Flask('Access API')

from elasticsearch import Elasticsearch
es = Elasticsearch()

index='undaunted'

@app.route('/')
def index():
    res = es.search(index='undaunted', body={"query": {"query_string": {"query": "I am getting evicted, what do I do?"}}})
    rtv = ''
    for hit in res['hits']['hits']:
        print hit['_source']
        rtv += "%s" % hit["_source"]["response"] 
    return rtv + '\n'

if __name__ == '__main__':
    app.run(debug=True)
