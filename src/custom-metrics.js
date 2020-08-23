var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var cloudwatch = new AWS.CloudWatch();

exports.handler = async (event, context) => {
    console.log("Custom Metrics Event");
    console.log(JSON.stringify(event));

    //cloudwatch.putMetricData 
    const response = {
        status: '200',
        status: 'custom metrics ' 
    };

    return response;
};
