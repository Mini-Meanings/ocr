/**
 * Created by wyq on 17/8/26.
 */
const express = require('express');
const router = module.exports = express.Router();
const mConvert = require("../service/convert");

router.get("/", function (req, res) {
	return res.send("rooms router");
});

router.post("/t", function (req, res) {
	console.log(req.body);
	return res.send(req.body);
});
const multer = require('multer');
const upload = multer(/*{dest: 'upload/'}*/);   //注释掉,则文件流保存在req.files.buffer字段

router.post("/img/t", upload.any(), function (req, res) {
	// console.log(req.files);
	mConvert.generalOcr(req.files[0].buffer.toString("base64")).then(result => {
		return res.send(JSON.stringify(result, null, 2));
	}).catch(err => {
		return res.send(err.stack || err.message || JSON.stringify(err));
	});
	/*
	[ { fieldname: 'logo',
    originalname: '06.php',
    encoding: '7bit',
    mimetype: 'text/php',
    buffer: <Buffer 3c 3f 70 68 70 0a 2f 2a 2a 0a 20 2a 20 43 72 65 61 74 65 64 20 62 79 20 50 68 70 53 74 6f 72 6d 2e 0a 20 2a 20 55 73 65 72 3a 20 77 79 71 0a 20 2a 20 ... >,
    size: 716 } ]
	*/
});




