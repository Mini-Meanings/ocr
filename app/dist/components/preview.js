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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwidm9pY2VVcmwiLCJpc1BsYXkiLCJpbm5lckF1ZGlvQ29udGV4dCIsIm1ldGhvZHMiLCJ3aGljaCIsImNoZWNrYm94Q2hhbmdlIiwiZSIsImtleXMiLCJkZXRhaWwiLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsImkiLCJsZW5ndGgiLCJwdXNoIiwidmFsIiwiY29uc29sZSIsImxvZyIsInNoYXJlIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwidm9pY2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInNlbGYiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwidHh0Iiwiam9pbiIsInNwZCIsInBpdCIsInZvbCIsInBlciIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwiJGFwcGx5IiwiaGlkZVRvYXN0Iiwib3BlblBsYXllciIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjb25maXJtIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYW5jZWwiLCJ0b2dnbGUiLCJ0cmFuc2ZlciIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0IiwidGFwSW5kZXgiLCJoZWFkZXIiLCJkZXN0TGFuIiwicSIsImlkIiwiZmFpbCIsImVyck1zZyIsInNldENsaXBib2FyZERhdGEiLCJnZXRDbGlwYm9hcmREYXRhIiwiZmxhZyIsImNyZWF0ZUlubmVyQXVkaW9Db250ZXh0IiwiYXV0b3BsYXkiLCJzcmMiLCJwbGF5Iiwib25QbGF5Iiwib25FbmRlZCIsIm9uRXJyb3IiLCJzaG93TG9hZGluZyIsIm1hc2siLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwidGVtcCIsImJhbmtfY2FyZF9udW1iZXIiLCJiYW5rX2NhcmRfdHlwZSIsImJhbmtfbmFtZSIsImluaXRDb3B5IiwiaGlkZUxvYWRpbmciLCJlcnIiLCJmb3JtRGF0YSIsInNpZGUiLCJ3b3Jkc19yZXN1bHQiLCJ3b3JkcyIsInJlc3VsdHMiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJnZXRTdG9yYWdlU3luYyIsInVwbG9hZCIsImRlc3Ryb3kiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNLEVBRkE7QUFHTkMsYUFBSyxRQUhDO0FBSU5DLGdCQUFRLEtBSkY7QUFLTkMsY0FBTSxFQUxBO0FBTU5DLGNBQU07QUFOQSxPQURIO0FBU0xDLFlBQU0sRUFURDtBQVVMO0FBQ0FDLGNBQVEsRUFYSDtBQVlMQyxnQkFBVSxFQVpMO0FBYUxDLGNBQVEsS0FiSDtBQWNMQyx5QkFBbUI7QUFkZCxLLFFBaUJQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOLGFBQUtiLE1BQUwsQ0FBWUcsR0FBWixHQUFrQixLQUFLSCxNQUFMLENBQVlFLElBQTlCO0FBQ0QsT0FITztBQUlSWSxvQkFKUSwwQkFJT0MsQ0FKUCxFQUlVO0FBQ2hCO0FBQ0EsWUFBSUMsT0FBT0QsRUFBRUUsTUFBRixDQUFTQyxLQUFULENBQWVDLElBQWYsQ0FBb0IsVUFBQ0MsQ0FBRCxFQUFHQyxDQUFILEVBQU87QUFDcEMsaUJBQU9ELElBQUVDLENBQVQ7QUFDRCxTQUZVLENBQVg7QUFHQTtBQUNBLGFBQUtkLElBQUwsR0FBWSxFQUFaO0FBQ0EsYUFBSSxJQUFJZSxJQUFJLENBQVosRUFBZUEsSUFBSU4sS0FBS08sTUFBeEIsRUFBZ0NELEdBQWhDLEVBQXFDO0FBQ25DLGVBQUtmLElBQUwsQ0FBVWlCLElBQVYsQ0FBZSxLQUFLeEIsTUFBTCxDQUFZSyxJQUFaLENBQWlCVyxLQUFLTSxDQUFMLENBQWpCLEVBQTBCRyxH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QUFDRHJCLGVBQUcrRCxXQUFIO0FBQ0QsV0FoQ1c7QUFpQ1p4QixnQkFBTSxjQUFTeUIsR0FBVCxFQUFjO0FBQ2xCO0FBQ0FoRSxlQUFHK0QsV0FBSDtBQUNEO0FBcENXLFNBQWQ7QUFzQ0Q7QUFDRjs7OzZCQUVTO0FBQ1IsV0FBSzVGLE1BQUwsQ0FBWUMsTUFBWixHQUFxQjRCLEdBQUd5RSxjQUFILENBQWtCLFVBQWxCLENBQXJCO0FBQ0EsV0FBS3RHLE1BQUwsQ0FBWU0sSUFBWixHQUFtQnVCLEdBQUd5RSxjQUFILENBQWtCLE1BQWxCLENBQW5CO0FBQ0EsV0FBSzlGLE1BQUwsR0FBY3FCLEdBQUd5RSxjQUFILENBQWtCLFVBQWxCLENBQWQ7QUFDQXpFLFNBQUdJLFNBQUgsQ0FBYTtBQUNYQyxlQUFPLEtBQUsxQixNQUREO0FBRVgyQixjQUFNLFNBRks7QUFHWEMsa0JBQVU7QUFIQyxPQUFiO0FBS0EsV0FBS21FLE1BQUwsQ0FBWSxLQUFLdkcsTUFBTCxDQUFZTSxJQUF4QjtBQUNBdUIsU0FBR0MsYUFBSCxDQUFpQjtBQUNmQyx5QkFBaUI7QUFERixPQUFqQjtBQUdEOzs7bUNBRWM7QUFDYkwsY0FBUUMsR0FBUixDQUFZLGVBQVo7QUFDQSxXQUFLaEIsaUJBQUwsSUFBMEIsS0FBS0EsaUJBQUwsQ0FBdUI2RixPQUF2QixFQUExQjtBQUNEOzs7O0VBemJrQyxlQUFLQyxTOztrQkFBckIzRyxPIiwiZmlsZSI6InByZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlldyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGltZ3VybDogJycsXG4gICAgICAgIGRlc2M6ICcnLFxuICAgICAgICBvbmU6ICfop6PmnpDlm77niYfkuK3vvZ4nLFxuICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICBsaXN0OiBbXSxcbiAgICAgICAgdHlwZTogJydcbiAgICAgIH0sXG4gICAgICBjb3B5OiBbXSxcbiAgICAgIC8vIGF1dGhpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDIpLFxuICAgICAgYXV0aGlkOiAnJyxcbiAgICAgIHZvaWNlVXJsOiAnJyxcbiAgICAgIGlzUGxheTogZmFsc2UsXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dDogbnVsbFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB3aGljaCgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQub25lID0gdGhpcy5yZXN1bHQuZGVzYztcbiAgICAgIH0sXG4gICAgICBjaGVja2JveENoYW5nZShlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGVja2JveENoYW5nZScpO1xuICAgICAgICBsZXQga2V5cyA9IGUuZGV0YWlsLnZhbHVlLnNvcnQoKGEsYik9PntcbiAgICAgICAgICByZXR1cm4gYS1iO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbGV0IGtleXMgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgdGhpcy5jb3B5ID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtrZXlzW2ldXS52YWwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29weSk7XG4gICAgICB9LFxuICAgICAgc2hhcmUoKSB7XG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHZvaWNlKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlzUGxheSwndGhpcy5pc1BsYXknKTtcbiAgICAgICAgaWYodGhpcy5pc1BsYXkpIHJldHVybjtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+ivremfs+WQiOaIkOS4rS4uLicsXG4gICAgICAgICAgaWNvbjogJ2xvYWRpbmcnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxuICAgICAgICB9KVxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3N3aXRjaHMvdm9pY2UvY29tcG9zZScsIFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIC8vIGhlYWRlcjoge2F1dGhpZDpzZWxmLmF1dGhpZH0sXG4gICAgICAgICAgZGF0YTogeyBcbiAgICAgICAgICAgIHR4dDogc2VsZi5jb3B5LmpvaW4oJycpLFxuICAgICAgICAgICAgc3BkOiA1LCAvLyDor63pgJ9cbiAgICAgICAgICAgIHBpdDogNCwgLy8g6Z+z6LCDXG4gICAgICAgICAgICB2b2w6IDMsIC8vIOmfs+mHj1xuICAgICAgICAgICAgcGVyOiAzLCAvLyAw5Li65aWz5aOw77yMMeS4uueUt+WjsO+8jDPkuLrmg4XmhJ/lkIjmiJAt5bqm6YCN6YGl77yMNOS4uuaDheaEn+WQiOaIkC3luqbkuKvkuKtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvc2UnLHJlcy5kYXRhKTtcblxuICAgICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgbGV0IHVybCA9IHJlcy5kYXRhLmRhdGEudXJsO1xuICAgICAgICAgICAgICBzZWxmLnZvaWNlVXJsID0gYGh0dHBzOi8vd3d3LmlvY3IudmlwL2FpJHt1cmx9YDtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgLy8gd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgLy8gICB0aXRsZTogJ+mfs+mikeWQiOaIkOWujOavlScsXG4gICAgICAgICAgICAgIC8vICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAvLyAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgIHd4LmhpZGVUb2FzdCgpO1xuICAgICAgICAgICAgICBzZWxmLm9wZW5QbGF5ZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQuc3RhdHVzID0gIXRoaXMucmVzdWx0LnN0YXR1cztcbiAgICAgIH0sXG4gICAgICB0cmFuc2ZlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICAgIGl0ZW1MaXN0OiBbJ+iLseaWhycsICfml6Xor60nLCAn5rOV6K+tJywgJ+S4reaWhyddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnRhcEluZGV4LHNlbGYuY29weSk7XG4gICAgICAgICAgICBsZXQgdHlwZSA9ICcnO1xuICAgICAgICAgICAgaWYocmVzLnRhcEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgICB0eXBlID0gJ2pwJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdmcmEnO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMykge1xuICAgICAgICAgICAgICB0eXBlID0gJ3poJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS9zd2l0Y2hzL3RyYW5zbGF0ZScsIFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnNlbGYuYXV0aGlkfSxcbiAgICAgICAgICAgICAgZGF0YTogeyBcbiAgICAgICAgICAgICAgICBkZXN0TGFuOiB0eXBlLFxuICAgICAgICAgICAgICAgIHE6IHNlbGYuY29weS5qb2luKCcgJylcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyYW5zbGF0ZScscmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogcmVzLmRhdGEuZGF0YX0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvcHkgPSBbcmVzLmRhdGEuZGF0YV07XG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvcHkoKSB7XG4gICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuY29weS5qb2luKCdcXG4nKSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHd4LmdldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmloflrZflt7LlpI3liLYnLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuUGxheWVyKGZsYWcpe1xuICAgICAgbGV0IHVybCA9IHRoaXMudm9pY2VVcmw7XG4gICAgICBjb25zdCBpbm5lckF1ZGlvQ29udGV4dCA9IHd4LmNyZWF0ZUlubmVyQXVkaW9Db250ZXh0KCk7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0ID0gaW5uZXJBdWRpb0NvbnRleHQ7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0LmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQuc3JjID0gdXJsO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5wbGF5KCk7XG5cbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uUGxheSgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfmraPlnKjmkq3mlL4nKTtcbiAgICAgICAgdGhpcy5pc1BsYXkgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRW5kZWQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn57uT5p2f5pKt5pS+Jyk7XG4gICAgICAgIHRoaXMuaXNQbGF5ID0gZmFsc2U7XG4gICAgICB9KVxuICAgICAgaW5uZXJBdWRpb0NvbnRleHQub25FcnJvcigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICB9KVxuICAgIH1cblxuICAgIGluaXRDb3B5KCkge1xuICAgICAgbGV0IGtleXMgPSB0aGlzLnJlc3VsdC5saXN0LnNvcnQoKGEsYik9PntcbiAgICAgICAgcmV0dXJuIGEtYjtcbiAgICAgIH0pO1xuICAgICAgLy8gbGV0IGtleXMgPSB0aGlzLnJlc3VsdC5saXN0O1xuICAgICAgdGhpcy5jb3B5ID0gW107XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmNvcHkucHVzaCh0aGlzLnJlc3VsdC5saXN0W2ldLnZhbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBsb2FkKHR5cGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKHR5cGUsJ3VwbG9hZCcpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+ivhuWIq+S4rScsXG4gICAgICAgIG1hc2s6IHRydWVcbiAgICAgIH0pXG4gICAgICBpZiAodHlwZSA9PT0gJ2NhcmQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9iYW5rY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdiYWNrY2FyZCcpO1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS5yZXN1bHQ7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDljaHlj7fvvJoke3RlbXAuYmFua19jYXJkX251bWJlcn1gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOexu+Wei++8miR7dGVtcC5iYW5rX2NhcmRfdHlwZSA9PT0gMiA/ICfkv6HnlKjljaEnOiflgJ/orrDljaEnfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMiwgdmFsOiBg6ZO26KGM5ZCN56ew77yaJHt0ZW1wLmJhbmtfbmFtZX1gfVxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdpZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2lkY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgc2lkZTogJ2Zyb250JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2lkIHN1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICAvLyBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHMsa2V5Oml0ZW1baXRlbVtpbmRleF1dfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQ7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDlp5PlkI3vvJoke3RlbXBbJ+Wnk+WQjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5oCn5Yir77yaJHt0ZW1wWyfmgKfliKsnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOawkeaXj++8miR7dGVtcFsn5rCR5pePJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAzLCB2YWw6IGDlh7rnlJ/vvJoke3RlbXBbJ+WHuueUnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5L2P5Z2A77yaJHt0ZW1wWyfkvY/lnYAnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOWFrOawkei6q+S7veWPt+egge+8miR7dGVtcFsn5YWs5rCR6Lqr5Lu95Y+356CBJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZHJpdmUnKSB7XG4gICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZHJpdmVjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2RyaXZlIHN1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICAvLyBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHMsa2V5Oml0ZW1baXRlbVtpbmRleF1dfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQ7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXAsJ3RlbXAnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOivgeWPt++8miR7dGVtcFsn6K+B5Y+3J10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDmnInmlYjmnJ/pmZDvvJoke3RlbXBbJ+acieaViOacn+mZkCddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMiwgdmFsOiBg6Iez77yaJHt0ZW1wWyfoh7MnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDMsIHZhbDogYOWHhumpvui9puWei++8miR7dGVtcFsn5YeG6am+6L2m5Z6LJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA0LCB2YWw6IGDliJ3mrKHpoobor4Hml6XmnJ/vvJoke3RlbXBbJ+WIneasoemihuivgeaXpeacnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNSwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDYsIHZhbDogYOaAp+WIq++8miR7dGVtcFsn5oCn5YirJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA3LCB2YWw6IGDlm73nsY3vvJoke3RlbXBbJ+WbveexjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogOCwgdmFsOiBg5Ye655Sf5pel5pyf77yaJHt0ZW1wWyflh7rnlJ/ml6XmnJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDksIHZhbDogYOS9j+WdgO+8miR7dGVtcFsn5L2P5Z2AJ10ud29yZHN9YH1cbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gJ2VuaGFuY2UnKSB7XG4gICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZW5oYW5jZScsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2dlbmVyYWwnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5yZXN1bHQuaW1ndXJsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyk7XG4gICAgICB0aGlzLnJlc3VsdC50eXBlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3R5cGUnKTtcbiAgICAgIHRoaXMuYXV0aGlkID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJpbmZvJyk7XG4gICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogdGhpcy5hdXRoaWQsXG4gICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgIH0pXG4gICAgICB0aGlzLnVwbG9hZCh0aGlzLnJlc3VsdC50eXBlKTtcbiAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVzdHJveUF1ZGlvKCkge1xuICAgICAgY29uc29sZS5sb2coJ2Rlc3Ryb3kgYXVkaW8nKTtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQgJiYgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5kZXN0cm95KCk7XG4gICAgfVxuXG4gIH1cbiJdfQ==