const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);

exports.createLabRequest = (labRequest) => {
    return db.insert(labRequest);
};

exports.updateLabRequest = (labRequest) => {
    db.insert(labRequest, labRequest._id)
    .then(data => {
        data._rev = data.rev;
        return db.insert(data, labRequest._id);
    })
    .catch(err => {
        return err;
    });
};

exports.getLabRequestById = (id) => {
    return db.get(id);
};

exports.getLabRequestByEmail = (email) => {
    return db.view('_design/labRequest', 'email-view', {
        'key': email
    });
};

exports.getLabRequestByName = (name) => {
    return db.view('_design/labRequest', 'name-view', {
        'key': name
    });
};

exports.getLabRequestByPhoneNumber = (phoneNumber) => {
    return db.view('_design/labRequest', 'tel-view', {
        'key': phoneNumber
    });
};

exports.getLabRequests = () => {
    return db.view('_design/labRequest', 'patients-view');
}