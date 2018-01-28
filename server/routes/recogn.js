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

/**
 * @api {post} /recogn/general/local v1-01.01 文字识别(含位置信息)
 * @apiGroup v1-01.Recogn
 * @apiName  generalWithLocation
 *
 * @apiDescription 对文字图片进行识别，同时返回位置信息
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",    //成功标志
 *        "code":200,
 *        "data":{
 *          "log_id":907100114493321300,
 *          "direction":0,
 *          "words_result_num":6, //结果行数(注意：有可能为0)
 *          "words_result":[
 *            {
 *              "probability":{"variance":0.000018,"average":0.998884,"min":0.974498},
 *              "location":{"width":1223,"top":0,"height":35,"left":2},
 *              "words":"在戚夫人为刘邦生下儿子刘如意之后,刘邦更是对她万般宠爱。随着时间的推移,刘邦"
 *            },
 *          ],
 *          "language":3
 *        }
 *      }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *   {
 *      "status":"error",
 *      "code":100002,
 *      "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *   }
 */
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
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});






