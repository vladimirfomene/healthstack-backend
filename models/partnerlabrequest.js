const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);

exports.getPartnerLabRequestById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
};

exports.createPartnerLabRequest = (partnerLabRequest) => {
    let insert = util.promisify(bucket.insert);
    return insert(partnerLabRequest.key, partnerLabRequest);
};

exports.getPartnerLabRequests = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab_request']);
};

exports.getLabRequestByPartnerLab = (partnerLabName) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND partner_lab.name=$2';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['partner_lab_request', partnerLabName]);
};

exports.updatePartnerLabRequest = (partnerLabRequest) => {
    let upsert = util.promisify(bucket.upsert);
    return upsert(partnerLabRequest.key, partnerLabRequest);
};




