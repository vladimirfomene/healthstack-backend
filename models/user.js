const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);

exports.getUserByEmail = (email) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(email) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['user', email.toLowerCase()]);
};

exports.getUserById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);

exports.getUsers = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['user']);
};

exports.createUser = (user) => {
    let insert = util.promisify(bucket.insert);
    return insert(user.key, user);
};

exports.updateUser = (user) => {
    let upsert = util.promisify(bucket.upsert);
    return upsert(user.key, user);
};