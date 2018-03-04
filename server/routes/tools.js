/**
 * Created by beiyannanfei on 2018/3/4.
 */
const fs = require("fs");
const path = require("path");
const express = require('express');
const moment = require("moment");
const _ = require("underscore");
const app = module.exports = express.Router();
const mDefauleValue = require("../utils/defaultValue.js");
const rc = require("../utils/createRedisClient")();
const logger = require("../utils/log")(__filename);
const Joi = require("joi");
const mJoiValidate = require("../tools/joiValidate.js");
const mMailService = require("../service/mailService.js");


app.get("/times/used", function (req, res) {
	let key = mDefauleValue.totalTimesKeyPrefix + moment().format('YYYY-MM-DD');
	rc.hgetall(key).then(response => {
		return res.lockSend(200, response);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || err);
	});
});

app.get("/del/cache/mp3", function (req, res) {
	try {
		let dirPath = path.join(__dirname, "../public/voice/");
		let pa = fs.readdirSync(dirPath);
		let delFileList = [];
		pa.forEach(function (ele) {
			let filePath = dirPath + ele;
			let ext = path.extname(filePath);
			if (ext != ".mp3") {
				return;
			}
			let fileName = path.basename(ele, ".mp3");
			let fileTime = fileName.substr(2);
			let nowTime = +new Date();
			let timeDiff = nowTime - fileTime;
			if (timeDiff > 3600 * 1000) {
				fs.unlinkSync(filePath);
				delFileList.push(ele);
			}
		});
		return res.lockSend(200, `已删除文件：${delFileList.join(",")}`);
	} catch (e) {
		return res.lockSend(200, `出错了: ${e.stack || e.message || e}`);
	}
});

