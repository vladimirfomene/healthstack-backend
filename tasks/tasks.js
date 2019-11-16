const cron = require("node-cron");
const messages = require("../models/message");
const { DB_NAME } = require("../config/database_setup");
const axios = require("axios");
const EMAIL_API = "https://25ph6jp3nb.execute-api.eu-west-1.amazonaws.com/dev/email";
const SMS_API = "https://25ph6jp3nb.execute-api.eu-west-1.amazonaws.com/dev/sms";

cron.schedule("* * * * *", () => {
  console.log("Sending Stuff");
  Promise.all([
    messages.getNotSentEmails(),
    messages.getSMSForSentEmails(),
    messages.getSmsWithoutEmails()
  ])
    .then(results => {
      let notSentEmails = results[0].map(message => {
        message = message[DB_NAME];
        delete message.sms;
        return message;
      });

      Promise.all(
        notSentEmails.map(email => {
          return axios.post(EMAIL_API, email);
        })
      ).then(emailRes => {
        let acceptedMessages = emailRes.filter(
          value => value.data.email.status === "accepted"
        );
        console.log(acceptedMessages);
        Promise.all(
          acceptedMessages.map(msg => {
            return messages.updateEmail(msg.data);
          })
        )
          .then(emailRes => {
            console.log("Updated email message", emailRes);
          })
          .catch(err => {
            console.log("email update failed");
            console.error(err);
          });
      })
      .catch(err => {
          console.error(err);
      });

      let smsForSentEmails = results[0].map(message => {
        message = message[DB_NAME];
        delete message.email;
        return message;
      });

      Promise.all(smsForSentEmails.map(sms => axios.post(SMS_API, sms))).then(
        smsRes => {
          
          let acceptedSms = smsRes.filter(
            value => value.data.sms.status === "accepted"
          );
          
          Promise.all(
            acceptedSms.map(message => {
              return messages.updateSms(message.data);
            })
          )
            .then(smsValues => {
              console.log("Updated email message", smsValues);
            })
            .catch(err => {
              console.log("email update failed");
              console.error(err);
            });
        }
      )
      .catch(err => {
          console.error(err);
      });

      let smsWithoutEmails = results[2].map(message => {
        message = message[DB_NAME];
        delete message.email;
        return message;
      });

      Promise.all(smsWithoutEmails.map(sms => axios.post(SMS_API, sms)))
      .then(smsRes => {
        let acceptedSms = smsRes.filter(
            value => value.data.sms.status == "accepted"
          );
          console.log(acceptedSms);
          Promise.all(
            acceptedSms.map(message => {
              return messages.updateSms(message);
            })
          )
            .then(smsValues => {
              console.log("Updated email message", smsValues);
            })
            .catch(err => {
              console.log("email update failed");
              console.error(err);
            });
      })
    })
    .catch(err => {
      console.error(err);
    });
});