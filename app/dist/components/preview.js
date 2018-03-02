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
      // if(!url) {

      //   innerAudioContext.autoplay = true;
      //   innerAudioContext.src = url;
      //   innerAudioContext.play();
      // } else {
      //   innerAudioContext.src = url;
      // }
      // const innerAudioContext = wx.createInnerAudioContext();
      // innerAudioContext.autoplay = true;
      // innerAudioContext.src = url;
      // innerAudioContext.paused && innerAudioContext.play();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwidm9pY2VVcmwiLCJpc1BsYXkiLCJtZXRob2RzIiwid2hpY2giLCJjaGVja2JveENoYW5nZSIsImUiLCJrZXlzIiwiZGV0YWlsIiwidmFsdWUiLCJzb3J0IiwiYSIsImIiLCJpIiwibGVuZ3RoIiwicHVzaCIsInZhbCIsImNvbnNvbGUiLCJsb2ciLCJzaGFyZSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsInZvaWNlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJzZWxmIiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsInR4dCIsImpvaW4iLCJzcGQiLCJwaXQiLCJ2b2wiLCJwZXIiLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsIiRhcHBseSIsImhpZGVUb2FzdCIsIm9wZW5QbGF5ZXIiLCJzaG93TW9kYWwiLCJjb250ZW50IiwiY29uZmlybSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiY2FuY2VsIiwidG9nZ2xlIiwidHJhbnNmZXIiLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInRhcEluZGV4IiwiaGVhZGVyIiwiZGVzdExhbiIsInEiLCJpZCIsImZhaWwiLCJlcnJNc2ciLCJzZXRDbGlwYm9hcmREYXRhIiwiZ2V0Q2xpcGJvYXJkRGF0YSIsImlubmVyQXVkaW9Db250ZXh0IiwiY3JlYXRlSW5uZXJBdWRpb0NvbnRleHQiLCJhdXRvcGxheSIsInNyYyIsInBsYXkiLCJvbkVuZGVkIiwib25FcnJvciIsInNob3dMb2FkaW5nIiwibWFzayIsInVwbG9hZEZpbGUiLCJmaWxlUGF0aCIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJ0ZW1wIiwiYmFua19jYXJkX251bWJlciIsImJhbmtfY2FyZF90eXBlIiwiYmFua19uYW1lIiwiaW5pdENvcHkiLCJoaWRlTG9hZGluZyIsImVyciIsImZvcm1EYXRhIiwic2lkZSIsIndvcmRzX3Jlc3VsdCIsIndvcmRzIiwicmVzdWx0cyIsIm1hcCIsIml0ZW0iLCJpbmRleCIsImdldFN0b3JhZ2VTeW5jIiwidXBsb2FkIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLGdCQUFRLEVBREY7QUFFTkMsY0FBTSxFQUZBO0FBR05DLGFBQUssUUFIQztBQUlOQyxnQkFBUSxLQUpGO0FBS05DLGNBQU0sRUFMQTtBQU1OQyxjQUFNO0FBTkEsT0FESDtBQVNMQyxZQUFNLEVBVEQ7QUFVTEMsY0FBUUMsS0FBS0MsTUFBTCxHQUFjQyxRQUFkLENBQXVCLEVBQXZCLEVBQTJCQyxTQUEzQixDQUFxQyxDQUFyQyxDQVZIO0FBV0xDLGdCQUFVLEVBWEw7QUFZTEMsY0FBUTtBQVpILEssUUFlUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0E7QUFDTixhQUFLaEIsTUFBTCxDQUFZRyxHQUFaLEdBQWtCLEtBQUtILE1BQUwsQ0FBWUUsSUFBOUI7QUFDRCxPQUhPO0FBSVJlLG9CQUpRLDBCQUlPQyxDQUpQLEVBSVU7QUFDaEI7QUFDQSxZQUFJQyxPQUFPRCxFQUFFRSxNQUFGLENBQVNDLEtBQVQsQ0FBZUMsSUFBZixDQUFvQixVQUFDQyxDQUFELEVBQUdDLENBQUgsRUFBTztBQUNwQyxpQkFBT0QsSUFBRUMsQ0FBVDtBQUNELFNBRlUsQ0FBWDtBQUdBLGFBQUtqQixJQUFMLEdBQVksRUFBWjtBQUNBLGFBQUksSUFBSWtCLElBQUksQ0FBWixFQUFlQSxJQUFJTixLQUFLTyxNQUF4QixFQUFnQ0QsR0FBaEMsRUFBcUM7QUFDbkMsZUFBS2xCLElBQUwsQ0FBVW9CLElBQVYsQ0FBZSxLQUFLM0Is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QUFHRDs7OztFQTVha0MsZUFBS3dFLFM7O2tCQUFyQjVHLE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgaW1ndXJsOiAnJyxcbiAgICAgICAgZGVzYzogJycsXG4gICAgICAgIG9uZTogJ+ino+aekOWbvueJh+S4re+9nicsXG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICB0eXBlOiAnJ1xuICAgICAgfSxcbiAgICAgIGNvcHk6IFtdLFxuICAgICAgYXV0aGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMiksXG4gICAgICB2b2ljZVVybDogJycsXG4gICAgICBpc1BsYXk6IHRydWVcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgd2hpY2goKSB7XG4gICAgICAgIHRoaXMucmVzdWx0Lm9uZSA9IHRoaXMucmVzdWx0LmRlc2M7XG4gICAgICB9LFxuICAgICAgY2hlY2tib3hDaGFuZ2UoZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hlY2tib3hDaGFuZ2UnKTtcbiAgICAgICAgbGV0IGtleXMgPSBlLmRldGFpbC52YWx1ZS5zb3J0KChhLGIpPT57XG4gICAgICAgICAgcmV0dXJuIGEtYjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuY29weS5wdXNoKHRoaXMucmVzdWx0Lmxpc3Rba2V5c1tpXV0udmFsKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvcHkpO1xuICAgICAgfSxcbiAgICAgIHNoYXJlKCkge1xuICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB2b2ljZSgpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+ivremfs+WQiOaIkOS4rS4uLicsXG4gICAgICAgICAgaWNvbjogJ2xvYWRpbmcnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxuICAgICAgICB9KVxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3N3aXRjaHMvdm9pY2UvY29tcG9zZScsIFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIC8vIGhlYWRlcjoge2F1dGhpZDpzZWxmLmF1dGhpZH0sXG4gICAgICAgICAgZGF0YTogeyBcbiAgICAgICAgICAgIHR4dDogc2VsZi5jb3B5LmpvaW4oJycpLFxuICAgICAgICAgICAgc3BkOiA1LCAvLyDor63pgJ9cbiAgICAgICAgICAgIHBpdDogNCwgLy8g6Z+z6LCDXG4gICAgICAgICAgICB2b2w6IDMsIC8vIOmfs+mHj1xuICAgICAgICAgICAgcGVyOiAzLCAvLyAw5Li65aWz5aOw77yMMeS4uueUt+WjsO+8jDPkuLrmg4XmhJ/lkIjmiJAt5bqm6YCN6YGl77yMNOS4uuaDheaEn+WQiOaIkC3luqbkuKvkuKtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvc2UnLHJlcy5kYXRhKTtcblxuICAgICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgbGV0IHVybCA9IHJlcy5kYXRhLmRhdGEudXJsO1xuICAgICAgICAgICAgICBzZWxmLnZvaWNlVXJsID0gYGh0dHBzOi8vd3d3LmlvY3IudmlwL2FpJHt1cmx9YDtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgLy8gd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgLy8gICB0aXRsZTogJ+mfs+mikeWQiOaIkOWujOavlScsXG4gICAgICAgICAgICAgIC8vICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAvLyAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgIHd4LmhpZGVUb2FzdCgpO1xuICAgICAgICAgICAgICBzZWxmLm9wZW5QbGF5ZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQuc3RhdHVzID0gIXRoaXMucmVzdWx0LnN0YXR1cztcbiAgICAgIH0sXG4gICAgICB0cmFuc2ZlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICAgIGl0ZW1MaXN0OiBbJ+iLseaWhycsICfml6Xor60nLCAn5rOV6K+tJywgJ+S4reaWhyddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnRhcEluZGV4LHNlbGYuY29weSk7XG4gICAgICAgICAgICBsZXQgdHlwZSA9ICcnO1xuICAgICAgICAgICAgaWYocmVzLnRhcEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgICB0eXBlID0gJ2pwJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdmcmEnO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMykge1xuICAgICAgICAgICAgICB0eXBlID0gJ3poJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS9zd2l0Y2hzL3RyYW5zbGF0ZScsIFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnNlbGYuYXV0aGlkfSxcbiAgICAgICAgICAgICAgZGF0YTogeyBcbiAgICAgICAgICAgICAgICBkZXN0TGFuOiB0eXBlLFxuICAgICAgICAgICAgICAgIHE6IHNlbGYuY29weS5qb2luKCcnKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndHJhbnNsYXRlJyxyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiByZXMuZGF0YS5kYXRhfSxcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb3B5KCkge1xuICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmNvcHkuam9pbignXFxuJyksXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5a2X5bey5aSN5Yi2JyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb3BlblBsYXllcigpe1xuICAgICAgbGV0IHVybCA9IHRoaXMudm9pY2VVcmw7XG4gICAgICBjb25zdCBpbm5lckF1ZGlvQ29udGV4dCA9IHd4LmNyZWF0ZUlubmVyQXVkaW9Db250ZXh0KCk7XG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IHRydWU7XG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5zcmMgPSB1cmw7XG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5wbGF5KCk7XG4gICAgICAvLyBpZighdXJsKSB7XG4gICAgICAgIFxuICAgICAgLy8gICBpbm5lckF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IHRydWU7XG4gICAgICAvLyAgIGlubmVyQXVkaW9Db250ZXh0LnNyYyA9IHVybDtcbiAgICAgIC8vICAgaW5uZXJBdWRpb0NvbnRleHQucGxheSgpO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgaW5uZXJBdWRpb0NvbnRleHQuc3JjID0gdXJsO1xuICAgICAgLy8gfVxuICAgICAgLy8gY29uc3QgaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpO1xuICAgICAgLy8gaW5uZXJBdWRpb0NvbnRleHQuYXV0b3BsYXkgPSB0cnVlO1xuICAgICAgLy8gaW5uZXJBdWRpb0NvbnRleHQuc3JjID0gdXJsO1xuICAgICAgLy8gaW5uZXJBdWRpb0NvbnRleHQucGF1c2VkICYmIGlubmVyQXVkaW9Db250ZXh0LnBsYXkoKTtcblxuICAgICAgaW5uZXJBdWRpb0NvbnRleHQub25FbmRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfnu5PmnZ/mkq3mlL4nKTtcbiAgICAgICAgLy8gdGhpcy5pc1BsYXkgPSBmYWxzZTtcbiAgICAgIH0pXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVycm9yKChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaW5pdENvcHkoKSB7XG4gICAgICBsZXQga2V5cyA9IHRoaXMucmVzdWx0Lmxpc3Quc29ydCgoYSxiKT0+e1xuICAgICAgICByZXR1cm4gYS1iO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmNvcHkgPSBbXTtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuY29weS5wdXNoKHRoaXMucmVzdWx0Lmxpc3RbaV0udmFsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGxvYWQodHlwZSkge1xuICAgICAgY29uc29sZS5sb2codHlwZSwndXBsb2FkJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn6K+G5Yir5LitJyxcbiAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgfSlcbiAgICAgIGlmICh0eXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2JhbmtjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2JhY2tjYXJkJyk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLnJlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWNoeWPt++8miR7dGVtcC5iYW5rX2NhcmRfbnVtYmVyfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg57G75Z6L77yaJHt0ZW1wLmJhbmtfY2FyZF90eXBlID09PSAyID8gJ+S/oeeUqOWNoSc6J+WAn+iusOWNoSd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDpk7booYzlkI3np7DvvJoke3RlbXAuYmFua19uYW1lfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gJ2lkJykge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvaWRjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICBzaWRlOiAnZnJvbnQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnaWQgc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIC8vIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3JkcyxrZXk6aXRlbVtpdGVtW2luZGV4XV19OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWnk+WQje+8miR7dGVtcFsn5aeT5ZCNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDmgKfliKvvvJoke3RlbXBbJ+aAp+WIqyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMiwgdmFsOiBg5rCR5peP77yaJHt0ZW1wWyfmsJHml48nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDMsIHZhbDogYOWHuueUn++8miR7dGVtcFsn5Ye655SfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA0LCB2YWw6IGDkvY/lnYDvvJoke3RlbXBbJ+S9j+WdgCddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNSwgdmFsOiBg5YWs5rCR6Lqr5Lu95Y+356CB77yaJHt0ZW1wWyflhazmsJHouqvku73lj7fnoIEnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkcml2ZScpIHtcbiAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9kcml2ZWNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnZHJpdmUgc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIC8vIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3JkcyxrZXk6aXRlbVtpdGVtW2luZGV4XV19OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOivgeWPt++8miR7dGVtcFsn6K+B5Y+3J10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDmnInmlYjmnJ/pmZDvvJoke3RlbXBbJ+acieaViOacn+mZkCddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMiwgdmFsOiBg5YeG6am+6L2m5Z6L77yaJHt0ZW1wWyflh4bpqb7ovablnosnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDMsIHZhbDogYOWIneasoemihuivgeaXpeacn++8miR7dGVtcFsn5Yid5qyh6aKG6K+B5pel5pyfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA0LCB2YWw6IGDlp5PlkI3vvJoke3RlbXBbJ+Wnk+WQjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNSwgdmFsOiBg5oCn5Yir77yaJHt0ZW1wWyfmgKfliKsnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDYsIHZhbDogYOWbveexje+8miR7dGVtcFsn5Zu957GNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA3LCB2YWw6IGDlh7rnlJ/ml6XmnJ/vvJoke3RlbXBbJ+WHuueUn+aXpeacnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogOCwgdmFsOiBg5L2P5Z2A77yaJHt0ZW1wWyfkvY/lnYAnXS53b3Jkc31gfVxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZih0eXBlID09PSAnZW5oYW5jZScpIHtcbiAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9lbmhhbmNlJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZ2VuZXJhbCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnJlc3VsdC5pbWd1cmwgPSB3eC5nZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnKTtcbiAgICAgIHRoaXMucmVzdWx0LnR5cGUgPSB3eC5nZXRTdG9yYWdlU3luYygndHlwZScpO1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5yZXN1bHQudHlwZSwncGFyYW1zJyk7XG4gICAgICB0aGlzLnVwbG9hZCh0aGlzLnJlc3VsdC50eXBlKTtcbiAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=