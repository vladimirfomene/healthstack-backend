const users = require('../models/user');
const couchbase = require('couchbase');
const { DB_NAME } = require('../config/database_setup');



exports.getUserById = (req, res, next) => {
    users.getUserById(req.params.id)
    .then(resp => {
        return res.status(200).json(resp.value);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'User query failed';
        return next(err);
    });
};

let getUserByEmail = (req, res, next) => {
    users.getUserByEmail(req.query.email)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        let users = resp.map(user=> { user[DB_NAME] });
        return res.status(200).json(users);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
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
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        let users = resp.map(user=> { user[DB_NAME] });
        return res.status(200).json(users);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'User query failed';
        return next(err);
    })
};


exports.createUser = (req, res, next) => {
    users.createUser(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'user creation failed';
        return next(err);
    })
};

exports.updateUser = (req, res, next) => {
    users.updateUser(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'user update failed';
        return next(err);
    })
};
