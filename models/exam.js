const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

exports.createExam = (exam) => {
    return new Promise((resolve, reject) => {
        bucket.insert(exam.key, exam, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getExams = () => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['exam'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getExamById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getExamByName = (name) => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND name=$2';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['exam', name], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateExam = (exam) => {
    return new Promise((resolve, reject) => {
        bucket.upsert(exam.key, exam, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};