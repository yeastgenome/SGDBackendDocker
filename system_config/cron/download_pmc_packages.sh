#! /bin/sh

cd /data/www/SGDBackendDocker/current
source /data/envs/sgd3/bin/activate 
source prod_variables.sh 
python scripts/loading/suppl_files/download_pubmed_PMC_files.py

