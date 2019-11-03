const exams = require('../models/exam');
const couchbase = require('couchbase');
const { DB_NAME } = require('../config/database_setup');


exports.getExamById = (req, res, next) => {
    exams.getExamById(req.params.id)
    .then(resp => {
        return res.status(200).json(resp.value);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'exam query failed';
        return next(err);
    });
};

exports.createExam = (req, res, next) => {
    exams.createExam(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'exam query failed';
        return next(err);
    });
};

exports.updateExam = (req, res, next) => {
    exams.updateExam(req.body)
    .then(resp => {
        if(typeof resp.cas == 'object') return res.status(200).json(req.body);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'exam query failed';
        return next(err);
    });
};

let getAllExams = (req, res, next) => {
    exams.getExams()
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        let exams = resp.map(exam => { exam[DB_NAME] })
        return res.status(200).json(exams);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'exam query failed';
        return next(err);
    });
};

let getExamByName = (req, res, next) => {
    exams.getExamByName(req.query.name)
    .then(resp => {
        if(!resp.length) return res.status(404).json({ msg: 'Not Found'});
        let exams = resp.map(exam => { exam[DB_NAME] })
        return res.status(200).json(exams);
    })
    .catch(err => {
        if(err.code == couchbase.errors.keyNotFound) return res.status(404).json({ msg: 'Not Found'});
        err.status = 500;
        err.msg = 'exam query failed';
        return next(err);
    });
};

exports.getExams = (req, res, next) => {
    if(req.query.name) return getExamByName(req, res, next);
    return getAllExams(req, res, next);
};