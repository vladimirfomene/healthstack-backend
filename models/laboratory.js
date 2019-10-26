const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

exports.getLaboratoryById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.createLaboratory = (laboratory) => {
    return new Promise((resolve, reject) => {
        bucket.insert(laboratory.key, laboratory, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

exports.updateLaboratory = (laboratory) => {
    return new Promise((resolve, reject) => {
        bucket.upsert(laboratory.key, laboratory, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};