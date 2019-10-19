const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);

exports.getInsuranceById = (id) => {
    return db.get(id)
};

exports.getInsuranceByName = (name) => {
    return db.view('_design/insurance', 'name-view', {
        'key': name
    });
};

exports.getInsuranceByEmail = (email) => {
    return db.view('_design/insurance', 'email-view', {
        'key': email
    });
};

exports.getInsuranceByTel = (tel) => {
    return db.view('_design/insurance', 'tel-view', {
        'key': tel
    });
};

exports.createInsurance = (insurance) => {
    return db.insert(insurance);
};

exports.getInsurances = () => {
    return db.view('_design/insurance', 'name-view');
};

exports.updateInsurance = (insurance) => {
    return db.atomic('_design/insurance', 'inplace', insurance._id, insurance);
};

