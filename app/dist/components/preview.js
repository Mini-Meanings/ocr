'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preview = function (_wepy$component) {
  _inherits(Preview, _wepy$component);

  function Preview() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Preview.__proto__ || Object.getPrototypeOf(Preview)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      result: {
        imgurl: '',
        desc: '',
        one: '解析图片中～',
        status: false,
        list: [],
        type: ''
      },
      copy: [],
      authid: Math.random().toString(16).substring(2),
      voiceUrl: ''
    }, _this.methods = {
      which: function which() {
        this.result.one = this.result.desc;
      },
      checkboxChange: function checkboxChange(e) {
        // console.log('checkboxChange');
        var keys = e.detail.value.sort(function (a, b) {
          return a - b;
        });
        this.copy = [];
        for (var i = 0; i < keys.length; i++) {
          this.copy.push(this.result.list[keys[i]].val);
        }
        console.log(this.copy);
      },
      share: function share() {
        wx.showShareMenu({
          withShareTicket: true
        });
      },
      voice: function voice() {
        // wx.showToast({
        //   title: '语音合成中...',
        //   icon: 'loading',
        //   duration: 2000
        // })
        var self = this;
        wx.request({
          url: 'https://www.iocr.vip/ai/switchs/voice/compose',
          method: 'POST',
          // header: {authid:self.authid},
          data: {
            txt: self.copy.join(''),
            spd: 5, // 语速
            pit: 4, // 音调
            vol: 3, // 音量
            per: 4 // 0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫
          },
          success: function success(res) {
            console.log('compose', res.data);

            if (res.data.code === 200) {
              var url = res.data.data.url;
              self.voiceUrl = 'https://www.iocr.vip' + url;
              self.$apply();
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.data,
                success: function success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 2
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                }
              });
            }
          }
        });
      },
      toggle: function toggle() {
        this.result.status = !this.result.status;
      },
      transfer: function transfer() {
        var self = this;
        wx.showActionSheet({
          itemList: ['英文', '日语', '法语', '中文'],
          success: function success(res) {
            // console.log(res.tapIndex,self.copy);
            var type = '';
            if (res.tapIndex === 0) {
              type = 'en';
            } else if (res.tapIndex === 1) {
              type = 'jp';
            } else if (res.tapIndex === 2) {
              type = 'fra';
            } else if (res.tapIndex === 3) {
              type = 'zh';
            }
            wx.request({
              url: 'https://www.iocr.vip/ai/switchs/translate',
              method: 'POST',
              header: { authid: self.authid },
              data: {
                destLan: type,
                q: self.copy.join('')
              },
              success: function success(res) {
                console.log('translate', res.data);
                self.result.list = [{ id: 0, val: res.data.data }];
                self.$apply();
              }
            });
          },
          fail: function fail(res) {
            console.log(res.errMsg);
          }
        });
      },
      copy: function copy() {
        wx.setClipboardData({
          data: this.copy.join('\n'),
          success: function success(res) {
            wx.getClipboardData({
              success: function success(res) {
                wx.showToast({
                  title: '文字已复制',
                  icon: 'success',
                  duration: 2000
                });
              }
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Preview, [{
    key: 'initCopy',
    value: function initCopy() {
      var keys = this.result.list.sort(function (a, b) {
        return a - b;
      });
      this.copy = [];
      for (var i = 0; i < keys.length; i++) {
        this.copy.push(this.result.list[i].val);
      }
    }
  }, {
    key: 'upload',
    value: function upload(type) {
      console.log(type, 'upload');
      var self = this;
      wx.showLoading({
        title: '识别中',
        mask: true
      });
      if (type === 'card') {
        wx.uploadFile({
          url: 'https://www.iocr.vip/ai/recogns/bankcard',
          filePath: this.result.imgurl,
          name: 'file',
          header: { authid: this.authid },
          success: function success(res) {
            var data = JSON.parse(res.data);
            console.log(data, 'backcard');
            if (data.status === 'error') {
              wx.showModal({
                title: '提示',
                content: data.data,
                success: function success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 2
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                }
              });
            } else if (data.status === 'ok') {
              var temp = data.data.result;
              self.result.list = [{ id: 0, val: '\u5361\u53F7\uFF1A' + temp.bank_card_number }, { id: 1, val: '\u7C7B\u578B\uFF1A' + (temp.bank_card_type === 2 ? '信用卡' : '借记卡') }, { id: 2, val: '\u94F6\u884C\u540D\u79F0\uFF1A' + temp.bank_name }];

              self.result.status = true;
              self.initCopy();
              self.$apply();
            }
            wx.hideLoading();
          },
          fail: function fail(err) {
            wx.hideLoading();
          }
        });
      } else if (type === 'id') {
        wx.uploadFile({
          url: 'https://www.iocr.vip/ai/recogns/idcard',
          filePath: this.result.imgurl,
          name: 'file',
          header: { authid: this.authid },
          formData: {
            side: 'front'
          },
          success: function success(res) {
            var data = JSON.parse(res.data);
            console.log(data, 'id success');

            if (data.status === 'error') {
              wx.showModal({
                title: '提示',
                content: data.data,
                success: function success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 2
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                }
              });
            } else if (data.status === 'ok') {
              // let results = data.data.words_result.map((item,index) => { return {id:index,val:item.words,key:item[item[index]]}; });
              // console.log(results,'sss');
              // self.result.list = results;
              // self.result.status = true;

              var temp = data.data.words_result;
              self.result.list = [{ id: 0, val: '\u59D3\u540D\uFF1A' + temp['姓名'].words }, { id: 1, val: '\u6027\u522B\uFF1A' + temp['性别'].words }, { id: 2, val: '\u6C11\u65CF\uFF1A' + temp['民族'].words }, { id: 3, val: '\u51FA\u751F\uFF1A' + temp['出生'].words }, { id: 4, val: '\u4F4F\u5740\uFF1A' + temp['住址'].words }, { id: 5, val: '\u516C\u6C11\u8EAB\u4EFD\u53F7\u7801\uFF1A' + temp['公民身份号码'].words }];

              self.result.status = true;
              self.initCopy();
              self.$apply();
            }
            wx.hideLoading();
          },
          fail: function fail(err) {
            // console.log(err,'err');
            wx.hideLoading();
          }
        });
      } else if (type === 'drive') {
        wx.uploadFile({
          url: 'https://www.iocr.vip/ai/recogns/drivecard',
          filePath: this.result.imgurl,
          name: 'file',
          header: { authid: this.authid },
          success: function success(res) {
            var data = JSON.parse(res.data);
            console.log(data, 'drive success');

            if (data.status === 'error') {
              wx.showModal({
                title: '提示',
                content: data.data,
                success: function success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 2
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                }
              });
            } else if (data.status === 'ok') {
              // let results = data.data.words_result.map((item,index) => { return {id:index,val:item.words,key:item[item[index]]}; });
              // console.log(results,'sss');
              // self.result.list = results;
              // self.result.status = true;

              var temp = data.data.words_result;
              self.result.list = [{ id: 0, val: '\u8BC1\u53F7\uFF1A' + temp['证号'].words }, { id: 1, val: '\u6709\u6548\u671F\u9650\uFF1A' + temp['有效期限'].words }, { id: 2, val: '\u51C6\u9A7E\u8F66\u578B\uFF1A' + temp['准驾车型'].words }, { id: 3, val: '\u521D\u6B21\u9886\u8BC1\u65E5\u671F\uFF1A' + temp['初次领证日期'].words }, { id: 4, val: '\u59D3\u540D\uFF1A' + temp['姓名'].words }, { id: 5, val: '\u6027\u522B\uFF1A' + temp['性别'].words }, { id: 6, val: '\u56FD\u7C4D\uFF1A' + temp['国籍'].words }, { id: 7, val: '\u51FA\u751F\u65E5\u671F\uFF1A' + temp['出生日期'].words }, { id: 8, val: '\u4F4F\u5740\uFF1A' + temp['住址'].words }];

              self.result.status = true;
              self.initCopy();
              self.$apply();
            }
            wx.hideLoading();
          },
          fail: function fail(err) {
            // console.log(err,'err');
            wx.hideLoading();
          }
        });
      } else if (type === 'enhance') {
        wx.uploadFile({
          url: 'https://www.iocr.vip/ai/recogns/enhance',
          filePath: this.result.imgurl,
          name: 'file',
          header: { authid: this.authid },
          success: function success(res) {
            var data = JSON.parse(res.data);
            console.log(data, 'success');

            if (data.status === 'error') {
              wx.showModal({
                title: '提示',
                content: data.data,
                success: function success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 2
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                }
              });
            } else if (data.status === 'ok') {
              var results = data.data.words_result.map(function (item, index) {
                return { id: index, val: item.words };
              });
              // console.log(results,'sss');
              self.result.list = results;
              self.result.status = true;
              self.initCopy();
              self.$apply();
            }
            wx.hideLoading();
          },
          fail: function fail(err) {
            // console.log(err,'err');
            wx.hideLoading();
          }
        });
      } else {
        wx.uploadFile({
          url: 'https://www.iocr.vip/ai/recogns/general',
          filePath: this.result.imgurl,
          name: 'file',
          header: { authid: this.authid },
          success: function success(res) {
            var data = JSON.parse(res.data);
            console.log(data, 'success');

            if (data.status === 'error') {
              wx.showModal({
                title: '提示',
                content: data.data,
                success: function success(res) {
                  if (res.confirm) {
                    wx.navigateBack({
                      delta: 2
                    });
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                }
              });
            } else if (data.status === 'ok') {
              var results = data.data.words_result.map(function (item, index) {
                return { id: index, val: item.words };
              });
              // console.log(results,'sss');
              self.result.list = results;
              self.result.status = true;
              self.initCopy();
              self.$apply();
            }
            wx.hideLoading();
          },
          fail: function fail(err) {
            // console.log(err,'err');
            wx.hideLoading();
          }
        });
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.result.imgurl = wx.getStorageSync('imageurl');
      this.result.type = wx.getStorageSync('type');
      // console.log(this.result.type,'params');
      this.upload(this.result.type);
      wx.showShareMenu({
        withShareTicket: true
      });
    }
  }]);

  return Preview;
}(_wepy2.default.component);

exports.default = Preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwidm9pY2VVcmwiLCJtZXRob2RzIiwid2hpY2giLCJjaGVja2JveENoYW5nZSIsImUiLCJrZXlzIiwiZGV0YWlsIiwidmFsdWUiLCJzb3J0IiwiYSIsImIiLCJpIiwibGVuZ3RoIiwicHVzaCIsInZhbCIsImNvbnNvbGUiLCJsb2ciLCJzaGFyZSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsInZvaWNlIiwic2VsZiIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJ0eHQiLCJqb2luIiwic3BkIiwicGl0Iiwidm9sIiwicGVyIiwic3VjY2VzcyIsInJlcyIsImNvZGUiLCIkYXBwbHkiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJjb25maXJtIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYW5jZWwiLCJ0b2dnbGUiLCJ0cmFuc2ZlciIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0IiwidGFwSW5kZXgiLCJoZWFkZXIiLCJkZXN0TGFuIiwicSIsImlkIiwiZmFpbCIsImVyck1zZyIsInNldENsaXBib2FyZERhdGEiLCJnZXRDbGlwYm9hcmREYXRhIiwic2hvd1RvYXN0IiwiaWNvbiIsImR1cmF0aW9uIiwic2hvd0xvYWRpbmciLCJtYXNrIiwidXBsb2FkRmlsZSIsImZpbGVQYXRoIiwibmFtZSIsIkpTT04iLCJwYXJzZSIsInRlbXAiLCJiYW5rX2NhcmRfbnVtYmVyIiwiYmFua19jYXJkX3R5cGUiLCJiYW5rX25hbWUiLCJpbml0Q29weSIsImhpZGVMb2FkaW5nIiwiZXJyIiwiZm9ybURhdGEiLCJzaWRlIiwid29yZHNfcmVzdWx0Iiwid29yZHMiLCJyZXN1bHRzIiwibWFwIiwiaXRlbSIsImluZGV4IiwiZ2V0U3RvcmFnZVN5bmMiLCJ1cGxvYWQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNLEVBRkE7QUFHTkMsYUFBSyxRQUhDO0FBSU5DLGdCQUFRLEtBSkY7QUFLTkMsY0FBTSxFQUxBO0FBTU5DLGNBQU07QUFOQSxPQURIO0FBU0xDLFlBQU0sRUFURDtBQVVMQyxjQUFRQyxLQUFLQyxNQUFMLEdBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLFNBQTNCLENBQXFDLENBQXJDLENBVkg7QUFXTEMsZ0JBQVU7QUFYTCxLLFFBY1BDLE8sR0FBVTtBQUNSQyxXQURRLG1CQUNBO0FBQ04sYUFBS2YsTUFBTCxDQUFZRyxHQUFaLEdBQWtCLEtBQUtILE1BQUwsQ0FBWUUsSUFBOUI7QUFDRCxPQUhPO0FBSVJjLG9CQUpRLDBCQUlPQyxDQUpQLEVBSVU7QUFDaEI7QUFDQSxZQUFJQyxPQUFPRCxFQUFFRSxNQUFGLENBQVNDLEtBQVQsQ0FBZUMsSUFBZixDQUFvQixVQUFDQyxDQUFELEVBQUdDLENBQUgsRUFBTztBQUNwQyxpQkFBT0QsSUFBRUMsQ0FBVDtBQUNELFNBRlUsQ0FBWDtBQUdBLGFBQUtoQixJQUFMLEdBQVksRUFBWjtBQUNBLGFBQUksSUFBSWlCLElBQUksQ0FBWixFQUFlQSxJQUFJTixLQUFLTyxNQUF4QixFQUFnQ0QsR0FBaEMsRUFBcUM7QUFDbkMsZUFBS2pCLElBQUwsQ0FBVW1CLElBQVYsQ0FBZSxLQUFLMUIsTUFBTCxDQUFZSyxJQUFaLENBQWlCYSxLQUFLTSxDQUFMLENBQWpCLEVBQTBCRyxHQUF6QztBQUNEO0FBQ0RDLGdCQUFRQyxHQUFSLENBQVksS0FBS3RCLElBQWpCO0FBQ0QsT0FkTztBQWVSdUIsV0FmUSxtQkFlQTtBQUNOQyxXQUFHQyxhQUFILENB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Rjs7OzZCQUVTO0FBQ1IsV0FBS3BGLE1BQUwsQ0FBWUMsTUFBWixHQUFxQjhCLEdBQUcrRCxjQUFILENBQWtCLFVBQWxCLENBQXJCO0FBQ0EsV0FBSzlGLE1BQUwsQ0FBWU0sSUFBWixHQUFtQnlCLEdBQUcrRCxjQUFILENBQWtCLE1BQWxCLENBQW5CO0FBQ0E7QUFDQSxXQUFLQyxNQUFMLENBQVksS0FBSy9GLE1BQUwsQ0FBWU0sSUFBeEI7QUFDQXlCLFNBQUdDLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7OztFQXhZa0MsZUFBSytELFM7O2tCQUFyQmxHLE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgaW1ndXJsOiAnJyxcbiAgICAgICAgZGVzYzogJycsXG4gICAgICAgIG9uZTogJ+ino+aekOWbvueJh+S4re+9nicsXG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICB0eXBlOiAnJ1xuICAgICAgfSxcbiAgICAgIGNvcHk6IFtdLFxuICAgICAgYXV0aGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMiksXG4gICAgICB2b2ljZVVybDogJydcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgd2hpY2goKSB7XG4gICAgICAgIHRoaXMucmVzdWx0Lm9uZSA9IHRoaXMucmVzdWx0LmRlc2M7XG4gICAgICB9LFxuICAgICAgY2hlY2tib3hDaGFuZ2UoZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hlY2tib3hDaGFuZ2UnKTtcbiAgICAgICAgbGV0IGtleXMgPSBlLmRldGFpbC52YWx1ZS5zb3J0KChhLGIpPT57XG4gICAgICAgICAgcmV0dXJuIGEtYjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuY29weS5wdXNoKHRoaXMucmVzdWx0Lmxpc3Rba2V5c1tpXV0udmFsKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvcHkpO1xuICAgICAgfSxcbiAgICAgIHNoYXJlKCkge1xuICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB2b2ljZSgpIHtcbiAgICAgICAgLy8gd3guc2hvd1RvYXN0KHtcbiAgICAgICAgLy8gICB0aXRsZTogJ+ivremfs+WQiOaIkOS4rS4uLicsXG4gICAgICAgIC8vICAgaWNvbjogJ2xvYWRpbmcnLFxuICAgICAgICAvLyAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgIC8vIH0pXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvc3dpdGNocy92b2ljZS9jb21wb3NlJywgXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgLy8gaGVhZGVyOiB7YXV0aGlkOnNlbGYuYXV0aGlkfSxcbiAgICAgICAgICBkYXRhOiB7IFxuICAgICAgICAgICAgdHh0OiBzZWxmLmNvcHkuam9pbignJyksXG4gICAgICAgICAgICBzcGQ6IDUsIC8vIOivremAn1xuICAgICAgICAgICAgcGl0OiA0LCAvLyDpn7PosINcbiAgICAgICAgICAgIHZvbDogMywgLy8g6Z+z6YePXG4gICAgICAgICAgICBwZXI6IDQsIC8vIDDkuLrlpbPlo7DvvIwx5Li655S35aOw77yMM+S4uuaDheaEn+WQiOaIkC3luqbpgI3pgaXvvIw05Li65oOF5oSf5ZCI5oiQLeW6puS4q+S4q1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcG9zZScscmVzLmRhdGEpO1xuXG4gICAgICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09PSAyMDApe1xuICAgICAgICAgICAgICBsZXQgdXJsID0gcmVzLmRhdGEuZGF0YS51cmw7XG4gICAgICAgICAgICAgIHNlbGYudm9pY2VVcmwgPSBgaHR0cHM6Ly93d3cuaW9jci52aXAke3VybH1gO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogcmVzLmRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgPSAhdGhpcy5yZXN1bHQuc3RhdHVzO1xuICAgICAgfSxcbiAgICAgIHRyYW5zZmVyKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgICAgaXRlbUxpc3Q6IFsn6Iux5paHJywgJ+aXpeivrScsICfms5Xor60nLCAn5Lit5paHJ10sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMudGFwSW5kZXgsc2VsZi5jb3B5KTtcbiAgICAgICAgICAgIGxldCB0eXBlID0gJyc7XG4gICAgICAgICAgICBpZihyZXMudGFwSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdlbic7XG4gICAgICAgICAgICB9IGVsc2UgaWYocmVzLnRhcEluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnanAnO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMikge1xuICAgICAgICAgICAgICB0eXBlID0gJ2ZyYSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYocmVzLnRhcEluZGV4ID09PSAzKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnemgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3N3aXRjaHMvdHJhbnNsYXRlJywgXG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6c2VsZi5hdXRoaWR9LFxuICAgICAgICAgICAgICBkYXRhOiB7IFxuICAgICAgICAgICAgICAgIGRlc3RMYW46IHR5cGUsXG4gICAgICAgICAgICAgICAgcTogc2VsZi5jb3B5LmpvaW4oJycpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0cmFuc2xhdGUnLHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IHJlcy5kYXRhLmRhdGF9LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvcHkoKSB7XG4gICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuY29weS5qb2luKCdcXG4nKSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHd4LmdldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmloflrZflt7LlpI3liLYnLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0Q29weSgpIHtcbiAgICAgIGxldCBrZXlzID0gdGhpcy5yZXN1bHQubGlzdC5zb3J0KChhLGIpPT57XG4gICAgICAgIHJldHVybiBhLWI7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtpXS52YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwbG9hZCh0eXBlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlLCd1cGxvYWQnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfor4bliKvkuK0nLFxuICAgICAgICBtYXNrOiB0cnVlXG4gICAgICB9KVxuICAgICAgaWYgKHR5cGUgPT09ICdjYXJkJykge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvYmFua2NhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnYmFja2NhcmQnKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEucmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5Y2h5Y+377yaJHt0ZW1wLmJhbmtfY2FyZF9udW1iZXJ9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDnsbvlnovvvJoke3RlbXAuYmFua19jYXJkX3R5cGUgPT09IDIgPyAn5L+h55So5Y2hJzon5YCf6K6w5Y2hJ31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOmTtuihjOWQjeensO+8miR7dGVtcC5iYW5rX25hbWV9YH1cbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZih0eXBlID09PSAnaWQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9pZGNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgIHNpZGU6ICdmcm9udCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdpZCBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOaAp+WIq++8miR7dGVtcFsn5oCn5YirJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDmsJHml4/vvJoke3RlbXBbJ+awkeaXjyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5Ye655Sf77yaJHt0ZW1wWyflh7rnlJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDQsIHZhbDogYOS9j+WdgO+8miR7dGVtcFsn5L2P5Z2AJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDlhazmsJHouqvku73lj7fnoIHvvJoke3RlbXBbJ+WFrOawkei6q+S7veWPt+eggSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RyaXZlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2RyaXZlY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdkcml2ZSBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg6K+B5Y+377yaJHt0ZW1wWyfor4Hlj7cnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOacieaViOacn+mZkO+8miR7dGVtcFsn5pyJ5pWI5pyf6ZmQJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDlh4bpqb7ovablnovvvJoke3RlbXBbJ+WHhumpvui9puWeiyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5Yid5qyh6aKG6K+B5pel5pyf77yaJHt0ZW1wWyfliJ3mrKHpoobor4Hml6XmnJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDQsIHZhbDogYOWnk+WQje+8miR7dGVtcFsn5aeT5ZCNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDmgKfliKvvvJoke3RlbXBbJ+aAp+WIqyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNiwgdmFsOiBg5Zu957GN77yaJHt0ZW1wWyflm73nsY0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDcsIHZhbDogYOWHuueUn+aXpeacn++8miR7dGVtcFsn5Ye655Sf5pel5pyfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA4LCB2YWw6IGDkvY/lnYDvvJoke3RlbXBbJ+S9j+WdgCddLndvcmRzfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdlbmhhbmNlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2VuaGFuY2UnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9nZW5lcmFsJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMucmVzdWx0LmltZ3VybCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcpO1xuICAgICAgdGhpcy5yZXN1bHQudHlwZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0eXBlJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlc3VsdC50eXBlLCdwYXJhbXMnKTtcbiAgICAgIHRoaXMudXBsb2FkKHRoaXMucmVzdWx0LnR5cGUpO1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==