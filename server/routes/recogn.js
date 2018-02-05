/**
 * Created by wyq on 18/1/28.
 * 识别图片路由
 */
const express = require('express');
const app = module.exports = express.Router();
const mConvert = require("../service/convert");
const multer = require('multer');
const upload = multer(/*{dest: 'upload/'}*/);   //注释掉,则文件流保存在req.files[0].buffer字段
const path = require("path");
const allowFile = [".png", ".jpg", ".jpeg", ".bmp"];  //支持文件类型
const maxFileSize = 4 * 1024 * 1024;              //文件大小

/**
 * @api {post} /recogn/general v1-01.01 文字识别(含位置信息)
 * @apiGroup v1-01.Recogn
 * @apiName  generalWithLocation
 *
 * @apiDescription 对文字图片进行识别，同时返回位置信息
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",    //成功标志
 *        "code":200,
 *        "data":{
 *          "log_id":907100114493321300,
 *          "direction":0,
 *          "words_result_num":6, //结果行数(注意：有可能为0)
 *          "words_result":[
 *            {
 *              "probability":{"variance":0.000018,"average":0.998884,"min":0.974498},
 *              "location":{"width":1223,"top":0,"height":35,"left":2},
 *              "words":"在戚夫人为刘邦生下儿子刘如意之后,刘邦更是对她万般宠爱。随着时间的推移,刘邦"
 *            },
 *          ],
 *          "language":3
 *        }
 *      }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *   {
 *      "status":"error",
 *      "code":100002,
 *      "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *   }
 */
