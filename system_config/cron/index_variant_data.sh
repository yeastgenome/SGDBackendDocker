#! /bin/sh

cd /data/www/SGDBackendDocker
# elasticsearch 7 variant viewer data script
source /data/www/venv/bin/activate && source prod_variables.sh && python scripts/search/index_variant_data.py
