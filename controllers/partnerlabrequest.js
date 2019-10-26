const partnerLabRequests = require('../models/partnerlabrequest');
const couchbase = require('couchbase');

exports.getPartnerLabRequestById = (req, res, next) => {
    partnerLabRequests.getPartnerLabRequestById(req.params.id)
    .then(resp => {
        return res.status(200).json(resp.value);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'partnerLabRequest query failed';
        return next(err);
    });
};

exports.createPartnerLabRequest = (req, res, next) => {
    partnerLabRequests.createPartnerLabRequest(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerLabRequest query failed';
        return next(err);
    });
};

exports.updatePartnerLabRequest = (req, res, next) => {
    partnerLabRequests.updatePartnerLabRequest(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerLabRequest query failed';
        return next(err);
    });
};

exports.getLabRequestByPartnerLab = (req, res, next) => {
    partnerLabRequests.getLabRequestByPartnerLab(req.query.partner_lab)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'partnerLabRequest query failed';
        return next(err);
    });
};