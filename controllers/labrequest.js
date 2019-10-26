const labrequests = require('../models/labrequest');
const couchbase = require('couchbase');


exports.createLabRequest = (req, res, next) => {
    labrequests.createLabRequest(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'labrequest creation failed';
        return next(err);
    });
};

exports.getLabRequestById = (req, res, next) => {
    labrequests.getLabRequestById(req.params.id)
    .then(resp => {
        return res.status(200).json(resp.value);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'labrequest query failed';
        return next(err);
    });
};

exports.updateLabRequest = (req, res, next) => {
    labrequests.updateLabRequest(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'labrequest update failed';
        return next(err);
    });
};

let getLabRequestByEmail = (req, res, next) => {
    labrequests.getLabRequestByEmail(req.query.email)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'labrequest query failed';
        return next(err);
    });
};

let getLabRequestByName = (req, res, next) => {
    labrequests.getLabRequestByName(req.query.name)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'labrequest query failed';
        return next(err);
    });

};

let getLabRequestByPhoneNumber = (req, res, next) => {
    labrequests.getLabRequestByPhoneNumber(req.query.tel)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'labrequest query failed';
        return next(err);
    });
};

exports.getLabRequests = (req, res, next) => {
    if(req.query.email) return getLabRequestByEmail(req, res, next);
    if(req.query.tel) return getLabRequestByPhoneNumber(req, res, next);
    if(req.query.name) return getLabRequestByName(req, res, next);

    return getAllLabRequests(req, res, next);
};

let getAllLabRequests = (req, res, next) => {
    labrequests.getLabRequests()
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'labrequest query failed';
        return next(err);
    });
};

