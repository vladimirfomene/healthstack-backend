const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);

exports.getUserByEmail = (email) => {
    return db.view('_design/user', 'email-view', {
        'key': email
    });
};

exports.getUserById = (id) => {
    return db.get(id);
};

exports.getUsers = () => {
    return db.view('_design/user', 'email-view');
};

exports.createUser = (user) => {
    return db.insert(user);
};

exports.updateUser = (user) => {
    return db.atomic('_design/user', 'inspace', user._id, user);
};