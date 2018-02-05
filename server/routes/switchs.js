/**
 * Created by wyq on 18/2/5.
 * 转换接口(翻译，文字转语音)
 */
const express = require('express');
const app = module.exports = express.Router();
const mTranlate = require("../service/translate.js");
const mDefaultValue = require("../utils/defaultValue.js");

/**
 * @api {post} /switchs/translate v1-02.01 翻译转换
 * @apiGroup v1-01.switchs
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
	let q = req.body.q;               //翻译原文
	let destLan = req.body.destLan;   //目标语言
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
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});



