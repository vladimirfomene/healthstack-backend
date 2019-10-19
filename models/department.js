const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);


exports.getDepartmentById = (id) => {
    return db.get(id);
};

exports.getDepartmentByName = (name) => {
    return db.view('_design/department', 'name-view', {
        'key': name
    });
};

exports.createDepartment = (department) => {
    return db.insert(department);
};

exports.getDepartments = () => {
    return db.view('_design/department', 'name-view');
};

exports.updateDepartment = (department) => {
    return db.atomic('_design/department', 'inplace', department._id, department);
};