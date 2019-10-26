const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

exports.getInvoiceById = (id) => {
    return new Promise((resolve, reject) => {
        bucket.get(id, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getInvoices = () => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['invoice'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getInvoiceByName = (name) => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND LOWER(name) LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['invoice', name.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getInvoiceByEmail = (email) => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND LOWER(email) LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['invoice', email.toLowerCase()], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getInvoiceByTel = (tel) => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND tel LIKE %$2%';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['invoice', tel], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.createInvoice = (invoice) => {
    return new Promise((resolve, reject) => {
        bucket.insert(invoice.key, invoice, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateInvoice = (invoice) => {
    return new Promise((resolve, reject) => {
        bucket.upsert(invoice.key, invoice, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};
