/**
 * Created by wyq on 18/1/28.
 * 识别图片路由
 */
const express = require('express');
const app = module.exports = express.Router();
const mConvert = require("../service/convert");
const multer = require('multer');
const upload = multer(/*{dest: 'upload/'}*/);   //注释掉,则文件流保存在req.files[0].buffer字段
const path = require("path");
const allowFile = [".png", ".jpg", ".jpeg", ".bmp"];  //支持文件类型
const maxFileSize = 4 * 1024 * 1024;              //文件大小

app.post("/general/local", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.generalWithLocation(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, JSON.stringify(result, null, 2));
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

let files = [{
	"fieldname": "logo",
	"originalname": "t.js",
	"encoding": "7bit",
	"mimetype": "text/javascript",
	"buffer": {
		"type": "Buffer",
		"data": [10]
	},
	"size": 770
}];

res1 = {
	"log_id": 8275920031693948000,
	"direction": 0,
	"words_result_num": 6,
	"language": 3,
	"words_result": [
		{
			"probability": {"variance": 0.000018, "average": 0.998884, "min": 0.974498},
			"location": {"width": 1223, "top": 0, "height": 35, "left": 2},
			"words": "在戚夫人为刘邦生下儿子刘如意之后,刘邦更是对她万般宠爱。随着时间的推移,刘邦"
		}
	]
};





