import geocoder
import os
from apikey import key
import json
from elasticsearch import Elasticsearch, helpers
es = Elasticsearch()
import config

import time

os.environ["GOOGLE_API_KEY"] = key

def get_latlng(address):
    g = geocoder.google(address)
    return g


def processDocs():
    data = []
    with open('contacts.json', 'r') as f:
        data = json.loads(f.read())

    for i in data:
        loc = geocoder.google(i['addr'])
        if not loc:
            loc = geocoder.google(i['addr'])

        i['location'] = {
                "lat": loc.latlng[0],
                "lon": loc.latlng[1]
                }
        time.sleep(1)
    return data


if __name__ == '__main__':
    data = processDocs()
    print json.dumps(data)

    es.delete_by_query(index=config.contacts_name, body={
        "query": {
            "match_all": {}
            }
        })
    res = helpers.bulk(es, data, index=config.contacts_name, doc_type='doc')

