const departments = require('../models/department');
const couchbase = require('couchbase');
const { DB_NAME } = require('../config/database_setup');


exports.getDepartmentById = (req, res, next) => {
    departments.getDepartmentById(req.params.id)
    .then(resp => {
        return res.status(200).json(resp.value);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'department query failed';
        return next(err);
    });
};

exports.getDepartments = (req, res, next) => {
    if(req.query.name) return getDepartmentByName(req, res, next);
    return getAllDepartments(req, res, next);
};

let getDepartmentByName = (req, res, next) => {
    departments.getDepartmentByName(req.query.name)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        let departments = resp.map(department => department[DB_NAME] )
        return res.status(200).json(departments);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'department query failed';
        return next(err);
    });
};

let getAllDepartments = (req, res, next) => {
    departments.getDepartments()
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        let departments = resp.map(department => department[DB_NAME] )
        return res.status(200).json(departments);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'department query failed';
        return next(err);
    });
};

exports.createDepartment = (req, res, next) => {
    departments.createDepartment(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'department creation failed';
        return next(err);
    });
};

exports.updateDepartment = (req, res, next) => {
    departments.updateDepartment(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'department update failed';
        return next(err);
    })
};