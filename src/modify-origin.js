const NodeCache = require("node-cache");

//Cache as default ttl of 60 seconds with eviction checks every 20 seconds
const parameterStoreCache = new NodeCache({ stdTTL: 60, checkperiod: 20 });
const cacheKey = "originKey";

var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var ssm = new AWS.SSM();

// Lambda to modify the origin to go the the origin specifed in the parameter store
exports.handler = async (event, context) => {
  console.log("Pre get request");
  const request = event.Records[0].cf.request;
  console.log("Post get request");
  const headers = request.headers;
  const origin1 = request.origin;
  console.log("headers");
  console.log(JSON.stringify(headers));
  console.log("origin");
  console.log(JSON.stringify(origin1));

  const primaryUrl = setURL("https://www.rte.ie", event);
  const drUrl = setURL("https://www.yahoo.com", event);

  let url = primaryUrl;

  let origin = parameterStoreCache.get(cacheKey);
  if (origin == undefined) {
    const data = await ssm
      .getParameter({ Name: "/origin/primary-origin" })
      .promise();

    if (
      data != null &&
      data.Parameter != null &&
      data.Parameter.Value != null
    ) {
      origin = data.Parameter.Value;
      parameterStoreCache.set(cacheKey, origin);
    }
  }
  if (origin != "main") {
    url = drUrl;
  } else {
    url = primaryUrl;
  }

  /*
   * Generate HTTP redirect response with 302 status code and Location header.
   */
  const response = {
    status: "302",
    headers: {
      location: [
        {
          key: "Location",
          value: url,
        },
      ],
    },
  };

  return response;
};

function setURL(baseURL, event) {
  if (
    event == null ||
    event.Records == null ||
    event.Records[0] == null ||
    event.Records[0].cf == null ||
    event.Records[0].cf.request == null
  ) {
    return baseURL;
  }

  const request = event.Records[0].cf.request;

  let newURL = (baseURL += request.uri);

  const queryString = request.querystring;
  if (queryString != null && queryString.length > 0) {
    newURL += "?" + queryString;
  }

  return newURL;
}
