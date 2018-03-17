/**
 * Created by wyq on 17/8/26.
 */
const express = require('express');
const router = module.exports = express.Router();
const mConvert = require("../service/convert");
const mTools = require("../tools");
const fs = require("fs");
const path = require("path");
// const gm = require('gm').subClass({imageMagick: true});

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

router.post("/img/draw", upload.any(), function (req, res) {
	let filePath = path.join(__dirname, `../public/ocr/${req.files[0].originalname}`);
	if (fs.existsSync(filePath)) {    //如果文件已经存在则删除
		fs.unlinkSync(filePath);
	}
	fs.writeFile(filePath, req.files[0].buffer, {
		encoding: 'utf8',
		mode: 438,
		flag: 'a+'
	}, function (err) {
		if (!!err) {
			return res.send("生成文件失败");
		}
		console.log("...生成完毕...");
		mConvert.generalWithLocation(req.files[0].buffer.toString("base64")).then(result => {
			console.log(".... 识别完成。。。。");
			let gmFun = gm(filePath);
			for (let i = 0; i < result.words_result.length; ++i) {
				let temp = result.words_result[i].location;
				let lineList = mTools.aip2RectLine(temp.left, temp.top, temp.width, temp.height);
				lineList.forEach(line => {
					gmFun.drawLine(line[0], line[1], line[2], line[3])
				});
			}
			gmFun.write(filePath, function (err) {
				if (!!err) {
					return res.send("生成最终图片失败");
				}
				console.log("。。。。生成最终图片完成。。。");
				return res.send(`<a href='http://127.0.0.1:3000/ocr/${req.files[0].originalname}'>点击链接看效果</a>`);
			});
		}).catch(err => {
			return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
		});
	});
});

router.post("/img/draw/pro", upload.any(), function (req, res) {
	let filePath = path.join(__dirname, `../public/ocr/${req.files[0].originalname}`);
	if (fs.existsSync(filePath)) {    //如果文件已经存在则删除
		fs.unlinkSync(filePath);
	}
	fs.writeFile(filePath, req.files[0].buffer, {
		encoding: 'utf8',
		mode: 438,
		flag: 'a+'
	}, function (err) {
		if (!!err) {
			return res.send("生成文件失败");
		}
		console.log("...生成完毕...");
		mConvert.accurate(req.files[0].buffer.toString("base64")).then(result => {
			console.log(".... 识别完成。。。。");
			let gmFun = gm(filePath);
			for (let i = 0; i < result.words_result.length; ++i) {
				let temp = result.words_result[i].location;
				let lineList = mTools.aip2RectLine(temp.left, temp.top, temp.width, temp.height);
				lineList.forEach(line => {
					gmFun.drawLine(line[0], line[1], line[2], line[3])
				});
			}
			gmFun.write(filePath, function (err) {
				if (!!err) {
					return res.send("生成最终图片失败");
				}
				console.log("。。。。生成最终图片完成。。。");
				return res.send(`<a href='http://127.0.0.1:3000/ocr/${req.files[0].originalname}'>点击链接看效果</a>`);
			});
		}).catch(err => {
			return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
		});
	});
});


