const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);


exports.getPartnerLabById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
};

exports.getPartnerLabByName = (name) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab', name.toLowerCase()]);
};

exports.getPartnerLabByEmail = (email) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(email) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab', email.toLowerCase()]);
};

exports.getPartnerLabByTel = (tel) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND tel LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab', tel]);
};

exports.getPartnerLabs = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab']);
}

exports.createPartnerLabs = (partnerLab) => {
    let insert = util.promisify(bucket.insert);
    return insert(partner_lab.key, partner_lab);
};

exports.updatePartnerLabs = (partnerLab) => {
    let upsert = util.promisify(bucket.upsert);
    return upsert(partnerLab.key, partnerLab);
};