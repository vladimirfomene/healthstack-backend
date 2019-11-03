const patients = require('../models/patient');
const couchbase = require('couchbase');

exports.getPatientById = (req, res, next) => {
    patients.getPatientById(req.params.id)
    .then(resp => {
        return res.status(200).json(resp.value);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'patient query failed';
        return next(err);
    });
};

exports.createPatient = (req, res, next) => {
    patients.createPatient(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'patient query failed';
        return next(err);
    });
};

exports.getPatients = (req, res, next) => {
    if(req.query.name) return getPatientByName(req, res, next);
    if(req.query.email) return getPatientByEmail(req, res, next);
    if(req.query.tel) return getPatientByPhoneNumber(req, res, next);
    return getAllPatients(req, res, next);
};

let getPatientByName = (req, res, next) => {
    patients.getPatientByName(req.query.name)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        let patients = resp.map(patient => { patient[DB_NAME] })
        return res.status(200).json(patients);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'patient query failed';
        return next(err);
    });
};

let getPatientByEmail = (req, res, next) => {
    patients.getPatientByEmail(req.query.email)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        let patients = resp.map(patient => { patient[DB_NAME] });
        return res.status(200).json(patients);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'patient query failed';
        return next(err);
    });
};

let getPatientByPhoneNumber = (req, res, next) => {
    console.log(req.query.tel);
    patients.getPatientByPhoneNumber(req.query.tel)
    .then(resp => {
        console.log(resp);
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        let patients = resp.map(patient => { patient[DB_NAME] });
        return res.status(200).json(patients);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'patient query failed';
        return next(err);
    });
};

let getAllPatients = (req, res, next) => {
    patients.getPatients()
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        let patients = resp.map(patient => { patient[DB_NAME] })
        return res.status(200).json(patients);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'patient query failed';
        return next(err);
    });
};