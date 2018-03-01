/**
 * Created by beiyannanfei on 2018/3/1.
 * 邮件服务器
 */
const nodemailer = require('nodemailer');
const config = require("config");
const logger = require("../utils/log")(__filename);

exports.goSendMail = function (content, uEmail) {
	let transporter = nodemailer.createTransport({
		"host": "smtpdm.aliyun.com",
		"port": 80,
		"secureConnection": false, // use SSL
		"auth": {
			"user": config.mailConf.user,
			"pass": config.mailConf.pass
		}
	});

	let mailOptions = {
		from: 'iocr response<ai@iocr.vip>', // sender address
		to: config.mailConf.customerServiceMail.join(","), // list of receivers
		subject: '用户问题反馈', // Subject line
		text: content, // plain text body
		replyTo: uEmail
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return logger.warn("send email err: %s", error.message || error);
		}
		return logger.info("send email success uEmail: %s", uEmail);
	});
};









