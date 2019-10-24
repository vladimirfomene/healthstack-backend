const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);


exports.createVaccine = (vaccine) => {
    return new Promise((resolve, reject) => {
        bucket.insert(vaccine.key, vaccine, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

exports.getVaccines = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['vaccine'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getVaccineById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getVaccineByName = (name) => {
    let queryString = 'SELECT * FROM $1 ' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['vaccine', name.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateVaccine = (vaccine) => {
    return new Promise((resolve, reject) => {
        bucket.upsert(vaccine.key, vaccine, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};