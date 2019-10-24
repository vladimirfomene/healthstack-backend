const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

exports.getUserByEmail = (email) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(email) LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['user', email.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getUsers = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['user'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.createUser = (user) => {
    return new Promise((resolve, reject) => {
        bucket.insert(user.key, user, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateUser = (user) => {
    return new Promise((resolve, reject) => {
        bucket.upsert(user.key, user, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};