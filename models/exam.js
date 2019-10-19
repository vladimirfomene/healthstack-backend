const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);

exports.createExam = (exam) => {
    return db.insert(exam);
};

exports.getExams = () => {
    return db.view('_design/exam', 'exams-view');
};

exports.getExamById = (id) => {
    return db.get(id);
};

exports.getExamByName = (name) => {
    return db.view('_design/exam', 'examName-view');
}

exports.updateExam = (exam) => {
    return db.atomic('_design/exam', 'inplace', exam._id, exam);
};