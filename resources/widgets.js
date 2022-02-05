
const AWS = require('aws-sdk');
const S3 = new AWS.S3();

const bucketName = process.env.BUCKET;

exports.main = async function(event, context) {
  try {
    var method = event.httpMethod;

    if (method === "GET") {
      if (event.path === "/putItem") {
        const response ="you are inside put item method"
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        };
      } else if (event.path === "/getItem"){

        const response ="you are inside get item method"
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        };

      }
    }
    
    return {
      statusCode: 400,
      body: "We only accept GET /"
    };
  } catch(error) {
    var body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
        body: JSON.stringify(body)
    }
  }
}
