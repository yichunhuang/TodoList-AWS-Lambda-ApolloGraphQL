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
        dynamodb.getItem(params, (err, data) => {
            if (err)
                reject(err);
            resolve(data);
        });
    });
    return res;
};
