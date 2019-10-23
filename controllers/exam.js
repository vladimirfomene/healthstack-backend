const exams = require('../models/exam');
const couchbase = require('couchbase');


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
    exams.createExam(req.body.exam)
    .then(resp => {
        if(typeof resp.cas == 'number') return res.status(200).json(req.body.exam);
    })
    .catch(err => {
        err.status = 500;
        err.msg = 'exam query failed';
        return next(err);
    });
};

exports.updateExam = (req, res, next) => {
    exams.updateExam(req.body.exam)
    .then(resp => {
        if(typeof resp.cas == 'number') return res.status(200).json(req.body.exam);
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
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
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
        if(!resp.rows.length) return res.status(404).json({ msg: 'Not Found'});
        return res.status(200).json(resp.rows);
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