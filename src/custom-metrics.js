var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var cloudwatch = new AWS.CloudWatch();

// Lambda to send custom metrics to CloudWatch
exports.handler = async (event, context) => {
  console.log("Custom Metrics Event");
  console.log(JSON.stringify(event));
  const status = event.Records[0].cf.response.status;
  console.log("status:" + status);

  const metric = {
    MetricData: [
      /* required */
      {
        MetricName: "PrimaryOriginResponseMetric" /* required */,
        Dimensions: [
          {
            Name: "status" /* required */,
            Value: status /* required */,
          },
          /* more items */
        ],
        Timestamp: new Date(),
        Unit: "Count",
        Value: 1,
      },
      /* more items */
    ],
    Namespace: "PrimaryOriginResponseNamespace" /* required */,
  };

  const data = await cloudwatch.putMetricData(metric).promise();
  console.log("data");
  console.log(JSON.stringify(data));

  //https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-examples.html#lambda-examples-custom-error-static-body
  const response = event.Records[0].cf.response;
  return response;
};
