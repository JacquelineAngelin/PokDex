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
      case "GET /testInst/{id}":
        body = await dynamo
          .get({
            TableName: "testInst",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /testInst":
        body = await dynamo.scan({ TableName: "testInst" }).promise();
        break;
      case "PUT /testInst":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "testInst",
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              name: requestJSON.name
            }
          })
          .promise();
        body = `Put item ${requestJSON.id}`;
        break;
      case "GET /notaAluno":
        body = await dynamo.scan({ TableName: "aluno" }).promise();
        break;
      case "PUT /notaAluno":
        let requestJSONaluno = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "aluno",
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              name: requestJSON.name
            }
          })
          .promise();
        body = `Put item ${requestJSON.id}`;
        break;
      case "GET /notaTurma":
        body = await dynamo.scan({ TableName: "turma" }).promise();
        break;
      case "PUT /notaTurma":
        let requestJSONturma = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "turma",
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