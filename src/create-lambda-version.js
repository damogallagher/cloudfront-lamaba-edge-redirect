const { Lambda } = require('aws-sdk')
const { send, SUCCESS, FAILED } = require('cfn-response')
const lambda = new Lambda()

exports.handler = (event, context) => {
    const { RequestType, ResourceProperties: { FunctionName } } = event

    if (RequestType == 'Delete') return send(event, context, SUCCESS)

    lambda.publishVersion({ FunctionName }, (err, { FunctionArn }) => {
        err
            ? send(event, context, FAILED, err)
            : send(event, context, SUCCESS, { FunctionArn })
    })
}