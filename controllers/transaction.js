const transactions = require('../models/transaction');
const couchbase = require('couchbase');


exports.getTransactions = (req, res, next) => {
    if(req.query.labrequest) return getTransactionsWithLabReq(req, res, next);
    if(req.query.startDate && req.query.endDate) return getTransactionsPerDepartmentByTimeRange(req, res, next);
    return getAllTransactions(req, res, next);
};

let getAllTransactions = (req, res, next) => {
    transactions.getTransactions()
    .then(rows => {
        if(!rows.length) return res.status(404).json({ msg: 'Not Found'});
        let transactions = rows.map(row => { row[DB_NAME] });
        return res.status(200).json(transactions);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'transaction query failed';
        return next(err);
    });
};

exports.getTransactionById = (req, res, next) => {
    transactions.getTransactionById(req.params.id)
    .then(resp => {
        return res.status(200).json(resp.value);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'transaction query failed';
        return next(err);
    })
};

exports.createTransaction = (req, res, next) => {
    transactions.createTransaction(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'transaction creation failed';
        return next(err);
    })
};

let getTransactionsWithLabReq = (req, res, next) => {
    transactions.getTransactionsWithLabReq()
    .then(rows => {
        if(!rows.length) return res.status(404).json({ msg: 'Not Found'});
        let transactions = rows.map(row => { row[DB_NAME] });
        return res.status(200).json(transactions);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'transaction query failed';
        return next(err);
    });
};

let getTransactionsPerDepartmentByTimeRange = (req, res, next) => {
    transactions.getTransactionsPerDepartmentByTimeRange(req.query.startDate, req.query.endDate)
    .then(rows => {
        if(!rows.length) return res.status(404).json({ msg: 'Not Found'});
        let transactions = rows.map(row => { row[DB_NAME] });
        return res.status(200).json(transactions);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'transaction query failed';
        return next(err);
    });
};