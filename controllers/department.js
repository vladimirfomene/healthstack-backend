const departments = require('../models/department');


exports.getDepartmentById = (req, res, next) => {
    departments.getDepartmentById(req.params.id)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
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
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'department query failed';
        return next(err);
    });
};

let getAllDepartments = (req, res, next) => {
    departments.getDepartments()
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json(resp.rows);
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'department query failed';
        return next(err);
    });
};

exports.createDepartment = (req, res, next) => {
    departments.createDepartment(req.body.department)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'department creation failed';
        return next(err);
    });
};

exports.updateDepartment = (req, res, next) => {
    departments.updateDepartment(req.body.department)
    .then(resp => {
        if(!resp._id) res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp)
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'department update failed';
        return next(err);
    })
};