const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

exports.getInsuranceById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getInsuranceByName = (name) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['insurance', name.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getInsuranceByEmail = (email) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(email) LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['insurance', email.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getInsuranceByTel = (tel) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND tel LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['insurance', tel], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.createInsurance = (insurance) => {
    return new Promise((resolve, reject) => {
        bucket.insert(insurance.key, insurance, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getInsurances = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['insurance'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateInsurance = (insurance) => {
    return new Promise((resolve, reject) => {
        bucket.upsert(insurance.key, insurance, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

