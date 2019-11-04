const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
exports.handler = async (event) => {
    const params = {
        TableName: 'Todo'
    };
    let res = await new Promise((resolve, reject) => {
        dynamodb.scan(params, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
    return res;
};
