/**
 * Created by wyq on 18/2/9.
 * 图片失败控制器(逻辑实现)
 */
const fs = require("fs");
const mConvert = require("../service/convert.js");

/**
 * 文字识别(含位置信息)
 * @param req
 * @param res
 */
exports.doGeneral = function (req, res) {
	mConvert.generalWithLocation(req.fileBuf.toString("base64")).then(result => {
		// console.log("==== body: %j, headers: %j", req.body, req.headers);
		// fs.writeFileSync(`/Users/sensoro/Desktop/${+new Date()}.png`, req.fileBuf);
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
};

/**
 * 高精度文字识别(含位置信息)
 * @param req
 * @param res
 */
exports.doAccurate = function (req, res) {
	mConvert.accurate(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
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
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
};

/**
 * 银行卡识别
 * @param req
 * @param res
 */
exports.doBankcard = function (req, res) {
	mConvert.bankcard(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
};

/**
 * 驾驶证识别
 * @param req
 * @param res
 */
exports.doDrivecard = function (req, res) {
	mConvert.drivingLicense(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
};

/**
 * 行驶证识别
 * @param req
 * @param res
 */
exports.doVehiclecard = function (req, res) {
	mConvert.vehicleLicense(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
};

/**
 * 车牌识别
 * @param req
 * @param res
 */
exports.doLicense = function (req, res) {
	mConvert.licensePlate(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
};

/**
 * 营业执照识别
 * @param req
 * @param res
 */
exports.doBusiness = function (req, res) {
	mConvert.businessLicense(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
};

/**
 * 通用票据识别
 * @param req
 * @param res
 */
exports.doReceipt = function (req, res) {
	mConvert.receipt(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
};

/**
 * 通用文字识别（含生僻字版）- 无位置信息
 * @param req
 * @param res
 */
exports.doEnhance = function (req, res) {
	mConvert.generalEnhance(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
};
