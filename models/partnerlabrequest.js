const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);

exports.getPartnerLabRequest = (id) => {
    return db.get(id);
};

exports.createPartnerLabRequest = (partnerLabRequest) => {
    return db.insert(partnerLabRequest);
};

exports.getPartnerLabRequests = () => {
    return db.view('_design/partnerLabRequest', 'partnerLabRequests-view');
};

exports.getLabRequestByPartnerLab = () => {
    return db.view('_design/partnerLabRequest', 'labRequestByPartnerLab-view');
};

exports.updatePartnerLabRequest = (partnerLabRequest) => {
    return db.atomic('_design/partnerLabRequest', 'inplace', partnerLabRequest._id, partnerLabRequest);
};




