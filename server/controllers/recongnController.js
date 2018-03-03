/**
 * Created by wyq on 18/2/9.
 * 图片失败控制器(逻辑实现)
 */
const BlueBird = require("bluebird");
const moment = require("moment");
const mConvert = require("../service/convert.js");
const mCacheFile = require("../service/cacheFile.js");
const mDefauleValue = require("../utils/defaultValue.js");
const rc = require("../utils/createRedisClient")();
const logger = require("../utils/log")(__filename);
const mTransErrCode = require("../utils/transErrCode.js");

function totalTimesCount(type) {
	if (!type) {
		return null;
	}
	let key = mDefauleValue.totalTimesKeyPrefix + moment().format('YYYY-MM-DD');
	let field = type.toString();
	rc.hincrby(key, field, 1).then(() => {
		return rc.expire(key, 30 * 24 * 60 * 60);   //24小时后删除key
	}).catch(err => {
		return logger.warn("totalTimesCount redis err: %s, key: %s, field: %s", err.message || err, key, field);
	});
}

/**
 * 文字识别(含位置信息)
 * @param req
 * @param res
 */
exports.doGeneral = function (req, res) {
	// mConvert.generalWithLocation(req.fileBuf.toString("base64")).then(result => {
	mConvert.generalWithLocation(req.files[0].buffer.toString("base64")).then(result => {
		totalTimesCount("general");
		if (result.error_code) {
			return BlueBird.reject(mTransErrCode.goSwitchErr(result));
		}
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("doGeneral generalWithLocation err: %s", err.stack || err.message || err);
		let errmsg = err.message || err.stack || JSON.stringify(err);
		errmsg = mTransErrCode.getErrInfo(errmsg) || errmsg;
		return res.lockSend(100000, errmsg);
	});
};

/**
 * 高精度文字识别(含位置信息)
 * @param req
 * @param res
 */
exports.doAccurate = function (req, res) {
	mConvert.accurate(req.files[0].buffer.toString("base64")).then(result => {
		totalTimesCount("accurate");
		if (result.error_code) {
			return BlueBird.reject(mTransErrCode.goSwitchErr(result));
		}
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("doAccurate accurate err: %s", err.stack || err.message || err);
		let errmsg = err.message || err.stack || JSON.stringify(err);
		errmsg = mTransErrCode.getErrInfo(errmsg) || errmsg;
		return res.lockSend(100000, errmsg);
	});
};

/**
 * 识别身份证(正反面)
 * @param req
 * @param res
 * @returns {Function|*}
 */
exports.doIdcard = function (req, res) {
	const idCardSide = req.body.side || req.query.side;
	if (!idCardSide || (idCardSide !== "front" && idCardSide !== "back")) {
		return res.lockSend(100003, `需要指出证件朝向(front: 正面,back: 背面)`);
	}
	mConvert.idcard(req.files[0].buffer.toString("base64"), idCardSide).then(result => {
		totalTimesCount("idcard");
		if (result.error_code) {
			return BlueBird.reject(mTransErrCode.goSwitchErr(result));
		}
		mCacheFile.saveBuf(req.files[0].buffer, "shenfenzheng");
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("doIdcard idcard err: %s", err.stack || err.message || err);
		let errmsg = err.message || err.stack || JSON.stringify(err);
		errmsg = mTransErrCode.getErrInfo(errmsg) || errmsg;
		return res.lockSend(100000, errmsg);
	});
};

/**
 * 银行卡识别
 * @param req
 * @param res
 */
exports.doBankcard = function (req, res) {
	mConvert.bankcard(req.files[0].buffer.toString("base64")).then(result => {
		totalTimesCount("bankcard");
		if (result.error_code) {
			return BlueBird.reject(mTransErrCode.goSwitchErr(result));
		}
		mCacheFile.saveBuf(req.files[0].buffer, "shenfenzheng");
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("doBankcard bankcard err: %s", err.stack || err.message || err);
		let errmsg = err.message || err.stack || JSON.stringify(err);
		errmsg = mTransErrCode.getErrInfo(errmsg) || errmsg;
		return res.lockSend(100000, errmsg);
	});
};

