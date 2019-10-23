const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);

exports.createExam = (exam) => {
    let insert = util.promisify(bucket.insert);
    return insert(exam.key, exam);
};

exports.getExams = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['exam']);
};

exports.getExamById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
};

exports.getExamByName = (name) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND name=$2';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['exam', name]);
}

exports.updateExam = (exam) => {
    let upsert = util.promisify(bucket.upsert);
    return upsert(exam.key, exam);
};