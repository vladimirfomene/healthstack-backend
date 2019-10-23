const util = require('util');
const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const bucket = (new couchbase.Cluster(DB_HOST)).openBucket(DB_NAME);

let bktmanager = bucket.manager();
let createPrimaryIndex = util.promisify(bktmanager.createPrimaryIndex);
let createIndex = util.promisify(bktmanager.createIndex);

//Primary INDEX
createPrimaryIndex({ignoreExists: true})
.then(result => {
    console.log(result);
})
.catch(err => {
    console.error(err);
});

//Email INDEX
createIndex('email_index', ['email'])
.then(result => {
    console.log(result)
})
.catch(err => {
    console.error(err);
});

//Name INDEX
createIndex('name_index', ['name'])
.then(result => {
    console.log(result)
})
.catch(err => {
    console.error(err);
});