
const { DB_HOST, DB_NAME, JWT_SECRET } = require('../config/database_setup');
const couchbase = require('couchbase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);
const users = require('../models/user');

exports.login = async (req, res, next) => {
    users.getUserByEmail(req.body.email)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        if(!bcrypt.compareSync(req.body.password, (resp[0])[DB_NAME].password)) return res.status(401).json({msg: 'Not Authorized'});
        //create an access token
        let user = (resp[0])[DB_NAME];
        delete user.refresh_token;

        // delete user.password;
        // delete user.refresh_token;
        let accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: '15m' });

        //create a refresh token and attach it to the session object.
        let refreshToken = jwt.sign({ user }, JWT_SECRET, {expiresIn: '4h'});
        req.session.refreshToken = refreshToken;

        
        user.refresh_token = refreshToken;
        users.updateUser(user)
        .then(user => {
            return res.status(200).json({ accessToken });
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'user updated failed';
            return next(err);
        });
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'Login Failed';
        return next(err);
    });
};

exports.logout = (req, res, next) => {

    let user = req.body;
    delete user.refresh_token;
    delete user.exp;
    delete user.iat;
    req.session = null;
    users.updateUser(user)
    .then(user => {
        return res.status(200).json({ msg: 'Logout Successful'});
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'user updated failed';
        return next(err);
    });
    
};


exports.verifyToken = (req, res, next) => {
    let accessToken = req.header('Authorization').split(" ")[1];
    jwt.verify(accessToken, JWT_SECRET, (err, decodedToken) => {
        if(err){
            err.status = 403;
            err.msg = 'Forbidden Access';
            return next(err);
        }else{
            req.user = decodedToken;
            next();
        }
    });
};

exports.refreshToken = async (req, res, next) => {
    let refreshToken = req.session.refreshToken;
    jwt.verify(req.session.refreshToken, JWT_SECRET, (err, decodedToken) => {
        if(err){
            err.status = 403;
            err.msg = 'Forbidden Access';
            return next(err);
        }else{
            let user = decodedToken.user;
            let accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: '15m' });

            let refreshToken = jwt.sign({ user }, JWT_SECRET, {expiresIn: '4h'});
            req.session.refreshToken = refreshToken;
            
            user.refresh_token = refreshToken;
            users.updateUser(user)
            .then(user => {
                return res.status(200).json({ accessToken });
            })
            .catch(err => {
                err.status = 500;
                err.msg = 'user updated failed';
                return next(err);
            });
        }
    });
};