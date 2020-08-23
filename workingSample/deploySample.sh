#!/bin/sh

aws cloudformation deploy --template-file stack.yml --stack-name edge-lambda-test --capabilities CAPABILITY_IAM --parameter-overrides Nonce=$RANDOM --profile personal