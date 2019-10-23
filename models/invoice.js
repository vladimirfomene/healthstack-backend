const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);

exports.getInvoiceById = (id) => {
    let get = util.promisify(bucket.get);
    return get(id);
};

exports.getInvoices = () => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['invoice']);
};

exports.getInvoiceByName = (name) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(name) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['invoice', name.toLowerCase()]);
};

exports.getInvoiceByEmail = (email) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND LOWER(email) LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['invoice', email.toLowerCase()]);
};

exports.getInvoiceByTel = (tel) => {
    let queryString = 'SELECT * FROM' +  DB_NAME + 'WHERE type=$1 AND tel LIKE %$2%';
    let query = util.promisify(bucket.query);
    return query(couchbase.N1qlQuery.fromString(queryString), ['invoice', tel]);
};

exports.createInvoice = (invoice) => {
    let insert = util.promisify(bucket.insert);
    return insert(invoice.key, invoice);
};

exports.updateInvoice = (invoice) => {
    let upsert = util.promisify(bucket.upsert);
    return upsert(invoice.key, invoice);
};
