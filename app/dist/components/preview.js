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
      // authid: Math.random().toString(16).substring(2),
      authid: '',
      voiceUrl: '',
      isPlay: false,
      innerAudioContext: null
    }, _this.methods = {
      which: function which() {
        this.result.one = this.result.desc;
      },
      checkboxChange: function checkboxChange(e) {
        // console.log('checkboxChange');
        var keys = e.detail.value.sort(function (a, b) {
          return a - b;
        });
        // let keys = e.detail.value;
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
        console.log(this.isPlay, 'this.isPlay');
        if (this.isPlay) return;
        wx.showToast({
          title: '语音合成中...',
          icon: 'loading',
          duration: 10000
        });
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
            per: 3 // 0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫
          },
          success: function success(res) {
            console.log('compose', res.data);

            if (res.data.code === 200) {
              var url = res.data.data.url;
              self.voiceUrl = 'https://www.iocr.vip/ai' + url;
              self.$apply();
              // wx.showToast({
              //   title: '音频合成完毕',
              //   icon: 'success',
              //   duration: 2000
              // })
              wx.hideToast();
              self.openPlayer();
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
                q: self.copy.join(' ')
              },
              success: function success(res) {
                console.log('translate', res.data);
                self.result.list = [{ id: 0, val: res.data.data }];
                self.copy = [res.data.data];
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
    key: 'openPlayer',
    value: function openPlayer(flag) {
      var _this2 = this;

      var url = this.voiceUrl;
      var innerAudioContext = wx.createInnerAudioContext();
      this.innerAudioContext = innerAudioContext;
      this.innerAudioContext.autoplay = true;
      this.innerAudioContext.src = url;
      this.innerAudioContext.play();

      innerAudioContext.onPlay(function () {
        console.log('正在播放');
        _this2.isPlay = true;
      });

      innerAudioContext.onEnded(function () {
        console.log('结束播放');
        _this2.isPlay = false;
      });
      innerAudioContext.onError(function (res) {
        console.log(res);
      });
    }
  }, {
    key: 'initCopy',
    value: function initCopy() {
      var keys = this.result.list.sort(function (a, b) {
        return a - b;
      });
      // let keys = this.result.list;
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
              console.log(temp, 'temp');
              self.result.list = [{ id: 0, val: '\u8BC1\u53F7\uFF1A' + temp['证号'].words }, { id: 1, val: '\u6709\u6548\u671F\u9650\uFF1A' + temp['有效期限'].words }, { id: 2, val: '\u81F3\uFF1A' + temp['至'].words }, { id: 3, val: '\u51C6\u9A7E\u8F66\u578B\uFF1A' + temp['准驾车型'].words }, { id: 4, val: '\u521D\u6B21\u9886\u8BC1\u65E5\u671F\uFF1A' + temp['初次领证日期'].words }, { id: 5, val: '\u59D3\u540D\uFF1A' + temp['姓名'].words }, { id: 6, val: '\u6027\u522B\uFF1A' + temp['性别'].words }, { id: 7, val: '\u56FD\u7C4D\uFF1A' + temp['国籍'].words }, { id: 8, val: '\u51FA\u751F\u65E5\u671F\uFF1A' + temp['出生日期'].words }, { id: 9, val: '\u4F4F\u5740\uFF1A' + temp['住址'].words }];

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
      } else if (type === 'ticket') {
        wx.uploadFile({
          url: 'https://www.iocr.vip/ai/recogns/receipt',
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
      this.authid = wx.getStorageSync('userinfo');
      wx.showToast({
        title: this.authid,
        icon: 'success',
        duration: 2000
      });
      this.upload(this.result.type);
      wx.showShareMenu({
        withShareTicket: true
      });
    }
  }, {
    key: 'destroyAudio',
    value: function destroyAudio() {
      console.log('destroy audio');
      this.innerAudioContext && this.innerAudioContext.destroy();
    }
  }]);

  return Preview;
}(_wepy2.default.component);

exports.default = Preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwidm9pY2VVcmwiLCJpc1BsYXkiLCJpbm5lckF1ZGlvQ29udGV4dCIsIm1ldGhvZHMiLCJ3aGljaCIsImNoZWNrYm94Q2hhbmdlIiwiZSIsImtleXMiLCJkZXRhaWwiLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsImkiLCJsZW5ndGgiLCJwdXNoIiwidmFsIiwiY29uc29sZSIsImxvZyIsInNoYXJlIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwidm9pY2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInNlbGYiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwidHh0Iiwiam9pbiIsInNwZCIsInBpdCIsInZvbCIsInBlciIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwiJGFwcGx5IiwiaGlkZVRvYXN0Iiwib3BlblBsYXllciIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjb25maXJtIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYW5jZWwiLCJ0b2dnbGUiLCJ0cmFuc2ZlciIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0IiwidGFwSW5kZXgiLCJoZWFkZXIiLCJkZXN0TGFuIiwicSIsImlkIiwiZmFpbCIsImVyck1zZyIsInNldENsaXBib2FyZERhdGEiLCJnZXRDbGlwYm9hcmREYXRhIiwiZmxhZyIsImNyZWF0ZUlubmVyQXVkaW9Db250ZXh0IiwiYXV0b3BsYXkiLCJzcmMiLCJwbGF5Iiwib25QbGF5Iiwib25FbmRlZCIsIm9uRXJyb3IiLCJzaG93TG9hZGluZyIsIm1hc2siLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwidGVtcCIsImJhbmtfY2FyZF9udW1iZXIiLCJiYW5rX2NhcmRfdHlwZSIsImJhbmtfbmFtZSIsImluaXRDb3B5IiwiaGlkZUxvYWRpbmciLCJlcnIiLCJmb3JtRGF0YSIsInNpZGUiLCJ3b3Jkc19yZXN1bHQiLCJ3b3JkcyIsInJlc3VsdHMiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJnZXRTdG9yYWdlU3luYyIsInVwbG9hZCIsImRlc3Ryb3kiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNLEVBRkE7QUFHTkMsYUFBSyxRQUhDO0FBSU5DLGdCQUFRLEtBSkY7QUFLTkMsY0FBTSxFQUxBO0FBTU5DLGNBQU07QUFOQSxPQURIO0FBU0xDLFlBQU0sRUFURDtBQVVMO0FBQ0FDLGNBQVEsRUFYSDtBQVlMQyxnQkFBVSxFQVpMO0FBYUxDLGNBQVEsS0FiSDtBQWNMQyx5QkFBbUI7QUFkZCxLLFFBaUJQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOLGFBQUtiLE1BQUwsQ0FBWUcsR0FBWixHQUFrQixLQUFLSCxNQUFMLENBQVlFLElBQTlCO0FBQ0QsT0FITztBQUlSWSxvQkFKUSwwQkFJT0MsQ0FKUCxFQUlVO0FBQ2hCO0FBQ0EsWUFBSUMsT0FBT0QsRUFBRUUsTUFBRixDQUFTQyxLQUFULENBQWVDLElBQWYsQ0FBb0IsVUFBQ0MsQ0FBRCxFQUFHQyxDQUFILEVBQU87QUFDcEMsaUJBQU9ELElBQUVDLENBQVQ7QUFDRCxTQUZVLENBQVg7QUFHQTtBQUNBLGFBQUtkLElBQUwsR0FBWSxFQUFaO0FBQ0EsYUFBSSxJQUFJZSxJQUFJLENBQVosRUFBZUEsSUFBSU4sS0FBS08sTUFBeEIsRUFBZ0NELEdBQWhDLEVBQXFDO0FBQ25DLGVBQUtmLElBQUwsQ0FBVWlCLElBQVYsQ0FBZSxLQUFLeEIsTUFBTCxDQUFZSyxJQUFaLENBQWlCVyxLQUFLTSxDQUFMLENBQWpCLEVBQTBCRyxH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S0FBSTJFLEtBQUtILEtBQW5CLEVBQVA7QUFBbUMsZUFBaEYsQ0FBZDtBQUNBO0FBQ0E1RCxtQkFBS3JDLE1BQUwsQ0FBWUssSUFBWixHQUFtQjZGLE9BQW5CO0FBQ0E3RCxtQkFBS3JDLE1BQUwsQ0FBWUksTUFBWixHQUFxQixJQUFyQjtBQUNBaUMsbUJBQUtzRCxRQUFMO0FBQ0F0RCxtQkFBS2EsTUFBTDtBQUNEO0FBQ0RyQixlQUFHK0QsV0FBSDtBQUNELFdBaENXO0FBaUNaeEIsZ0JBQU0sY0FBU3lCLEdBQVQsRUFBYztBQUNsQjtBQUNBaEUsZUFBRytELFdBQUg7QUFDRDtBQXBDVyxTQUFkO0FBc0NEO0FBQ0Y7Ozs2QkFFUztBQUNSLFdBQUs1RixNQUFMLENBQVlDLE1BQVosR0FBcUI0QixHQUFHeUUsY0FBSCxDQUFrQixVQUFsQixDQUFyQjtBQUNBLFdBQUt0RyxNQUFMLENBQVlNLElBQVosR0FBbUJ1QixHQUFHeUUsY0FBSCxDQUFrQixNQUFsQixDQUFuQjtBQUNBLFdBQUs5RixNQUFMLEdBQWNxQixHQUFHeUUsY0FBSCxDQUFrQixVQUFsQixDQUFkO0FBQ0F6RSxTQUFHSSxTQUFILENBQWE7QUFDWEMsZUFBTyxLQUFLMUIsTUFERDtBQUVYMkIsY0FBTSxTQUZLO0FBR1hDLGtCQUFVO0FBSEMsT0FBYjtBQUtBLFdBQUttRSxNQUFMLENBQVksS0FBS3ZHLE1BQUwsQ0FBWU0sSUFBeEI7QUFDQXVCLFNBQUdDLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7O21DQUVjO0FBQ2JMLGNBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsV0FBS2hCLGlCQUFMLElBQTBCLEtBQUtBLGlCQUFMLENBQXVCNkYsT0FBdkIsRUFBMUI7QUFDRDs7OztFQWhla0MsZUFBS0MsUzs7a0JBQXJCM0csTyIsImZpbGUiOiJwcmV2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXcgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgZGF0YSA9IHtcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICBpbWd1cmw6ICcnLFxuICAgICAgICBkZXNjOiAnJyxcbiAgICAgICAgb25lOiAn6Kej5p6Q5Zu+54mH5Lit772eJyxcbiAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgbGlzdDogW10sXG4gICAgICAgIHR5cGU6ICcnXG4gICAgICB9LFxuICAgICAgY29weTogW10sXG4gICAgICAvLyBhdXRoaWQ6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygyKSxcbiAgICAgIGF1dGhpZDogJycsXG4gICAgICB2b2ljZVVybDogJycsXG4gICAgICBpc1BsYXk6IGZhbHNlLFxuICAgICAgaW5uZXJBdWRpb0NvbnRleHQ6IG51bGxcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgd2hpY2goKSB7XG4gICAgICAgIHRoaXMucmVzdWx0Lm9uZSA9IHRoaXMucmVzdWx0LmRlc2M7XG4gICAgICB9LFxuICAgICAgY2hlY2tib3hDaGFuZ2UoZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hlY2tib3hDaGFuZ2UnKTtcbiAgICAgICAgbGV0IGtleXMgPSBlLmRldGFpbC52YWx1ZS5zb3J0KChhLGIpPT57XG4gICAgICAgICAgcmV0dXJuIGEtYjtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGxldCBrZXlzID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuY29weS5wdXNoKHRoaXMucmVzdWx0Lmxpc3Rba2V5c1tpXV0udmFsKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvcHkpO1xuICAgICAgfSxcbiAgICAgIHNoYXJlKCkge1xuICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB2b2ljZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pc1BsYXksJ3RoaXMuaXNQbGF5Jyk7XG4gICAgICAgIGlmKHRoaXMuaXNQbGF5KSByZXR1cm47XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfor63pn7PlkIjmiJDkuK0uLi4nLFxuICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS9zd2l0Y2hzL3ZvaWNlL2NvbXBvc2UnLCBcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAvLyBoZWFkZXI6IHthdXRoaWQ6c2VsZi5hdXRoaWR9LFxuICAgICAgICAgIGRhdGE6IHsgXG4gICAgICAgICAgICB0eHQ6IHNlbGYuY29weS5qb2luKCcnKSxcbiAgICAgICAgICAgIHNwZDogNSwgLy8g6K+t6YCfXG4gICAgICAgICAgICBwaXQ6IDQsIC8vIOmfs+iwg1xuICAgICAgICAgICAgdm9sOiAzLCAvLyDpn7Pph49cbiAgICAgICAgICAgIHBlcjogMywgLy8gMOS4uuWls+WjsO+8jDHkuLrnlLflo7DvvIwz5Li65oOF5oSf5ZCI5oiQLeW6pumAjemBpe+8jDTkuLrmg4XmhJ/lkIjmiJAt5bqm5Lir5LirXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb21wb3NlJyxyZXMuZGF0YSk7XG5cbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT09IDIwMCl7XG4gICAgICAgICAgICAgIGxldCB1cmwgPSByZXMuZGF0YS5kYXRhLnVybDtcbiAgICAgICAgICAgICAgc2VsZi52b2ljZVVybCA9IGBodHRwczovL3d3dy5pb2NyLnZpcC9haSR7dXJsfWA7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIC8vIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIC8vICAgdGl0bGU6ICfpn7PpopHlkIjmiJDlrozmr5UnLFxuICAgICAgICAgICAgICAvLyAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgLy8gICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICB3eC5oaWRlVG9hc3QoKTtcbiAgICAgICAgICAgICAgc2VsZi5vcGVuUGxheWVyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiByZXMuZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0LnN0YXR1cyA9ICF0aGlzLnJlc3VsdC5zdGF0dXM7XG4gICAgICB9LFxuICAgICAgdHJhbnNmZXIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICBpdGVtTGlzdDogWyfoi7HmlocnLCAn5pel6K+tJywgJ+azleivrScsICfkuK3mlocnXSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleCxzZWxmLmNvcHkpO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSAnJztcbiAgICAgICAgICAgIGlmKHJlcy50YXBJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICB0eXBlID0gJ2VuJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdqcCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYocmVzLnRhcEluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnZnJhJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDMpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICd6aCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvc3dpdGNocy90cmFuc2xhdGUnLCBcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDpzZWxmLmF1dGhpZH0sXG4gICAgICAgICAgICAgIGRhdGE6IHsgXG4gICAgICAgICAgICAgICAgZGVzdExhbjogdHlwZSxcbiAgICAgICAgICAgICAgICBxOiBzZWxmLmNvcHkuam9pbignICcpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0cmFuc2xhdGUnLHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IHJlcy5kYXRhLmRhdGF9LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgc2VsZi5jb3B5ID0gW3Jlcy5kYXRhLmRhdGFdO1xuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb3B5KCkge1xuICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmNvcHkuam9pbignXFxuJyksXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5a2X5bey5aSN5Yi2JyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb3BlblBsYXllcihmbGFnKXtcbiAgICAgIGxldCB1cmwgPSB0aGlzLnZvaWNlVXJsO1xuICAgICAgY29uc3QgaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dCA9IGlubmVyQXVkaW9Db250ZXh0O1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IHRydWU7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0LnNyYyA9IHVybDtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQucGxheSgpO1xuXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vblBsYXkoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn5q2j5Zyo5pKt5pS+Jyk7XG4gICAgICAgIHRoaXMuaXNQbGF5ID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVuZGVkKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ+e7k+adn+aSreaUvicpO1xuICAgICAgICB0aGlzLmlzUGxheSA9IGZhbHNlO1xuICAgICAgfSlcbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRXJyb3IoKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBpbml0Q29weSgpIHtcbiAgICAgIGxldCBrZXlzID0gdGhpcy5yZXN1bHQubGlzdC5zb3J0KChhLGIpPT57XG4gICAgICAgIHJldHVybiBhLWI7XG4gICAgICB9KTtcbiAgICAgIC8vIGxldCBrZXlzID0gdGhpcy5yZXN1bHQubGlzdDtcbiAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtpXS52YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwbG9hZCh0eXBlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlLCd1cGxvYWQnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfor4bliKvkuK0nLFxuICAgICAgICBtYXNrOiB0cnVlXG4gICAgICB9KVxuICAgICAgaWYgKHR5cGUgPT09ICdjYXJkJykge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvYmFua2NhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnYmFja2NhcmQnKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEucmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5Y2h5Y+377yaJHt0ZW1wLmJhbmtfY2FyZF9udW1iZXJ9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDnsbvlnovvvJoke3RlbXAuYmFua19jYXJkX3R5cGUgPT09IDIgPyAn5L+h55So5Y2hJzon5YCf6K6w5Y2hJ31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOmTtuihjOWQjeensO+8miR7dGVtcC5iYW5rX25hbWV9YH1cbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZih0eXBlID09PSAnaWQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9pZGNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgIHNpZGU6ICdmcm9udCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdpZCBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOaAp+WIq++8miR7dGVtcFsn5oCn5YirJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDmsJHml4/vvJoke3RlbXBbJ+awkeaXjyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5Ye655Sf77yaJHt0ZW1wWyflh7rnlJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDQsIHZhbDogYOS9j+WdgO+8miR7dGVtcFsn5L2P5Z2AJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDlhazmsJHouqvku73lj7fnoIHvvJoke3RlbXBbJ+WFrOawkei6q+S7veWPt+eggSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RyaXZlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2RyaXZlY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdkcml2ZSBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wLCd0ZW1wJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDor4Hlj7fvvJoke3RlbXBbJ+ivgeWPtyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5pyJ5pWI5pyf6ZmQ77yaJHt0ZW1wWyfmnInmlYjmnJ/pmZAnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOiHs++8miR7dGVtcFsn6IezJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAzLCB2YWw6IGDlh4bpqb7ovablnovvvJoke3RlbXBbJ+WHhumpvui9puWeiyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5Yid5qyh6aKG6K+B5pel5pyf77yaJHt0ZW1wWyfliJ3mrKHpoobor4Hml6XmnJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOWnk+WQje+8miR7dGVtcFsn5aeT5ZCNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA2LCB2YWw6IGDmgKfliKvvvJoke3RlbXBbJ+aAp+WIqyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNywgdmFsOiBg5Zu957GN77yaJHt0ZW1wWyflm73nsY0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDgsIHZhbDogYOWHuueUn+aXpeacn++8miR7dGVtcFsn5Ye655Sf5pel5pyfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA5LCB2YWw6IGDkvY/lnYDvvJoke3RlbXBbJ+S9j+WdgCddLndvcmRzfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdlbmhhbmNlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2VuaGFuY2UnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZih0eXBlID09PSAndGlja2V0Jykge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvcmVjZWlwdCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfWVsc2Uge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZ2VuZXJhbCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnJlc3VsdC5pbWd1cmwgPSB3eC5nZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnKTtcbiAgICAgIHRoaXMucmVzdWx0LnR5cGUgPSB3eC5nZXRTdG9yYWdlU3luYygndHlwZScpO1xuICAgICAgdGhpcy5hdXRoaWQgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcmluZm8nKTtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiB0aGlzLmF1dGhpZCxcbiAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgfSlcbiAgICAgIHRoaXMudXBsb2FkKHRoaXMucmVzdWx0LnR5cGUpO1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBkZXN0cm95QXVkaW8oKSB7XG4gICAgICBjb25zb2xlLmxvZygnZGVzdHJveSBhdWRpbycpO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dCAmJiB0aGlzLmlubmVyQXVkaW9Db250ZXh0LmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgfVxuIl19