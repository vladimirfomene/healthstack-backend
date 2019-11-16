const messages = require("../models/message");

exports.updateSmsStatus = (req, res, next) => {
  messages.updateSmsByMessageId(req.body.status, req.body.id)
  .then(msg => {
    console.log("received update from AFRICASTALKING", msg);
  }).catch(err => {
    console.log("Email message update failed");
    console.error(err);
  });
};
