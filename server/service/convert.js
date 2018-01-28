/**
 * Created by wyq on 18/1/27.
 * 将图片转换为文字
 */
const AipOcrClient = require("baidu-aip-sdk").ocr;
const fs = require("fs");
const config = require("config");
const Bluebird = require("bluebird");

// 通用文字识别 500次
exports.generalOcr = function (imgBuff) {
	if (!imgBuff) {
		return Bluebird.reject("param imgBuff not exists");
	}
	let allKey = config.allKey;
	let selKey = allKey[+new Date() % allKey.length]; //根据时间随机选取一个key
	const client = new AipOcrClient(selKey.AppID, selKey.APIKey, selKey.SecretKey);
	const options = {
		language_type: "CHN_ENG", //识别语言类型
		detect_direction: "true", //图像朝向检测
		detect_language: "true",  //检测语言
		probability: "true"       //返回识别结果中每一行的置信度
	};
	return client.generalBasic(imgBuff, options);
};

// 通用文字识别（含位置信息版）500次
exports.generalWithLocation = function (imgBuff) {
	if (!imgBuff) {
		return Bluebird.reject("param imgBuff not exists");
	}
	let allKey = config.allKey;
	let selKey = allKey[+new Date() % allKey.length]; //根据时间随机选取一个key
	const client = new AipOcrClient(selKey.AppID, selKey.APIKey, selKey.SecretKey);
	const options = {
		recognize_granularity: "big",   //不定位单个字符位置
		language_type: "CHN_ENG",       //语言类型
		detect_direction: "true",       //检测图像朝向
		detect_language: "true",        //检测语言
		// vertexes_location: "true",      //返回文字外接多边形顶点位置
		probability: "true"             //返回识别结果中每一行的置信度
	};
	return client.general(imgBuff, options);
};

// 通用文字识别（高精度含位置版）50次
exports.accurate = function (imgBuff) {
	if (!imgBuff) {
		return Bluebird.reject("param imgBuff not exists");
	}
	let allKey = config.allKey;
	let selKey = allKey[+new Date() % allKey.length]; //根据时间随机选取一个key
	const client = new AipOcrClient(selKey.AppID, selKey.APIKey, selKey.SecretKey);
	const options = {
		recognize_granularity: "big",   //不定位单个字符位置
		detect_direction: "true",       //检测图像朝向
		probability: "true"             //返回识别结果中每一行的置信度
	};
	return client.accurate(imgBuff, options);
};

// 身份证识别 500次
exports.idcard = function (imgBuff, idCardSide) {
	if (!imgBuff) {
		return Bluebird.reject("param imgBuff not exists");
	}
	if (!idCardSide || (idCardSide !== "front" && idCardSide !== "back")) {
		idCardSide = "front";
	}
	let allKey = config.allKey;
	let selKey = allKey[+new Date() % allKey.length]; //根据时间随机选取一个key
	const client = new AipOcrClient(selKey.AppID, selKey.APIKey, selKey.SecretKey);
	const options = {
		recognize_granularity: "big",   //不定位单个字符位置
		detect_direction: "true",       //检测图像朝向
		probability: "true"             //返回识别结果中每一行的置信度
	};
	return client.idcard(imgBuff, idCardSide || "front", options);
};

// 银行卡识别 500次
exports.bankcard = function (imgBuff) {
	if (!imgBuff) {
		return Bluebird.reject("param imgBuff not exists");
	}
	let allKey = config.allKey;
	let selKey = allKey[+new Date() % allKey.length]; //根据时间随机选取一个key
	const client = new AipOcrClient(selKey.AppID, selKey.APIKey, selKey.SecretKey);
	const options = {
		detect_direction: "true",       //检测图像朝向
		probability: "true"             //返回识别结果中每一行的置信度
	};
	return client.bankcard(imgBuff, options);
};

// 驾驶证识别 200次
exports.drivingLicense = function (imgBuff) {
	if (!imgBuff) {
		return Bluebird.reject("param imgBuff not exists");
	}
	let allKey = config.allKey;
	let selKey = allKey[+new Date() % allKey.length]; //根据时间随机选取一个key
	const client = new AipOcrClient(selKey.AppID, selKey.APIKey, selKey.SecretKey);
	const options = {
		detect_direction: "true",       //检测图像朝向
		probability: "true"             //返回识别结果中每一行的置信度
	};
	return client.drivingLicense(imgBuff, options);
};

// 行驶证识别 200次
exports.vehicleLicense = function (imgBuff) {
	if (!imgBuff) {
		return Bluebird.reject("param imgBuff not exists");
	}
	let allKey = config.allKey;
	let selKey = allKey[+new Date() % allKey.length]; //根据时间随机选取一个key
	const client = new AipOcrClient(selKey.AppID, selKey.APIKey, selKey.SecretKey);
	const options = {
		detect_direction: "true",       //检测图像朝向
		probability: "true"             //返回识别结果中每一行的置信度
	};
	return client.vehicleLicense(imgBuff, options);
};

// 车牌识别 200次
exports.licensePlate = function (imgBuff) {
	if (!imgBuff) {
		return Bluebird.reject("param imgBuff not exists");
	}
	let allKey = config.allKey;
	let selKey = allKey[+new Date() % allKey.length]; //根据时间随机选取一个key
	const client = new AipOcrClient(selKey.AppID, selKey.APIKey, selKey.SecretKey);
	const options = {
		multi_detect: "true"            //多张车牌进行识别
	};
	return client.licensePlate(imgBuff, options);
};




// 网络图片文字识别 500次
// 通用文字识别（含生僻字版）付费
// 通用文字识别（高精度版）50次
// 营业执照识别 200次

// 通用票据识别 200次


