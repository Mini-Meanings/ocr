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
      voiceUrl: '',
      isPlay: true
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
    key: 'openPlayer',
    value: function openPlayer() {
      var url = this.voiceUrl;
      var innerAudioContext = wx.createInnerAudioContext();
      innerAudioContext.autoplay = true;
      innerAudioContext.src = url;
      innerAudioContext.play();

      innerAudioContext.onEnded(function () {
        console.log('结束播放');
        // this.isPlay = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwidm9pY2VVcmwiLCJpc1BsYXkiLCJtZXRob2RzIiwid2hpY2giLCJjaGVja2JveENoYW5nZSIsImUiLCJrZXlzIiwiZGV0YWlsIiwidmFsdWUiLCJzb3J0IiwiYSIsImIiLCJpIiwibGVuZ3RoIiwicHVzaCIsInZhbCIsImNvbnNvbGUiLCJsb2ciLCJzaGFyZSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsInZvaWNlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJzZWxmIiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsInR4dCIsImpvaW4iLCJzcGQiLCJwaXQiLCJ2b2wiLCJwZXIiLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsIiRhcHBseSIsImhpZGVUb2FzdCIsIm9wZW5QbGF5ZXIiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiY2FuY2VsIiwidG9nZ2xlIiwidHJhbnNmZXIiLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInRhcEluZGV4IiwiaGVhZGVyIiwiZGVzdExhbiIsInEiLCJpZCIsImZhaWwiLCJlcnJNc2ciLCJzZXRDbGlwYm9hcmREYXRhIiwiZ2V0Q2xpcGJvYXJkRGF0YSIsImlubmVyQXVkaW9Db250ZXh0IiwiY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQiLCJhdXRvcGxheSIsInNyYyIsInBsYXkiLCJvbkVuZGVkIiwib25FcnJvciIsInNob3dMb2FkaW5nIiwibWFzayIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJ0ZW1wIiwiYmFua19jYXJkX251bWJlciIsImJhbmtfY2FyZF90eXBlIiwiYmFua19uYW1lIiwiaW5pdENvcHkiLCJoaWRlTG9hZGluZyIsImVyciIsImZvcm1EYXRhIiwic2lkZSIsIndvcmRzX3Jlc3VsdCIsIndvcmRzIiwicmVzdWx0cyIsIm1hcCIsIml0ZW0iLCJpbmRleCIsImdldFN0b3JhZ2VTeW5jIiwidXBsb2FkIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLGdCQUFRLEVBREY7QUFFTkMsY0FBTSxFQUZBO0FBR05DLGFBQUssUUFIQztBQUlOQyxnQkFBUSxLQUpGO0FBS05DLGNBQU0sRUFMQTtBQU1OQyxjQUFNO0FBTkEsT0FESDtBQVNMQyxZQUFNLEVBVEQ7QUFVTEMsY0FBUUMsS0FBS0MsTUFBTCxHQUFjQyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCQyxTQUEzQixDQUFxQyxDQUFyQyxDQVZIO0FBV0xDLGdCQUFVLEVBWEw7QUFZTEMsY0FBUTtBQVpILEssUUFlUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0E7QUFDTixhQUFLaEIsTUFBTCxDQUFZRyxHQUFaLEdBQWtCLEtBQUtILE1BQUwsQ0FBWUUsSUFBOUI7QUFDRCxPQUhPO0FBSVJlLG9CQUpRLDBCQUlPQyxDQUpQLEVBSVU7QUFDaEI7QUFDQSxZQUFJQyxPQUFPRCxFQUFFRSxNQUFGLENBQVNDLEtBQVQsQ0FBZUMsSUFBZixDQUFvQixVQUFDQyxDQUFELEVBQUdDLENBQUgsRUFBTztBQUNwQyxpQkFBT0QsSUFBRUMsQ0FBVDtBQUNELFNBRlUsQ0FBWDtBQUdBLGFBQUtqQixJQUFMLEdBQVksRUFBWjtBQUNBLGFBQUksSUFBSWtCLElBQUksQ0FBWixFQUFlQSxJQUFJTixLQUFLTyxNQUF4QixFQUFnQ0QsR0FBaEMsRUFBcUM7QUFDbkMsZUFBS2xCLElBQUwsQ0FBVW9CLElBQVYsQ0FBZSxLQUFLM0Is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LCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlldyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGltZ3VybDogJycsXG4gICAgICAgIGRlc2M6ICcnLFxuICAgICAgICBvbmU6ICfop6PmnpDlm77niYfkuK3vvZ4nLFxuICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICBsaXN0OiBbXSxcbiAgICAgICAgdHlwZTogJydcbiAgICAgIH0sXG4gICAgICBjb3B5OiBbXSxcbiAgICAgIGF1dGhpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDIpLFxuICAgICAgdm9pY2VVcmw6ICcnLFxuICAgICAgaXNQbGF5OiB0cnVlXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHdoaWNoKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5vbmUgPSB0aGlzLnJlc3VsdC5kZXNjO1xuICAgICAgfSxcbiAgICAgIGNoZWNrYm94Q2hhbmdlKGUpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NoZWNrYm94Q2hhbmdlJyk7XG4gICAgICAgIGxldCBrZXlzID0gZS5kZXRhaWwudmFsdWUuc29ydCgoYSxiKT0+e1xuICAgICAgICAgIHJldHVybiBhLWI7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvcHkgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmNvcHkucHVzaCh0aGlzLnJlc3VsdC5saXN0W2tleXNbaV1dLnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb3B5KTtcbiAgICAgIH0sXG4gICAgICBzaGFyZSgpIHtcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdm9pY2UoKSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfor63pn7PlkIjmiJDkuK0uLi4nLFxuICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS9zd2l0Y2hzL3ZvaWNlL2NvbXBvc2UnLCBcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAvLyBoZWFkZXI6IHthdXRoaWQ6c2VsZi5hdXRoaWR9LFxuICAgICAgICAgIGRhdGE6IHsgXG4gICAgICAgICAgICB0eHQ6IHNlbGYuY29weS5qb2luKCcnKSxcbiAgICAgICAgICAgIHNwZDogNSwgLy8g6K+t6YCfXG4gICAgICAgICAgICBwaXQ6IDQsIC8vIOmfs+iwg1xuICAgICAgICAgICAgdm9sOiAzLCAvLyDpn7Pph49cbiAgICAgICAgICAgIHBlcjogMywgLy8gMOS4uuWls+WjsO+8jDHkuLrnlLflo7DvvIwz5Li65oOF5oSf5ZCI5oiQLeW6pumAjemBpe+8jDTkuLrmg4XmhJ/lkIjmiJAt5bqm5Lir5LirXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb21wb3NlJyxyZXMuZGF0YSk7XG5cbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT09IDIwMCl7XG4gICAgICAgICAgICAgIGxldCB1cmwgPSByZXMuZGF0YS5kYXRhLnVybDtcbiAgICAgICAgICAgICAgc2VsZi52b2ljZVVybCA9IGBodHRwczovL3d3dy5pb2NyLnZpcC9haSR7dXJsfWA7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIC8vIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIC8vICAgdGl0bGU6ICfpn7PpopHlkIjmiJDlrozmr5UnLFxuICAgICAgICAgICAgICAvLyAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgLy8gICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICB3eC5oaWRlVG9hc3QoKTtcbiAgICAgICAgICAgICAgc2VsZi5vcGVuUGxheWVyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiByZXMuZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0LnN0YXR1cyA9ICF0aGlzLnJlc3VsdC5zdGF0dXM7XG4gICAgICB9LFxuICAgICAgdHJhbnNmZXIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICBpdGVtTGlzdDogWyfoi7HmlocnLCAn5pel6K+tJywgJ+azleivrScsICfkuK3mlocnXSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleCxzZWxmLmNvcHkpO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSAnJztcbiAgICAgICAgICAgIGlmKHJlcy50YXBJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICB0eXBlID0gJ2VuJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdqcCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYocmVzLnRhcEluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnZnJhJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDMpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICd6aCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvc3dpdGNocy90cmFuc2xhdGUnLCBcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDpzZWxmLmF1dGhpZH0sXG4gICAgICAgICAgICAgIGRhdGE6IHsgXG4gICAgICAgICAgICAgICAgZGVzdExhbjogdHlwZSxcbiAgICAgICAgICAgICAgICBxOiBzZWxmLmNvcHkuam9pbignJylcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyYW5zbGF0ZScscmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogcmVzLmRhdGEuZGF0YX0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29weSgpIHtcbiAgICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgZGF0YTogdGhpcy5jb3B5LmpvaW4oJ1xcbicpLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgd3guZ2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aWh+Wtl+W3suWkjeWIticsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5QbGF5ZXIoKXtcbiAgICAgIGxldCB1cmwgPSB0aGlzLnZvaWNlVXJsO1xuICAgICAgY29uc3QgaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpO1xuICAgICAgaW5uZXJBdWRpb0NvbnRleHQuYXV0b3BsYXkgPSB0cnVlO1xuICAgICAgaW5uZXJBdWRpb0NvbnRleHQuc3JjID0gdXJsO1xuICAgICAgaW5uZXJBdWRpb0NvbnRleHQucGxheSgpO1xuICAgICAgXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVuZGVkKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ+e7k+adn+aSreaUvicpO1xuICAgICAgICAvLyB0aGlzLmlzUGxheSA9IGZhbHNlO1xuICAgICAgfSlcbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRXJyb3IoKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBpbml0Q29weSgpIHtcbiAgICAgIGxldCBrZXlzID0gdGhpcy5yZXN1bHQubGlzdC5zb3J0KChhLGIpPT57XG4gICAgICAgIHJldHVybiBhLWI7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtpXS52YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwbG9hZCh0eXBlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlLCd1cGxvYWQnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfor4bliKvkuK0nLFxuICAgICAgICBtYXNrOiB0cnVlXG4gICAgICB9KVxuICAgICAgaWYgKHR5cGUgPT09ICdjYXJkJykge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvYmFua2NhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnYmFja2NhcmQnKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEucmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5Y2h5Y+377yaJHt0ZW1wLmJhbmtfY2FyZF9udW1iZXJ9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDnsbvlnovvvJoke3RlbXAuYmFua19jYXJkX3R5cGUgPT09IDIgPyAn5L+h55So5Y2hJzon5YCf6K6w5Y2hJ31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOmTtuihjOWQjeensO+8miR7dGVtcC5iYW5rX25hbWV9YH1cbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZih0eXBlID09PSAnaWQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9pZGNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgIHNpZGU6ICdmcm9udCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdpZCBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOaAp+WIq++8miR7dGVtcFsn5oCn5YirJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDmsJHml4/vvJoke3RlbXBbJ+awkeaXjyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5Ye655Sf77yaJHt0ZW1wWyflh7rnlJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDQsIHZhbDogYOS9j+WdgO+8miR7dGVtcFsn5L2P5Z2AJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDlhazmsJHouqvku73lj7fnoIHvvJoke3RlbXBbJ+WFrOawkei6q+S7veWPt+eggSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RyaXZlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2RyaXZlY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdkcml2ZSBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg6K+B5Y+377yaJHt0ZW1wWyfor4Hlj7cnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOacieaViOacn+mZkO+8miR7dGVtcFsn5pyJ5pWI5pyf6ZmQJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDlh4bpqb7ovablnovvvJoke3RlbXBbJ+WHhumpvui9puWeiyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5Yid5qyh6aKG6K+B5pel5pyf77yaJHt0ZW1wWyfliJ3mrKHpoobor4Hml6XmnJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDQsIHZhbDogYOWnk+WQje+8miR7dGVtcFsn5aeT5ZCNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDmgKfliKvvvJoke3RlbXBbJ+aAp+WIqyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNiwgdmFsOiBg5Zu957GN77yaJHt0ZW1wWyflm73nsY0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDcsIHZhbDogYOWHuueUn+aXpeacn++8miR7dGVtcFsn5Ye655Sf5pel5pyfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA4LCB2YWw6IGDkvY/lnYDvvJoke3RlbXBbJ+S9j+WdgCddLndvcmRzfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdlbmhhbmNlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2VuaGFuY2UnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9nZW5lcmFsJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMucmVzdWx0LmltZ3VybCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcpO1xuICAgICAgdGhpcy5yZXN1bHQudHlwZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0eXBlJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlc3VsdC50eXBlLCdwYXJhbXMnKTtcbiAgICAgIHRoaXMudXBsb2FkKHRoaXMucmVzdWx0LnR5cGUpO1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==