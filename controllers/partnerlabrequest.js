const partnerLabRequests = require('../models/partnerlabrequest');

exports.getPartnerLabRequestById = (req, res, next) => {
    partnerLabRequests.getPartnerLabRequestById(req.params.id)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerLabRequest query failed';
        return next(err);
    });
};

exports.createPartnerLabRequest = (req, res, next) => {
    partnerLabRequests.createPartnerLabRequest(req.body.partnerLabRequest)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerLabRequest query failed';
        return next(err);
    });
};

exports.updatePartnerLabRequest = (req, res, next) => {
    partnerLabRequests.updatePartnerLabRequest(req.body.partnerLabRequest)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerLabRequest query failed';
        return next(err);
    });
};

exports.getLabRequestByPartnerLab = (req, res, next) => {
    partnerLabRequests.getLabRequestByPartnerLab()
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerLabRequest query failed';
        return next(err);
    });
};