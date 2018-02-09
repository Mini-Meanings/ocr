/**
 * Created by wyq on 18/2/9.
 * 将证件信息保存到本地
 */
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const config = require("config");
const logger = require("../utils/log")(__filename);

exports.saveBuf = function (buf, type) {
	try {
		if (!config.isCacheFile) {
			return null;
		}
		if (!type || !buf || !["jiashizheng", "shenfenzheng", "xingshizheng", "yingyezhizhao"].includes(type)) {
			return null;
		}
		let pathName = path.join(__dirname, `../filecache/${type}/${moment().format('YYYY-MM-DD=HH:mm:ss')}.png`);
		fs.writeFileSync(pathName, buf);
	}
	catch (e) {
		return logger.warn("saveBuf err: %s", e.stack || e.message || e);
	}
};
