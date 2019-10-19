const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);


exports.getPartnerLabById = (id) => {
    return db.get(id);
};

exports.getPartnerLabByName = (name) => {
    return db.view('_design/partnerLab', 'name-view', {
        'key': name
    });
};

exports.getPartnerLabByEmail = (email) => {
    return db.view('_design/partnerLab', 'email-view', {
        'key': email
    });
};

exports.getPartnerLabByTel = (tel) => {
    return db.view('_design/partnerLab', 'tel-view', {
        'key': tel
    });
};

exports.getPartnerLabs = () => {
    return db.view('_design/partnerLab', 'name-view');
}

exports.createPartnerLabs = (partnerLab) => {
    return db.insert(partnerLab);
};

exports.updatePartnerLabs = (partnerLab) => {
    return db.atomic('_design/partnerLab', 'inplace', partnerLab._id, partnerLab);
};