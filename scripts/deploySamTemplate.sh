sam build   
#sam deploy --stack-name "CloudfrontLambdaAtEdge" --capabilities "CAPABILITY_NAMED_IAM" "CAPABILITY_IAM" "CAPABILITY_AUTO_EXPAND"  --no-confirm-changeset --profile personal
sam deploy --stack-name "CloudfrontLambdaAtEdge" --capabilities  "CAPABILITY_IAM"  --no-confirm-changeset --profile personal