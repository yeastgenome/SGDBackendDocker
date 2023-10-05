#! /bin/sh

cd /data/www/SGDBackendDocker
source /data/www/venv/bin/activate 
source prod_variables.sh 
python scripts/loading/dbxref/update_dbxref.py

