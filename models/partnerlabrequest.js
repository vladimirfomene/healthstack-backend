const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

exports.getPartnerLabRequestById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.createPartnerLabRequest = (partnerLabRequest) => {
    return new Promise((resolve, reject) => {
        bucket.insert(partnerLabRequest.key, partnerLabRequest, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getPartnerLabRequests = () => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab_request'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getLabRequestByPartnerLab = (partnerLabName) => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND partner_lab.name=$2';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab_request', partnerLabName], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updatePartnerLabRequest = (partnerLabRequest) => {
    return new Promise((resolve, reject) => {
        bucket.upsert(partnerLabRequest.key, partnerLabRequest, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};




