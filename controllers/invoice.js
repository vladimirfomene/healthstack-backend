const invoices = require('../models/invoice');
const couchbase = require('couchbase');

exports.getInvoiceById = (req, res, next) => {
    return invoices.getInvoiceById(req.params.id)
    .then(resp => {
        return res.status(200).json(resp.value);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'invoice query failed';
        return next(err);
    })
};

let getInvoiceByName = (req, res, next) => {
    invoices.getInvoiceByName(req.query.name)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'invoice query failed';
        return next(err);
    });
};

let getInvoiceByEmail = (req, res, next) => {
    invoices.getInvoiceByEmail(req.query.email)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'invoice query failed';
        return next(err);
    });
};

let getInvoiceByTel = (req, res, next) => {
    invoices.getInvoiceByTel(req.query.tel)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'invoice query failed';
        return next(err);
    });
};

let getAllInvoices = (req, res, next) => {
    invoices.getInvoices()
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'invoice query failed';
        return next(err);
    });
}

exports.getInvoices = (req, res, next) => {
    
    if(req.query.name) return getInvoiceByName(req, res, next);
    if(req.query.email) return getInvoiceByEmail(req, res, next);
    if(req.query.tel) return getInvoiceByTel(req, res, next);

    return getAllInvoices(req, res, next);
};

exports.createInvoice = (req, res, next) => {
    invoices.createInvoice(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'invoice creation failed';
        return next(err);
    });
};

exports.updateInvoice = (req, res, next) => {
    invoices.updateInvoice(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'invoice update failed';
        return next(err);
    });
};