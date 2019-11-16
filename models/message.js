const { DB_HOST, DB_NAME } = require('../config/database_setup');
const couchbase = require('couchbase');
const cluster = new couchbase.Cluster(DB_HOST);
cluster.authenticate('Administrator', 'fomeneodiwuor');
const bucket = cluster.openBucket(DB_NAME);

exports.getSmsWithoutEmails = () => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND email=$2 AND sms.status!=$3';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['message', '', 'sent'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getNotSentEmails = () => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND email.status!=$2';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['message', 'sent'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.getSMSForSentEmails = () => {
    let queryString = 'SELECT * FROM `' +  DB_NAME + '` WHERE type=$1 AND email.status=$2 AND sms.status!=$3';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), ['message', 'sent', 'sent'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateEmail = (message) => {
    let queryString = 'UPDATE `' + DB_NAME + '` d USE KEYS $1 SET  email.status=$2, email.message_id=$3 WHERE type=$4 RETURNING d.*';
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), [ message.key, message.email.status, message.email.message_id, 'message'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateSms = (message) => {
    let queryString = 'UPDATE `' + DB_NAME + '` d USE KEYS $1 SET  sms.status=$2, sms.message_id=$3 WHERE type=$4 RETURNING d.*';

    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), [ message.key, message.sms.status, message.sms.message_id, 'message'], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateSmsByMessageId = (status, messageId) => {
    let queryString = 'UPDATE `' + DB_NAME + '` e SET  e.sms.status=$1 WHERE e.type=$2 AND e.sms.message_id=$3'
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), [status, 'message', messageId], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.updateEmailByMsgId = (status, messageId) => {
    let queryString = 'UPDATE `' + DB_NAME + '` d SET  d.email.status=$1 WHERE d.type=$2 AND d.email.message_id=$3 RETURNING d.*'
    return new Promise((resolve, reject) => {
        bucket.query(couchbase.N1qlQuery.fromString(queryString), [status, 'message', messageId], (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

exports.createMessage = (message) => {
    return new Promise((resolve, reject) => {
        bucket.insert(message.key, message, (err, result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};