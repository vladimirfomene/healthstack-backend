const users = require('../models/user');



exports.getUserById = (req, res, next) => {
    users.getUserById(req.params.id)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'User query failed';
        return next(err);
    });
};

let getUserByEmail = (req, res, next) => {
    users.getUserByEmail(req.query.email)
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'User query failed'
        return next(err);
    })
};

exports.getUsers = (req, res, next) => {
    if(req.query.email) return getUserByEmail(req, res, next);
    return getAllUsers(req, res, next);
};

let getAllUsers = (req, res, next) => {
    users.getUsers()
    .then(resp => {
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'User query failed';
        return next(err);
    })
};


exports.createUser = (req, res, next) => {
    users.createUser(req.body.user)
    .then(resp => {
        if(resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'user creation failed';
        return next(err);
    })
};

exports.updateUser = (req, res, next) => {
    users.updateUser(req.body.user)
    .then(resp => {
        if(!resp._id) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'user update failed';
        return next(err);
    })
};
