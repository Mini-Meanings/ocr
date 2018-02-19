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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwidm9pY2VVcmwiLCJpc1BsYXkiLCJpbm5lckF1ZGlvQ29udGV4dCIsIm1ldGhvZHMiLCJ3aGljaCIsImNoZWNrYm94Q2hhbmdlIiwiZSIsImtleXMiLCJkZXRhaWwiLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsImkiLCJsZW5ndGgiLCJwdXNoIiwidmFsIiwiY29uc29sZSIsImxvZyIsInNoYXJlIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwidm9pY2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInNlbGYiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwidHh0Iiwiam9pbiIsInNwZCIsInBpdCIsInZvbCIsInBlciIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwiJGFwcGx5IiwiaGlkZVRvYXN0Iiwib3BlblBsYXllciIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjb25maXJtIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYW5jZWwiLCJ0b2dnbGUiLCJ0cmFuc2ZlciIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0IiwidGFwSW5kZXgiLCJoZWFkZXIiLCJkZXN0TGFuIiwicSIsImlkIiwiZmFpbCIsImVyck1zZyIsInNldENsaXBib2FyZERhdGEiLCJnZXRDbGlwYm9hcmREYXRhIiwiZmxhZyIsImNyZWF0ZUlubmVyQXVkaW9Db250ZXh0IiwiYXV0b3BsYXkiLCJzcmMiLCJwbGF5Iiwib25QbGF5Iiwib25FbmRlZCIsIm9uRXJyb3IiLCJzaG93TG9hZGluZyIsIm1hc2siLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwic2hvd0NhbmNlbCIsInRlbXAiLCJiYW5rX2NhcmRfbnVtYmVyIiwiYmFua19jYXJkX3R5cGUiLCJiYW5rX25hbWUiLCJpbml0Q29weSIsImhpZGVMb2FkaW5nIiwiZXJyIiwiZm9ybURhdGEiLCJzaWRlIiwid29yZHNfcmVzdWx0Iiwid29yZHMiLCJyZXN1bHRzIiwibWFwIiwiaXRlbSIsImluZGV4IiwiZ2V0U3RvcmFnZVN5bmMiLCJ1cGxvYWQiLCJkZXN0cm95IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLGdCQUFRLEVBREY7QUFFTkMsY0FBTSxFQUZBO0FBR05DLGFBQUssUUFIQztBQUlOQyxnQkFBUSxLQUpGO0FBS05DLGNBQU0sRUFMQTtBQU1OQyxjQUFNO0FBTkEsT0FESDtBQVNMQyxZQUFNLEVBVEQ7QUFVTDtBQUNBQyxjQUFRLEVBWEg7QUFZTEMsZ0JBQVUsRUFaTDtBQWFMQyxjQUFRLEtBYkg7QUFjTEMseUJBQW1CO0FBZGQsSyxRQWlCUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0E7QUFDTixhQUFLYixNQUFMLENBQVlHLEdBQVosR0FBa0IsS0FBS0gsTUFBTCxDQUFZRSxJQUE5QjtBQUNELE9BSE87QUFJUlksb0JBSlEsMEJBSU9DLENBSlAsRUFJVTtBQUNoQjtBQUNBLFlBQUlDLE9BQU9ELEVBQUVFLE1BQUYsQ0FBU0MsS0FBVCxDQUFlQyxJQUFmLENBQW9CLFVBQUNDLENBQUQsRUFBR0MsQ0FBSCxFQUFPO0FBQ3BDLGlCQUFPRCxJQUFFQyxDQUFUO0FBQ0QsU0FGVSxDQUFYO0FBR0E7QUFDQSxhQUFLZCxJQUFMLEdBQVksRUFBWjtBQUNBLGFBQUksSUFBSWUsSUFBSSxDQUFaLEVBQWVBLElBQUlOLEtBQUtPLE1BQXhCLEVBQWdDRCxHQUFoQyxFQUFxQztBQUNuQyxlQUFLZixJQUFMLENBQVVpQixJQUFWLENBQWUsS0FBS3hCLE1BQUwsQ0FBWUssSUFBWixDQUFpQlcsS0FBS00sQ0FBTCxD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LFM7O2tCQUFyQjVHLE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgaW1ndXJsOiAnJyxcbiAgICAgICAgZGVzYzogJycsXG4gICAgICAgIG9uZTogJ+ino+aekOWbvueJh+S4re+9nicsXG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICB0eXBlOiAnJ1xuICAgICAgfSxcbiAgICAgIGNvcHk6IFtdLFxuICAgICAgLy8gYXV0aGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMiksXG4gICAgICBhdXRoaWQ6ICcnLFxuICAgICAgdm9pY2VVcmw6ICcnLFxuICAgICAgaXNQbGF5OiBmYWxzZSxcbiAgICAgIGlubmVyQXVkaW9Db250ZXh0OiBudWxsXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHdoaWNoKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5vbmUgPSB0aGlzLnJlc3VsdC5kZXNjO1xuICAgICAgfSxcbiAgICAgIGNoZWNrYm94Q2hhbmdlKGUpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NoZWNrYm94Q2hhbmdlJyk7XG4gICAgICAgIGxldCBrZXlzID0gZS5kZXRhaWwudmFsdWUuc29ydCgoYSxiKT0+e1xuICAgICAgICAgIHJldHVybiBhLWI7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBsZXQga2V5cyA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgICB0aGlzLmNvcHkgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmNvcHkucHVzaCh0aGlzLnJlc3VsdC5saXN0W2tleXNbaV1dLnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb3B5KTtcbiAgICAgIH0sXG4gICAgICBzaGFyZSgpIHtcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdm9pY2UoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXNQbGF5LCd0aGlzLmlzUGxheScpO1xuICAgICAgICBpZih0aGlzLmlzUGxheSkgcmV0dXJuO1xuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6K+t6Z+z5ZCI5oiQ5LitLi4uJyxcbiAgICAgICAgICBpY29uOiAnbG9hZGluZycsXG4gICAgICAgICAgZHVyYXRpb246IDEwMDAwXG4gICAgICAgIH0pXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvc3dpdGNocy92b2ljZS9jb21wb3NlJywgXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgLy8gaGVhZGVyOiB7YXV0aGlkOnNlbGYuYXV0aGlkfSxcbiAgICAgICAgICBkYXRhOiB7IFxuICAgICAgICAgICAgdHh0OiBzZWxmLmNvcHkuam9pbignJyksXG4gICAgICAgICAgICBzcGQ6IDUsIC8vIOivremAn1xuICAgICAgICAgICAgcGl0OiA0LCAvLyDpn7PosINcbiAgICAgICAgICAgIHZvbDogMywgLy8g6Z+z6YePXG4gICAgICAgICAgICBwZXI6IDMsIC8vIDDkuLrlpbPlo7DvvIwx5Li655S35aOw77yMM+S4uuaDheaEn+WQiOaIkC3luqbpgI3pgaXvvIw05Li65oOF5oSf5ZCI5oiQLeW6puS4q+S4q1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29tcG9zZScscmVzLmRhdGEpO1xuXG4gICAgICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09PSAyMDApe1xuICAgICAgICAgICAgICBsZXQgdXJsID0gcmVzLmRhdGEuZGF0YS51cmw7XG4gICAgICAgICAgICAgIHNlbGYudm9pY2VVcmwgPSBgaHR0cHM6Ly93d3cuaW9jci52aXAvYWkke3VybH1gO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICAvLyB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAvLyAgIHRpdGxlOiAn6Z+z6aKR5ZCI5oiQ5a6M5q+VJyxcbiAgICAgICAgICAgICAgLy8gICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgIC8vICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgd3guaGlkZVRvYXN0KCk7XG4gICAgICAgICAgICAgIHNlbGYub3BlblBsYXllcigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogcmVzLmRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgPSAhdGhpcy5yZXN1bHQuc3RhdHVzO1xuICAgICAgfSxcbiAgICAgIHRyYW5zZmVyKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgICAgaXRlbUxpc3Q6IFsn6Iux5paHJywgJ+aXpeivrScsICfms5Xor60nLCAn5Lit5paHJ10sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMudGFwSW5kZXgsc2VsZi5jb3B5KTtcbiAgICAgICAgICAgIGxldCB0eXBlID0gJyc7XG4gICAgICAgICAgICBpZihyZXMudGFwSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdlbic7XG4gICAgICAgICAgICB9IGVsc2UgaWYocmVzLnRhcEluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnanAnO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMikge1xuICAgICAgICAgICAgICB0eXBlID0gJ2ZyYSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYocmVzLnRhcEluZGV4ID09PSAzKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnemgnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3N3aXRjaHMvdHJhbnNsYXRlJywgXG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6c2VsZi5hdXRoaWR9LFxuICAgICAgICAgICAgICBkYXRhOiB7IFxuICAgICAgICAgICAgICAgIGRlc3RMYW46IHR5cGUsXG4gICAgICAgICAgICAgICAgcTogc2VsZi5jb3B5LmpvaW4oJyAnKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndHJhbnNsYXRlJyxyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiByZXMuZGF0YS5kYXRhfSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIHNlbGYuY29weSA9IFtyZXMuZGF0YS5kYXRhXTtcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29weSgpIHtcbiAgICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgZGF0YTogdGhpcy5jb3B5LmpvaW4oJ1xcbicpLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgd3guZ2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aWh+Wtl+W3suWkjeWIticsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5QbGF5ZXIoZmxhZyl7XG4gICAgICBsZXQgdXJsID0gdGhpcy52b2ljZVVybDtcbiAgICAgIGNvbnN0IGlubmVyQXVkaW9Db250ZXh0ID0gd3guY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQoKTtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQgPSBpbm5lckF1ZGlvQ29udGV4dDtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQuYXV0b3BsYXkgPSB0cnVlO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5zcmMgPSB1cmw7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0LnBsYXkoKTtcblxuICAgICAgaW5uZXJBdWRpb0NvbnRleHQub25QbGF5KCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ+ato+WcqOaSreaUvicpO1xuICAgICAgICB0aGlzLmlzUGxheSA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaW5uZXJBdWRpb0NvbnRleHQub25FbmRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfnu5PmnZ/mkq3mlL4nKTtcbiAgICAgICAgdGhpcy5pc1BsYXkgPSBmYWxzZTtcbiAgICAgIH0pXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVycm9yKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaW5pdENvcHkoKSB7XG4gICAgICBsZXQga2V5cyA9IHRoaXMucmVzdWx0Lmxpc3Quc29ydCgoYSxiKT0+e1xuICAgICAgICByZXR1cm4gYS1iO1xuICAgICAgfSk7XG4gICAgICAvLyBsZXQga2V5cyA9IHRoaXMucmVzdWx0Lmxpc3Q7XG4gICAgICB0aGlzLmNvcHkgPSBbXTtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuY29weS5wdXNoKHRoaXMucmVzdWx0Lmxpc3RbaV0udmFsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGxvYWQodHlwZSkge1xuICAgICAgY29uc29sZS5sb2codHlwZSwndXBsb2FkJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn6K+G5Yir5LitJyxcbiAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgfSlcbiAgICAgIGlmICh0eXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2JhbmtjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2JhY2tjYXJkJyk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLnJlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWNoeWPt++8miR7dGVtcC5iYW5rX2NhcmRfbnVtYmVyfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg57G75Z6L77yaJHt0ZW1wLmJhbmtfY2FyZF90eXBlID09PSAyID8gJ+S/oeeUqOWNoSc6J+WAn+iusOWNoSd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDpk7booYzlkI3np7DvvJoke3RlbXAuYmFua19uYW1lfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gJ2lkJykge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvaWRjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICBzaWRlOiAnZnJvbnQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnaWQgc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIC8vIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3JkcyxrZXk6aXRlbVtpdGVtW2luZGV4XV19OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWnk+WQje+8miR7dGVtcFsn5aeT5ZCNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDmgKfliKvvvJoke3RlbXBbJ+aAp+WIqyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMiwgdmFsOiBg5rCR5peP77yaJHt0ZW1wWyfmsJHml48nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDMsIHZhbDogYOWHuueUn++8miR7dGVtcFsn5Ye655SfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA0LCB2YWw6IGDkvY/lnYDvvJoke3RlbXBbJ+S9j+WdgCddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNSwgdmFsOiBg5YWs5rCR6Lqr5Lu95Y+356CB77yaJHt0ZW1wWyflhazmsJHouqvku73lj7fnoIEnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkcml2ZScpIHtcbiAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9kcml2ZWNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnZHJpdmUgc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIC8vIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3JkcyxrZXk6aXRlbVtpdGVtW2luZGV4XV19OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdDtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGVtcCwndGVtcCcpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg6K+B5Y+377yaJHt0ZW1wWyfor4Hlj7cnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOacieaViOacn+mZkO+8miR7dGVtcFsn5pyJ5pWI5pyf6ZmQJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDoh7PvvJoke3RlbXBbJ+iHsyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5YeG6am+6L2m5Z6L77yaJHt0ZW1wWyflh4bpqb7ovablnosnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDQsIHZhbDogYOWIneasoemihuivgeaXpeacn++8miR7dGVtcFsn5Yid5qyh6aKG6K+B5pel5pyfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDlp5PlkI3vvJoke3RlbXBbJ+Wnk+WQjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNiwgdmFsOiBg5oCn5Yir77yaJHt0ZW1wWyfmgKfliKsnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDcsIHZhbDogYOWbveexje+8miR7dGVtcFsn5Zu957GNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA4LCB2YWw6IGDlh7rnlJ/ml6XmnJ/vvJoke3RlbXBbJ+WHuueUn+aXpeacnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogOSwgdmFsOiBg5L2P5Z2A77yaJHt0ZW1wWyfkvY/lnYAnXS53b3Jkc31gfVxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZih0eXBlID09PSAnZW5oYW5jZScpIHtcbiAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9lbmhhbmNlJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gJ3RpY2tldCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL3JlY2VpcHQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2dlbmVyYWwnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5yZXN1bHQuaW1ndXJsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyk7XG4gICAgICB0aGlzLnJlc3VsdC50eXBlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3R5cGUnKTtcbiAgICAgIHRoaXMuYXV0aGlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJpbmZvJyk7XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogdGhpcy5hdXRoaWQsXG4gICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgIH0pXG4gICAgICB0aGlzLnVwbG9hZCh0aGlzLnJlc3VsdC50eXBlKTtcbiAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVzdHJveUF1ZGlvKCkge1xuICAgICAgY29uc29sZS5sb2coJ2Rlc3Ryb3kgYXVkaW8nKTtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQgJiYgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5kZXN0cm95KCk7XG4gICAgfVxuXG4gIH1cbiJdfQ==