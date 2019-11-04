const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
exports.handler = async (event) => {
    const params = {
        TableName: 'Todo',
        Key: {
            "id": {
                S: event.id
            }
        }
    };
    let res = await new Promise(function (resolve, reject) {
        dynamodb.deleteItem(params, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const response = {
                statusCode: 200,
                body: "success"
            };
            resolve(response);
        });
    });
    return res;
};
