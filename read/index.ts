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
    "Item": {
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
}
exports.handler = async (event) => {
    const params: Param= {
        TableName: 'Todo',
        Key: {
            "id": {
                S: event.id
            }
        }
    };
    
    let res = await new Promise<Resol>(function (resolve, reject) {
        dynamodb.getItem(params, (err,data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
    return res;
};
