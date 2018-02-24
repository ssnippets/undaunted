import json
from pprint import pprint
import uuid

from elasticsearch import Elasticsearch, helpers
es = Elasticsearch(["elastic_search:9200"])
import config

def parse_file():
    rtv = ""
    with open('input.json', 'r') as f:
        data = f.read()
        rtv = json.loads(data)
    return rtv

def flattenChildren(parentKey, children):
    rtv = []
    for child in children:
        _id = unicode(uuid.uuid4())
        child_key = parentKey + ' ' + _id
        child['rkw'] = child_key
        child['keyword'] += ' ' + parentKey
        rtv += flattenChildren(child_key, child.get('children', []))
        if 'children' in child:
            del child['children']
        rtv.append(child)
    return rtv

def processDocs():
    data = parse_file()
    rtv = []
    for d in data:
        _id = unicode(uuid.uuid4())
        rtv += flattenChildren(_id, d.get('children', []))
        if 'children' in d:
            del d['children']
        d['rkw'] = _id
        d['keyword'] += ' ' + 'root'
        rtv.append(d)
    return rtv

if __name__ == '__main__':
    data = processDocs()
    print json.dumps(data)
    es.delete_by_query(index=config.index_name, body={
        "query": {
            "match_all": {}
            }
        })
    res = helpers.bulk(es, data, index=config.index_name, doc_type='doc')
#    pprint(res)
