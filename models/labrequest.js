const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);

exports.createLabRequest = (labRequest) => {
    let insert = util.promisify(bucket.insert);
    return insert(labRequest.key, labRequest);
};

exports.updateLabRequest = (labRequest) => {
    let upsert = util.promisify(bucket.upsert);
    return upsert(labRequest.key, labRequest);
};

exports.getLabRequestById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
};

exports.getLabRequestByEmail = (email) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(email) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['lab_request', email.toLowerCase()]);
};

exports.getLabRequestByName = (name) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['lab_request', name.toLowerCase()]);
};

exports.getLabRequestByPhoneNumber = (phoneNumber) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND phoneNumber LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['lab_request', phoneNumber]);
};

exports.getLabRequests = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['lab_request']);
};