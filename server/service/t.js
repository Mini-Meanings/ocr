/**
 * Created by wyq on 18/1/26.
 */
const AppID = "10691901";
const APIKey = "EnFieqEHl59lvCVGRKwNGUgo";
const SecretKey = "Ua9DG5cCxPVO9LTrRLjTyPHWM7T0CcwH";
const AipOcrClient = require("baidu-aip-sdk").ocr;
const fs = require("fs");
const client = new AipOcrClient(AppID, APIKey, SecretKey);

function t1() { //通用文字识别
	const imageBuf = fs.readFileSync("./b.png").toString("base64");
	client.generalBasic(imageBuf).then(function (result) {
		return console.log(JSON.stringify(result));
		let str = "";
		result.words_result.forEach(e => {
			str += e.words;
		});
		console.log(str);
	}).catch(function (err) {
		// 如果发生网络错误
		console.log(err);
	});
}

t1();