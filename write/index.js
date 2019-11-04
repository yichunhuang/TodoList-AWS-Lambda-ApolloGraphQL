const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const uuidv4 = require('uuid/v4');
exports.handler = async (event) => {
    const params = {
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
    let res = await new Promise(function (resolve, reject) {
        dynamodb.putItem(params, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            ;
            const response = {
                statusCode: 200,
                body: "success"
            };
            resolve(response);
        });
    });
    return res;
};
