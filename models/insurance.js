const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);

exports.getInsuranceById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
};

exports.getInsuranceByName = (name) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['insurance', name.toLowerCase()]);
};

exports.getInsuranceByEmail = (email) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(email) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['insurance', email.toLowerCase()]);
};

exports.getInsuranceByTel = (tel) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND tel LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['insurance', tel]);
};

exports.createInsurance = (insurance) => {
    let insert = util.promisify(bucket.insert);
    return insert(insurance.key, insurance);
};

exports.getInsurances = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['insurance']);
};

exports.updateInsurance = (insurance) => {
    let upsert = util.promisify(bucket.upsert);
    return upsert(insurance.key, insurance);
};

