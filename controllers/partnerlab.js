const partnerLabs = require('../models/partnerlab');

exports.getPartnerLabById = (req, res, next) => {
    partnerLabs.getPartnerLabById(req.params.id)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerlab  query failed';
        return next(err);
    });
};

exports.createPartnerLab = (req, res, next) => {
    partnerLabs.createPartnerLabs(req.body.partnerLab)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerlab  query failed';
        return next(err);
    });
};

exports.updatePartnerLab = (req, res, next) => {
    partnerLabs.updatePartnerLabs(req.body.partnerLab)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerlab  query failed';
        return next(err);
    });
};

exports.getPartnerLabs = (req, res, next) => {
    if(req.query.name) return getPartnerLabByName(req, res, next);
    if(req.query.email) return getPartnerLabByEmail(req, res, next);
    if(req.query.tel) return getPartnerLabByTel(req, res, next);

    return getAllPartnerLabs(req, res, next);
};

let getPartnerLabByName = (req, res, next) => {
    partnerLabs.getPartnerLabByName(req.query.name)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerlab query failed';
        return next(err);
    });
}

let getPartnerLabByEmail = (req, res, next) => {
    partnerLabs.getPartnerLabByEmail(req.query.email)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerlab query failed';
        return next(err);
    });
};

let getPartnerLabByTel = (req, res, next) => {
    partnerLabs.getPartnerLabByEmail(req.query.tel)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerlab query failed';
        return next(err);
    });
};

let getAllPartnerLabs = (req, res, next) => {
    partnerLabs.getPartnerLabs()
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'partnerlab query failed';
        return next(err);
    });
};