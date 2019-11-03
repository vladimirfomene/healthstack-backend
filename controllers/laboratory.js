const laboratories = require('../models/laboratory');
const couchbase = require('couchbase');
const { DB_NAME } = require('../config/database_setup');


exports.getLaboratoryById = (req, res, next) => {
    laboratories.getLaboratoryById(req.params.id)
    .then(resp => {
        return res.status(200).json(resp.value);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'laboratory query failed';
        return next(err);
    });
};

exports.createLaboratory = (req, res, next) => {
    laboratories.createLaboratory(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'laboratory creation failed';
        return next(err);
    });
};

exports.updateLaboratory = (req, res, next) => {
    laboratories.updateLaboratory(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'laboratory creation failed';
        return next(err);
    });
};