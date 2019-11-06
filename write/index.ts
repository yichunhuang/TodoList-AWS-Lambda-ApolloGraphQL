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
        "description": {
            S: string
        },
        "isCompleted": {
            BOOL: boolean
        }
    },
    TableName: string
}

interface Resol {
    statusCode: number,
    body: string
}

exports.handler = async (event) => {
    const randomId: string = uuidv4();
    const params: Param = {
        Item: {
            "id": {
                S: randomId
            },
            "title": {
                S: event.body.title
            },
            "description": {
                S: event.body.description
            },
            "isCompleted": {
                BOOL: false
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
                body: randomId
            }
            resolve(response);
        });
    });
    return res;
};
