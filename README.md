# cloudfront-lambda-edge-redirect
Repo to show performing a redirect from cloudfront using a Lambda @ Edge function

## Useful commands
### AWS Sam Documentation
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html

### Build sam template
sam build   

### Invoking sam function locally with event file
$ sam local invoke "Ratings" -e event.json

### Deploy sam application using prompts
sam deploy --guided

### Deploy sam template
sam deploy --profile personal

# Docs on CloudFront
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudfront-distribution.html
https://github.com/awslabs/aws-cloudformation-templates/blob/master/aws/solutions/CloudFrontCustomOriginLambda%40Edge/CloudFront.yaml
https://gist.github.com/jed/56b1f58297d374572bc51c59394c7e7f

# Cloudformation for Parameter Store
https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ssm-parameter.html

# Docs on SAM CLI
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-deploy.html

## Management API
Sample values are 
{
  "origin": "main"
}

or
{
  "origin": "dr"
}

## Custom Metrics
https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html