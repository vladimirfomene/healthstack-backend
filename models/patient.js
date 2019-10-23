const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);

exports.getPatientById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
};

exports.getPatientByName = (name) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['patient', name.toLowerCase()]);
};

exports.getPatients = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['patient']);
}

exports.getPatientByEmail = (email) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(email) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['patient', email.toLowerCase()]);
};

exports.getPatientByPhoneNumber = (phoneNumber) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND phoneNumber LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['patient', phoneNumber]);
};

exports.createPatient = (patient) => {
    let insert = util.promisify(bucket.insert);
    return insert(patient.key, patient);
}