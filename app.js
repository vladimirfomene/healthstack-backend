const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const port = 3000;

const users = require('./controllers/user');
const labrequests = require('./controllers/labrequest');
const departments = require('./controllers/department');
const insurances = require('./controllers/insurance');
const invoices = require('./controllers/invoice');
const exams = require('./controllers/exam');
const vaccines = require('./controllers/vaccine');
const laboratories = require('./controllers/laboratory');
const partnerLabs = require('./controllers/partnerlab');
const patients = require('./controllers/patient');
const partnerLabRequests = require('./controllers/partnerlabrequest');
const transactions = require('./controllers/transaction');


if(app.get('env') === 'development') app.use(logger('dev'));
app.use(cors({
    origin: 'http://localhost:8080'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//==================================
// Routes
//==================================
router.route('/api/users/:id')
    .get(users.getUserById)
    .put(users.updateUser);
router.route('/api/users')
    .get(users.getUsers)
    .post(users.createUser);

router.route('/api/labrequests')
    .get(labrequests.getLabRequests)
    .post(labrequests.createLabRequest);
router.route('/api/labrequests/:id')
    .get(labrequests.getLabRequestById)
    .put(labrequests.updateLabRequest);

router.route('/api/departments/:id')
    .get(departments.getDepartmentById)
    .put(departments.updateDepartment);
router.route('/api/departments')
    .get(departments.getDepartments)
    .post(departments.createDepartment);

router.route('/api/insurances/:id')
    .get(insurances.getInsuranceById)
    .put(insurances.updateInsurance);
router.route('/api/insurances')
    .get(insurances.getInsurances)
    .post(insurances.createInsurance);

router.route('/api/invoices/:id')
    .get(invoices.getInvoiceById)
    .put(invoices.updateInvoice);
router.route('/api/invoices')
    .get(invoices.getInvoices)
    .post(invoices.createInvoice);

router.route('/api/exams/:id')
    .get(exams.getExamById)
    .put(exams.updateExam);
router.route('/api/exams')
    .get(exams.getExams)
    .post(exams.createExam);

router.route('/api/vaccines/:id')
    .get(vaccines.getVaccineById)
    .put(vaccines.updateVaccine);
router.route('/api/vaccines')
    .get(vaccines.getVaccines)
    .post(vaccines.createVaccine);

router.route('/api/laboratories/:id')
    .get(laboratories.getLaboratoryById)
    .put(laboratories.updateLaboratory);
router.route('/api/laboratories')
    .post(laboratories.createLaboratory);

router.route('/api/partnerlabs/:id')
    .get(partnerLabs.getPartnerLabById)
    .put(partnerLabs.updatePartnerLab);
router.route('/api/partnerlabs')
    .get(partnerLabs.getPartnerLabs)
    .post(partnerLabs.createPartnerLab);

router.route('/api/patients/:id')
    .get(patients.getPatientById)
router.route('/api/patients')
    .get(patients.getPatients)
    .post(patients.createPatient);

router.route('/api/partnerlabrequests/:id')
    .get(partnerLabRequests.getPartnerLabRequestById)
    .put(partnerLabRequests.updatePartnerLabRequest);
router.route('/api/partnerlabrequests')
    .post(partnerLabRequests.createPartnerLabRequest)
    .get(partnerLabRequests.getLabRequestByPartnerLab);

router.route('/api/transactions/:id')
    .get(transactions.getTransactionById);
router.route('/api/transactions')
    .get(transactions.getTransactions)
    .post(transactions.createTransaction);


//Mount router
app.use('/', router);


//==================================
// Error Handling Middleware
//==================================
app.use(function(req, res, next){
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if(app.get('env') === 'development'){
    app.use(function(err, req, res, next){
        console.log(err);
		res.status(err.status || 500).json(err.msg);
    });
}

app.listen(port, () => console.log(`HealthStack is listening on port ${port}`));