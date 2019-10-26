const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

exports.getPatientById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getPatientByName = (name) => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND LOWER(name) LIKE \'%' + name + '%\'';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['patient', name.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });

    });
};

exports.getPatients = () => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['patient'], (err, result) => {
            if(err) reject(err)
            resolve(result);
        });
    });
};

exports.getPatientByEmail = (email) => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND LOWER(email) LIKE \'%' + email + '%\'';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['patient', email.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getPatientByPhoneNumber = (phoneNumber) => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND telephone LIKE \'%' + phoneNumber + '%\'';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['patient', phoneNumber], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.createPatient = (patient) => {
    return new Promise((resolve, reject) => {
        bucket.insert(patient.key, patient, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};