/**
 * 驾驶证识别
 * @param req
 * @param res
 */
exports.doDrivecard = function (req, res) {
	mConvert.drivingLicense(req.files[0].buffer.toString("base64")).then(result => {
		totalTimesCount("drivecard");
		if (result.error_code) {
			return BlueBird.reject(mTransErrCode.goSwitchErr(result));
		}
		mCacheFile.saveBuf(req.files[0].buffer, "jiashizheng");
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("doDrivecard drivingLicense err: %s", err.stack || err.message || err);
		let errmsg = err.message || err.stack || JSON.stringify(err);
		errmsg = mTransErrCode.getErrInfo(errmsg) || errmsg;
		return res.lockSend(100000, errmsg);
	});
};

/**
 * 行驶证识别
 * @param req
 * @param res
 */
exports.doVehiclecard = function (req, res) {
	mConvert.vehicleLicense(req.files[0].buffer.toString("base64")).then(result => {
		totalTimesCount("vehiclecard");
		if (result.error_code) {
			return BlueBird.reject(mTransErrCode.goSwitchErr(result));
		}
		mCacheFile.saveBuf(req.files[0].buffer, "xingshizheng");
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("doVehiclecard vehicleLicense err: %s", err.stack || err.message || err);
		let errmsg = err.message || err.stack || JSON.stringify(err);
		errmsg = mTransErrCode.getErrInfo(errmsg) || errmsg;
		return res.lockSend(100000, errmsg);
	});
};

/**
 * 车牌识别
 * @param req
 * @param res
 */
exports.doLicense = function (req, res) {
	mConvert.licensePlate(req.files[0].buffer.toString("base64")).then(result => {
		totalTimesCount("license");
		if (result.error_code) {
			return BlueBird.reject(mTransErrCode.goSwitchErr(result));
		}
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("doLicense licensePlate err: %s", err.stack || err.message || err);
		let errmsg = err.message || err.stack || JSON.stringify(err);
		errmsg = mTransErrCode.getErrInfo(errmsg) || errmsg;
		return res.lockSend(100000, errmsg);
	});
};

/**
 * 营业执照识别
 * @param req
 * @param res
 */
exports.doBusiness = function (req, res) {
	mConvert.businessLicense(req.files[0].buffer.toString("base64")).then(result => {
		totalTimesCount("business");
		if (result.error_code) {
			return BlueBird.reject(mTransErrCode.goSwitchErr(result));
		}
		mCacheFile.saveBuf(req.files[0].buffer, "yingyezhizhao");
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("doBusiness businessLicense err: %s", err.stack || err.message || err);
		let errmsg = err.message || err.stack || JSON.stringify(err);
		errmsg = mTransErrCode.getErrInfo(errmsg) || errmsg;
		return res.lockSend(100000, errmsg);
	});
};

/**
 * 通用票据识别
 * @param req
 * @param res
 */
exports.doReceipt = function (req, res) {
	mConvert.receipt(req.files[0].buffer.toString("base64")).then(result => {
		totalTimesCount("receipt");
		if (result.error_code) {
			return BlueBird.reject(mTransErrCode.goSwitchErr(result));
		}
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("doReceipt receipt err: %s", err.stack || err.message || err);
		let errmsg = err.message || err.stack || JSON.stringify(err);
		errmsg = mTransErrCode.getErrInfo(errmsg) || errmsg;
		return res.lockSend(100000, errmsg);
	});
};

/**
 * 通用文字识别（含生僻字版）- 无位置信息
 * @param req
 * @param res
 */
exports.doEnhance = function (req, res) {
	mConvert.generalEnhance(req.files[0].buffer.toString("base64")).then(result => {
		totalTimesCount("enhance");
		if (result.error_code) {
			return BlueBird.reject(mTransErrCode.goSwitchErr(result));
		}
		return res.lockSend(200, result);
	}).catch(err => {
		logger.warn("doEnhance generalEnhance err: %s", err.stack || err.message || err);
		let errmsg = err.message || err.stack || JSON.stringify(err);
		errmsg = mTransErrCode.getErrInfo(errmsg) || errmsg;
		return res.lockSend(100000, errmsg);
	});
};
