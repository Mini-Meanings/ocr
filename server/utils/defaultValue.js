/**
 * Created by wyq on 18/2/5.
 * 常量值
 */
module.exports = {
	allLanguage: ["zh", "en", "yue", "wyw", "jp", "kor", "fra", "spa", "th", "ara", "ru", "pt", "de",     //百度翻译目标语言
		"it", "el", "nl", "pl", "bul", "est", "dan", "fin", "cs", "rom", "slo", "swe", "hu", "cht", "vie"],
	baiduTransApi: "https://fanyi-api.baidu.com/api/trans/vip/translate",                                 //百度翻译api
	recongnAllowFile: [".png", ".jpg", ".bmp", ".jpeg"],   //图片识别文件类型
	recongnMaxFileSize: 4 * 1024 * 1024,              //图片识别文件大小上限
	times: {
		general: 2,      //文字识别(含位置信息)
		accurate: 2,      //高精度文字识别(含位置信息)
		idcard: 20,       //识别身份证(正反面)
		bankcard: 20,     //银行卡识别
		drivecard: 10,    //驾驶证识别
		vehiclecard: 10,  //行驶证识别
		license: 10,      //车牌识别
		business: 10,     //营业执照识别
		receipt: 20,      //通用票据识别
		enhance: 2,       //通用文字识别（含生僻字版）- 无位置信息
	},
	timesKeyPrefix: "timesKeyPrefix-",
	totalTimesKeyPrefix: "totalTimesKeyPrefix-",
};

