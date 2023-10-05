#! /bin/sh

cd /data/www/SGDBackendDocker
source /data/www/venv/bin/activate && source prod_variables.sh && python scripts/bgi_json/bgi.py
