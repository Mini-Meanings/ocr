/**
 * Created by wyq on 2018/3/16.
 */
const express = require('express');
const app = module.exports = express.Router();

app.post("/baseinfo", function (req, res) {
	console.log("===== body: %j", req.body);
	return res.send({
		code: 0,
		userIcon: "http://www.baidu.com",
		userNickName: "北艳难菲"
	});
});