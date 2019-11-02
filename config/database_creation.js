const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

let bktmanager = bucket.manager();

//Primary INDEX
// bktmanager.createPrimaryIndex({ignoreExists: true}, (err, result) => {
// 	if(result){
//     	console.log(result);
// 	}else{
//     	console.error(err);
// 	}
// });


//Email INDEX
// bktmanager.createIndex('email_index', ['email'], (err, result) => {
// 	if(result){
// 		console.log(result)
// 	}else{
// 		console.error(err);
// 	}
// });

//Name INDEX
// bktmanager.createIndex('name_index', ['name'], (err, result) => {
// 	if(result){
// 		console.log(result)
// 	}else{
// 		console.error(err);
// 	}
// });

//tel INDEX
// bktmanager.createIndex('tel_index', ['telephone'], (err, result) => {
// 	if(result){
// 		console.log(result)
// 	}else{
// 		console.error(err);
// 	}
// });
