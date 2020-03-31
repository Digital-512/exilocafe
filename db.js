"use strict";

const MongoClient = require('mongodb').MongoClient;

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const DATABASE_URI = "mongodb://localhost:27017/exilocafe";

let connect = async (url) => {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    return client.db();
}

module.exports = async () => {
    let databases = await Promise.all([connect(DATABASE_URI)]);
    return {
        login: databases[0]
    }
}
