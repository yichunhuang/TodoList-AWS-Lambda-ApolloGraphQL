const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const uuidv4 = require('uuid/v4');
interface Param {
    Item: {
        "id": {
            S: string
        },
        "title": {
            S: string
        },
        description: {
            S: string
        }
    },
    TableName: string
}

interface Resol {
    statusCode: number,
    body: string
}

exports.handler = async (event) => {
    const params: Param = {
        Item: {
            "id": {
                S: uuidv4()
            },
            "title": {
                S: event.body.title
            },
            "description": {
                S: event.body.description
            }
        },
        TableName: 'Todo'
    };
     let res = await new Promise<Resol>(function (resolve, reject) {
        dynamodb.putItem(params, (err,data) => {
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
