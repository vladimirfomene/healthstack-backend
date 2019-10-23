const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);

exports.getTransactions = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['transaction']);
};

exports.getTransactionById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
}

exports.getTransactionsWithLabReq = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + ' AS t JOIN' + DB_NAME + 'AS L ON KEYS t.lab_request';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString));
};

exports.createTransaction = (transaction) => {
    let insert = util.promisify(bucket.insert);
    return insert(transaction.key, transaction);
}

exports.getTransactionsPerDepartmentByTimeRange = (startDate, endDate) => {
    let queryString = 'SELECT e.department, SUM(e.price) FROM' + DB_NAME + 'AS t JOIN' + DB_NAME + 'AS l ON KEYS t.lab_request UNNEST l.exams AS e WHERE t.created_at >=$1 AND t.created_at<=$2 GROUP BY e.department' +
    'UNION SELECT SUM(v.price), `Vaccination` FROM' + DB_NAME + 'AS t JOIN' + DB_NAME + 'AS l ON KEYS t.lab_request UNNEST l.vaccines AS v WHERE t.created_at >=$1 AND t.created_at<=$2';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), [startDate, endDate]);
};