const express = require('express');
const moment = require("moment");
const _ = require("underscore");
const app = module.exports = express.Router();
const mDefauleValue = require("../utils/defaultValue.js");
const rc = require("../utils/createRedisClient")();
const logger = require("../utils/log")(__filename);

//获取所有默认次数
app.get("/times/default", function (req, res) {
	return res.lockSend(200, mDefauleValue.times);
});

//获取某个人的当天已用次数
app.get("/times/me", function (user, req, res) {
	if (!user) {
		return res.lockSend(100006, `获取用户身份信息失败.`);
	}
	let uid = user;
	let key = mDefauleValue.timesKeyPrefix + moment().format('YYYY-MM-DD');
	let filedList = Object.keys(mDefauleValue.times).map(item => item + "_" + uid);
	rc.hmget(key, filedList).then(response => {
		let result = _.object(Object.keys(mDefauleValue.times), response);
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("times me redis err: %s, key: %s, filedList: %s", err.message || err, key, filedList);
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});




