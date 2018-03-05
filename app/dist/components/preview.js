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
      innerAudioContext: null,
      transfer: {
        flag: false,
        val: '',
        copyPaste: '',
        reset: true,
        arrow: false
      },
      cursorIndex: 0
    }, _this.methods = {
      toggleTransferBox: function toggleTransferBox() {
        this.transfer.flag = !this.transfer.flag;
      },
      updateTextarea: function updateTextarea(e) {
        var _e$detail = e.detail,
            value = _e$detail.value,
            cursor = _e$detail.cursor;
        // console.log(value,cursor,'updateTextarea');

        this.transfer.val = value;
        this.transfer.reset = false;
        this.cursorIndex = cursor;
      },
      resetTransfer: function resetTransfer() {
        this.transfer.val = this.transfer.copyPaste;
      },
      copyTransfer: function copyTransfer() {
        if (this.transfer.val === '') {
          wx.showToast({
            title: '复制内容为空',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        wx.setClipboardData({
          data: this.transfer.val,
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
      },
      closeTransformBox: function closeTransformBox() {
        console.log('close');
        this.transfer.flag = false;
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
        // console.log(this.isPlay,'this.isPlay');
        if (this.copy.length === 0) {
          wx.showToast({
            title: '请勾选需要语音合成的文字！',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        if (this.isPlay) return;
        wx.showLoading({
          title: '语音合成中...'
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
            wx.hideLoading();

            if (res.data.code === 200) {
              var url = res.data.data.url;
              self.voiceUrl = 'https://www.iocr.vip/ai' + url;
              self.$apply();
              // wx.showToast({
              //   title: '音频合成完毕',
              //   icon: 'success',
              //   duration: 2000
              // })
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
          },
          fail: function fail(err) {
            wx.hideLoading();
          }
        });
      },
      toggle: function toggle() {
        this.result.status = !this.result.status;
      },
      transfer: function transfer() {
        if (this.copy.length === 0) {
          wx.showToast({
            title: '请勾选需要翻译的文字！',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        var self = this;
        wx.showActionSheet({
          itemList: ['英文', '日语', '法语', '中文'],
          success: function success(res) {
            // console.log(res.tapIndex,self.copy);
            wx.showLoading({
              title: '翻译中',
              mask: true
            });
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
                wx.hideLoading();
                console.log('translate', res.data);
                self.transfer = {
                  flag: true,
                  arrow: true,
                  val: res.data.data,
                  copyPaste: res.data.data
                };
                self.$apply();
              },
              fail: function fail(err) {
                wx.hideLoading(err);
              }
            });
          },
          fail: function fail(res) {
            console.log(res.errMsg);
          }
        });
      },
      copy: function copy() {
        // console.log(this.copy,'this.copy');
        if (this.copy.length === 0) {
          wx.setClipboardData({
            data: ''
          });
          wx.showToast({
            title: '请勾选需要复制的文字！',
            icon: 'none',
            duration: 2000
          });
          return;
        }
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
                showCancel: false,
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
                showCancel: false,
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
              self.result.list = [{ id: 0, val: '\u59D3\u540D\uFF1A' + (temp['姓名'] ? temp['姓名'].words : '') }, { id: 1, val: '\u6027\u522B\uFF1A' + (temp['性别'] ? temp['性别'].words : '') }, { id: 2, val: '\u6C11\u65CF\uFF1A' + (temp['民族'] ? temp['民族'].words : '') }, { id: 3, val: '\u51FA\u751F\uFF1A' + (temp['出生'] ? temp['出生'].words : '') }, { id: 4, val: '\u4F4F\u5740\uFF1A' + (temp['住址'] ? temp['住址'].words : '') }, { id: 5, val: '\u516C\u6C11\u8EAB\u4EFD\u53F7\u7801\uFF1A' + (temp['公民身份号码'] ? temp['公民身份号码'].words : '') }];

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
                showCancel: false,
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
                showCancel: false,
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
                showCancel: false,
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
                showCancel: false,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwidm9pY2VVcmwiLCJpc1BsYXkiLCJpbm5lckF1ZGlvQ29udGV4dCIsInRyYW5zZmVyIiwiZmxhZyIsInZhbCIsImNvcHlQYXN0ZSIsInJlc2V0IiwiYXJyb3ciLCJjdXJzb3JJbmRleCIsIm1ldGhvZHMiLCJ0b2dnbGVUcmFuc2ZlckJveCIsInVwZGF0ZVRleHRhcmVhIiwiZSIsImRldGFpbCIsInZhbHVlIiwiY3Vyc29yIiwicmVzZXRUcmFuc2ZlciIsImNvcHlUcmFuc2ZlciIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJzZXRDbGlwYm9hcmREYXRhIiwic3VjY2VzcyIsInJlcyIsImdldENsaXBib2FyZERhdGEiLCJjbG9zZVRyYW5zZm9ybUJveCIsImNvbnNvbGUiLCJsb2ciLCJjaGVja2JveENoYW5nZSIsImtleXMiLCJzb3J0IiwiYSIsImIiLCJpIiwibGVuZ3RoIiwicHVzaCIsInNoYXJlIiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsInZvaWNlIiwic2hvd0xvYWRpbmciLCJzZWxmIiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsInR4dCIsImpvaW4iLCJzcGQiLCJwaXQiLCJ2b2wiLCJwZXIiLCJoaWRlTG9hZGluZyIsImNvZGUiLCIkYXBwbHkiLCJvcGVuUGxheWVyIiwic2hvd01vZGFsIiwiY29udGVudCIsImNvbmZpcm0iLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImNhbmNlbCIsImZhaWwiLCJlcnIiLCJ0b2dnbGUiLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsIm1hc2siLCJ0YXBJbmRleCIsImhlYWRlciIsImRlc3RMYW4iLCJxIiwiZXJyTXNnIiwiY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQiLCJhdXRvcGxheSIsInNyYyIsInBsYXkiLCJvblBsYXkiLCJvbkVuZGVkIiwib25FcnJvciIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJzaG93Q2FuY2VsIiwidGVtcCIsImlkIiwiYmFua19jYXJkX251bWJlciIsImJhbmtfY2FyZF90eXBlIiwiYmFua19uYW1lIiwiaW5pdENvcHkiLCJmb3JtRGF0YSIsInNpZGUiLCJ3b3Jkc19yZXN1bHQiLCJ3b3JkcyIsInJlc3VsdHMiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJnZXRTdG9yYWdlU3luYyIsInVwbG9hZCIsImRlc3Ryb3kiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNLEVBRkE7QUFHTkMsYUFBSyxRQUhDO0FBSU5DLGdCQUFRLEtBSkY7QUFLTkMsY0FBTSxFQUxBO0FBTU5DLGNBQU07QUFOQSxPQURIO0FBU0xDLFlBQU0sRUFURDtBQVVMO0FBQ0FDLGNBQVEsRUFYSDtBQVlMQyxnQkFBVSxFQVpMO0FBYUxDLGNBQVEsS0FiSDtBQWNMQyx5QkFBbUIsSUFkZDtBQWVMQyxnQkFBVTtBQUNSQyxjQUFNLEtBREU7QUFFUkMsYUFBSyxFQUZHO0FBR1JDLG1CQUFXLEVBSEg7QUFJUkMsZUFBTyxJQUpDO0FBS1JDLGVBQU87QUFMQyxPQWZMO0FBc0JMQyxtQkFBYTtBQXRCUixLLFFBeUJQQyxPLEdBQVU7QUFDUkMsdUJBRFEsK0JBQ1k7QUFDbEIsYUFBS1IsUUFBTCxDQUFjQyxJQUFkLEdBQXFCLENBQUMsS0FBS0QsUUFBTCxDQUFjQyxJQUFwQztBQUNELE9BSE87QUFJUlEsb0JBSlEsMEJBSU9DLENBSlAsRUFJVTtBQUFBLHdCQUNVQSxFQUFFQyxNQURaO0FBQUEsWUFDUkMsS0FEUSxhQUNSQSxLQURRO0FBQUEsWUFDREMs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QVksZUFBWjtBQUNBLFdBQUs1QixpQkFBTCxJQUEwQixLQUFLQSxpQkFBTCxDQUF1QnNHLE9BQXZCLEVBQTFCO0FBQ0Q7Ozs7RUE5akJrQyxlQUFLQyxTOztrQkFBckJwSCxPIiwiZmlsZSI6InByZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlldyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGltZ3VybDogJycsXG4gICAgICAgIGRlc2M6ICcnLFxuICAgICAgICBvbmU6ICfop6PmnpDlm77niYfkuK3vvZ4nLFxuICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICBsaXN0OiBbXSxcbiAgICAgICAgdHlwZTogJydcbiAgICAgIH0sXG4gICAgICBjb3B5OiBbXSxcbiAgICAgIC8vIGF1dGhpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDIpLFxuICAgICAgYXV0aGlkOiAnJyxcbiAgICAgIHZvaWNlVXJsOiAnJyxcbiAgICAgIGlzUGxheTogZmFsc2UsXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dDogbnVsbCxcbiAgICAgIHRyYW5zZmVyOiB7XG4gICAgICAgIGZsYWc6IGZhbHNlLFxuICAgICAgICB2YWw6ICcnLFxuICAgICAgICBjb3B5UGFzdGU6ICcnLFxuICAgICAgICByZXNldDogdHJ1ZSxcbiAgICAgICAgYXJyb3c6IGZhbHNlXG4gICAgICB9LFxuICAgICAgY3Vyc29ySW5kZXg6IDBcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9nZ2xlVHJhbnNmZXJCb3goKSB7XG4gICAgICAgIHRoaXMudHJhbnNmZXIuZmxhZyA9ICF0aGlzLnRyYW5zZmVyLmZsYWc7XG4gICAgICB9LFxuICAgICAgdXBkYXRlVGV4dGFyZWEoZSkge1xuICAgICAgICBjb25zdCB7IHZhbHVlLCBjdXJzb3IgfSA9IGUuZGV0YWlsO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh2YWx1ZSxjdXJzb3IsJ3VwZGF0ZVRleHRhcmVhJyk7XG4gICAgICAgIHRoaXMudHJhbnNmZXIudmFsID0gIHZhbHVlO1xuICAgICAgICB0aGlzLnRyYW5zZmVyLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3Vyc29ySW5kZXggPSBjdXJzb3I7XG4gICAgICB9LFxuICAgICAgcmVzZXRUcmFuc2ZlcigpIHtcbiAgICAgICAgdGhpcy50cmFuc2Zlci52YWwgPSB0aGlzLnRyYW5zZmVyLmNvcHlQYXN0ZTtcbiAgICAgIH0sXG4gICAgICBjb3B5VHJhbnNmZXIoKSB7XG4gICAgICAgIGlmKHRoaXMudHJhbnNmZXIudmFsID09PSAnJykge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+WkjeWItuWGheWuueS4uuepuicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgIGRhdGE6IHRoaXMudHJhbnNmZXIudmFsLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgd3guZ2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aWh+Wtl+W3suWkjeWIticsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNsb3NlVHJhbnNmb3JtQm94KCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY2xvc2UnKTtcbiAgICAgICAgdGhpcy50cmFuc2Zlci5mbGFnID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgY2hlY2tib3hDaGFuZ2UoZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hlY2tib3hDaGFuZ2UnKTtcbiAgICAgICAgbGV0IGtleXMgPSBlLmRldGFpbC52YWx1ZS5zb3J0KChhLGIpPT57XG4gICAgICAgICAgcmV0dXJuIGEtYjtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGxldCBrZXlzID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuY29weS5wdXNoKHRoaXMucmVzdWx0Lmxpc3Rba2V5c1tpXV0udmFsKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvcHkpO1xuICAgICAgfSxcbiAgICAgIHNoYXJlKCkge1xuICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB2b2ljZSgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5pc1BsYXksJ3RoaXMuaXNQbGF5Jyk7XG4gICAgICAgIGlmKHRoaXMuY29weS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fli77pgInpnIDopoHor63pn7PlkIjmiJDnmoTmloflrZfvvIEnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmlzUGxheSkgcmV0dXJuO1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfor63pn7PlkIjmiJDkuK0uLi4nLFxuICAgICAgICB9KVxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3N3aXRjaHMvdm9pY2UvY29tcG9zZScsIFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIC8vIGhlYWRlcjoge2F1dGhpZDpzZWxmLmF1dGhpZH0sXG4gICAgICAgICAgZGF0YTogeyBcbiAgICAgICAgICAgIHR4dDogc2VsZi5jb3B5LmpvaW4oJycpLFxuICAgICAgICAgICAgc3BkOiA1LCAvLyDor63pgJ9cbiAgICAgICAgICAgIHBpdDogNCwgLy8g6Z+z6LCDXG4gICAgICAgICAgICB2b2w6IDMsIC8vIOmfs+mHj1xuICAgICAgICAgICAgcGVyOiAzLCAvLyAw5Li65aWz5aOw77yMMeS4uueUt+WjsO+8jDPkuLrmg4XmhJ/lkIjmiJAt5bqm6YCN6YGl77yMNOS4uuaDheaEn+WQiOaIkC3luqbkuKvkuKtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvc2UnLHJlcy5kYXRhKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG5cbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT09IDIwMCl7XG4gICAgICAgICAgICAgIGxldCB1cmwgPSByZXMuZGF0YS5kYXRhLnVybDtcbiAgICAgICAgICAgICAgc2VsZi52b2ljZVVybCA9IGBodHRwczovL3d3dy5pb2NyLnZpcC9haSR7dXJsfWA7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIC8vIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIC8vICAgdGl0bGU6ICfpn7PpopHlkIjmiJDlrozmr5UnLFxuICAgICAgICAgICAgICAvLyAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgLy8gICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICBzZWxmLm9wZW5QbGF5ZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQuc3RhdHVzID0gIXRoaXMucmVzdWx0LnN0YXR1cztcbiAgICAgIH0sXG4gICAgICB0cmFuc2ZlcigpIHtcbiAgICAgICAgaWYodGhpcy5jb3B5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WLvumAiemcgOimgee/u+ivkeeahOaWh+Wtl++8gScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICBpdGVtTGlzdDogWyfoi7HmlocnLCAn5pel6K+tJywgJ+azleivrScsICfkuK3mlocnXSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleCxzZWxmLmNvcHkpO1xuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+e/u+ivkeS4rScsXG4gICAgICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbGV0IHR5cGUgPSAnJztcbiAgICAgICAgICAgIGlmKHJlcy50YXBJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICB0eXBlID0gJ2VuJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdqcCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYocmVzLnRhcEluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnZnJhJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDMpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICd6aCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvc3dpdGNocy90cmFuc2xhdGUnLCBcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDpzZWxmLmF1dGhpZH0sXG4gICAgICAgICAgICAgIGRhdGE6IHsgXG4gICAgICAgICAgICAgICAgZGVzdExhbjogdHlwZSxcbiAgICAgICAgICAgICAgICBxOiBzZWxmLmNvcHkuam9pbignICcpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyYW5zbGF0ZScscmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNlbGYudHJhbnNmZXIgPSB7XG4gICAgICAgICAgICAgICAgICBmbGFnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgYXJyb3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICB2YWw6IHJlcy5kYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICBjb3B5UGFzdGU6IHJlcy5kYXRhLmRhdGFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoZXJyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvcHkoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29weSwndGhpcy5jb3B5Jyk7XG4gICAgICAgIGlmKHRoaXMuY29weS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgIGRhdGE6ICcnXG4gICAgICAgICAgfSlcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fli77pgInpnIDopoHlpI3liLbnmoTmloflrZfvvIEnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmNvcHkuam9pbignXFxuJyksXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5a2X5bey5aSN5Yi2JyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb3BlblBsYXllcihmbGFnKXtcbiAgICAgIGxldCB1cmwgPSB0aGlzLnZvaWNlVXJsO1xuICAgICAgY29uc3QgaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dCA9IGlubmVyQXVkaW9Db250ZXh0O1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IHRydWU7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0LnNyYyA9IHVybDtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQucGxheSgpO1xuXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vblBsYXkoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn5q2j5Zyo5pKt5pS+Jyk7XG4gICAgICAgIHRoaXMuaXNQbGF5ID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVuZGVkKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ+e7k+adn+aSreaUvicpO1xuICAgICAgICB0aGlzLmlzUGxheSA9IGZhbHNlO1xuICAgICAgfSlcbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRXJyb3IoKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBpbml0Q29weSgpIHtcbiAgICAgIGxldCBrZXlzID0gdGhpcy5yZXN1bHQubGlzdC5zb3J0KChhLGIpPT57XG4gICAgICAgIHJldHVybiBhLWI7XG4gICAgICB9KTtcbiAgICAgIC8vIGxldCBrZXlzID0gdGhpcy5yZXN1bHQubGlzdDtcbiAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtpXS52YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwbG9hZCh0eXBlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlLCd1cGxvYWQnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfor4bliKvkuK0nLFxuICAgICAgICBtYXNrOiB0cnVlLFxuICAgICAgfSlcbiAgICAgIGlmICh0eXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2JhbmtjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2JhY2tjYXJkJyk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLnJlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWNoeWPt++8miR7dGVtcC5iYW5rX2NhcmRfbnVtYmVyfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg57G75Z6L77yaJHt0ZW1wLmJhbmtfY2FyZF90eXBlID09PSAyID8gJ+S/oeeUqOWNoSc6J+WAn+iusOWNoSd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDpk7booYzlkI3np7DvvJoke3RlbXAuYmFua19uYW1lfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gJ2lkJykge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvaWRjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICBzaWRlOiAnZnJvbnQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnaWQgc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIC8vIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3JkcyxrZXk6aXRlbVtpdGVtW2luZGV4XV19OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWnk+WQje+8miR7dGVtcFsn5aeT5ZCNJ10gPyB0ZW1wWyflp5PlkI0nXS53b3JkcyA6ICcnfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5oCn5Yir77yaJHt0ZW1wWyfmgKfliKsnXSA/IHRlbXBbJ+aAp+WIqyddLndvcmRzIDogJyd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDmsJHml4/vvJoke3RlbXBbJ+awkeaXjyddID8gdGVtcFsn5rCR5pePJ10ud29yZHMgOiAnJ31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDMsIHZhbDogYOWHuueUn++8miR7dGVtcFsn5Ye655SfJ10gPyB0ZW1wWyflh7rnlJ8nXS53b3JkcyA6ICcnfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5L2P5Z2A77yaJHt0ZW1wWyfkvY/lnYAnXSA/IHRlbXBbJ+S9j+WdgCddLndvcmRzIDogJyd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDlhazmsJHouqvku73lj7fnoIHvvJoke3RlbXBbJ+WFrOawkei6q+S7veWPt+eggSddID8gdGVtcFsn5YWs5rCR6Lqr5Lu95Y+356CBJ10ud29yZHMgOiAnJ31gfSxcbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkcml2ZScpIHtcbiAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9kcml2ZWNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnZHJpdmUgc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIC8vIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3JkcyxrZXk6aXRlbVtpdGVtW2luZGV4XV19OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdDtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGVtcCwndGVtcCcpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg6K+B5Y+377yaJHt0ZW1wWyfor4Hlj7cnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOacieaViOacn+mZkO+8miR7dGVtcFsn5pyJ5pWI5pyf6ZmQJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDoh7PvvJoke3RlbXBbJ+iHsyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5YeG6am+6L2m5Z6L77yaJHt0ZW1wWyflh4bpqb7ovablnosnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDQsIHZhbDogYOWIneasoemihuivgeaXpeacn++8miR7dGVtcFsn5Yid5qyh6aKG6K+B5pel5pyfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDlp5PlkI3vvJoke3RlbXBbJ+Wnk+WQjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNiwgdmFsOiBg5oCn5Yir77yaJHt0ZW1wWyfmgKfliKsnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDcsIHZhbDogYOWbveexje+8miR7dGVtcFsn5Zu957GNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA4LCB2YWw6IGDlh7rnlJ/ml6XmnJ/vvJoke3RlbXBbJ+WHuueUn+aXpeacnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogOSwgdmFsOiBg5L2P5Z2A77yaJHt0ZW1wWyfkvY/lnYAnXS53b3Jkc31gfVxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gJ2VuaGFuY2UnKSB7XG4gICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZW5oYW5jZScsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICd0aWNrZXQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9yZWNlaXB0JyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfWVsc2Uge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZ2VuZXJhbCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5yZXN1bHQuaW1ndXJsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyk7XG4gICAgICB0aGlzLnJlc3VsdC50eXBlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3R5cGUnKTtcbiAgICAgIHRoaXMuYXV0aGlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJpbmZvJyk7XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogdGhpcy5hdXRoaWQsXG4gICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgIH0pXG4gICAgICB0aGlzLnVwbG9hZCh0aGlzLnJlc3VsdC50eXBlKTtcbiAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVzdHJveUF1ZGlvKCkge1xuICAgICAgY29uc29sZS5sb2coJ2Rlc3Ryb3kgYXVkaW8nKTtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQgJiYgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5kZXN0cm95KCk7XG4gICAgfVxuXG4gIH1cbiJdfQ==