const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

exports.getTransactions = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['transaction'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getTransactionById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getTransactionsWithLabReq = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + ' AS t JOIN' + DB_NAME + 'AS L ON KEYS t.lab_request';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.createTransaction = (transaction) => {
    return new Promise((resolve, reject) => {
        bucket.insert(transaction.key, transaction, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getTransactionsPerDepartmentByTimeRange = (startDate, endDate) => {
    let queryString = 'SELECT e.department, SUM(e.price) FROM' + DB_NAME + 'AS t JOIN' + DB_NAME + 'AS l ON KEYS t.lab_request UNNEST l.exams AS e WHERE t.created_at >=$1 AND t.created_at<=$2 GROUP BY e.department' +
    'UNION SELECT SUM(v.price), `Vaccination` FROM' + DB_NAME + 'AS t JOIN' + DB_NAME + 'AS l ON KEYS t.lab_request UNNEST l.vaccines AS v WHERE t.created_at >=$1 AND t.created_at<=$2';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), [startDate, endDate], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};