app.post("/general", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.generalWithLocation(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

/**
 * @api {post} /recogn/accurate v1-01.02 高精度文字识别(含位置信息)
 * @apiGroup v1-01.Recogn
 * @apiName  accurateWithLocation
 *
 * @apiDescription 对文字图片进行高精度识别，同时返回位置信息
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",
 *        "code":200,
 *        "data":{
 *          "log_id":6612658922496325000,
 *          "direction":0,
 *          "words_result_num":6,
 *          "words_result":[
 *          {
 *            "probability":{"variance":0.000013,"average":0.99878,"min":0.978404},
 *            "location":{"width":1219,"top":0,"height":36,"left":6},
 *            "words":"在戚夫人为刘邦生下儿子刘如意之后,刘邦更是对她万般宠爱。随着时间的推移,刘邦"
 *          },
 *          ...
 *        ]
 *      }
 *    }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *   {
 *      "status":"error",
 *      "code":100002,
 *      "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *   }
 */
app.post("/accurate", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.accurate(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

/**
 * @api {post} /recogn/idcard v1-01.03 识别身份证(正反面)
 * @apiGroup v1-01.Recogn
 * @apiName  idcard
 *
 * @apiDescription 识别身份证正反面
 *
 * @apiVersion 1.0.0
 *
 * @apiParam (Recogn) {String=front, back} side 身份证正反面
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "status":"ok",
 *        "code":200,
 *        "data":{  //正面结果
 *          "log_id":2604311532770586000,
 *          "words_result_num":6,
 *          "direction":0,
 *          "image_status":"normal",
 *          "words_result":{
 *            "住址":{
 *              "location":{"width":364,"top":363,"height":79,"left":349},
 *              "words":"河北省廊坊市XXXXXX"
 *            },
 *            "出生":{
 *              "location":{"width":278,"top":294,"height":28,"left":354},
 *              "words":"19881234"
 *            },
 *            "姓名":{
 *              "location":{"width":105,"top":151,"height":38,"left":361},
 *              "words":"张三某"
 *            },
 *            "公民身份号码":{
 *              "location":{"width":479,"top":542,"height":35,"left":492},
 *              "words":"1311234567575545"
 *            },
 *            "性别":{
 *              "location":{"width":22,"top":227,"height":30,"left":356},
 *              "words":"男"
 *            },
 *            "民族":{
 *              "location":{"width":23,"top":228,"height":30,"left":531},
 *              "words":"汉"
 *            }
 *          }
 *        },
 *        "data":{  //反面结果
 *          "log_id":3651343296527433000,
 *          "words_result_num":3,
 *          "direction":0,
 *          "image_status":"normal",
 *          "words_result":{
 *            "签发日期":{
 *              "location":{"width":159,"top":533,"height":30,"left":571},
 *              "words":"20150623"
 *            },
 *            "签发机关":{
 *              "location":{"width":181,"top":463,"height":30,"left":572},
 *              "words":"固安县公安局"
 *            },
 *            "失效日期":{
 *              "location":{"width":152,"top":533,"height":30,"left":748},
 *              "words":"20350623"
 *            }
 *          }
 *        }
 *    }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *     {
 *        "status":"error",
 *        "code":200,
 *        "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *     }
 */
app.post("/idcard", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	const idCardSide = req.body.side || req.query.side;
	if (!idCardSide || (idCardSide !== "front" && idCardSide !== "back")) {
		return res.lockSend(100003, `需要指出证件朝向(front: 正面,back: 背面)`);
	}
	mConvert.idcard(req.files[0].buffer.toString("base64"), idCardSide).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

/**
 * @api {post} /recogn/bankcard v1-01.04 银行卡识别
 * @apiGroup v1-01.Recogn
 * @apiName  bankcard
 *
 * @apiDescription 银行卡识别
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {
 *      "status":"ok",
 *      "code":200,
 *      "data":{
 *        "log_id":6785171683675854000,
 *        "result":{
 *          "bank_card_number":"4033 9200 1649 3621", //	银行卡卡号
 *          "bank_card_type":2, //银行卡类型，0:不能识别; 1: 借记卡; 2: 信用卡
 *          "bank_name":"中信银行"  //银行名，不能识别时为空
 *        }
 *      }
 *    }
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *     {
 *        "status":"error",
 *        "code":200,
 *        "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *     }
 */
app.post("/bankcard", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.bankcard(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

/**
 * @api {post} /recogn/drivecard v1-01.05 驾驶证识别
 * @apiGroup v1-01.Recogn
 * @apiName  drivecard
 *
 * @apiDescription 驾驶证识别
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {
 *      "status":"ok",
 *      "code":200,
 *      "data":{
 *        "log_id":124457963164818740,
 *        "direction":0,
 *        "words_result_num":10,
 *        "words_result":{
 *          "证号":{"words":"37078219930111478X"},
 *          "有效期限":{"words":"20141201"},
 *          "准驾车型":{"words":"C1"},
 *          "住址":{"words":"山东省诸城市百尺河镇中水泊村146号"},
 *          "至":{"words":"20201201"},
 *          "姓名":{"words":"李菲"},
 *          "国籍":{"words":"中国"},
 *          "出生日期":{"words":"19930111"},
 *          "性别":{"words":"女"},
 *          "初次领证日期":{"words":"20141201"}
 *        }
 *      }
 *    }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *     {
 *        "status":"error",
 *        "code":200,
 *        "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *     }
 */
app.post("/drivecard", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.drivingLicense(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

/**
 * @api {post} /recogn/vehiclecard v1-01.06 行驶证识别
 * @apiGroup v1-01.Recogn
 * @apiName  vehiclecard
 *
 * @apiDescription 行驶证识别
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {
 *      "status":"ok",
 *      "code":200,
 *      "data":{
 *        "log_id":2038943926651774700,
 *        "direction":0,
 *        "words_result_num":10,
 *        "words_result":{
 *          "品牌型号":{"words":"桑塔纳牌SVW7180LEL"},
 *          "发证日期":{"words":"20130708"},
 *          "使用性质":{"words":"非营运"},
 *          "发动机号码":{"words":"0009878"},
 *          "号牌号码":{"words":"浙BC0P87"},
 *          "所有人":{"words":"张泽为"},
 *          "住址":{"words":"浙江省宁波市江东区园T街88弄26号101室"},
 *          "注册日期":{"words":"20060721"},
 *          "车辆识别代号":{"words":"LSVAU033662116327"},
 *          "车辆类型":{"words":"小型轿车"}
 *        }
 *      }
 *    }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *     {
 *        "status":"error",
 *        "code":200,
 *        "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *     }
 */
app.post("/vehiclecard", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.vehicleLicense(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

/**
 * @api {post} /recogn/license v1-01.07 车牌识别
 * @apiGroup v1-01.Recogn
 * @apiName  license
 *
 * @apiDescription 车牌识别
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {
 *      "status":"ok",
 *      "code":200,
 *      "data":{
 *        "log_id":4340037728924258300,
 *        "words_result":[{"color":"blue","number":"粤B594SB"}]
 *      }
 *    }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *     {
 *        "status":"error",
 *        "code":200,
 *        "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *     }
 */
app.post("/license", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.licensePlate(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

/**
 * @api {post} /recogn/business v1-01.08 营业执照识别
 * @apiGroup v1-01.Recogn
 * @apiName  businessLicense
 *
 * @apiDescription 营业执照识别
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {
 *      "status":"ok",
 *      "code":200,
 *      "data":{
 *        "log_id":4640987200229955000,
 *        "direction":0,
 *        "words_result_num":6,
 *        "words_result":{
 *          "社会信用代码":{
 *            "location":{"width":0,"top":0,"height":0,"left":0},
 *            "words":"无"
 *          },
 *          "单位名称":{
 *            "location":{"width":247,"top":521,"height":20,"left":310},
 *            "words":"金乡县金马机械制造有限公司"
 *          },
 *          "法人":{
 *            "location":{"width":58,"top":641,"height":20,"left":307},
 *            "words":"杨小月"
 *          },
 *          "证件编号":{
 *            "location":{"width":142,"top":476,"height":13,"left":516},
 *            "words":"370828200012462"
 *          },
 *          "地址":{
 *            "location":{"width":286,"top":601,"height":21,"left":306},
 *            "words":"金乡县王丕镇驻地结核病医院北侧"
 *          },
 *          "有效期":{
 *            "location":{"width":144,"top":763,"height":20,"left":472},
 *            "words":"2022年07月12日"
 *          }
 *        }
 *      }
 *    }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *     {
 *        "status":"error",
 *        "code":200,
 *        "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *     }
 */
app.post("/business", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.businessLicense(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

/**
 * @api {post} /recogn/receipt v1-01.09 通用票据识别
 * @apiGroup v1-01.Recogn
 * @apiName  receipt
 *
 * @apiDescription 通用票据识别
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {
 *      "status":"ok",
 *      "code":200,
 *      "data":{
 *        "log_id":4758592829353561000,
 *        "direction":3,
 *        "words_result_num":50,
 *        "words_result":[
 *          {"location":{"width":53,"top":389,"height":257,"left":1256},"words":"刺麻麻辣香锅"},
 *          {"location":{"width":40,"top":685,"height":126,"left":1214},"words":"人数:0"},
 *          {"location":{"width":43,"top":228,"height":226,"left":1220},"words":"台号:101号台"},
 *          {"location":{"width":44,"top":226,"height":352,"left":1181},"words":"单号:XS-1801020026"},
 *          {"location":{"width":56,"top":225,"height":404,"left":1131},"words":"收银:01月02日13:11:14"},
 *          {"location":{"width":40,"top":710,"height":126,"left":220},"words":"243.00"},
 *          {"location":{"width":45,"top":210,"height":131,"left":234},"words":"实收:"},
 *          {"location":{"width":63,"top":202,"height":416,"left":160},"words":"定座电话:01053269233"},
 *          {"location":{"width":69,"top":375,"height":280,"left":100},"words":"欢迎下次光临"},
 *          {"location":{"width":38,"top":798,"height":28,"left":40},"words":"2"},
 *          {"location":{"width":60,"top":293,"height":453,"left":58},"words":"龙脉餐饮管理系统010-51653309"}
 *        ]
 *      }
 *    }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *     {
 *        "status":"error",
 *        "code":200,
 *        "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *     }
 */
app.post("/receipt", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.receipt(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

/**
 * @api {post} /recogn/enhance v1-01.10 通用文字识别（含生僻字版）- 无位置信息
 * @apiGroup v1-01.Recogn
 * @apiName  enhance
 *
 * @apiDescription 通用文字识别（含生僻字版）
 *
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *    {
 *      "status":"ok",
 *      "code":200,
 *      "data":{
 *        "log_id":5314503378561276000,
 *        "direction":0,
 *        "words_result_num":36,
 *        "words_result":[
 *          {"words":"囧槑烎兲氼"},
 *          {"words":"砳嘦嫑嘂圐"},
 *          {"words":"圙玊孖砟"},
 *          {"words":")|节图2)"},
 *          {"words":"七大姑八(大姨,亲戚你能分清"}
 *        ]
 *      }
 *    }
 *
 * @apiError fileEmpty 文件类型错误
 * @apiErrorExample {json}
 *   HTTP/1.1 200 文件类型错误
 *     {
 *        "status":"error",
 *        "code":200,
 *        "data":"文件类型错误，目前只支持不超过4M的 *.png、*.jpg、*.jpeg、*.bmp 类型图片"
 *     }
 */
app.post("/enhance", upload.any(), function (req, res) {
	if (!req.files || !req.files.length) {
		return res.lockSend(100001, "上传文件为空");
	}
	let file = req.files[0];
	let size = file.size;
	let ext = path.extname(file.originalname);
	if (size > maxFileSize || !allowFile.includes(ext)) {
		return res.lockSend(100002, `文件类型错误，目前只支持不超过4M的 ${allowFile.map(e => "*" + e).join("、")} 类型图片`);
	}
	mConvert.generalEnhance(req.files[0].buffer.toString("base64")).then(result => {
		return res.lockSend(200, result);
	}).catch(err => {
		return res.lockSend(100000, err.stack || err.message || JSON.stringify(err));
	});
});

