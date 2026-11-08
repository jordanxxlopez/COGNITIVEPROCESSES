#!/bin/bash
cd "$(dirname "$0")"
./encode2d.sh L12-tetlock-tragic 23
./encode2d.sh L13-pool-table 19
./encode2d.sh L13-mental-models 23
./encode2d.sh L13-permission-schema 25
echo BATCH_REST_DONE
