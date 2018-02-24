#!/bin/bash
bash wait-for-it.sh elastic_search:9200 
sleep 10 #still need to wait for initialiation...
sh init_db.sh
python ingester.py
python insert_contacts.py
python $1
