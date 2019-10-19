const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);

exports.getLaboratoryById = (id) => {
    return db.get(id);
};

exports.createLaboratory = (laboratory) => {
    return db.insert(laboratory);
}

exports.updateLaboratory = (laboratory) => {
    return db.atomic('_design/laboratory', 'inplace', laboratory._id, laboratory);
};

exports.addLaboratoryLogo = () => {

};