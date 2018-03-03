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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwidm9pY2VVcmwiLCJpc1BsYXkiLCJpbm5lckF1ZGlvQ29udGV4dCIsIm1ldGhvZHMiLCJ3aGljaCIsImNoZWNrYm94Q2hhbmdlIiwiZSIsImtleXMiLCJkZXRhaWwiLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsImkiLCJsZW5ndGgiLCJwdXNoIiwidmFsIiwiY29uc29sZSIsImxvZyIsInNoYXJlIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwidm9pY2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInNlbGYiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwidHh0Iiwiam9pbiIsInNwZCIsInBpdCIsInZvbCIsInBlciIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwiJGFwcGx5IiwiaGlkZVRvYXN0Iiwib3BlblBsYXllciIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjb25maXJtIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYW5jZWwiLCJ0b2dnbGUiLCJ0cmFuc2ZlciIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0IiwidGFwSW5kZXgiLCJoZWFkZXIiLCJkZXN0TGFuIiwicSIsImlkIiwiZmFpbCIsImVyck1zZyIsInNldENsaXBib2FyZERhdGEiLCJnZXRDbGlwYm9hcmREYXRhIiwiZmxhZyIsImNyZWF0ZUlubmVyQXVkaW9Db250ZXh0IiwiYXV0b3BsYXkiLCJzcmMiLCJwbGF5Iiwib25QbGF5Iiwib25FbmRlZCIsIm9uRXJyb3IiLCJzaG93TG9hZGluZyIsIm1hc2siLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwidGVtcCIsImJhbmtfY2FyZF9udW1iZXIiLCJiYW5rX2NhcmRfdHlwZSIsImJhbmtfbmFtZSIsImluaXRDb3B5IiwiaGlkZUxvYWRpbmciLCJlcnIiLCJmb3JtRGF0YSIsInNpZGUiLCJ3b3Jkc19yZXN1bHQiLCJ3b3JkcyIsInJlc3VsdHMiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJnZXRTdG9yYWdlU3luYyIsInVwbG9hZCIsImRlc3Ryb3kiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNLEVBRkE7QUFHTkMsYUFBSyxRQUhDO0FBSU5DLGdCQUFRLEtBSkY7QUFLTkMsY0FBTSxFQUxBO0FBTU5DLGNBQU07QUFOQSxPQURIO0FBU0xDLFlBQU0sRUFURDtBQVVMQyxjQUFRQyxLQUFLQyxNQUFMLEdBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLFNBQTNCLENBQXFDLENBQXJDLENBVkg7QUFXTEMsZ0JBQVUsRUFYTDtBQVlMQyxjQUFRLEtBWkg7QUFhTEMseUJBQW1CO0FBYmQsSyxRQWdCUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0E7QUFDTixhQUFLakIsTUFBTCxDQUFZRyxHQUFaLEdBQWtCLEtBQUtILE1BQUwsQ0FBWUUsSUFBOUI7QUFDRCxPQUhPO0FBSVJnQixvQkFKUSwwQkFJT0MsQ0FKUCxFQUlVO0FBQ2hCO0FBQ0EsWUFBSUMsT0FBT0QsRUFBRUUsTUFBRixDQUFTQyxLQUFULENBQWVDLElBQWYsQ0FBb0IsVUFBQ0MsQ0FBRCxFQUFHQyxDQUFILEVBQU87QUFDcEMsaUJBQU9ELElBQUVDLENBQVQ7QUFDRCxTQUZVLENBQVg7QUFHQTtBQUNBLGFBQUtsQixJQUFMLEdBQVksRUFBWjtBQUNBLGFBQUksSUFBSW1CLElBQUksQ0FBWixFQUFlQSxJQUFJTixLQUFLTyxNQUF4QixFQUFnQ0QsR0FB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WixHQUFtQmlHLE9BQW5CO0FBQ0E3RCxtQkFBS3pDLE1BQUwsQ0FBWUksTUFBWixHQUFxQixJQUFyQjtBQUNBcUMsbUJBQUtzRCxRQUFMO0FBQ0F0RCxtQkFBS2EsTUFBTDtBQUNEO0FBQ0RyQixlQUFHK0QsV0FBSDtBQUNELFdBaENXO0FBaUNaeEIsZ0JBQU0sY0FBU3lCLEdBQVQsRUFBYztBQUNsQjtBQUNBaEUsZUFBRytELFdBQUg7QUFDRDtBQXBDVyxTQUFkO0FBc0NEO0FBQ0Y7Ozs2QkFFUztBQUNSLFdBQUtoRyxNQUFMLENBQVlDLE1BQVosR0FBcUJnQyxHQUFHeUUsY0FBSCxDQUFrQixVQUFsQixDQUFyQjtBQUNBLFdBQUsxRyxNQUFMLENBQVlNLElBQVosR0FBbUIyQixHQUFHeUUsY0FBSCxDQUFrQixNQUFsQixDQUFuQjtBQUNBO0FBQ0EsV0FBS0MsTUFBTCxDQUFZLEtBQUszRyxNQUFMLENBQVlNLElBQXhCO0FBQ0EyQixTQUFHQyxhQUFILENBQWlCO0FBQ2ZDLHlCQUFpQjtBQURGLE9BQWpCO0FBR0Q7OzttQ0FFYztBQUNiTCxjQUFRQyxHQUFSLENBQVksZUFBWjtBQUNBLFdBQUtoQixpQkFBTCxJQUEwQixLQUFLQSxpQkFBTCxDQUF1QjZGLE9BQXZCLEVBQTFCO0FBQ0Q7Ozs7RUFuYmtDLGVBQUtDLFM7O2tCQUFyQi9HLE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgaW1ndXJsOiAnJyxcbiAgICAgICAgZGVzYzogJycsXG4gICAgICAgIG9uZTogJ+ino+aekOWbvueJh+S4re+9nicsXG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICB0eXBlOiAnJ1xuICAgICAgfSxcbiAgICAgIGNvcHk6IFtdLFxuICAgICAgYXV0aGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMiksXG4gICAgICB2b2ljZVVybDogJycsXG4gICAgICBpc1BsYXk6IGZhbHNlLFxuICAgICAgaW5uZXJBdWRpb0NvbnRleHQ6IG51bGxcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgd2hpY2goKSB7XG4gICAgICAgIHRoaXMucmVzdWx0Lm9uZSA9IHRoaXMucmVzdWx0LmRlc2M7XG4gICAgICB9LFxuICAgICAgY2hlY2tib3hDaGFuZ2UoZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnY2hlY2tib3hDaGFuZ2UnKTtcbiAgICAgICAgbGV0IGtleXMgPSBlLmRldGFpbC52YWx1ZS5zb3J0KChhLGIpPT57XG4gICAgICAgICAgcmV0dXJuIGEtYjtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGxldCBrZXlzID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuY29weS5wdXNoKHRoaXMucmVzdWx0Lmxpc3Rba2V5c1tpXV0udmFsKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvcHkpO1xuICAgICAgfSxcbiAgICAgIHNoYXJlKCkge1xuICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB2b2ljZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pc1BsYXksJ3RoaXMuaXNQbGF5Jyk7XG4gICAgICAgIGlmKHRoaXMuaXNQbGF5KSByZXR1cm47XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfor63pn7PlkIjmiJDkuK0uLi4nLFxuICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICBkdXJhdGlvbjogMTAwMDBcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS9zd2l0Y2hzL3ZvaWNlL2NvbXBvc2UnLCBcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAvLyBoZWFkZXI6IHthdXRoaWQ6c2VsZi5hdXRoaWR9LFxuICAgICAgICAgIGRhdGE6IHsgXG4gICAgICAgICAgICB0eHQ6IHNlbGYuY29weS5qb2luKCcnKSxcbiAgICAgICAgICAgIHNwZDogNSwgLy8g6K+t6YCfXG4gICAgICAgICAgICBwaXQ6IDQsIC8vIOmfs+iwg1xuICAgICAgICAgICAgdm9sOiAzLCAvLyDpn7Pph49cbiAgICAgICAgICAgIHBlcjogMywgLy8gMOS4uuWls+WjsO+8jDHkuLrnlLflo7DvvIwz5Li65oOF5oSf5ZCI5oiQLeW6pumAjemBpe+8jDTkuLrmg4XmhJ/lkIjmiJAt5bqm5Lir5LirXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb21wb3NlJyxyZXMuZGF0YSk7XG5cbiAgICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT09IDIwMCl7XG4gICAgICAgICAgICAgIGxldCB1cmwgPSByZXMuZGF0YS5kYXRhLnVybDtcbiAgICAgICAgICAgICAgc2VsZi52b2ljZVVybCA9IGBodHRwczovL3d3dy5pb2NyLnZpcC9haSR7dXJsfWA7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIC8vIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIC8vICAgdGl0bGU6ICfpn7PpopHlkIjmiJDlrozmr5UnLFxuICAgICAgICAgICAgICAvLyAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgLy8gICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICB3eC5oaWRlVG9hc3QoKTtcbiAgICAgICAgICAgICAgc2VsZi5vcGVuUGxheWVyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiByZXMuZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0LnN0YXR1cyA9ICF0aGlzLnJlc3VsdC5zdGF0dXM7XG4gICAgICB9LFxuICAgICAgdHJhbnNmZXIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICBpdGVtTGlzdDogWyfoi7HmlocnLCAn5pel6K+tJywgJ+azleivrScsICfkuK3mlocnXSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleCxzZWxmLmNvcHkpO1xuICAgICAgICAgICAgbGV0IHR5cGUgPSAnJztcbiAgICAgICAgICAgIGlmKHJlcy50YXBJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICB0eXBlID0gJ2VuJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdqcCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYocmVzLnRhcEluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnZnJhJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDMpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICd6aCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvc3dpdGNocy90cmFuc2xhdGUnLCBcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDpzZWxmLmF1dGhpZH0sXG4gICAgICAgICAgICAgIGRhdGE6IHsgXG4gICAgICAgICAgICAgICAgZGVzdExhbjogdHlwZSxcbiAgICAgICAgICAgICAgICBxOiBzZWxmLmNvcHkuam9pbignICcpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0cmFuc2xhdGUnLHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IHJlcy5kYXRhLmRhdGF9LFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgc2VsZi5jb3B5ID0gW3Jlcy5kYXRhLmRhdGFdO1xuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb3B5KCkge1xuICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmNvcHkuam9pbignXFxuJyksXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5a2X5bey5aSN5Yi2JyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb3BlblBsYXllcihmbGFnKXtcbiAgICAgIGxldCB1cmwgPSB0aGlzLnZvaWNlVXJsO1xuICAgICAgY29uc3QgaW5uZXJBdWRpb0NvbnRleHQgPSB3eC5jcmVhdGVJbm5lckF1ZGlvQ29udGV4dCgpO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dCA9IGlubmVyQXVkaW9Db250ZXh0O1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5hdXRvcGxheSA9IHRydWU7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0LnNyYyA9IHVybDtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQucGxheSgpO1xuXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vblBsYXkoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn5q2j5Zyo5pKt5pS+Jyk7XG4gICAgICAgIHRoaXMuaXNQbGF5ID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dC5vbkVuZGVkKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ+e7k+adn+aSreaUvicpO1xuICAgICAgICB0aGlzLmlzUGxheSA9IGZhbHNlO1xuICAgICAgfSlcbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRXJyb3IoKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBpbml0Q29weSgpIHtcbiAgICAgIGxldCBrZXlzID0gdGhpcy5yZXN1bHQubGlzdC5zb3J0KChhLGIpPT57XG4gICAgICAgIHJldHVybiBhLWI7XG4gICAgICB9KTtcbiAgICAgIC8vIGxldCBrZXlzID0gdGhpcy5yZXN1bHQubGlzdDtcbiAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtpXS52YWwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwbG9hZCh0eXBlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlLCd1cGxvYWQnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfor4bliKvkuK0nLFxuICAgICAgICBtYXNrOiB0cnVlXG4gICAgICB9KVxuICAgICAgaWYgKHR5cGUgPT09ICdjYXJkJykge1xuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvYmFua2NhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnYmFja2NhcmQnKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEucmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5Y2h5Y+377yaJHt0ZW1wLmJhbmtfY2FyZF9udW1iZXJ9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDnsbvlnovvvJoke3RlbXAuYmFua19jYXJkX3R5cGUgPT09IDIgPyAn5L+h55So5Y2hJzon5YCf6K6w5Y2hJ31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOmTtuihjOWQjeensO+8miR7dGVtcC5iYW5rX25hbWV9YH1cbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZih0eXBlID09PSAnaWQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9pZGNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgIHNpZGU6ICdmcm9udCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdpZCBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOaAp+WIq++8miR7dGVtcFsn5oCn5YirJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDmsJHml4/vvJoke3RlbXBbJ+awkeaXjyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5Ye655Sf77yaJHt0ZW1wWyflh7rnlJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDQsIHZhbDogYOS9j+WdgO+8miR7dGVtcFsn5L2P5Z2AJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDlhazmsJHouqvku73lj7fnoIHvvJoke3RlbXBbJ+WFrOawkei6q+S7veWPt+eggSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RyaXZlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2RyaXZlY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdkcml2ZSBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wLCd0ZW1wJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDor4Hlj7fvvJoke3RlbXBbJ+ivgeWPtyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5pyJ5pWI5pyf6ZmQ77yaJHt0ZW1wWyfmnInmlYjmnJ/pmZAnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOiHs++8miR7dGVtcFsn6IezJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAzLCB2YWw6IGDlh4bpqb7ovablnovvvJoke3RlbXBbJ+WHhumpvui9puWeiyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5Yid5qyh6aKG6K+B5pel5pyf77yaJHt0ZW1wWyfliJ3mrKHpoobor4Hml6XmnJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOWnk+WQje+8miR7dGVtcFsn5aeT5ZCNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA2LCB2YWw6IGDmgKfliKvvvJoke3RlbXBbJ+aAp+WIqyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNywgdmFsOiBg5Zu957GN77yaJHt0ZW1wWyflm73nsY0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDgsIHZhbDogYOWHuueUn+aXpeacn++8miR7dGVtcFsn5Ye655Sf5pel5pyfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA5LCB2YWw6IGDkvY/lnYDvvJoke3RlbXBbJ+S9j+WdgCddLndvcmRzfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdlbmhhbmNlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2VuaGFuY2UnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9nZW5lcmFsJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMucmVzdWx0LmltZ3VybCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcpO1xuICAgICAgdGhpcy5yZXN1bHQudHlwZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0eXBlJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlc3VsdC50eXBlLCdwYXJhbXMnKTtcbiAgICAgIHRoaXMudXBsb2FkKHRoaXMucmVzdWx0LnR5cGUpO1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBkZXN0cm95QXVkaW8oKSB7XG4gICAgICBjb25zb2xlLmxvZygnZGVzdHJveSBhdWRpbycpO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dCAmJiB0aGlzLmlubmVyQXVkaW9Db250ZXh0LmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgfVxuIl19