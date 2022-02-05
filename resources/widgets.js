
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
             id: Math.floor(Math.random()*100000),
             value: Math.floor(Math.random()*1000000000000),
             associatedKey: Math.floor(Math.random()*1000000000)
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
