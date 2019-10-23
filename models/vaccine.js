const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);


exports.createVaccine = (vaccine) => {
    let insert = util.promisify(bucket.insert);
    return insert(vaccine.key, vaccine);
}

exports.getVaccines = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['vaccine']);
}

exports.getVaccineById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
}

exports.getVaccineByName = (name) => {
    let queryString = 'SELECT * FROM $1 ' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['vaccine', name.toLowerCase()]);
}

exports.updateVaccine = (vaccine) => {
    let upsert = util.promisify(bucket.upsert);
    return upsert(vaccine.key, vaccine);
};