/**
 * Created by wyq on 18/2/9.
 * 图片识别中间件
 */
const Jimp = require("jimp");
const path = require("path");
const mDefauleValue = require("../utils/defaultValue.js");
const allowFile = mDefauleValue.recongnAllowFile;  //支持文件类型
const maxFileSize = mDefauleValue.recongnMaxFileSize;              //文件大小
const logger = require("../utils/log")(__filename);

/**
 * 参数验证
 * @param req
 * @param res
 * @param next
 */
exports.agrsCheck = function (req, res, next) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	return next();
};

/**
 * 图片裁切并返回PNG格式文件流
 * @param req
 * @param res
 * @param next
 */
exports.picCrop = function (req, res, next) {
	//todo 由于multer解析body时没有集成object的原型函数，所以req.body.hasOwnProperty函数是不存在的，下边代码重新继承
	req.body = Object.assign({}, req.body);
	if (req.body.hasOwnProperty("x") && req.body.hasOwnProperty("y") && req.body.hasOwnProperty("w") && req.body.hasOwnProperty("h")) {
		Jimp.read(req.files[0].buffer).then(lenna => {
			lenna.crop(+req.body.x, +req.body.y, +req.body.w, +req.body.h)
				.getBuffer(Jimp.MIME_PNG, function (err, buf) {
					if (!!err) {
						logger.warn("picCrop getBuffer err: %j", err.message || err);
						return res.lockSend(100005, `文件流处理错误: ${err.message}`);
					}
					req.fileBuf = buf;
					return next();
				})
		});
	}
	else {
		Jimp.read(req.files[0].buffer).then(lenna => {
			lenna.getBuffer(Jimp.MIME_PNG, function (err, buf) {
				if (!!err) {
					logger.warn("picCrop getBuffer err: %j", err.message || err);
					return res.lockSend(100005, `文件流处理错误: ${err.message}`);
				}
				req.fileBuf = buf;
				return next();
			})
		});
	}
};

