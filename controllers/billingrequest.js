const billingrequests = require('../models/billingrequest');

exports.getBillingRequestById = (req, res, next) => {
    return billingrequests.getBillingRequestById(req.params.id)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'billingrequest query failed';
        return next(err);
    })
};

let getBillingRequestByName = (req, res, next) => {
    billingrequests.getBillingRequestByName(req.query.name)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return resp.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'billingrequest query failed';
        return next(err);
    });
};

let getBillingRequestByEmail = (req, res, next) => {
    billingrequests.getBillingRequestByEmail(req.query.email)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return resp.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'billingrequest query failed';
        return next(err);
    });
};

let getBillingRequestByTel = (req, res, next) => {
    billingrequests.getBillingRequestByTel(req.query.tel)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return resp.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'billingrequest query failed';
        return next(err);
    });
};

let getAllBillingRequests = (req, res, next) => {
    billingrequests.getBillingRequests()
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return resp.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'billingrequest query failed';
        return next(err);
    });
}

exports.getBillingRequests = (req, res, next) => {
    
    if(req.query.name) return getBillingRequestByName(req, res, next);
    if(req.query.email) return getBillingRequestByEmail(req, res, next);
    if(req.query.tel) return getBillingRequestByTel(req, res, next);

    return getAllBillingRequests(req, res, next);
};

exports.createBillingRequest = (req, res, next) => {
    billingrequests.createBillingRequest(req.body.billingRequest)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'billingrequest creation failed';
        return next(err);
    });
};

exports.updateBillingRequest = (req, res, next) => {
    billingrequests.updateBillingRequest(req.body.billingRequest)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'billingrequest creation failed';
        return next(err);
    });
};