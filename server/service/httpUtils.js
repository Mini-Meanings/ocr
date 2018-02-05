/**
 * Created by wyq on 18/2/5.
 */
const request = require('superagent');

exports.httpPost = function (url, param, cb) {
	request.post(url)
		.type("application/x-www-form-urlencoded")
		.send(param)
		.timeout(10000)
		.accept("text/json")
		.end(function (err, xhr) {
			if (!!err) {
				return cb(err);
			}
			if (xhr.statusCode != 200) {
				return cb(xhr.statusCode);
			}
			if (!xhr.text) {
				return cb("response has not content");
			}
			let body;
			try {
				body = JSON.parse(xhr.text);
			}
			catch (e) {
				body = xhr.text;
			}
			return cb(null, body);
		});
};

exports.httpGet = function (url, param, cb) {
	request.get(url)
		.type("application/x-www-form-urlencoded")
		.query(param)
		.timeout(10000)
		.end(function (err, xhr) {
			if (!!err) {
				return cb(err);
			}
			if (xhr.statusCode != 200) {
				return cb(xhr.statusCode);
			}
			if (!xhr.text) {
				return cb("response has not content");
			}
			let body;
			try {
				body = JSON.parse(xhr.text);
			}
			catch (e) {
				body = xhr.text;
			}
			return cb(null, body);
		});
};