const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
interface Param {
    TableName: string,
    Key: {
        "id": {
            S: string
        }
    },
    UpdateExpression: string,
    ExpressionAttributeValues: {
        ":x": {
            S: string
        },
        ":y": {
            S: string
        } 
    }
}

interface Resol {
    statusCode: number,
    body: string 
}
exports.handler = async (event) => {
    const params: Param = {
        TableName: "Todo",
        Key: {
            "id": {
                S: event.id
            }
        },
        UpdateExpression: "set title = :x, description = :y",
        ExpressionAttributeValues: {
            ":x": {
                S: event.body.title
            },
            ":y": {
                S: event.body.description
            }
        }
    };
     let res = await new Promise<Resol>(function (resolve, reject) {
        dynamodb.updateItem(params, (err,data) => {
            if (err) {
                reject(err);
                return;
            };
            const response = {
                statusCode: 200,
                body: "success"
            }
            resolve(response);
        });
    });
    return res;
};
