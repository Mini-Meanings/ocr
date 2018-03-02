/**
 * Created by wyq on 18/2/5.
 * 转换接口(翻译，文字转语音)
 */
const express = require('express');
const app = module.exports = express.Router();
const mTranlate = require("../service/translate.js");
const mDefaultValue = require("../utils/defaultValue.js");
const Joi = require("joi");
const mJoiValidate = require("../tools/joiValidate.js");
const mConvertService = require("../service/convert.js");

/**
 * @api {post} /switchs/translate v1-02.01 翻译转换
 * @apiGroup v1-02.switchs
 * @apiName  lanTranslate
 *
 * @apiDescription 文本翻译
 *
 * @apiVersion 1.0.0
 *
 * @apiParam (switchs) {String="zh", "en", "yue", "wyw", "jp", "kor", "fra", "spa", "th", "ara", "ru", "pt", "de", "it", "el", "nl", "pl", "bul", "est", "dan", "fin", "cs", "rom", "slo", "swe", "hu", "cht", "vie"} destLan 目标语言
 * @apiParam (switchs) {String} q 翻译文本(不超过2000字符)
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",    //成功标志
 *        "code":200,
 *        "data": "翻译结果"
 *      }
 *
 * @apiError paramError 参数错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 参数错误
 *   {
 *      "status":"error",
 *      "code":100004,
 *      "data":"翻译原文不能超过2000个字符"
 *   }
 */
app.post("/translate", function (req, res) {
	let q = req.body.q || req.query.q;                      //翻译原文
	let destLan = req.body.destLan || req.query.destLan;    //目标语言
	if (!q || !destLan) {
		return res.lockSend(100004, "参数不全");
	}
	if (q.toString().length > 2000) {
		return res.lockSend(100004, "翻译原文不能超过2000个字符");
	}
	if (!mDefaultValue.allLanguage.includes(destLan)) {
		return res.lockSend(100004, "目标语言不存在");
	}
	mTranlate.goTrans(q, destLan).then(response => {
		return res.lockSend(200, response);
	}).catch(err => {
		return res.lockSend(100000, err.message || err.stack || JSON.stringify(err));
	});
});

/**
 * @api {post} /switchs/voice/compose v1-02.02 语音合成
 * @apiGroup v1-02.switchs
 * @apiName  voiceCompose
 *
 * @apiDescription 语音合成
 *
 * @apiVersion 1.0.0
 *
 * @apiParam (switchs) {String} txt 文本，不超过1024字节
 * @apiParam (switchs) {Number=0,1,2,3,4,5,6,7,8,9} [spd 语速
 * @apiParam (switchs) {Number=0,1,2,3,4,5,6,7,8,9} [pit 音调
 * @apiParam (switchs) {Number=0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15} [vol 音量
 * @apiParam (switchs) {Number=0,1,3,4} [per 发音人选择, 0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",    //成功标志
 *        "code":200,
 *        "data": {
 *          "url": "/voice/v-123456789.mp3"
 *        }
 *      }
 *
 * @apiError paramError 参数错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 参数错误
 *   {
 *      "status":"error",
 *      "code":100004,
 *      "data":"翻译原文不能超过2000个字符"
 *   }
 */
app.post("/voice/compose", function (req, res) {
	let schema = {
		txt: Joi.string().min(1).max(1024).required(),
		spd: Joi.number().min(0).max(9),    //语速
		pit: Joi.number().min(0).max(9),    //音调
		vol: Joi.number().min(0).max(15),   //音量
		per: Joi.number().valid([0, 1, 3, 4])   //发音人选择, 0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女
	};
	let checkObj = {
		txt: req.body.txt,
		spd: +req.body.spd,
		pit: +req.body.pit,
		vol: +req.body.vol,
		per: +req.body.per
	};
	let error = mJoiValidate.checkParam(checkObj, schema);
	if (error) {  //参数校验失败(返回错误原因)
		logger.warn("feedback error: %j", error);
		return res.lockSend(100000, error);
	}
	let opt = {};
	req.body.hasOwnProperty("spd") && (opt.spd = +req.body.spd);
	req.body.hasOwnProperty("pit") && (opt.pit = +req.body.pit);
	req.body.hasOwnProperty("vol") && (opt.vol = +req.body.vol);
	req.body.hasOwnProperty("per") && (opt.per = +req.body.per);
	mConvertService.voiceCompose(req.body.txt, opt).then(url => {
		return res.lockSend(200, {url: url});
	}).catch(err => {
		return res.lockSend(100000, err.message || err.stack || JSON.stringify(err));
	});
});


