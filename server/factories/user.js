/**
 * Created by wyq on 17/5/27.
 * 依赖注入模块
 */
const MD5 = require("md5");

module.exports = function () {
	return function (req, res, next) {
		if (!req.headers["authid"]) {
			if (req.query.u === "t") {
				return next(null, Math.floor(+new Date() / 100000).toString());
			}
			return next(null, null);
		}
		return next(null, MD5(req.headers["authid"]));
	}
};
