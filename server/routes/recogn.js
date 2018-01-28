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

/**
 * @api {post} /recogn/accurate/local v1-01.02 高精度文字识别(含位置信息)
 * @apiGroup v1-01.Recogn
 * @apiName  accurateWithLocation
 *
 * @apiDescription 对文字图片进行高精度识别，同时返回位置信息
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",
 *        "code":200,
 *        "data":{
 *          "log_id":6612658922496325000,
 *          "direction":0,
 *          "words_result_num":6,
 *          "words_result":[
 *          {
 *            "probability":{"variance":0.000013,"average":0.99878,"min":0.978404},
 *            "location":{"width":1219,"top":0,"height":36,"left":6},
 *            "words":"在戚夫人为刘邦生下儿子刘如意之后,刘邦更是对她万般宠爱。随着时间的推移,刘邦"
 *          },
 *          ...
 *        ]
 *      }
 *    }
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
app.post("/accurate/local", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.accurate(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

/**
 * @api {post} /recogn/idcard v1-01.03 识别身份证(正反面)
 * @apiGroup v1-01.Recogn
 * @apiName  idcard
 *
 * @apiDescription 识别身份证正反面
 *
 * @apiVersion 1.0.0
 *
 * @apiParam (Recogn) {String=front, back} side 身份证正反面
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",
 *        "code":200,
 *        "data":{
 *          "log_id":6612658922496325000,
 *          "direction":0,
 *          "words_result_num":6,
 *          "words_result":[
 *          {
 *            "probability":{"variance":0.000013,"average":0.99878,"min":0.978404},
 *            "location":{"width":1219,"top":0,"height":36,"left":6},
 *            "words":"在戚夫人为刘邦生下儿子刘如意之后,刘邦更是对她万般宠爱。随着时间的推移,刘邦"
 *          },
 *          ...
 *        ]
 *      }
 *    }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *     {
 *        "status":"ok",
 *        "code":200,
 *        "data":{  //正面结果
 *          "log_id":2604311532770586000,
 *          "words_result_num":6,
 *          "direction":0,
 *          "image_status":"normal",
 *          "words_result":{
 *            "住址":{
 *              "location":{"width":364,"top":363,"height":79,"left":349},
 *              "words":"河北省廊坊市XXXXXX"
 *            },
 *            "出生":{
 *              "location":{"width":278,"top":294,"height":28,"left":354},
 *              "words":"19881234"
 *            },
 *            "姓名":{
 *              "location":{"width":105,"top":151,"height":38,"left":361},
 *              "words":"张三某"
 *            },
 *            "公民身份号码":{
 *              "location":{"width":479,"top":542,"height":35,"left":492},
 *              "words":"1311234567575545"
 *            },
 *            "性别":{
 *              "location":{"width":22,"top":227,"height":30,"left":356},
 *              "words":"男"
 *            },
 *            "民族":{
 *              "location":{"width":23,"top":228,"height":30,"left":531},
 *              "words":"汉"
 *            }
 *          }
 *        },
 *        "data":{  //反面结果
 *          "log_id":3651343296527433000,
 *          "words_result_num":3,
 *          "direction":0,
 *          "image_status":"normal",
 *          "words_result":{
 *            "签发日期":{
 *              "location":{"width":159,"top":533,"height":30,"left":571},
 *              "words":"20150623"
 *            },
 *            "签发机关":{
 *              "location":{"width":181,"top":463,"height":30,"left":572},
 *              "words":"固安县公安局"
 *            },
 *            "失效日期":{
 *              "location":{"width":152,"top":533,"height":30,"left":748},
 *              "words":"20350623"
 *            }
 *          }
 *        }
 *     }
 */
app.post("/idcard", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	const idCardSide = req.body.side || req.query.side;
	if (!idCardSide || (idCardSide !== "front" && idCardSide !== "back")) {
		return res.lockSend(100003, `需要指出证件朝向(front: 正面,back: 背面)`);
	}
	mConvert.idcard(req.files[0].buffer.toString("base64"), idCardSide).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});











