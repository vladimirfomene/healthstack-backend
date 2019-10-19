const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);

exports.getBillingRequestById = (id) => {
    return db.get(id);
};

exports.getBillingRequests = () => {
    return db.view('_design/billingRequest', 'name-view');
};

exports.getBillingRequestByName = (name) => {
    return db.view('_design/billingRequest', 'name-view', {
        'key': name
    });
};

exports.getBillingRequestByEmail = (email) => {
    return db.view('_design/billingRequest', 'email-view', {
        'key': email
    });
};

exports.getBillingRequestByTel = (tel) => {
    return db.view('_design/billingRequest', 'tel-view', {
        'key': tel
    });
};

exports.createBillingRequest = (billingRequest) => {
    return db.insert(billingRequest);
};

exports.updateBillingRequest = (billingRequest) => {
    return db.atomic('_design/billingRequest', 'inplace', billingRequest._id, billingRequest);
};
