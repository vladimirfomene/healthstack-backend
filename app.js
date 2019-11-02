const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { COOKIE_SECRET } = require('./config/database_setup');
const app = express();
const router = express.Router();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
const port = 3000;

const server = app.listen(port, () => console.log(`HealthStack is listening on port ${port}`));
const io = require('socket.io').listen(server);

const users = require('./controllers/user');
const userModel = require('./models/user');
const labrequests = require('./controllers/labrequest');
const labRequestModel = require('./models/labrequest');
const departments = require('./controllers/department');
const departmentModel = require('./models/department');
const insurances = require('./controllers/insurance');
const insuranceModel = require('./models/insurance');
const invoices = require('./controllers/invoice');
const invoiceModel = require('./models/invoice');
const exams = require('./controllers/exam');
const examModel = require('./models/exam');
const vaccines = require('./controllers/vaccine');
const vaccineModel = require('./models/vaccine');
const laboratories = require('./controllers/laboratory');
const laboratoryModel = require('./models/laboratory');
const partnerLabs = require('./controllers/partnerlab');
const partnerLabModel = require('./models/partnerlab');
const patients = require('./controllers/patient');
const patientModel = require('./models/patient');
const partnerLabRequests = require('./controllers/partnerlabrequest');
const partnerLabRequestModel = require('./models/partnerlabrequest');
const transactions = require('./controllers/transaction');
const transactionModel = require('./models/transaction');
const auth = require('./controllers/auth');



