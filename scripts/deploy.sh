#!/bin/bash

SAM_BUCKET=
STAGE=dev
LOG_LEVEL=debug
MONITOR=false

aws cloudformation package \
  --template-file template.yaml \
  --s3-bucket $SAM_BUCKET \
  --output-template-file packaged.yaml

aws cloudformation deploy --template-file packaged.yaml \
  --region us-east-1 \
  --stack-name unbxd-failover-$STAGE \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides LogLevel=$LOG_LEVEL \
    Stage=$STAGE \
  --tags monitor=$MONITOR
  