#! /bin/sh

cd /data/www/SGDBackendDocker
. /data/www/venv/bin/activate && . prod_local_variables.sh && python scripts/disambiguation/index_disambiguation.py