if(app.get('env') === 'development') app.use(logger('dev'));
app.use(cors({
    credentials: true,
    origin: "http://127.0.0.1:8080"
}));
app.use(cookieSession({
    name: 'tokenSession',
    secret: COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now + (4 * 60 * 60 * 1000)),
    }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//==================================
// Routes
//==================================
router.route('/api/users/:id')
    .get(auth.verifyToken, users.getUserById);
router.route('/api/users')
    .get(auth.verifyToken, users.getUsers)

router.route('/api/labrequests')
    .get(auth.verifyToken, labrequests.getLabRequests);
router.route('/api/labrequests/:id')
    .get(auth.verifyToken, labrequests.getLabRequestById);

router.route('/api/departments/:id')
    .get(auth.verifyToken, departments.getDepartmentById);
router.route('/api/departments')
    .get(auth.verifyToken, departments.getDepartments);

router.route('/api/insurances/:id')
    .get(auth.verifyToken, insurances.getInsuranceById);
router.route('/api/insurances')
    .get(auth.verifyToken, insurances.getInsurances);

router.route('/api/invoices/:id')
    .get(invoices.getInvoiceById);
router.route('/api/invoices')
    .get(auth.verifyToken, invoices.getInvoices);

router.route('/api/exams/:id')
    .get(auth.verifyToken, exams.getExamById);
router.route('/api/exams')
    .get(auth.verifyToken, exams.getExams);

router.route('/api/vaccines/:id')
    .get(auth.verifyToken, vaccines.getVaccineById);
router.route('/api/vaccines')
    .get(auth.verifyToken, vaccines.getVaccines);

router.route('/api/laboratories/:id')
    .get(auth.verifyToken, laboratories.getLaboratoryById)
    .put(auth.verifyToken, laboratories.updateLaboratory);
router.route('/api/laboratories')
    .post(auth.verifyToken, laboratories.createLaboratory);

router.route('/api/partnerlabs/:id')
    .get(auth.verifyToken, partnerLabs.getPartnerLabById);
router.route('/api/partnerlabs')
    .get(auth.verifyToken, partnerLabs.getPartnerLabs);

router.route('/api/patients/:id')
    .get(auth.verifyToken, patients.getPatientById);
router.route('/api/patients')
    .get(auth.verifyToken, patients.getPatients);

router.route('/api/partnerlabrequests/:id')
    .get(auth.verifyToken, partnerLabRequests.getPartnerLabRequestById);
router.route('/api/partnerlabrequests')
    .get(auth.verifyToken, partnerLabRequests.getLabRequestByPartnerLab);

router.route('/api/transactions/:id')
    .get(auth.verifyToken, transactions.getTransactionById);
router.route('/api/transactions')
    .get(auth.verifyToken, transactions.getTransactions);

router.route('/api/login')
    .post(auth.login);
router.route('/api/refresh_token')
    .post(auth.refreshToken);
router.route('/api/logout')
    .post(auth.verifyToken, auth.logout);


//Mount router
app.use('/', router);

//Socket Connections
io.on('connection', (socket) => {
    console.log("connected");

    //user Connections
    socket.on('create-user', (user) => {
        userModel.createUser(user)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('create-user', user);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'user creation failed';
            io.emit('create-user', err);
        });
    });

    socket.on('update-user', (user) => {
        userModel.updateUser(user)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('update-user', user);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'user update failed';
            io.emit('update-user', err);
        });
    });

    //labrequest connections
    socket.on('create-labrequest', (labRequest) => {
        labRequestModel.createLabRequest(labRequest)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('create-labrequest', labRequest);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'labrequest creation failed';
            io.emit('create-labrequest', err);
        });
    });

    socket.on('update-labrequest', (labRequest) => {
        labRequestModel.updateLabRequest(labRequest)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('update-labrequest', labRequest);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'labrequest update failed';
            io.emit('create-labrequest', err);
        });
    });

    //department connections
    socket.on('create-department', (department) => {
        departmentModel.createDepartment(department)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('create-department', department);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'department creation failed';
            io.emit('create-department', err);
        });
    });

    socket.on('update-department', (department) => {
        departmentModel.updateDepartment(department)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('update-department', department);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'department update failed';
            io.emit('update-department', err);
        });
    });

    //insurance connections
    socket.on('create-insurance', (insurance) => {
        insuranceModel.createInsurance(insurance)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('create-insurance', insurance);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'insurance creation failed';
            io.emit('create-insurance', err);
        });
    });

    socket.on('update-insurance', (insurance) => {
        insuranceModel.updateInsurance(insurance)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('update-insurance', insurance);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'insurance update failed';
            io.emit('update-insurance', err);
        });
    });

    //invoice connections
    socket.on('create-invoice', (invoice) => {
        invoiceModel.createInvoice(invoice)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('create-invoice', invoice);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'invoice creation failed';
            io.emit('create-invoice', err);
        });
    });

    socket.on('update-invoice', (invoice) => {
        invoiceModel.updateInvoice(invoice)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('update-invoice', invoice);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'invoice update failed';
            io.emit('update-invoice', err);
        });
    });

    //exam connections
    socket.on('create-exam', (exam) => {
        examModel.createExam(exam)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('create-exam', exam);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'exam creation failed';
            io.emit('create-exam', err);
        });
    });

    socket.on('update-exam', (exam) => {
        examModel.updateExam(exam)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('update-exam', exam);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'exam update failed';
            io.emit('update-exam', err);
        });
    });

    //vaccine connections
    socket.on('create-vaccine', (vaccine) => {
        vaccineModel.createVaccine(vaccine)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('create-vaccine', vaccine);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'vaccine update failed';
            io.emit('create-vaccine', err);
        });
    });


    socket.on('update-vaccine', (vaccine) => {
        vaccineModel.updateVaccine(vaccine)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('update-vaccine', vaccine);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'vaccine update failed';
            io.emit('update-vaccine', err);
        });
    });

    //partnerlab connections
    socket.on('create-partnerlab', (partnerLab) => {
        partnerLabModel.createPartnerLabs(partnerLab)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('create-partnerlab', partnerLab);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'partnerlab creation failed';
            io.emit('create-partnerlab', err);
        });
    });

    socket.on('update-partnerlab', (partnerLab) => {
        partnerLabModel.updatePartnerLabs(partnerLab)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('update-partnerlab', partnerLab);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'partnerlab update failed';
            io.emit('update-partnerlab', err);
        });
    });

    //patient connections
    socket.on('create-patient', (patient) => {
        patientModel.createPatient(patient)
        .then(resp => {
            console.log('Patient created');
            if(typeof resp.cas == 'object') io.emit('create-patient', patient);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'patient creation failed';
            io.emit('create-patient', err);
        });
    });

    //partnerlabrequest connections
    socket.on('create-partnerlabrequest', (partnerLabRequest) => {
        partnerLabRequestModel.createPartnerLabRequest(partnerLabRequest)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('create-partnerlabrequest', partnerLabRequest);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'partnerlabrequest creation failed';
            io.emit('create-partnerlabrequest', err);
        });
    });

    socket.on('update-partnerlabrequest', (partnerLabRequest) => {
        partnerLabRequestModel.updatePartnerLabRequest(partnerLabRequest)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('update-partnerlabrequest', partnerLabRequest);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'partnerlabrequest update failed';
            io.emit('update-partnerlabrequest', err);
        });
    });

    //transaction connections
    socket.on('create-transaction', (transaction) => {
        transactionModel.createTransaction(transaction)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('create-transaction', transaction);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'transaction creation failed';
            io.emit('create-transaction', err);
        });
    });

    socket.on('update-transaction', (transaction) => {
        transactionModel.updateTransaction(transaction)
        .then(resp => {
            if(typeof resp.cas == 'object') io.emit('update-transaction', transaction);
        })
        .catch(err => {
            err.status = 500;
            err.msg = 'transaction update failed';
            io.emit('update-transaction', err);
        });
    });
});



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