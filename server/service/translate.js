/**
 * Created by wyq on 18/2/5.
 */
const Bluebird = require("bluebird");
const mHttpUtils = require("./httpUtils");
const config = require("config");
const MD5 = require("md5");
const mDefaultValue = require("../utils/defaultValue.js");
const logger = require("../utils/log")(__filename);
let translateKay = config.translateKay[+new Date() % config.translateKay.length];
const url = mDefaultValue.baiduTransApi;

/**
 * 翻译
 * @param q         原文
 * @param destLan   目标语言
 */
exports.goTrans = function (q, destLan = "zh") {
	if (!q || !destLan) {
		return Bluebird.reject("参数不能为空");
	}
	if (q.toString().length > 2000) {
		return Bluebird.reject("翻译原文不能超过2000字符(中文同)");
	}
	if (!mDefaultValue.allLanguage.includes(destLan)) {
		return Bluebird.reject("目标语言不存在");
	}
	return new Bluebird((resolve, reject) => {
		const from = "auto";
		const to = destLan;
		const appid = translateKay.AppID;
		const key = translateKay.APIKey;
		const salt = +new Date();
		const sign = MD5(appid + q + salt + key);
		const param = {q, appid, salt, from, to, sign};
		mHttpUtils.httpPost(url, param, function (err, response) {
			if (!!err) {
				logger.error("goTrans err: %s, param: %s", err.stack || err.message || err, param);
				return reject(err);
			}
			if (!response || !response.trans_result || !response.trans_result.length || !response.trans_result[0].dst) {
				logger.error("goTrans response err: %s, param: %s", response, param);
				return reject("response field error");
			}
			return resolve(response.trans_result[0].dst);
		});
	});
};

