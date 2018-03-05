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
      }
    }, _this.methods = {
      toggleTransferBox: function toggleTransferBox() {
        this.transfer.flag = !this.transfer.flag;
      },
      updateTextarea: function updateTextarea(e) {
        // console.log(e.detail.value,'updateTextarea');
        this.transfer.val = e.detail.value;
        this.transfer.reset = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwidm9pY2VVcmwiLCJpc1BsYXkiLCJpbm5lckF1ZGlvQ29udGV4dCIsInRyYW5zZmVyIiwiZmxhZyIsInZhbCIsImNvcHlQYXN0ZSIsInJlc2V0IiwiYXJyb3ciLCJtZXRob2RzIiwidG9nZ2xlVHJhbnNmZXJCb3giLCJ1cGRhdGVUZXh0YXJlYSIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInJlc2V0VHJhbnNmZXIiLCJjb3B5VHJhbnNmZXIiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwic2V0Q2xpcGJvYXJkRGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJnZXRDbGlwYm9hcmREYXRhIiwiY2xvc2VUcmFuc2Zvcm1Cb3giLCJjb25zb2xlIiwibG9nIiwiY2hlY2tib3hDaGFuZ2UiLCJrZXlzIiwic29ydCIsImEiLCJiIiwiaSIsImxlbmd0aCIsInB1c2giLCJzaGFyZSIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ2b2ljZSIsInNob3dMb2FkaW5nIiwic2VsZiIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJ0eHQiLCJqb2luIiwic3BkIiwicGl0Iiwidm9sIiwicGVyIiwiaGlkZUxvYWRpbmciLCJjb2RlIiwiJGFwcGx5Iiwib3BlblBsYXllciIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjb25maXJtIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYW5jZWwiLCJmYWlsIiwiZXJyIiwidG9nZ2xlIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJtYXNrIiwidGFwSW5kZXgiLCJoZWFkZXIiLCJkZXN0TGFuIiwicSIsImVyck1zZyIsImNyZWF0ZUlubmVyQXVkaW9Db250ZXh0IiwiYXV0b3BsYXkiLCJzcmMiLCJwbGF5Iiwib25QbGF5Iiwib25FbmRlZCIsIm9uRXJyb3IiLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwic2hvd0NhbmNlbCIsInRlbXAiLCJpZCIsImJhbmtfY2FyZF9udW1iZXIiLCJiYW5rX2NhcmRfdHlwZSIsImJhbmtfbmFtZSIsImluaXRDb3B5IiwiZm9ybURhdGEiLCJzaWRlIiwid29yZHNfcmVzdWx0Iiwid29yZHMiLCJyZXN1bHRzIiwibWFwIiwiaXRlbSIsImluZGV4IiwiZ2V0U3RvcmFnZVN5bmMiLCJ1cGxvYWQiLCJkZXN0cm95IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLGdCQUFRLEVBREY7QUFFTkMsY0FBTSxFQUZBO0FBR05DLGFBQUssUUFIQztBQUlOQyxnQkFBUSxLQUpGO0FBS05DLGNBQU0sRUFMQTtBQU1OQyxjQUFNO0FBTkEsT0FESDtBQVNMQyxZQUFNLEVBVEQ7QUFVTDtBQUNBQyxjQUFRLEVBWEg7QUFZTEMsZ0JBQVUsRUFaTDtBQWFMQyxjQUFRLEtBYkg7QUFjTEMseUJBQW1CLElBZGQ7QUFlTEMsZ0JBQVU7QUFDUkMsY0FBTSxLQURFO0FBRVJDLGFBQUssRUFGRztBQUdSQyxtQkFBVyxFQUhIO0FBSVJDLGVBQU8sSUFKQztBQUtSQyxlQUFPO0FBTEM7QUFmTCxLLFFBd0JQQyxPLEdBQVU7QUFDUkMsdUJBRFEsK0JBQ1k7QUFDbEIsYUFBS1AsUUFBTCxDQUFjQyxJQUFkLEdBQXFCLENBQUMsS0FBS0QsUUFBTCxDQUFjQyxJQUFwQztBQUNELE9BSE87QUFJUk8sb0JBSlEsMEJBSU9DLENBSlAsRUFJVTtBQUNoQjtBQUNBLGFBQUtULFFBQUwsQ0FBY0UsR0FBZCxHQUFxQk8sRUFBRUMsTUFBRixDQUFTQyxLQUE5QjtBQUNBLGFBQUtYLFFBQUwsQ0FBY0ksS0FBZCxHQUFzQixLQUF0QjtBQUNELE9BUk87QUFTUlEsbUJBVFEsMkJBU1E7QUFDZCxhQUFLWixRQUFMLENBQWNFLEdBQWQsR0FBb0IsS0FBS0YsUUFBTCxDQUFjRyxTQUFsQztBQUNELE9BWE87QUFZUlUsa0JBWlEsMEJBWU87QUFDYixZQUFHLEtBQUtiLFFBQUwsQ0FBY0UsR0FBZCxLQUFzQixFQUF6QixFQUE2QjtBQUMzQlksYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLFFBREk7QUFFWEMsa0JBQU0sTUFGSztBQUdYQyxzQkFBVTtBQUhDLFdBQWI7QUFLQTtBQUNEO0FBQ0RKLFdBQUdLLGdCQUFILENBQW9CO0FBQ2xCaEMsZ0JBQU0sS0FBS2EsUUFBTCxDQUFjRSxHQURGO0FBRWxCa0IsbUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQlAsZUFBR1EsZ0JBQUgsQ0FBb0I7QUFDbEJGLHVCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJQLG1CQUFHQyxTQUFILENBQWE7QUFDWEMseUJBQU8sT0FESTtBQUVYQyx3QkFBTSxTQUZLO0FBR1hDLDRCQUFVO0FBSEMsaUJBQWI7QUFLRDtBQVBpQixhQUFwQjtBQVNEO0FBWmlCLFNBQXBCO0FBY0QsT0FuQ087QUFvQ1JLLHVCQXBDUSwrQkFvQ1k7QUFDbEJDLGdCQUFRQyxHQUFSLENBQVksT0FBWjtBQUNBLGFBQUt6QixRQUFMLENBQWNDLElBQWQsR0FBcUIsS0FBckI7QUFDRCxPQXZDTztBQXdDUnlCLG9CQXhDUSwwQkF3Q09qQixDQXhDUCxFQXdDVTtBQUNoQjtBQUNBLFlBQUlrQixPQUFPbEIsRUFBRUMsTUFBRixDQUFTQyxLQUFULENBQWVpQixJQUFmLENBQW9CLFVBQUNDLENBQUQsRUFBR0MsQ0FBSCxFQUFPO0FBQ3BDLGlCQUFPRCxJQUFFQyxDQUFUO0FBQ0QsU0FGVSxDQUFYO0FBR0E7QUFDQSxhQUFLbkMsSUFBTCxHQUFZLEVBQVo7QUFDQSxhQUFJLElBQUlvQyxJQUFJLENBQVosRUFBZUEsSUFBSUosS0FBS0ssTUFBeEIsRUFBZ0NELEdBQWhDLEVBQXFDO0FBQ25DLGVBQUtwQyxJQUFMLENBQVVzQyxJQUFWLENBQWUsS0FBSzdDLE1BQUwsQ0FBWUssSUFBWixDQUFpQmtDLEtBQUtJLENBQUwsQ0FBakIsRUFBMEI3QixHQUF6QztBQUNEO0FBQ0RzQixnQkFBUUMsR0FBUixDQUFZLEtBQUs5QixJQUFqQjtBQUNELE9BbkRPO0FBb0RSdUMsV0FwRFEsbUJBb0RBO0FBQ05wQixXQUFHcUIsYUFBSCxDQUFpQjtBQUNmQywyQkFBaUI7QUFERixTQUFqQjtBQUdELE9BeERPO0FBeURSQyxXQXpEUSxtQkF5REE7QUFDTjtBQUNBLFlBQUcsS0FBSzFDLElBQUwsQ0FBVXFDLE1BQVYsS0FBcUIsQ0FBeEIsRUFBMkI7QUFDekJsQixhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sZUFESTtBQUVYQyxrQkFBTSxNQUZLO0FBR1hDLHNCQUFVO0FBSEMsV0FBYjtBQUtBO0FBQ0Q7QUFDRCxZQUFHLEtBQUtwQixNQUFSLEVBQWdCO0FBQ2hCZ0IsV0FBR3dCLFdBQUgsQ0FBZTtBQUNidEIsaUJBQU87QUFETSxTQUFmO0FBR0EsWUFBSXVCLE9BQU8sSUFBWDtBQUNBekIsV0FBRzBCLE9BQUgsQ0FBVztBQUNUQyxlQUFLLCtDQURJO0FBRVRDLGtCQUFRLE1BRkM7QUFHVDtBQUNBdkQsZ0JBQU07QUFDSndELGlCQUFLSixLQUFLNUMsSUFBTCxDQUFVaUQsSUFBVixDQUFlLEVBQWYsQ0FERDtBQUVKQyxpQkFBSyxDQUZELEVBRUk7QUFDUkMsaUJBQUssQ0FIRCxFQUdJO0FBQ1JDLGlCQUFLLENBSkQsRUFJSTtBQUNSQyxpQkFBSyxDQUxELENBS0k7QUFMSixXQUpHO0FBV1Q1QixtQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCRyxvQkFBUUMsR0FBUixDQUFZLFNBQVosRUFBc0JKLElBQUlsQyxJQUExQjtBQUNBMkIsZUFBR21DLFdBQUg7O0FBRUEsZ0JBQUc1QixJQUFJbEMsSUFBSixDQUFTK0QsSUFBVCxLQUFrQixHQUFyQixFQUF5QjtBQUN2QixrQkFBSVQsTUFBTXBCLElBQUlsQyxJQUFKLENBQVNBLElBQVQsQ0FBY3NELEdBQXhCO0FBQ0FGLG1CQUFLMUMsUUFBTCwrQkFBMEM0QyxHQUExQztBQUNBRixtQkFBS1ksTUFBTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQVosbUJBQUthLFVBQUw7QUFDRCxhQVZELE1BVU87QUFDTHRDLGlCQUFHdUMsU0FBSCxDQUFhO0FBQ1hyQyx1QkFBTyxJQURJO0FBRVhzQyx5QkFBU2pDLElBQUlsQyxJQUFKLENBQVNBLElBRlA7QUFHWGlDLHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsc0JBQUlBLElBQUlrQyxPQUFSLEVBQWlCO0FBQ2Z6Qyx1QkFBRzBDLFlBQUgsQ0FBZ0I7QUFDZEMsNkJBQU87QUFETyxxQkFBaEI7QUFHRCxtQkFKRCxNQUlPLElBQUlwQyxJQUFJcUMsTUFBUixFQUFnQjtBQUNyQmxDLDRCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNEO0FBQ0Y7QUFYVSxlQUFiO0FBYUQ7QUFDRixXQXhDUTtBQXlDVGtDLGdCQUFNLGNBQVNDLEdBQVQsRUFBYztBQUNsQjlDLGVBQUdtQyxXQUFIO0FBQ0Q7QUEzQ1EsU0FBWDtBQTZDRCxPQXJITztBQXNIUlksWUF0SFEsb0JBc0hDO0FBQ1AsYUFBS3pFLE1BQUwsQ0FBWUksTUFBWixHQUFxQixDQUFDLEtBQUtKLE1BQUwsQ0FBWUksTUFBbEM7QUFDRCxPQXhITztBQXlIUlEsY0F6SFEsc0JBeUhHO0FBQ1QsWUFBRyxLQUFLTCxJQUFMLENBQVVxQyxNQUFWLEtBQXFCLENBQXhCLEVBQTJCO0FBQ3pCbEIsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLGFBREk7QUFFWEMsa0JBQU0sTUFGSztBQUdYQyxzQkFBVTtBQUhDLFdBQWI7QUFLQTtBQUNEO0FBQ0QsWUFBSXFCLE9BQU8sSUFBWDtBQUNBekIsV0FBR2dELGVBQUgsQ0FBbUI7QUFDakJDLG9CQUFVLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLENBRE87QUFFakIzQyxtQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCO0FBQ0FQLGVBQUd3QixXQUFILENBQWU7QUFDYnRCLHFCQUFPLEtBRE07QUFFYmdELG9CQUFNO0FBRk8sYUFBZjtBQUlBLGdCQUFJdEUsT0FBTyxFQUFYO0FBQ0EsZ0JBQUcyQixJQUFJNEMsUUFBSixLQUFpQixDQUFwQixFQUF1QjtBQUNyQnZFLHFCQUFPLElBQVA7QUFDRCxhQUZELE1BRU8sSUFBRzJCLElBQUk0QyxRQUFKLEtBQWlCLENBQXBCLEVBQXVCO0FBQzVCdkUscUJBQU8sSUFBUDtBQUNELGFBRk0sTUFFQSxJQUFHMkIsSUFBSTRDLFFBQUosS0FBaUIsQ0FBcEIsRUFBdUI7QUFDNUJ2RSxxQkFBTyxLQUFQO0FBQ0QsYUFGTSxNQUVBLElBQUcyQixJQUFJNEMsUUFBSixLQUFpQixDQUFwQixFQUF1QjtBQUM1QnZFLHFCQUFPLElBQVA7QUFDRDtBQUNEb0IsZUFBRzBCLE9BQUgsQ0FBVztBQUNUQyxtQkFBSywyQ0FESTtBQUVUQyxzQkFBUSxNQUZDO0FBR1R3QixzQkFBUSxFQUFDdEUsUUFBTzJDLEtBQUszQyxNQUFiLEVBSEM7QUFJVFQsb0JBQU07QUFDSmdGLHlCQUFTekUsSUFETDtBQUVKMEUsbUJBQUc3QixLQUFLNUMsSUFBTCxDQUFVaUQsSUFBVixDQUFlLEdBQWY7QUFGQyxlQUpHO0FBUVR4Qix1QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCUCxtQkFBR21DLFdBQUg7QUFDQXpCLHdCQUFRQyxHQUFSLENBQVksV0FBWixFQUF3QkosSUFBSWxDLElBQTVCO0FBQ0FvRCxxQkFBS3ZDLFFBQUwsR0FBZ0I7QUFDZEMsd0JBQU0sSUFEUTtBQUVkSSx5QkFBTyxJQUZPO0FBR2RILHVCQUFLbUIsSUFBSWxDLElBQUosQ0FBU0EsSUFIQTtBQUlkZ0IsNkJBQVdrQixJQUFJbEMsSUFBSixDQUFTQTtBQUpOLGlCQUFoQjtBQU1Bb0QscUJBQUtZLE1BQUw7QUFDRCxlQWxCUTtBQW1CVFEsb0JBQU0sY0FBU0MsR0FBVCxFQUFjO0FBQ2xCOUMsbUJBQUdtQyxXQUFILENBQWVXLEdBQWY7QUFDRDtBQXJCUSxhQUFYO0FBdUJELFdBekNnQjtBQTBDakJELGdCQUFNLGNBQVN0QyxHQUFULEVBQWM7QUFDbEJHLG9CQUFRQyxHQUFSLENBQVlKLElBQUlnRCxNQUFoQjtBQUNEO0FBNUNnQixTQUFuQjtBQThDRCxPQWpMTztBQWtMUjFFLFVBbExRLGtCQWtMRDtBQUNMO0FBQ0EsWUFBRyxLQUFLQSxJQUFMLENBQVVxQyxNQUFWLEtBQXFCLENBQXhCLEVBQTJCO0FBQ3pCbEIsYUFBR0ssZ0JBQUgsQ0FBb0I7QUFDbEJoQyxrQkFBTTtBQURZLFdBQXBCO0FBR0EyQixhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sYUFESTtBQUVYQyxrQkFBTSxNQUZLO0FBR1hDLHNCQUFVO0FBSEMsV0FBYjtBQUtBO0FBQ0Q7QUFDREosV0FBR0ssZ0JBQUgsQ0FBb0I7QUFDbEJoQyxnQkFBTSxLQUFLUSxJQUFMLENBQVVpRCxJQUFWLENBQWUsSUFBZixDQURZO0FBRWxCeEIsbUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQlAsZUFBR1EsZ0JBQUgsQ0FBb0I7QUFDbEJGLHVCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJQLG1CQUFHQyxTQUFILENBQWE7QUFDWEMseUJBQU8sT0FESTtBQUVYQyx3QkFBTSxTQUZLO0FBR1hDLDRCQUFVO0FBSEMsaUJBQWI7QUFLRDtBQVBpQixhQUFwQjtBQVNEO0FBWmlCLFNBQXBCO0FBY0Q7QUE3TU8sSzs7Ozs7K0JBZ05DakIsSSxFQUFLO0FBQUE7O0FBQ2QsVUFBSXdDLE1BQU0sS0FBSzVDLFFBQWY7QUFDQSxVQUFNRSxvQkFBb0JlLEdBQUd3RCx1QkFBSCxFQUExQjtBQUNBLFdBQUt2RSxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0EsV0FBS0EsaUJBQUwsQ0FBdUJ3RSxRQUF2QixHQUFrQyxJQUFsQztBQUNBLFdBQUt4RSxpQkFBTCxDQUF1QnlFLEdBQXZCLEdBQTZCL0IsR0FBN0I7QUFDQSxXQUFLMUMsaUJBQUwsQ0FBdUIwRSxJQUF2Qjs7QUFFQTFFLHdCQUFrQjJFLE1BQWxCLENBQXlCLFlBQU07QUFDN0JsRCxnQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQSxlQUFLM0IsTUFBTCxHQUFjLElBQWQ7QUFDRCxPQUhEOztBQUtBQyx3QkFBa0I0RSxPQUFsQixDQUEwQixZQUFNO0FBQzlCbkQsZ0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0EsZUFBSzNCLE1BQUwsR0FBYyxLQUFkO0FBQ0QsT0FIRDtBQUlBQyx3QkFBa0I2RSxPQUFsQixDQUEwQixVQUFDdkQsR0FBRCxFQUFTO0FBQ2pDRyxnQkFBUUMsR0FBUixDQUFZSixHQUFaO0FBQ0QsT0FGRDtBQUdEOzs7K0JBRVU7QUFDVCxVQUFJTSxPQUFPLEtBQUt2QyxNQUFMLENBQVlLLElBQVosQ0FBaUJtQyxJQUFqQixDQUFzQixVQUFDQyxDQUFELEVBQUdDLENBQUgsRUFBTztBQUN0QyxlQUFPRCxJQUFFQyxDQUFUO0FBQ0QsT0FGVSxDQUFYO0FBR0E7QUFDQSxXQUFLbkMsSUFBTCxHQUFZLEVBQVo7QUFDQSxXQUFJLElBQUlvQyxJQUFJLENBQVosRUFBZUEsSUFBSUosS0FBS0ssTUFBeEIsRUFBZ0NELEdBQWhDLEVBQXFDO0FBQ25DLGFBQUtwQyxJQUFMLENBQVVzQyxJQUFWLENBQWUsS0FBSzdDLE1BQUwsQ0FBWUssSUFBWixDQUFpQnNDLENBQWpCLEVBQW9CN0IsR0FBbkM7QUFDRDtBQUNGOzs7MkJBRU1SLEksRUFBTTtBQUNYOEIsY0FBUUMsR0FBUixDQUFZL0IsSUFBWixFQUFpQixRQUFqQjtBQUNBLFVBQUk2QyxPQUFPLElBQVg7QUFDQXpCLFNBQUd3QixXQUFILENBQWU7QUFDYnRCLGVBQU8sS0FETTtBQUViZ0QsY0FBTTtBQUZPLE9BQWY7QUFJQSxVQUFJdEUsU0FBUyxNQUFiLEVBQXFCO0FBQ25Cb0IsV0FBRytELFVBQUgsQ0FBYztBQUNacEMsZUFBSSwwQ0FEUTtBQUVacUMsb0JBQVUsS0FBSzFGLE1BQUwsQ0FBWUMsTUFGVjtBQUdaMEYsZ0JBQU0sTUFITTtBQUlaYixrQkFBUSxFQUFDdEUsUUFBTyxLQUFLQSxNQUFiLEVBSkk7QUFLWndCLG1CQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsZ0JBQUlsQyxPQUFPNkYsS0FBS0MsS0FBTCxDQUFXNUQsSUFBSWxDLElBQWYsQ0FBWDtBQUNBcUMsb0JBQVFDLEdBQVIsQ0FBWXRDLElBQVosRUFBaUIsVUFBakI7QUFDQSxnQkFBSUEsS0FBS0ssTUFBTCxLQUFnQixPQUFwQixFQUE2QjtBQUMzQnNCLGlCQUFHdUMsU0FBSCxDQUFhO0FBQ1hyQyx1QkFBTyxJQURJO0FBRVhzQyx5QkFBU25FLEtBQUtBLElBRkg7QUFHWCtGLDRCQUFZLEtBSEQ7QUFJWDlELHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsc0JBQUlBLElBQUlrQyxPQUFSLEVBQWlCO0FBQ2Z6Qyx1QkFBRzBDLFlBQUgsQ0FBZ0I7QUFDZEMsNkJBQU87QUFETyxxQkFBaEI7QUFHRCxtQkFKRCxNQUlPLElBQUlwQyxJQUFJcUMsTUFBUixFQUFnQjtBQUNyQmxDLDRCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNEO0FBQ0Y7QUFaVSxlQUFiO0FBY0QsYUFmRCxNQWVPLElBQUd0QyxLQUFLSyxNQUFMLEtBQWdCLElBQW5CLEVBQXlCO0FBQzlCLGtCQUFJMkYsT0FBT2hHLEtBQUtBLElBQUwsQ0FBVUMsTUFBckI7QUFDQW1ELG1CQUFLbkQsTUFBTCxDQUFZSyxJQUFaLEdBQW1CLENBQ2pCLEVBQUMyRixJQUFJLENBQUwsRUFBUWxGLDRCQUFXaUYsS0FBS0UsZ0JBQXhCLEVBRGlCLEVBRWpCLEVBQUNELElBQUksQ0FBTCxFQUFRbEYsNkJBQVdpRixLQUFLRyxjQUFMLEtBQXdCLENBQXhCLEdBQTRCLEtBQTVCLEdBQWtDLEtBQTdDLENBQVIsRUFGaUIsRUFHakIsRUFBQ0YsSUFBSSxDQUFMLEVBQVFsRix3Q0FBYWlGLEtBQUtJLFNBQTFCLEVBSGlCLENBQW5COztBQU1BaEQsbUJBQUtuRCxNQUFMLENBQVlJLE1BQVosR0FBcUIsSUFBckI7QUFDQStDLG1CQUFLaUQsUUFBTDtBQUNBakQsbUJBQUtZLE1BQUw7QUFDRDtBQUNEckMsZUFBR21DLFdBQUg7QUFDRCxXQXBDVztBQXFDWlUsZ0JBQU0sY0FBU0MsR0FBVCxFQUFjO0FBQ2xCOUMsZUFBR21DLFdBQUg7QUFDRDtBQXZDVyxTQUFkO0FBeUNELE9BMUNELE1BMENPLElBQUd2RCxTQUFTLElBQVosRUFBa0I7QUFDdkJvQixXQUFHK0QsVUFBSCxDQUFjO0FBQ1pwQyxlQUFJLHdDQURRO0FBRVpxQyxvQkFBVSxLQUFLMUYsTUFBTCxDQUFZQyxNQUZWO0FBR1owRixnQkFBTSxNQUhNO0FBSVpiLGtCQUFRLEVBQUN0RSxRQUFPLEtBQUtBLE1BQWIsRUFKSTtBQUtaNkYsb0JBQVU7QUFDUkMsa0JBQU07QUFERSxXQUxFO0FBUVp0RSxtQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLGdCQUFJbEMsT0FBTzZGLEtBQUtDLEtBQUwsQ0FBVzVELElBQUlsQyxJQUFmLENBQVg7QUFDQXFDLG9CQUFRQyxHQUFSLENBQVl0QyxJQUFaLEVBQWlCLFlBQWpCOztBQUVBLGdCQUFJQSxLQUFLSyxNQUFMLEtBQWdCLE9BQXBCLEVBQTZCO0FBQzNCc0IsaUJBQUd1QyxTQUFILENBQWE7QUFDWHJDLHVCQUFPLElBREk7QUFFWHNDLHlCQUFTbkUsS0FBS0EsSUFGSDtBQUdYK0YsNEJBQVksS0FIRDtBQUlYOUQseUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixzQkFBSUEsSUFBSWtDLE9BQVIsRUFBaUI7QUFDZnpDLHVCQUFHMEMsWUFBSCxDQUFnQjtBQUNkQyw2QkFBTztBQURPLHFCQUFoQjtBQUdELG1CQUpELE1BSU8sSUFBSXBDLElBQUlxQyxNQUFSLEVBQWdCO0FBQ3JCbEMsNEJBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0Q7QUFDRjtBQVpVLGVBQWI7QUFjRCxhQWZELE1BZU8sSUFBR3RDLEtBQUtLLE1BQUwsS0FBZ0IsSUFBbkIsRUFBeUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQUkyRixPQUFPaEcsS0FBS0EsSUFBTCxDQUFVd0csWUFBckI7QUFDQXBELG1CQUFLbkQsTUFBTCxDQUFZSyxJQUFaLEdBQW1CLENBQ2pCLEVBQUMyRixJQUFJLENBQUwsRUFBUWxGLDZCQUFXaUYsS0FBSyxJQUFMLElBQWFBLEtBQUssSUFBTCxFQUFXUyxLQUF4QixHQUFnQyxFQUEzQyxDQUFSLEVBRGlCLEVBRWpCLEVBQUNSLElBQUksQ0FBTCxFQUFRbEYsNkJBQVdpRixLQUFLLElBQUwsSUFBYUEsS0FBSyxJQUFMLEVBQVdTLEtBQXhCLEdBQWdDLEVBQTNDLENBQVIsRUFGaUIsRUFHakIsRUFBQ1IsSUFBSSxDQUFMLEVBQVFsRiw2QkFBV2lGLEtBQUssSUFBTCxJQUFhQSxLQUFLLElBQUwsRUFBV1MsS0FBeEIsR0FBZ0MsRUFBM0MsQ0FBUixFQUhpQixFQUlqQixFQUFDUixJQUFJLENBQUwsRUFBUWxGLDZCQUFXaUYsS0FBSyxJQUFMLElBQWFBLEtBQUssSUFBTCxFQUFXUyxLQUF4QixHQUFnQyxFQUEzQyxDQUFSLEVBSmlCLEVBS2pCLEVBQUNSLElBQUksQ0FBTCxFQUFRbEYsNkJBQVdpRixLQUFLLElBQUwsSUFBYUEsS0FBSyxJQUFMLEVBQVdTLEtBQXhCLEdBQWdDLEVBQTNDLENBQVIsRUFMaUIsRUFNakIsRUFBQ1IsSUFBSSxDQUFMLEVBQVFsRixxREFBZWlGLEtBQUssUUFBTCxJQUFpQkEsS0FBSyxRQUFMLEVBQWVTLEtBQWhDLEdBQXdDLEVBQXZELENBQVIsRUFOaUIsQ0FBbkI7O0FBU0FyRCxtQkFBS25ELE1BQUwsQ0FBWUksTUFBWixHQUFxQixJQUFyQjtBQUNBK0MsbUJBQUtpRCxRQUFMO0FBQ0FqRCxtQkFBS1ksTUFBTDtBQUNEO0FBQ0RyQyxlQUFHbUMsV0FBSDtBQUNELFdBaERXO0FBaURaVSxnQkFBTSxjQUFTQyxHQUFULEVBQWM7QUFDbEI7QUFDQTlDLGVBQUdtQyxXQUFIO0FBQ0Q7QUFwRFcsU0FBZDtBQXNERCxPQXZETSxNQXVEQSxJQUFJdkQsU0FBUyxPQUFiLEVBQXNCO0FBQzFCb0IsV0FBRytELFVBQUgsQ0FBYztBQUNicEMsZUFBSSwyQ0FEUztBQUVicUMsb0JBQVUsS0FBSzFGLE1BQUwsQ0FBWUMsTUFGVDtBQUdiMEYsZ0JBQU0sTUFITztBQUliYixrQkFBUSxFQUFDdEUsUUFBTyxLQUFLQSxNQUFiLEVBSks7QUFLYndCLG1CQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsZ0JBQUlsQyxPQUFPNkYsS0FBS0MsS0FBTCxDQUFXNUQsSUFBSWxDLElBQWYsQ0FBWDtBQUNBcUMsb0JBQVFDLEdBQVIsQ0FBWXRDLElBQVosRUFBaUIsZUFBakI7O0FBRUEsZ0JBQUlBLEtBQUtLLE1BQUwsS0FBZ0IsT0FBcEIsRUFBNkI7QUFDM0JzQixpQkFBR3VDLFNBQUgsQ0FBYTtBQUNYckMsdUJBQU8sSUFESTtBQUVYc0MseUJBQVNuRSxLQUFLQSxJQUZIO0FBR1grRiw0QkFBWSxLQUhEO0FBSVg5RCx5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLHNCQUFJQSxJQUFJa0MsT0FBUixFQUFpQjtBQUNmekMsdUJBQUcwQyxZQUFILENBQWdCO0FBQ2RDLDZCQUFPO0FBRE8scUJBQWhCO0FBR0QsbUJBSkQsTUFJTyxJQUFJcEMsSUFBSXFDLE1BQVIsRUFBZ0I7QUFDckJsQyw0QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQUNGO0FBWlUsZUFBYjtBQWNELGFBZkQsTUFlTyxJQUFHdEMsS0FBS0ssTUFBTCxLQUFnQixJQUFuQixFQUF5QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBSTJGLE9BQU9oRyxLQUFLQSxJQUFMLENBQVV3RyxZQUFyQjtBQUNBbkUsc0JBQVFDLEdBQVIsQ0FBWTBELElBQVosRUFBaUIsTUFBakI7QUFDQTVDLG1CQUFLbkQsTUFBTCxDQUFZSyxJQUFaLEdBQW1CLENBQ2pCLEVBQUMyRixJQUFJLENBQUwsRUFBUWxGLDRCQUFXaUYsS0FBSyxJQUFMLEVBQVdTLEtBQTlCLEVBRGlCLEVBRWpCLEVBQUNSLElBQUksQ0FBTCxFQUFRbEYsd0NBQWFpRixLQUFLLE1BQUwsRUFBYVMsS0FBbEMsRUFGaUIsRUFHakIsRUFBQ1IsSUFBSSxDQUFMLEVBQVFsRixzQkFBVWlGLEtBQUssR0FBTCxFQUFVUyxLQUE1QixFQUhpQixFQUlqQixFQUFDUixJQUFJLENBQUwsRUFBUWxGLHdDQUFhaUYsS0FBSyxNQUFMLEVBQWFTLEtBQWxDLEVBSmlCLEVBS2pCLEVBQUNSLElBQUksQ0FBTCxFQUFRbEYsb0RBQWVpRixLQUFLLFFBQUwsRUFBZVMsS0FBdEMsRUFMaUIsRUFNakIsRUFBQ1IsSUFBSSxDQUFMLEVBQVFsRiw0QkFBV2lGLEtBQUssSUFBTCxFQUFXUyxLQUE5QixFQU5pQixFQU9qQixFQUFDUixJQUFJLENBQUwsRUFBUWxGLDRCQUFXaUYsS0FBSyxJQUFMLEVBQVdTLEtBQTlCLEVBUGlCLEVBUWpCLEVBQUNSLElBQUksQ0FBTCxFQUFRbEYsNEJBQVdpRixLQUFLLElBQUwsRUFBV1MsS0FBOUIsRUFSaUIsRUFTakIsRUFBQ1IsSUFBSSxDQUFMLEVBQVFsRix3Q0FBYWlGLEtBQUssTUFBTCxFQUFhUyxLQUFsQyxFQVRpQixFQVVqQixFQUFDUixJQUFJLENBQUwsRUFBUWxGLDRCQUFXaUYsS0FBSyxJQUFMLEVBQVdTLEtBQTlCLEVBVmlCLENBQW5COztBQWFBckQsbUJBQUtuRCxNQUFMLENBQVlJLE1BQVosR0FBcUIsSUFBckI7QUFDQStDLG1CQUFLaUQsUUFBTDtBQUNBakQsbUJBQUtZLE1BQUw7QUFFRDtBQUNEckMsZUFBR21DLFdBQUg7QUFDRCxXQW5EWTtBQW9EYlUsZ0JBQU0sY0FBU0MsR0FBVCxFQUFjO0FBQ2xCO0FBQ0E5QyxlQUFHbUMsV0FBSDtBQUNEO0FBdkRZLFNBQWQ7QUF5REYsT0ExRE0sTUEwREEsSUFBR3ZELFNBQVMsU0FBWixFQUF1QjtBQUMzQm9CLFdBQUcrRCxVQUFILENBQWM7QUFDYnBDLGVBQUkseUNBRFM7QUFFYnFDLG9CQUFVLEtBQUsxRixNQUFMLENBQVlDLE1BRlQ7QUFHYjBGLGdCQUFNLE1BSE87QUFJYmIsa0JBQVEsRUFBQ3RFLFFBQU8sS0FBS0EsTUFBYixFQUpLO0FBS2J3QixtQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLGdCQUFJbEMsT0FBTzZGLEtBQUtDLEtBQUwsQ0FBVzVELElBQUlsQyxJQUFmLENBQVg7QUFDQXFDLG9CQUFRQyxHQUFSLENBQVl0QyxJQUFaLEVBQWlCLFNBQWpCOztBQUVBLGdCQUFJQSxLQUFLSyxNQUFMLEtBQWdCLE9BQXBCLEVBQTZCO0FBQzNCc0IsaUJBQUd1QyxTQUFILENBQWE7QUFDWHJDLHVCQUFPLElBREk7QUFFWHNDLHlCQUFTbkUsS0FBS0EsSUFGSDtBQUdYK0YsNEJBQVksS0FIRDtBQUlYOUQseUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixzQkFBSUEsSUFBSWtDLE9BQVIsRUFBaUI7QUFDZnpDLHVCQUFHMEMsWUFBSCxDQUFnQjtBQUNkQyw2QkFBTztBQURPLHFCQUFoQjtBQUdELG1CQUpELE1BSU8sSUFBSXBDLElBQUlxQyxNQUFSLEVBQWdCO0FBQ3JCbEMsNEJBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0Q7QUFDRjtBQVpVLGVBQWI7QUFjRCxhQWZELE1BZU8sSUFBR3RDLEtBQUtLLE1BQUwsS0FBZ0IsSUFBbkIsRUFBeUI7QUFDOUIsa0JBQUlxRyxVQUFVMUcsS0FBS0EsSUFBTCxDQUFVd0csWUFBVixDQUF1QkcsR0FBdkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFNQyxLQUFOLEVBQWdCO0FBQUUsdUJBQU8sRUFBQ1osSUFBR1ksS0FBSixFQUFVOUYsS0FBSTZGLEtBQUtILEtBQW5CLEVBQVA7QUFBbUMsZUFBaEYsQ0FBZDtBQUNBO0FBQ0FyRCxtQkFBS25ELE1BQUwsQ0FBWUssSUFBWixHQUFtQm9HLE9BQW5CO0FBQ0F0RCxtQkFBS25ELE1BQUwsQ0FBWUksTUFBWixHQUFxQixJQUFyQjtBQUNBK0MsbUJBQUtpRCxRQUFMO0FBQ0FqRCxtQkFBS1ksTUFBTDtBQUNEO0FBQ0RyQyxlQUFHbUMsV0FBSDtBQUNELFdBakNZO0FBa0NiVSxnQkFBTSxjQUFTQyxHQUFULEVBQWM7QUFDbEI7QUFDQTlDLGVBQUdtQyxXQUFIO0FBQ0Q7QUFyQ1ksU0FBZDtBQXVDRixPQXhDTSxNQXdDQSxJQUFHdkQsU0FBUyxRQUFaLEVBQXNCO0FBQzNCb0IsV0FBRytELFVBQUgsQ0FBYztBQUNacEMsZUFBSSx5Q0FEUTtBQUVacUMsb0JBQVUsS0FBSzFGLE1BQUwsQ0FBWUMsTUFGVjtBQUdaMEYsZ0JBQU0sTUFITTtBQUlaYixrQkFBUSxFQUFDdEUsUUFBTyxLQUFLQSxNQUFiLEVBSkk7QUFLWndCLG1CQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsZ0JBQUlsQyxPQUFPNkYsS0FBS0MsS0FBTCxDQUFXNUQsSUFBSWxDLElBQWYsQ0FBWDtBQUNBcUMsb0JBQVFDLEdBQVIsQ0FBWXRDLElBQVosRUFBaUIsU0FBakI7O0FBRUEsZ0JBQUlBLEtBQUtLLE1BQUwsS0FBZ0IsT0FBcEIsRUFBNkI7QUFDM0JzQixpQkFBR3VDLFNBQUgsQ0FBYTtBQUNYckMsdUJBQU8sSUFESTtBQUVYc0MseUJBQVNuRSxLQUFLQSxJQUZIO0FBR1grRiw0QkFBWSxLQUhEO0FBSVg5RCx5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLHNCQUFJQSxJQUFJa0MsT0FBUixFQUFpQjtBQUNmekMsdUJBQUcwQyxZQUFILENBQWdCO0FBQ2RDLDZCQUFPO0FBRE8scUJBQWhCO0FBR0QsbUJBSkQsTUFJTyxJQUFJcEMsSUFBSXFDLE1BQVIsRUFBZ0I7QUFDckJsQyw0QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQUNGO0FBWlUsZUFBYjtBQWNELGFBZkQsTUFlTyxJQUFHdEMsS0FBS0ssTUFBTCxLQUFnQixJQUFuQixFQUF5QjtBQUM5QixrQkFBSXFHLFVBQVUxRyxLQUFLQSxJQUFMLENBQVV3RyxZQUFWLENBQXVCRyxHQUF2QixDQUEyQixVQUFDQyxJQUFELEVBQU1DLEtBQU4sRUFBZ0I7QUFBRSx1QkFBTyxFQUFDWixJQUFHWSxLQUFKLEVBQVU5RixLQUFJNkYsS0FBS0gsS0FBbkIsRUFBUDtBQUFtQyxlQUFoRixDQUFkO0FBQ0E7QUFDQXJELG1CQUFLbkQsTUFBTCxDQUFZSyxJQUFaLEdBQW1Cb0csT0FBbkI7QUFDQXRELG1CQUFLbkQsTUFBTCxDQUFZSSxNQUFaLEdBQXFCLElBQXJCO0FBQ0ErQyxtQkFBS2lELFFBQUw7QUFDQWpELG1CQUFLWSxNQUFMO0FBRUQ7QUFDRHJDLGVBQUdtQyxXQUFIO0FBQ0QsV0FsQ1c7QUFtQ1pVLGdCQUFNLGNBQVNDLEdBQVQsRUFBYztBQUNsQjtBQUNBOUMsZUFBR21DLFdBQUg7QUFDRDtBQXRDVyxTQUFkO0FBd0NELE9BekNNLE1BeUNEO0FBQ0puQyxXQUFHK0QsVUFBSCxDQUFjO0FBQ1pwQyxlQUFJLHlDQURRO0FBRVpxQyxvQkFBVSxLQUFLMUYsTUFBTCxDQUFZQyxNQUZWO0FBR1owRixnQkFBTSxNQUhNO0FBSVpiLGtCQUFRLEVBQUN0RSxRQUFPLEtBQUtBLE1BQWIsRUFKSTtBQUtad0IsbUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixnQkFBSWxDLE9BQU82RixLQUFLQyxLQUFMLENBQVc1RCxJQUFJbEMsSUFBZixDQUFYO0FBQ0FxQyxvQkFBUUMsR0FBUixDQUFZdEMsSUFBWixFQUFpQixTQUFqQjs7QUFFQSxnQkFBSUEsS0FBS0ssTUFBTCxLQUFnQixPQUFwQixFQUE2QjtBQUMzQnNCLGlCQUFHdUMsU0FBSCxDQUFhO0FBQ1hyQyx1QkFBTyxJQURJO0FBRVhzQyx5QkFBU25FLEtBQUtBLElBRkg7QUFHWCtGLDRCQUFZLEtBSEQ7QUFJWDlELHlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsc0JBQUlBLElBQUlrQyxPQUFSLEVBQWlCO0FBQ2Z6Qyx1QkFBRzBDLFlBQUgsQ0FBZ0I7QUFDZEMsNkJBQU87QUFETyxxQkFBaEI7QUFHRCxtQkFKRCxNQUlPLElBQUlwQyxJQUFJcUMsTUFBUixFQUFnQjtBQUNyQmxDLDRCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNEO0FBQ0Y7QUFaVSxlQUFiO0FBY0QsYUFmRCxNQWVPLElBQUd0QyxLQUFLSyxNQUFMLEtBQWdCLElBQW5CLEVBQXlCO0FBQzlCLGtCQUFJcUcsVUFBVTFHLEtBQUtBLElBQUwsQ0FBVXdHLFlBQVYsQ0FBdUJHLEdBQXZCLENBQTJCLFVBQUNDLElBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUFFLHVCQUFPLEVBQUNaLElBQUdZLEtBQUosRUFBVTlGLEtBQUk2RixLQUFLSCxLQUFuQixFQUFQO0FBQW1DLGVBQWhGLENBQWQ7QUFDQTtBQUNBckQsbUJBQUtuRCxNQUFMLENBQVlLLElBQVosR0FBbUJvRyxPQUFuQjtBQUNBdEQsbUJBQUtuRCxNQUFMLENBQVlJLE1BQVosR0FBcUIsSUFBckI7QUFDQStDLG1CQUFLaUQsUUFBTDtBQUNBakQsbUJBQUtZLE1BQUw7QUFFRDtBQUNEckMsZUFBR21DLFdBQUg7QUFDRCxXQWxDVztBQW1DWlUsZ0JBQU0sY0FBU0MsR0FBVCxFQUFjO0FBQ2xCO0FBQ0E5QyxlQUFHbUMsV0FBSDtBQUNEO0FBdENXLFNBQWQ7QUF3Q0Q7QUFDRjs7OzZCQUVTO0FBQ1IsV0FBSzdELE1BQUwsQ0FBWUMsTUFBWixHQUFxQnlCLEdBQUdtRixjQUFILENBQWtCLFVBQWxCLENBQXJCO0FBQ0EsV0FBSzdHLE1BQUwsQ0FBWU0sSUFBWixHQUFtQm9CLEdBQUdtRixjQUFILENBQWtCLE1BQWxCLENBQW5CO0FBQ0EsV0FBS3JHLE1BQUwsR0FBY2tCLEdBQUdtRixjQUFILENBQWtCLFVBQWxCLENBQWQ7QUFDQW5GLFNBQUdDLFNBQUgsQ0FBYTtBQUNYQyxlQUFPLEtBQUtwQixNQUREO0FBRVhxQixjQUFNLFNBRks7QUFHWEMsa0JBQVU7QUFIQyxPQUFiO0FBS0EsV0FBS2dGLE1BQUwsQ0FBWSxLQUFLOUcsTUFBTCxDQUFZTSxJQUF4QjtBQUNBb0IsU0FBR3FCLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7O21DQUVjO0FBQ2JaLGNBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsV0FBSzFCLGlCQUFMLElBQTBCLEtBQUtBLGlCQUFMLENBQXVCb0csT0FBdkIsRUFBMUI7QUFDRDs7OztFQTNqQmtDLGVBQUtDLFM7O2tCQUFyQmxILE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgaW1ndXJsOiAnJyxcbiAgICAgICAgZGVzYzogJycsXG4gICAgICAgIG9uZTogJ+ino+aekOWbvueJh+S4re+9nicsXG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICB0eXBlOiAnJ1xuICAgICAgfSxcbiAgICAgIGNvcHk6IFtdLFxuICAgICAgLy8gYXV0aGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMiksXG4gICAgICBhdXRoaWQ6ICcnLFxuICAgICAgdm9pY2VVcmw6ICcnLFxuICAgICAgaXNQbGF5OiBmYWxzZSxcbiAgICAgIGlubmVyQXVkaW9Db250ZXh0OiBudWxsLFxuICAgICAgdHJhbnNmZXI6IHtcbiAgICAgICAgZmxhZzogZmFsc2UsXG4gICAgICAgIHZhbDogJycsXG4gICAgICAgIGNvcHlQYXN0ZTogJycsXG4gICAgICAgIHJlc2V0OiB0cnVlLFxuICAgICAgICBhcnJvdzogZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgdG9nZ2xlVHJhbnNmZXJCb3goKSB7XG4gICAgICAgIHRoaXMudHJhbnNmZXIuZmxhZyA9ICF0aGlzLnRyYW5zZmVyLmZsYWc7XG4gICAgICB9LFxuICAgICAgdXBkYXRlVGV4dGFyZWEoZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlLmRldGFpbC52YWx1ZSwndXBkYXRlVGV4dGFyZWEnKTtcbiAgICAgICAgdGhpcy50cmFuc2Zlci52YWwgPSAgZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIHRoaXMudHJhbnNmZXIucmVzZXQgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICByZXNldFRyYW5zZmVyKCkge1xuICAgICAgICB0aGlzLnRyYW5zZmVyLnZhbCA9IHRoaXMudHJhbnNmZXIuY29weVBhc3RlO1xuICAgICAgfSxcbiAgICAgIGNvcHlUcmFuc2ZlcigpIHtcbiAgICAgICAgaWYodGhpcy50cmFuc2Zlci52YWwgPT09ICcnKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5aSN5Yi25YaF5a655Li656m6JyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgZGF0YTogdGhpcy50cmFuc2Zlci52YWwsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5a2X5bey5aSN5Yi2JyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY2xvc2VUcmFuc2Zvcm1Cb3goKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjbG9zZScpO1xuICAgICAgICB0aGlzLnRyYW5zZmVyLmZsYWcgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBjaGVja2JveENoYW5nZShlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGVja2JveENoYW5nZScpO1xuICAgICAgICBsZXQga2V5cyA9IGUuZGV0YWlsLnZhbHVlLnNvcnQoKGEsYik9PntcbiAgICAgICAgICByZXR1cm4gYS1iO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbGV0IGtleXMgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgdGhpcy5jb3B5ID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtrZXlzW2ldXS52YWwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29weSk7XG4gICAgICB9LFxuICAgICAgc2hhcmUoKSB7XG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHZvaWNlKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmlzUGxheSwndGhpcy5pc1BsYXknKTtcbiAgICAgICAgaWYodGhpcy5jb3B5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WLvumAiemcgOimgeivremfs+WQiOaIkOeahOaWh+Wtl++8gScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaXNQbGF5KSByZXR1cm47XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+ivremfs+WQiOaIkOS4rS4uLicsXG4gICAgICAgIH0pXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvc3dpdGNocy92b2ljZS9jb21wb3NlJywgXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgLy8gaGVhZGVyOiB7YXV0aGlkOnNlbGYuYXV0aGlkfSxcbiAgICAgICAgICBkYXRhOiB7IFxuICAgICAgICAgICAgdHh0OiBzZWxmLmNvcHkuam9pbignJyksXG4gICAgICAgICAgICBzcGQ6IDUsIC8vIOivremAn1xuICAgICAgICAgICAgcGl0OiA0LCAvLyDpn7PosINcbiAgICAgICAgICAgIHZvbDogMywgLy8g6Z+z6YePXG4gICAgICAgICAgICBwZXI6IDMsIC8vIDDkuLrlpbPlo7DvvIwx5Li655S35aOw77yMM+S4uuaDheaEn+WQiOaIkC3luqbpgI3pgaXvvIw05Li65oOF5oSf5ZCI5oiQLeW6puS4q+S4q1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcG9zZScscmVzLmRhdGEpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcblxuICAgICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgbGV0IHVybCA9IHJlcy5kYXRhLmRhdGEudXJsO1xuICAgICAgICAgICAgICBzZWxmLnZvaWNlVXJsID0gYGh0dHBzOi8vd3d3LmlvY3IudmlwL2FpJHt1cmx9YDtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgLy8gd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgLy8gICB0aXRsZTogJ+mfs+mikeWQiOaIkOWujOavlScsXG4gICAgICAgICAgICAgIC8vICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAvLyAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgIHNlbGYub3BlblBsYXllcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogcmVzLmRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgPSAhdGhpcy5yZXN1bHQuc3RhdHVzO1xuICAgICAgfSxcbiAgICAgIHRyYW5zZmVyKCkge1xuICAgICAgICBpZih0aGlzLmNvcHkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35Yu+6YCJ6ZyA6KaB57+76K+R55qE5paH5a2X77yBJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICAgIGl0ZW1MaXN0OiBbJ+iLseaWhycsICfml6Xor60nLCAn5rOV6K+tJywgJ+S4reaWhyddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnRhcEluZGV4LHNlbGYuY29weSk7XG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgIHRpdGxlOiAn57+76K+R5LitJyxcbiAgICAgICAgICAgICAgbWFzazogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBsZXQgdHlwZSA9ICcnO1xuICAgICAgICAgICAgaWYocmVzLnRhcEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgICB0eXBlID0gJ2pwJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdmcmEnO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMykge1xuICAgICAgICAgICAgICB0eXBlID0gJ3poJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS9zd2l0Y2hzL3RyYW5zbGF0ZScsIFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnNlbGYuYXV0aGlkfSxcbiAgICAgICAgICAgICAgZGF0YTogeyBcbiAgICAgICAgICAgICAgICBkZXN0TGFuOiB0eXBlLFxuICAgICAgICAgICAgICAgIHE6IHNlbGYuY29weS5qb2luKCcgJylcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndHJhbnNsYXRlJyxyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgc2VsZi50cmFuc2ZlciA9IHtcbiAgICAgICAgICAgICAgICAgIGZsYWc6IHRydWUsXG4gICAgICAgICAgICAgICAgICBhcnJvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHZhbDogcmVzLmRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgIGNvcHlQYXN0ZTogcmVzLmRhdGEuZGF0YVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZyhlcnIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29weSgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jb3B5LCd0aGlzLmNvcHknKTtcbiAgICAgICAgaWYodGhpcy5jb3B5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgICAgZGF0YTogJydcbiAgICAgICAgICB9KVxuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WLvumAiemcgOimgeWkjeWItueahOaWh+Wtl++8gScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuY29weS5qb2luKCdcXG4nKSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHd4LmdldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmloflrZflt7LlpI3liLYnLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuUGxheWVyKGZsYWcpe1xuICAgICAgbGV0IHVybCA9IHRoaXMudm9pY2VVcmw7XG4gICAgICBjb25zdCBpbm5lckF1ZGlvQ29udGV4dCA9IHd4LmNyZWF0ZUlubmVyQXVkaW9Db250ZXh0KCk7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0ID0gaW5uZXJBdWRpb0NvbnRleHQ7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0LmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQuc3JjID0gdXJsO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5wbGF5KCk7XG5cbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uUGxheSgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfmraPlnKjmkq3mlL4nKTtcbiAgICAgICAgdGhpcy5pc1BsYXkgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRW5kZWQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn57uT5p2f5pKt5pS+Jyk7XG4gICAgICAgIHRoaXMuaXNQbGF5ID0gZmFsc2U7XG4gICAgICB9KVxuICAgICAgaW5uZXJBdWRpb0NvbnRleHQub25FcnJvcigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICB9KVxuICAgIH1cblxuICAgIGluaXRDb3B5KCkge1xuICAgICAgbGV0IGtleXMgPSB0aGlzLnJlc3VsdC5saXN0LnNvcnQoKGEsYik9PntcbiAgICAgICAgcmV0dXJuIGEtYjtcbiAgICAgIH0pO1xuICAgICAgLy8gbGV0IGtleXMgPSB0aGlzLnJlc3VsdC5saXN0O1xuICAgICAgdGhpcy5jb3B5ID0gW107XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmNvcHkucHVzaCh0aGlzLnJlc3VsdC5saXN0W2ldLnZhbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBsb2FkKHR5cGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKHR5cGUsJ3VwbG9hZCcpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+ivhuWIq+S4rScsXG4gICAgICAgIG1hc2s6IHRydWUsXG4gICAgICB9KVxuICAgICAgaWYgKHR5cGUgPT09ICdjYXJkJykge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvYmFua2NhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnYmFja2NhcmQnKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEucmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5Y2h5Y+377yaJHt0ZW1wLmJhbmtfY2FyZF9udW1iZXJ9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDnsbvlnovvvJoke3RlbXAuYmFua19jYXJkX3R5cGUgPT09IDIgPyAn5L+h55So5Y2hJzon5YCf6K6w5Y2hJ31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOmTtuihjOWQjeensO+8miR7dGVtcC5iYW5rX25hbWV9YH1cbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZih0eXBlID09PSAnaWQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9pZGNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgIHNpZGU6ICdmcm9udCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdpZCBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXSA/IHRlbXBbJ+Wnk+WQjSddLndvcmRzIDogJyd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDmgKfliKvvvJoke3RlbXBbJ+aAp+WIqyddID8gdGVtcFsn5oCn5YirJ10ud29yZHMgOiAnJ31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOawkeaXj++8miR7dGVtcFsn5rCR5pePJ10gPyB0ZW1wWyfmsJHml48nXS53b3JkcyA6ICcnfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5Ye655Sf77yaJHt0ZW1wWyflh7rnlJ8nXSA/IHRlbXBbJ+WHuueUnyddLndvcmRzIDogJyd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA0LCB2YWw6IGDkvY/lnYDvvJoke3RlbXBbJ+S9j+WdgCddID8gdGVtcFsn5L2P5Z2AJ10ud29yZHMgOiAnJ31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOWFrOawkei6q+S7veWPt+egge+8miR7dGVtcFsn5YWs5rCR6Lqr5Lu95Y+356CBJ10gPyB0ZW1wWyflhazmsJHouqvku73lj7fnoIEnXS53b3JkcyA6ICcnfWB9LFxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RyaXZlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2RyaXZlY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdkcml2ZSBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wLCd0ZW1wJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDor4Hlj7fvvJoke3RlbXBbJ+ivgeWPtyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5pyJ5pWI5pyf6ZmQ77yaJHt0ZW1wWyfmnInmlYjmnJ/pmZAnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOiHs++8miR7dGVtcFsn6IezJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAzLCB2YWw6IGDlh4bpqb7ovablnovvvJoke3RlbXBbJ+WHhumpvui9puWeiyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5Yid5qyh6aKG6K+B5pel5pyf77yaJHt0ZW1wWyfliJ3mrKHpoobor4Hml6XmnJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOWnk+WQje+8miR7dGVtcFsn5aeT5ZCNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA2LCB2YWw6IGDmgKfliKvvvJoke3RlbXBbJ+aAp+WIqyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNywgdmFsOiBg5Zu957GN77yaJHt0ZW1wWyflm73nsY0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDgsIHZhbDogYOWHuueUn+aXpeacn++8miR7dGVtcFsn5Ye655Sf5pel5pyfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA5LCB2YWw6IGDkvY/lnYDvvJoke3RlbXBbJ+S9j+WdgCddLndvcmRzfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZih0eXBlID09PSAnZW5oYW5jZScpIHtcbiAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9lbmhhbmNlJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gJ3RpY2tldCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL3JlY2VpcHQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9ZWxzZSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9nZW5lcmFsJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnJlc3VsdC5pbWd1cmwgPSB3eC5nZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnKTtcbiAgICAgIHRoaXMucmVzdWx0LnR5cGUgPSB3eC5nZXRTdG9yYWdlU3luYygndHlwZScpO1xuICAgICAgdGhpcy5hdXRoaWQgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlcmluZm8nKTtcbiAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiB0aGlzLmF1dGhpZCxcbiAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgfSlcbiAgICAgIHRoaXMudXBsb2FkKHRoaXMucmVzdWx0LnR5cGUpO1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBkZXN0cm95QXVkaW8oKSB7XG4gICAgICBjb25zb2xlLmxvZygnZGVzdHJveSBhdWRpbycpO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dCAmJiB0aGlzLmlubmVyQXVkaW9Db250ZXh0LmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgfVxuIl19