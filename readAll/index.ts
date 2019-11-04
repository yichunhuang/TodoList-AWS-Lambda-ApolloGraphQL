
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
interface Param {
    TableName: string
}

interface Item {
    "description": {
        S: string
    },
    "id": {
        S: string
    },
    "title": {
        S: string
    }
}

interface Resol {
    "Items": Item[],
    "Count": number,
    "ScannedCount": number
}

exports.handler = async (event) => {
    const params: Param = {
        TableName: 'Todo'
    };
    let res = await new Promise<Resol>((resolve, reject) => {
        dynamodb.scan(params, (err,data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
    return res;
};
