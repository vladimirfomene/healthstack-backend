const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);

exports.getLaboratoryById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
};

exports.createLaboratory = (laboratory) => {
    let insert = util.promisify(bucket.insert);
    return insert(laboratory.key, laboratory);
}

exports.updateLaboratory = (laboratory) => {
    let upsert = util.promisify(bucket.upsert);
    return upsert(laboratory.key, laboratory);
};

exports.addLaboratoryLogo = () => {

};