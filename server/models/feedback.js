/**
 * Created by beiyannanfei on 2018/3/1.
 * 用户反馈接口
 */
const mongoose = require("mongoose");
const moment = require("moment");

let schema = module.exports = new mongoose.Schema({
	content: {type: String},    //内容
	email: {type: String},      //用户emial
	cTime: {type: Date, default: Date.now()}
});

schema.index({cTime: -1}, {background: true});

if (!schema.options.toJSON) {
	schema.options.toJSON = {};
}

schema.options.toJSON.transform = function (doc, ret) {
	ret.cTime = ret.cTime && ret.cTime.valueOf();
	ret.cTimeStr = moment(new Date(ret.cTime)).format("YYYY-MM-DD HH:mm:ss");
	ret.id = ret._id;
};


