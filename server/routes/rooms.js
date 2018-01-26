/**
 * Created by wyq on 17/8/26.
 */
var express = require('express');
var router = module.exports = express.Router();

/**
 * @api {get} /prov1/accounts/list PRO-07.01 获取账号列表
 * @apiGroup PRO-07.Account
 * @apiName  list
 *
 * @apiDescription 获取账号列表
 * admin 可以查看所有商户的账号,其余商户只能看到自己的账号
 *
 * @apiVersion 1.0.0
 *
 * @apiParam (accounts) {String} [search 过滤条件
 * @apiParam (accounts) {String} [grantRoleIds 权限角色id(对个以逗号分隔)
 *
 *
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *      {
 *        "errcode": 0
 *        "data": [
 *          {
 *            "_id": "59cf4a20560c4e2576564200",
 *            "userName": "13812348888",                  //账号
 *            "grantRoles": {
 *              "_id": "59b255e865dd3b5da6ac7201",        //角色id
 *              "grantName": "管理员默认权限角色",           //角色名称
 *              "id": "59b255e865dd3b5da6ac7201"
 *            },
 *            "grants": {},                              //账号个性化权限
 *            "users": {
 *              "_id":"507f1f77bcf86cd799100000",
 *              "nickname":"超级管理员",
 *              "grants":{},
 *              "id":"507f1f77bcf86cd799100000"
 *            }
 *            "contacts": "13812348888",                  //联系电话
 *            "contactName": "张三",                      //联系人
 *            "createdTime": 1507798942041,              //创建时间
 *            "loginTime": 1507798942041,                 //最后登录时间
 *            "isStop": false,                            //是否停用
 *            "isManage": true,                           //是否为商户管理账号
 *            "isDeleted": false,
 *            "id": "59cf4a20560c4e2576564200",
 *            "childAccount": [                           //子账号列表
 *              {
 *                "_id": "59cf4a20560c4e2576564206",
 *                "userName": "13812346666",
 *                "grantRoles": {"_id": "59b255e865dd3b5da6ac7201", "grantName": "管理员默认权限角色", "id": "59b255e865dd3b5da6ac7201"},
 *                "grants": {},                              //账号个性化权限
 *                "users": "507f1f77bcf86cd799100000",
 *                "contacts": "13812346666",
 *                "contactName": "张三小号",
 *                "__v": 0,
 *                "createdTime": 1507798942043,
 *                "loginTime": 1507798942043,
 *                "isStop": false,
 *                "isManage": false,
 *                "isDeleted": false,
 *                "id": "59cf4a20560c4e2576564206"
 *              }
 *            ]
 *          }
 *        ]
 *
 */
router.get("/", function (req, res) {
	return res.send("rooms router");
});
