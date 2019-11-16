const messages = require('../models/message');
const axios = require('axios');

exports.updateEmailStatus = (req, res, next) => {
    let body = ''

	req.on('data', (chunk) => {
		body += chunk.toString()
	})

	req.on('end', () => {
		let payload = JSON.parse(body);

		if (payload.Type === 'SubscriptionConfirmation') {
			axios.post(payload.SubscribeURL)
			.then(resp => {
				console.log(resp);
				res.status(200).json(resp);
			})
			.catch(err => {
				res.status(500).json(err);
			})
		}

		if (payload.Type.toLowerCase() === 'notification') {
			const message = JSON.parse(payload.Message);

			if(message.notificationType.toLowerCase() === 'delivery'){
				//email transaction succeeded
				messages.updateEmailByMsgId('sent', message.mail.messageId)
                .then(email => {
                    console.log("received update from AWS SNS", email);
                })
                .catch(err => {
                    console.log("Email message update failed");
                    console.error(err);
                });
			}

			if(message.notificationType.toLowerCase() === 'bounce' || message.notificationType.toLowerCase() === 'reject'
			|| message.notificationType.toLowerCase() === 'rendering failure'){
				//email transaction failed
				messages.updateEmailByMsgId('failed', message.messageId)
                .then(email => {
                    console.log("received update from AWS SNS", email);
                })
                .catch(err => {
                    console.log("Email message update failed");
                    console.error(err);
                });
			}

		}
	});
};