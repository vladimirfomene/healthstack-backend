const express = require('express');
const logger = require('morgan');
const app = express();
const router = express.Router();
const port = 3000;


if(app.get('env') === 'development') app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//==================================
// Routes
//==================================

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