const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);


exports.createDatabase = () => {
    nano.db.create(DB_NAME).then(data => {
        return data;
    }).catch(err => {
        return err;
    })
};