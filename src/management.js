var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var ssm = new AWS.SSM();

exports.handler = async (event, context) => {
    const mainOrigin = process.env.MAIN_ORIGIN;
    const drOrigin = process.env.DR_ORIGIN;

    const newValue = event.origin;
    if (newValue == null || newValue.length <= 0) {
        const response = {
            status: '501',
            statusDescription: 'No origin value passed in'
        };

        return response;
    }

    if (newValue != mainOrigin && newValue != drOrigin) {
        const response = {
            status: '501',
            statusDescription: 'Need to specifiy a value of ' + mainOrigin + ' or ' + drOrigin + ' for the origin'
        };

        return response;
    }

    await ssm.putParameter({ Name: '/origin/primary-origin', Value: newValue, Type: 'String', Tier: 'Standard', Overwrite: true }).promise();

    /*
     * Generate HTTP redirect response with 302 status code and Location header.
     */
    const response = {
        status: '200',
        status: 'Value updated to ' + newValue
    };

    return response;
};
