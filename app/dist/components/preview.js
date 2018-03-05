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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwidm9pY2VVcmwiLCJpc1BsYXkiLCJpbm5lckF1ZGlvQ29udGV4dCIsIm1ldGhvZHMiLCJ3aGljaCIsImNoZWNrYm94Q2hhbmdlIiwiZSIsImtleXMiLCJkZXRhaWwiLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsImkiLCJsZW5ndGgiLCJwdXNoIiwidmFsIiwiY29uc29sZSIsImxvZyIsInNoYXJlIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwidm9pY2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInNob3dMb2FkaW5nIiwic2VsZiIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJ0eHQiLCJqb2luIiwic3BkIiwicGl0Iiwidm9sIiwicGVyIiwic3VjY2VzcyIsInJlcyIsImhpZGVMb2FkaW5nIiwiY29kZSIsIiRhcHBseSIsIm9wZW5QbGF5ZXIiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiY2FuY2VsIiwiZmFpbCIsImVyciIsInRvZ2dsZSIsInRyYW5zZmVyIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJ0YXBJbmRleCIsImhlYWRlciIsImRlc3RMYW4iLCJxIiwiaWQiLCJlcnJNc2ciLCJzZXRDbGlwYm9hcmREYXRhIiwiZ2V0Q2xpcGJvYXJkRGF0YSIsImZsYWciLCJjcmVhdGVJbm5lckF1ZGlvQ29udGV4dCIsImF1dG9wbGF5Iiwic3JjIiwicGxheSIsIm9uUGxheSIsIm9uRW5kZWQiLCJvbkVycm9yIiwibWFzayIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJzaG93Q2FuY2VsIiwidGVtcCIsImJhbmtfY2FyZF9udW1iZXIiLCJiYW5rX2NhcmRfdHlwZSIsImJhbmtfbmFtZSIsImluaXRDb3B5IiwiZm9ybURhdGEiLCJzaWRlIiwid29yZHNfcmVzdWx0Iiwid29yZHMiLCJyZXN1bHRzIiwibWFwIiwiaXRlbSIsImluZGV4IiwiZ2V0U3RvcmFnZVN5bmMiLCJ1cGxvYWQiLCJkZXN0cm95IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLGdCQUFRLEVBREY7QUFFTkMsY0FBTSxFQUZBO0FBR05DLGFBQUssUUFIQztBQUlOQyxnQkFBUSxLQUpGO0FBS05DLGNBQU0sRUFMQTtBQU1OQyxjQUFNO0FBTkEsT0FESDtBQVNMQyxZQUFNLEVBVEQ7QUFVTDtBQUNBQyxjQUFRLEVBWEg7QUFZTEMsZ0JBQVUsRUFaTDtBQWFMQyxjQUFRLEtBYkg7QUFjTEMseUJBQW1CO0FBZGQsSyxRQWlCUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0E7QUFDTixhQUFLYixNQUFMLENBQVlHLEdBQVosR0FBa0IsS0FBS0gsTUFBTCxDQUFZRSxJQUE5QjtBQUNELE9BSE87QUFJUlksb0JBSlEsMEJBSU9DLENBSlAsRUFJVTtBQUNoQjtBQUNBLFlBQUlDLE9BQU9ELEVBQUVFLE1BQUYsQ0FBU0MsS0FBVCxDQUFlQyxJQUFmLENBQW9CLFVBQUNDLENBQUQsRUFBR0MsQ0FBSCxFQUFPO0FBQ3BDLGlCQUFPRCxJQUFFQyxDQUFUO0FBQ0QsU0FGVSxDQUFYO0FBR0E7QUFDQSxhQUFLZCxJQUFMLEdBQVksRUFBWjtBQUNBLGFBQUksSUFBSWUsSUFBSSxDQUFaLEVBQWVBLElBQUlOLEtBQUtPLE1BQXhCLEVBQWdDRCxHQUFoQyxFQUFxQztBQUNuQyxlQUFLZixJQUFMLENBQVVpQixJQUFWLENBQWUsS0FBS3hCLE1BQUwsQ0FBWUssSUFBWixDQUFpQlcsS0FBS00sQ0FBTCxDQUFqQixFQUEwQkcs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QUgsQ0FBa0IsVUFBbEIsQ0FBckI7QUFDQSxXQUFLdEcsTUFBTCxDQUFZTSxJQUFaLEdBQW1CdUIsR0FBR3lFLGNBQUgsQ0FBa0IsTUFBbEIsQ0FBbkI7QUFDQSxXQUFLOUYsTUFBTCxHQUFjcUIsR0FBR3lFLGNBQUgsQ0FBa0IsVUFBbEIsQ0FBZDtBQUNBekUsU0FBR0ksU0FBSCxDQUFhO0FBQ1hDLGVBQU8sS0FBSzFCLE1BREQ7QUFFWDJCLGNBQU0sU0FGSztBQUdYQyxrQkFBVTtBQUhDLE9BQWI7QUFLQSxXQUFLbUUsTUFBTCxDQUFZLEtBQUt2RyxNQUFMLENBQVlNLElBQXhCO0FBQ0F1QixTQUFHQyxhQUFILENBQWlCO0FBQ2ZDLHlCQUFpQjtBQURGLE9BQWpCO0FBR0Q7OzttQ0FFYztBQUNiTCxjQUFRQyxHQUFSLENBQVksZUFBWjtBQUNBLFdBQUtoQixpQkFBTCxJQUEwQixLQUFLQSxpQkFBTCxDQUF1QjZGLE9BQXZCLEVBQTFCO0FBQ0Q7Ozs7RUF0Z0JrQyxlQUFLQyxTOztrQkFBckIzRyxPIiwiZmlsZSI6InByZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlldyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGltZ3VybDogJycsXG4gICAgICAgIGRlc2M6ICcnLFxuICAgICAgICBvbmU6ICfop6PmnpDlm77niYfkuK3vvZ4nLFxuICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICBsaXN0OiBbXSxcbiAgICAgICAgdHlwZTogJydcbiAgICAgIH0sXG4gICAgICBjb3B5OiBbXSxcbiAgICAgIC8vIGF1dGhpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDIpLFxuICAgICAgYXV0aGlkOiAnJyxcbiAgICAgIHZvaWNlVXJsOiAnJyxcbiAgICAgIGlzUGxheTogZmFsc2UsXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dDogbnVsbFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB3aGljaCgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQub25lID0gdGhpcy5yZXN1bHQuZGVzYztcbiAgICAgIH0sXG4gICAgICBjaGVja2JveENoYW5nZShlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGVja2JveENoYW5nZScpO1xuICAgICAgICBsZXQga2V5cyA9IGUuZGV0YWlsLnZhbHVlLnNvcnQoKGEsYik9PntcbiAgICAgICAgICByZXR1cm4gYS1iO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbGV0IGtleXMgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgdGhpcy5jb3B5ID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtrZXlzW2ldXS52YWwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29weSk7XG4gICAgICB9LFxuICAgICAgc2hhcmUoKSB7XG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHZvaWNlKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmlzUGxheSwndGhpcy5pc1BsYXknKTtcbiAgICAgICAgaWYodGhpcy5jb3B5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WLvumAiemcgOimgeivremfs+WQiOaIkOeahOaWh+Wtl++8gScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuaXNQbGF5KSByZXR1cm47XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+ivremfs+WQiOaIkOS4rS4uLicsXG4gICAgICAgIH0pXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvc3dpdGNocy92b2ljZS9jb21wb3NlJywgXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgLy8gaGVhZGVyOiB7YXV0aGlkOnNlbGYuYXV0aGlkfSxcbiAgICAgICAgICBkYXRhOiB7IFxuICAgICAgICAgICAgdHh0OiBzZWxmLmNvcHkuam9pbignJyksXG4gICAgICAgICAgICBzcGQ6IDUsIC8vIOivremAn1xuICAgICAgICAgICAgcGl0OiA0LCAvLyDpn7PosINcbiAgICAgICAgICAgIHZvbDogMywgLy8g6Z+z6YePXG4gICAgICAgICAgICBwZXI6IDMsIC8vIDDkuLrlpbPlo7DvvIwx5Li655S35aOw77yMM+S4uuaDheaEn+WQiOaIkC3luqbpgI3pgaXvvIw05Li65oOF5oSf5ZCI5oiQLeW6puS4q+S4q1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcG9zZScscmVzLmRhdGEpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcblxuICAgICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgbGV0IHVybCA9IHJlcy5kYXRhLmRhdGEudXJsO1xuICAgICAgICAgICAgICBzZWxmLnZvaWNlVXJsID0gYGh0dHBzOi8vd3d3LmlvY3IudmlwL2FpJHt1cmx9YDtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgLy8gd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgLy8gICB0aXRsZTogJ+mfs+mikeWQiOaIkOWujOavlScsXG4gICAgICAgICAgICAgIC8vICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAvLyAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgIHNlbGYub3BlblBsYXllcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogcmVzLmRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgPSAhdGhpcy5yZXN1bHQuc3RhdHVzO1xuICAgICAgfSxcbiAgICAgIHRyYW5zZmVyKCkge1xuICAgICAgICBpZih0aGlzLmNvcHkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K+35Yu+6YCJ6ZyA6KaB57+76K+R55qE5paH5a2X77yBJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICAgIGl0ZW1MaXN0OiBbJ+iLseaWhycsICfml6Xor60nLCAn5rOV6K+tJywgJ+S4reaWhyddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnRhcEluZGV4LHNlbGYuY29weSk7XG4gICAgICAgICAgICBsZXQgdHlwZSA9ICcnO1xuICAgICAgICAgICAgaWYocmVzLnRhcEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgICB0eXBlID0gJ2pwJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdmcmEnO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMykge1xuICAgICAgICAgICAgICB0eXBlID0gJ3poJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS9zd2l0Y2hzL3RyYW5zbGF0ZScsIFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnNlbGYuYXV0aGlkfSxcbiAgICAgICAgICAgICAgZGF0YTogeyBcbiAgICAgICAgICAgICAgICBkZXN0TGFuOiB0eXBlLFxuICAgICAgICAgICAgICAgIHE6IHNlbGYuY29weS5qb2luKCcgJylcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyYW5zbGF0ZScscmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogcmVzLmRhdGEuZGF0YX0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvcHkgPSBbcmVzLmRhdGEuZGF0YV07XG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvcHkoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29weSwndGhpcy5jb3B5Jyk7XG4gICAgICAgIGlmKHRoaXMuY29weS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgIGRhdGE6ICcnXG4gICAgICAgICAgfSlcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fli77pgInpnIDopoHlpI3liLbnmoTmloflrZfvvIEnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmNvcHkuam9pbignXFxuJyksXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5a2X5bey5aSN5Yi2JyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb3BlblBsYXllcihmbGFnKXtcbiAgICAgIGxldCB1cmwgPSB0aGlzLnZvaWNlVXJsO1xuICAgICAgY29uc3QgaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dCA9IGlubmVyQXVkaW9Db250ZXh0O1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IHRydWU7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0LnNyYyA9IHVybDtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQucGxheSgpO1xuXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vblBsYXkoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn5q2j5Zyo5pKt5pS+Jyk7XG4gICAgICAgIHRoaXMuaXNQbGF5ID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVuZGVkKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ+e7k+adn+aSreaUvicpO1xuICAgICAgICB0aGlzLmlzUGxheSA9IGZhbHNlO1xuICAgICAgfSlcbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRXJyb3IoKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBpbml0Q29weSgpIHtcbiAgICAgIGxldCBrZXlzID0gdGhpcy5yZXN1bHQubGlzdC5zb3J0KChhLGIpPT57XG4gICAgICAgIHJldHVybiBhLWI7XG4gICAgICB9KTtcbiAgICAgIC8vIGxldCBrZXlzID0gdGhpcy5yZXN1bHQubGlzdDtcbiAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtpXS52YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwbG9hZCh0eXBlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlLCd1cGxvYWQnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfor4bliKvkuK0nLFxuICAgICAgICBtYXNrOiB0cnVlLFxuICAgICAgfSlcbiAgICAgIGlmICh0eXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2JhbmtjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2JhY2tjYXJkJyk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLnJlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWNoeWPt++8miR7dGVtcC5iYW5rX2NhcmRfbnVtYmVyfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg57G75Z6L77yaJHt0ZW1wLmJhbmtfY2FyZF90eXBlID09PSAyID8gJ+S/oeeUqOWNoSc6J+WAn+iusOWNoSd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDpk7booYzlkI3np7DvvJoke3RlbXAuYmFua19uYW1lfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gJ2lkJykge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvaWRjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICBzaWRlOiAnZnJvbnQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnaWQgc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIC8vIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3JkcyxrZXk6aXRlbVtpdGVtW2luZGV4XV19OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWnk+WQje+8miR7dGVtcFsn5aeT5ZCNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDmgKfliKvvvJoke3RlbXBbJ+aAp+WIqyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMiwgdmFsOiBg5rCR5peP77yaJHt0ZW1wWyfmsJHml48nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDMsIHZhbDogYOWHuueUn++8miR7dGVtcFsn5Ye655SfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA0LCB2YWw6IGDkvY/lnYDvvJoke3RlbXBbJ+S9j+WdgCddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNSwgdmFsOiBg5YWs5rCR6Lqr5Lu95Y+356CB77yaJHt0ZW1wWyflhazmsJHouqvku73lj7fnoIEnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkcml2ZScpIHtcbiAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9kcml2ZWNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnZHJpdmUgc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIC8vIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3JkcyxrZXk6aXRlbVtpdGVtW2luZGV4XV19OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdDtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGVtcCwndGVtcCcpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg6K+B5Y+377yaJHt0ZW1wWyfor4Hlj7cnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOacieaViOacn+mZkO+8miR7dGVtcFsn5pyJ5pWI5pyf6ZmQJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDoh7PvvJoke3RlbXBbJ+iHsyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5YeG6am+6L2m5Z6L77yaJHt0ZW1wWyflh4bpqb7ovablnosnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDQsIHZhbDogYOWIneasoemihuivgeaXpeacn++8miR7dGVtcFsn5Yid5qyh6aKG6K+B5pel5pyfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDlp5PlkI3vvJoke3RlbXBbJ+Wnk+WQjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNiwgdmFsOiBg5oCn5Yir77yaJHt0ZW1wWyfmgKfliKsnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDcsIHZhbDogYOWbveexje+8miR7dGVtcFsn5Zu957GNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA4LCB2YWw6IGDlh7rnlJ/ml6XmnJ/vvJoke3RlbXBbJ+WHuueUn+aXpeacnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogOSwgdmFsOiBg5L2P5Z2A77yaJHt0ZW1wWyfkvY/lnYAnXS53b3Jkc31gfVxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gJ2VuaGFuY2UnKSB7XG4gICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZW5oYW5jZScsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICd0aWNrZXQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9yZWNlaXB0JyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfWVsc2Uge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZ2VuZXJhbCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5yZXN1bHQuaW1ndXJsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyk7XG4gICAgICB0aGlzLnJlc3VsdC50eXBlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3R5cGUnKTtcbiAgICAgIHRoaXMuYXV0aGlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJpbmZvJyk7XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogdGhpcy5hdXRoaWQsXG4gICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgIH0pXG4gICAgICB0aGlzLnVwbG9hZCh0aGlzLnJlc3VsdC50eXBlKTtcbiAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVzdHJveUF1ZGlvKCkge1xuICAgICAgY29uc29sZS5sb2coJ2Rlc3Ryb3kgYXVkaW8nKTtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQgJiYgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5kZXN0cm95KCk7XG4gICAgfVxuXG4gIH1cbiJdfQ==