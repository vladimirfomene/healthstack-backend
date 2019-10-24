const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

exports.createLabRequest = (labRequest) => {
    return new Promise((resolve, reject) => {
        bucket.insert(labRequest.key, labRequest, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateLabRequest = (labRequest) => {
    return new Promise((resolve, reject) => {
        bucket.upsert(labRequest.key, labRequest, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getLabRequestById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getLabRequestByEmail = (email) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(email) LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['lab_request', email.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getLabRequestByName = (name) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['lab_request', name.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getLabRequestByPhoneNumber = (phoneNumber) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND phoneNumber LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['lab_request', phoneNumber], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getLabRequests = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['lab_request'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};