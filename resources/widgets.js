
const AWS = require('aws-sdk');
const docClient  = new AWS.DynamoDB.DocumentClient();

const tableName = 'TestTable';

exports.main = async function(event, context) {
  try {
    var method = event.httpMethod;

    if (method === "GET") {
      if (event.path === "/putItem") {
        var params = {
          TableName:tableName,
          Item:{
             id: Math.random(8),
             value: Math.random(16),
             associatedKey: Math.random(12)
          }
      };
      docClient.put(params).promise();

        const response =params.Item;
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
