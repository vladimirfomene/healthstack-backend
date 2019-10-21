const vaccines = require('../models/vaccine');

exports.getVaccineById = (req, res, next) => {
    vaccines.getVaccineById(req.params.id)
    .then(resp => {
        if(!resp._id) return res.status(404).json(resp);
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'vaccine query failed';
        return next(err);
    });
};

exports.createVaccine = (req, res, next) => {
    vaccines.createVaccine(req.body.vaccine)
    .then(resp => {
        if(!resp._id) return res.status(404).json(resp);
        return res.status(200).json(resp);
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
        if(!resp._id) return res.status(404).json(resp);
        return res.status(200).json(resp);
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
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'vaccine query failed';
        return next(err);
    });
};

let getAllVaccines = (req, res, next) => {
    vaccines.getVaccines()
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'vaccine query failed';
        return next(err);
    });
};

exports.getVaccines = (req, res, next) => {
    if(req.query.name) return getVaccineByName(req, res, next);
    return getAllVaccines(req, res, next);
};