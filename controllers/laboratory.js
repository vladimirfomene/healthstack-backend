const laboratories = require('../models/laboratory');

exports.getLaboratoryById = (req, res, next) => {
    laboratories.getLaboratoryById(req.params.id)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'laboratory query failed';
        return next(err);
    });
};

exports.createLaboratory = (req, res, next) => {
    laboratories.createLaboratory(req.body.laboratory)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'laboratory creation failed';
        return next(err);
    });
};

exports.updateLaboratory = (req, res, next) => {
    laboratories.updateLaboratory(req.body.laboratory)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'laboratory creation failed';
        return next(err);
    });
};