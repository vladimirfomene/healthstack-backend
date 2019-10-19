const { DB_HOST, DB_NAME } = require('../config/database_setup');
const nano = require('nano')(DB_HOST);
const db = nano.db.use(DB_NAME);


exports.createVaccine = (vaccine) => {
    return db.insert(vaccine);
}

exports.getVaccines = () => {
    return db.view('_design/vaccine', 'vaccines-view');
}

exports.getVaccineById = (id) => {
    return db.get(id);
}

exports.getVaccineByName = (name) => {
    return db.view('_design/vaccine', 'vaccineName-view');
}

exports.updateVaccine = (vaccine) => {
    return db.atomic('_design/vaccine', 'inplace', vaccine._id, vaccine);
};