/**
 * Created by wyq on 17/5/27.
 * 依赖注入模块
 */
const MD5 = require("md5");

module.exports = function () {
	return function (req, res, next) {
		if (!req.headers["authid"]) {
			return next(null, null);
		}
		return next(null, MD5(req.headers["authid"]));
	}
};
