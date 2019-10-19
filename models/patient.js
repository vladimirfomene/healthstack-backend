const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);

exports.getPatientById = (id) => {
    return db.get(id)
};

exports.getPatientByName = (name) => {
    return db.view('_design/patient', 'tel-view', {
        'key': phoneNumber
    });
};

exports.getPatients = () => {
    return db.view('_design/patient', 'patients-view');
}

exports.getPatientByEmail = (email) => {
    return db.view('_design/patient', 'email-view', {
        'key': email
    });
};

exports.getPatientByPhoneNumber = (phoneNumber) => {
    return db.view('_design/patient', 'tel-view', {
        'key': phoneNumber
    });
};

exports.createPatient = (patient) => {
    return db.insert(patient);
}