#! /bin/sh

cd /data/www/SGDBackendDocker
source /data/www/venv/bin/activate 
source prod_variables.sh 
python scripts/dumping/s3/copy_active_files.py
