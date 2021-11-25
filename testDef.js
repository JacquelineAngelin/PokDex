const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "DELETE /testDef/{id}":
        await dynamo
          .delete({
            TableName: "testDef",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted item ${event.pathParameters.id}`;
        break;
      case "GET /testDef/{id}":
        body = await dynamo
          .get({
            TableName: "testDef",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /testDef":
        body = await dynamo.scan({ TableName: "testDef" }).promise();
        break;
      case "PUT /testDef":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "testDef",
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              name: requestJSON.name
            }
          })
          .promise();
        body = `Put item ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};