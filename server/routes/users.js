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

/**
 * @api {get} /users/times/default v1-03.01 获取所有图片识别接口的默认次数
 * @apiGroup v1-03.user
 * @apiName  getUserDefaultTimes
 *
 * @apiDescription 获取所有图片识别接口的默认次数(初期为固定值，后期根据authid进行识别用户)
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",    //成功标志
 *        "code":200,
 *        "data": {
 *          general: 2,       //文字识别(含位置信息)
 *          accurate: 2,      //高精度文字识别(含位置信息)
 *          idcard: 20,       //识别身份证(正反面)
 *          bankcard: 20,     //银行卡识别
 *          drivecard: 10,    //驾驶证识别
 *          vehiclecard: 10,  //行驶证识别
 *          license: 10,      //车牌识别
 *          business: 10,     //营业执照识别
 *          receipt: 20,      //通用票据识别
 *          enhance: 2,       //通用文字识别（含生僻字版）- 无位置信息
 *        }
 *      }
 */
app.get("/times/default", function (req, res) {
	return res.lockSend(200, mDefauleValue.times);
});

/**
 * @api {get} /users/times/me v1-03.02 获取某个人的当天识图已用次数
 * @apiGroup v1-03.user
 * @apiName  getUserUseTimes
 *
 * @apiDescription 获取某个人的当天识图已用次数(根据authid进行识别用户)
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",    //成功标志
 *        "code":200,
 *        "data": {
 *          general: 2,       //文字识别(含位置信息)
 *          accurate: 2,      //高精度文字识别(含位置信息)
 *          idcard: 20,       //识别身份证(正反面)
 *          bankcard: 20,     //银行卡识别
 *          drivecard: 10,    //驾驶证识别
 *          vehiclecard: 10,  //行驶证识别
 *          license: 10,      //车牌识别
 *          business: 10,     //营业执照识别
 *          receipt: 20,      //通用票据识别
 *          enhance: 2,       //通用文字识别（含生僻字版）- 无位置信息
 *        }
 *      }
 *
 * @apiError authError 授权错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 授权错误
 *   {
 *      "status":"error",
 *      "code":100006,
 *      "data":"获取用户身份信息失败"
 *   }
 */
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

/**
 * @api {post} /users/feedback v1-03.03 问题反馈
 * @apiGroup v1-03.user
 * @apiName  feedback
 *
 * @apiDescription 问题反馈
 *
 * @apiVersion 1.0.0
 *
 * @apiParam (users) {String} content 反馈内容，不超过1000个字符
 * @apiParam (users) {String} email 用户邮件，满足正则：/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",    //成功标志
 *        "code":200,
 *        "data": "您反馈的问题已知悉，请等待回复..."
 *      }
 *
 * @apiError paramError 参数错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 参数错误
 *   {
 *      "status":"error",
 *      "code":100000,
 *      "data":"反馈内容长度不能超过1000个汉字"
 *   }
 */
app.post("/feedback", function (req, res) {
	let schema = {
		content: Joi.string().max(1000).required(),
		email: Joi.string().regex(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/).required()
	};
	let checkObj = {
		content: req.body.content,
		email: req.body.email
	};
	let error = mJoiValidate.checkParam(checkObj, schema);
	if (error) {  //参数校验失败(返回错误原因)
		logger.warn("feedback error: %j", error);
		return res.lockSend(100000, error);
	}
	let doc = {
		content: req.body.content,
		email: req.body.email
	};
	Feedback.create(doc).then(response => {
		mMailService.goSendMail(response.content, response.email);
		return res.lockSend(200, "您反馈的问题已知悉，请等待回复...");
	}).catch(err => {
		logger.warn("feedback save db err: %s, doc: %s", err.stack || err.message || err, doc);
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});


