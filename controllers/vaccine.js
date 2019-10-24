const vaccines = require('../models/vaccine');
const couchbase = require('couchbase');

exports.getVaccineById = (req, res, next) => {
    vaccines.getVaccineById(req.params.id)
    .then(resp => {
        return res.status(200).json(resp.value);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'vaccine query failed';
        return next(err);
    });
};

exports.createVaccine = (req, res, next) => {
    vaccines.createVaccine(req.body.vaccine)
    .then(resp => {
        if(typeof resp.cas == 'number') return res.status(200).json(resp.body.vaccine);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'vaccine creation failed';
        return next(err);
    });
};

exports.updateVaccine = (req, res, next) => {
    vaccines.updateVaccine(req.body.vaccine)
    .then(resp => {
        if(typeof resp.cas == 'number') return res.status(200).json(resp.body.vaccine);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'vaccine update failed';
        return next(err);
    });
};

let getVaccineByName = (req, res, next) => {
    vaccines.getVaccineByName(req.query.name)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'vaccine query failed';
        return next(err);
    });
};

let getAllVaccines = (req, res, next) => {
    vaccines.getVaccines()
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'vaccine query failed';
        return next(err);
    });
};

exports.getVaccines = (req, res, next) => {
    if(req.query.name) return getVaccineByName(req, res, next);
    return getAllVaccines(req, res, next);
};