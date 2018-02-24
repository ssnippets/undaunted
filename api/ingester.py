import json
from pprint import pprint
import uuid

#from elasticsearch import Elasticsearch
#es = Elasticsearch()

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

if __name__ == '__main__':
    data = parse_file()
    rtv = []
    for d in data:
        _id = unicode(uuid.uuid4())
        rtv += flattenChildren(_id, d.get('children', []))
        if 'children' in d:
            del d['children']
        d['keyword'] += ' ' + _id
        rtv.append(d)
    pprint(rtv)

