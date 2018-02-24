import json
from pprint import pprint
import uuid

from elasticsearch import Elasticsearch, helpers
es = Elasticsearch()
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
        child_key = parentKey + ' ' + child['keyword']
        child['keyword'] = child_key
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
        d['keyword'] += ' ' + _id
        rtv.append(d)
    return rtv

if __name__ == '__main__':
    data = processDocs()
    pprint(data)
    es.delete_by_query(index=config.index_name, body={
        "query": {
            "match_all": {}
            }
        })
    res = helpers.bulk(es, data, index=config.index_name, doc_type='doc')
    pprint(res)
