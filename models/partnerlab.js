const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);


exports.getPartnerLabById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getPartnerLabByName = (name) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab', name.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getPartnerLabByEmail = (email) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(email) LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab', email.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getPartnerLabByTel = (tel) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND tel LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab', tel], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getPartnerLabs = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.createPartnerLabs = (partnerLab) => {
    return new Promise((resolve, reject) => {
        bucket.insert(partner_lab.key, partner_lab, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updatePartnerLabs = (partnerLab) => {
    return new Promise((resolve, reject) => {
        bucket.upsert(partner_lab.key, partner_lab, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};