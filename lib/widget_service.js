const core = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const iam =require('@aws-cdk/aws-iam');

class WidgetService extends core.Construct {
  constructor(scope, id) {
    super(scope, id);

  

 

    const filterLogEvents = new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            resources: ['arn:aws:logs:*:*:log-group:/aws/lambda/*'],
            actions: ['logs:FilterLogEvents'],
            // 👇 Default for `effect` is ALLOW
            effect: iam.Effect.ALLOW,
          }),
        ],
      });
      const dynamodbAccess = new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            resources: ['*'],
            actions: ['dynamodb:*'],
            // 👇 Default for `effect` is ALLOW
            effect: iam.Effect.ALLOW,
          }),
        ],
      });
  
      // 👇 Create role, to which we'll attach our Policies
      const role = new iam.Role(this, 'example-iam-role', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        description: 'An example IAM role in AWS CDK',
        inlinePolicies: {
          // 👇 attach the Policy Document as inline policies
          FilterLogEvents: filterLogEvents,
          DynamodbAccess: dynamodbAccess,
        },
      });
    
      const handler = new lambda.Function(this, "WidgetHandler", {
        runtime: lambda.Runtime.NODEJS_14_X, // So we can use async in widget.js
        code: lambda.Code.fromAsset("resources"),
        handler: "widgets.main",
        role: role,
       
      });

      const api = new apigateway.RestApi(this, "lambda-authorizer-test", {
        restApiName: "lambda-dynamodb-test",
        description: "This API to communicate with dynamo db"
      });

      const lambdaIntegration = new apigateway.LambdaIntegration(handler, {
        requestTemplates: { "application/json": '{ "statusCode": "200" }' }
      });

      const putItem =api.root.addResource("putItem");
      const getItem = api.root.addResource("getItem");

      putItem.addMethod("GET", lambdaIntegration,{
      });

      getItem.addMethod("GET", lambdaIntegration,{
      });

      const dynamodbTable= new dynamodb.Table(this, 'Table', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        billingMode: dynamodb.BillingMode.PROVISIONED,
        tableName: 'TestTable'
      });
      
  
    

  }
}

module.exports = { WidgetService }