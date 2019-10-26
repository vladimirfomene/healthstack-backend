const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);


exports.getDepartmentById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result)
        });
    });
};

exports.getDepartmentByName = (name) => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND LOWER(name) LIKE %$2%';

    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['department', name.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.createDepartment = (department) => {
    return new Promise((resolve, reject) => {
        bucket.insert(department.key, department, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getDepartments = () => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['department'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateDepartment = (department) => {
    return new Promise((resolve, reject) => {
        bucket.upsert(department.key, department, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};