/**
 * Created by wyq on 2018/3/16.
 */
const express = require('express');
const app = module.exports = express.Router();

app.post("/baseinfo", function (req, res) {
	console.log("===== body: %j", req.body);
	return res.send({
		code: 0,
		picture: "http://www.baidu.com",
		nickName: "北艳难菲"
	});
});

app.post("/flist", function (req, res) {
	console.log("=========body: %j", res.body);
	return res.send({
		code: 0,
		friends: [
			{
				globalId: 1,
				nickName: "nickName1",
				picture: "picture1"
			},
			{
				globalId: 2,
				nickName: "nickName2",
				picture: "picture2"
			},
			{
				globalId: 3,
				nickName: "nickName3",
				picture: "picture13"
			}
		],
		message: "response message"
	});
});

app.post("/timeout", function (req, res) {
	console.log("=========body: %j", res.body);
	setTimeout(() => {
		return res.send("success");
	}, 20000);
});

app.get("/badworld", function (req, res) {
	console.log('==================== params: %j', req.query);
	return res.send({"ret": 0, "data": {"text_check_ret": 1, "dirty_cnt": 1, "dirty_words": "test"}});
});
