const insurances = require('../models/insurance');


exports.getInsuranceById = (req, res, next) => {
    insurances.getInsuranceById(req.params.id)
    .then(resp => {
        if(!resp_id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'insurance query failed';
        return next(err);
    });
};

let getInsuranceByEmail = (req, res, next) => {
    insurances.getInsuranceByEmail(req.query.email)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'insurance query failed';
        return next(err);
    });
}

let getInsuranceByName = (req, res, next) => {
    insurances.getInsuranceByName(req.query.name)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'insurance query failed';
        return next(err);
    });
};

let getInsuranceByTel = (req, res, next) => {
    insurances.getInsuranceByTel(req.query.tel)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'insurance query failed';
        return next(err);
    });
};

let getAllInsurances = (req, res, next) => {
    insurances.getInsurances()
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'insurance query failed';
        return next(err);
    });
};

exports.getInsurances = (req, res, next) => {
    if(req.query.name) return getInsuranceByName(req, res, next);
    if(req.query.email) return getInsuranceByEmail(req, res, next);
    if(req.query.tel) return getInsuranceByTel(req, res, next);

    return getAllInsurances(req, res, next);
};

exports.createInsurance = (req, res, next) => {
    insurances.createInsurance(req.body.insurance)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'insurance creation failed';
        return next(err);
    });
};

exports.updateInsurance = (req, res, next) => {
    insurances.updateInsurance(req.body.insurance)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'insurance creation failed';
        return next(err);
    });
};