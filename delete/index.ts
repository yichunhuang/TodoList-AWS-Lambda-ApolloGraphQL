const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
interface Param {
    TableName: string,
    Key: {
        "id": {
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
        TableName: 'Todo',
        Key: {
            "id": {
                S: event.id
            }
        }
    };
    let res = await new Promise<Resol>(function (resolve, reject) {
        dynamodb.deleteItem(params, (err,data) => {
            if (err) {
                reject(err);
                return;
            }
            const response = {
                statusCode: 200,
                body: "success"
            }
            resolve(response);
        });
    });
    return res;
};
