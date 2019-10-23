const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);


exports.getDepartmentById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
};

exports.getDepartmentByName = (name) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['department', name.toLowerCase()]);
};

exports.createDepartment = (department) => {
    let insert = util.promisify(bucket.insert);
    return insert(invoice.key, invoice);
};

exports.getDepartments = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['department']);
};

exports.updateDepartment = (department) => {
    let upsert = util.promisify(bucket.upsert);
    return upsert(department.key, department);
};