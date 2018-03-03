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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwidm9pY2VVcmwiLCJpc1BsYXkiLCJpbm5lckF1ZGlvQ29udGV4dCIsIm1ldGhvZHMiLCJ3aGljaCIsImNoZWNrYm94Q2hhbmdlIiwiZSIsImtleXMiLCJkZXRhaWwiLCJ2YWx1ZSIsInNvcnQiLCJhIiwiYiIsImkiLCJsZW5ndGgiLCJwdXNoIiwidmFsIiwiY29uc29sZSIsImxvZyIsInNoYXJlIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwidm9pY2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInNlbGYiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwidHh0Iiwiam9pbiIsInNwZCIsInBpdCIsInZvbCIsInBlciIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwiJGFwcGx5IiwiaGlkZVRvYXN0Iiwib3BlblBsYXllciIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJjb25maXJtIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYW5jZWwiLCJ0b2dnbGUiLCJ0cmFuc2ZlciIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0IiwidGFwSW5kZXgiLCJoZWFkZXIiLCJkZXN0TGFuIiwicSIsImlkIiwiZmFpbCIsImVyck1zZyIsInNldENsaXBib2FyZERhdGEiLCJnZXRDbGlwYm9hcmREYXRhIiwiZmxhZyIsImNyZWF0ZUlubmVyQXVkaW9Db250ZXh0IiwiYXV0b3BsYXkiLCJzcmMiLCJwbGF5Iiwib25QbGF5Iiwib25FbmRlZCIsIm9uRXJyb3IiLCJzaG93TG9hZGluZyIsIm1hc2siLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwidGVtcCIsImJhbmtfY2FyZF9udW1iZXIiLCJiYW5rX2NhcmRfdHlwZSIsImJhbmtfbmFtZSIsImluaXRDb3B5IiwiaGlkZUxvYWRpbmciLCJlcnIiLCJmb3JtRGF0YSIsInNpZGUiLCJ3b3Jkc19yZXN1bHQiLCJ3b3JkcyIsInJlc3VsdHMiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJnZXRTdG9yYWdlU3luYyIsInVwbG9hZCIsImRlc3Ryb3kiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNLEVBRkE7QUFHTkMsYUFBSyxRQUhDO0FBSU5DLGdCQUFRLEtBSkY7QUFLTkMsY0FBTSxFQUxBO0FBTU5DLGNBQU07QUFOQSxPQURIO0FBU0xDLFlBQU0sRUFURDtBQVVMQyxjQUFRQyxLQUFLQyxNQUFMLEdBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLFNBQTNCLENBQXFDLENBQXJDLENBVkg7QUFXTEMsZ0JBQVUsRUFYTDtBQVlMQyxjQUFRLEtBWkg7QUFhTEMseUJBQW1CO0FBYmQsSyxRQWdCUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0E7QUFDTixhQUFLakIsTUFBTCxDQUFZRyxHQUFaLEdBQWtCLEtBQUtILE1BQUwsQ0FBWUUsSUFBOUI7QUFDRCxPQUhPO0FBSVJnQixvQkFKUSwwQkFJT0MsQ0FKUCxFQUlVO0FBQ2hCO0FBQ0EsWUFBSUMsT0FBT0QsRUFBRUUsTUFBRixDQUFTQyxLQUFULENBQWVDLElBQWYsQ0FBb0IsVUFBQ0MsQ0FBRCxFQUFHQyxDQUFILEVBQU87QUFDcEMsaUJBQU9ELElBQUVDLENBQVQ7QUFDRCxTQUZVLENBQVg7QUFHQSxhQUFLbEIsSUFBTCxHQUFZLEVBQVo7QUFDQSxhQUFJLElBQUltQixJQUFJLENBQVosRUFBZUEsSUFBSU4sS0FBS08sTUFBeEIsRUFBZ0NELEdBQWhDLEVB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bkI7QUFDQTdELG1CQUFLekMsTUFBTCxDQUFZSSxNQUFaLEdBQXFCLElBQXJCO0FBQ0FxQyxtQkFBS3NELFFBQUw7QUFDQXRELG1CQUFLYSxNQUFMO0FBQ0Q7QUFDRHJCLGVBQUcrRCxXQUFIO0FBQ0QsV0FoQ1c7QUFpQ1p4QixnQkFBTSxjQUFTeUIsR0FBVCxFQUFjO0FBQ2xCO0FBQ0FoRSxlQUFHK0QsV0FBSDtBQUNEO0FBcENXLFNBQWQ7QUFzQ0Q7QUFDRjs7OzZCQUVTO0FBQ1IsV0FBS2hHLE1BQUwsQ0FBWUMsTUFBWixHQUFxQmdDLEdBQUd5RSxjQUFILENBQWtCLFVBQWxCLENBQXJCO0FBQ0EsV0FBSzFHLE1BQUwsQ0FBWU0sSUFBWixHQUFtQjJCLEdBQUd5RSxjQUFILENBQWtCLE1BQWxCLENBQW5CO0FBQ0E7QUFDQSxXQUFLQyxNQUFMLENBQVksS0FBSzNHLE1BQUwsQ0FBWU0sSUFBeEI7QUFDQTJCLFNBQUdDLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7O21DQUVjO0FBQ2JMLGNBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsV0FBS2hCLGlCQUFMLElBQTBCLEtBQUtBLGlCQUFMLENBQXVCNkYsT0FBdkIsRUFBMUI7QUFDRDs7OztFQWpia0MsZUFBS0MsUzs7a0JBQXJCL0csTyIsImZpbGUiOiJwcmV2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXcgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgZGF0YSA9IHtcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICBpbWd1cmw6ICcnLFxuICAgICAgICBkZXNjOiAnJyxcbiAgICAgICAgb25lOiAn6Kej5p6Q5Zu+54mH5Lit772eJyxcbiAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgbGlzdDogW10sXG4gICAgICAgIHR5cGU6ICcnXG4gICAgICB9LFxuICAgICAgY29weTogW10sXG4gICAgICBhdXRoaWQ6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygyKSxcbiAgICAgIHZvaWNlVXJsOiAnJyxcbiAgICAgIGlzUGxheTogZmFsc2UsXG4gICAgICBpbm5lckF1ZGlvQ29udGV4dDogbnVsbFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB3aGljaCgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQub25lID0gdGhpcy5yZXN1bHQuZGVzYztcbiAgICAgIH0sXG4gICAgICBjaGVja2JveENoYW5nZShlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGVja2JveENoYW5nZScpO1xuICAgICAgICBsZXQga2V5cyA9IGUuZGV0YWlsLnZhbHVlLnNvcnQoKGEsYik9PntcbiAgICAgICAgICByZXR1cm4gYS1iO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb3B5ID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtrZXlzW2ldXS52YWwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29weSk7XG4gICAgICB9LFxuICAgICAgc2hhcmUoKSB7XG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHZvaWNlKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmlzUGxheSwndGhpcy5pc1BsYXknKTtcbiAgICAgICAgaWYodGhpcy5pc1BsYXkpIHJldHVybjtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+ivremfs+WQiOaIkOS4rS4uLicsXG4gICAgICAgICAgaWNvbjogJ2xvYWRpbmcnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMFxuICAgICAgICB9KVxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3N3aXRjaHMvdm9pY2UvY29tcG9zZScsIFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIC8vIGhlYWRlcjoge2F1dGhpZDpzZWxmLmF1dGhpZH0sXG4gICAgICAgICAgZGF0YTogeyBcbiAgICAgICAgICAgIHR4dDogc2VsZi5jb3B5LmpvaW4oJycpLFxuICAgICAgICAgICAgc3BkOiA1LCAvLyDor63pgJ9cbiAgICAgICAgICAgIHBpdDogNCwgLy8g6Z+z6LCDXG4gICAgICAgICAgICB2b2w6IDMsIC8vIOmfs+mHj1xuICAgICAgICAgICAgcGVyOiAzLCAvLyAw5Li65aWz5aOw77yMMeS4uueUt+WjsO+8jDPkuLrmg4XmhJ/lkIjmiJAt5bqm6YCN6YGl77yMNOS4uuaDheaEn+WQiOaIkC3luqbkuKvkuKtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbXBvc2UnLHJlcy5kYXRhKTtcblxuICAgICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgbGV0IHVybCA9IHJlcy5kYXRhLmRhdGEudXJsO1xuICAgICAgICAgICAgICBzZWxmLnZvaWNlVXJsID0gYGh0dHBzOi8vd3d3LmlvY3IudmlwL2FpJHt1cmx9YDtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgLy8gd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgLy8gICB0aXRsZTogJ+mfs+mikeWQiOaIkOWujOavlScsXG4gICAgICAgICAgICAgIC8vICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAvLyAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgIHd4LmhpZGVUb2FzdCgpO1xuICAgICAgICAgICAgICBzZWxmLm9wZW5QbGF5ZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQuc3RhdHVzID0gIXRoaXMucmVzdWx0LnN0YXR1cztcbiAgICAgIH0sXG4gICAgICB0cmFuc2ZlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICAgIGl0ZW1MaXN0OiBbJ+iLseaWhycsICfml6Xor60nLCAn5rOV6K+tJywgJ+S4reaWhyddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLnRhcEluZGV4LHNlbGYuY29weSk7XG4gICAgICAgICAgICBsZXQgdHlwZSA9ICcnO1xuICAgICAgICAgICAgaWYocmVzLnRhcEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgIHR5cGUgPSAnZW4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgICB0eXBlID0gJ2pwJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXMudGFwSW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgdHlwZSA9ICdmcmEnO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlcy50YXBJbmRleCA9PT0gMykge1xuICAgICAgICAgICAgICB0eXBlID0gJ3poJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS9zd2l0Y2hzL3RyYW5zbGF0ZScsIFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnNlbGYuYXV0aGlkfSxcbiAgICAgICAgICAgICAgZGF0YTogeyBcbiAgICAgICAgICAgICAgICBkZXN0TGFuOiB0eXBlLFxuICAgICAgICAgICAgICAgIHE6IHNlbGYuY29weS5qb2luKCcgJylcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RyYW5zbGF0ZScscmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogcmVzLmRhdGEuZGF0YX0sXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvcHkgPSBbcmVzLmRhdGEuZGF0YV07XG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvcHkoKSB7XG4gICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuY29weS5qb2luKCdcXG4nKSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHd4LmdldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmloflrZflt7LlpI3liLYnLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuUGxheWVyKGZsYWcpe1xuICAgICAgbGV0IHVybCA9IHRoaXMudm9pY2VVcmw7XG4gICAgICBjb25zdCBpbm5lckF1ZGlvQ29udGV4dCA9IHd4LmNyZWF0ZUlubmVyQXVkaW9Db250ZXh0KCk7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0ID0gaW5uZXJBdWRpb0NvbnRleHQ7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0LmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQuc3JjID0gdXJsO1xuICAgICAgdGhpcy5pbm5lckF1ZGlvQ29udGV4dC5wbGF5KCk7XG5cbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uUGxheSgoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfmraPlnKjmkq3mlL4nKTtcbiAgICAgICAgdGhpcy5pc1BsYXkgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlubmVyQXVkaW9Db250ZXh0Lm9uRW5kZWQoKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn57uT5p2f5pKt5pS+Jyk7XG4gICAgICAgIHRoaXMuaXNQbGF5ID0gZmFsc2U7XG4gICAgICB9KVxuICAgICAgaW5uZXJBdWRpb0NvbnRleHQub25FcnJvcigocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICB9KVxuICAgIH1cblxuICAgIGluaXRDb3B5KCkge1xuICAgICAgbGV0IGtleXMgPSB0aGlzLnJlc3VsdC5saXN0LnNvcnQoKGEsYik9PntcbiAgICAgICAgcmV0dXJuIGEtYjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jb3B5ID0gW107XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmNvcHkucHVzaCh0aGlzLnJlc3VsdC5saXN0W2ldLnZhbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBsb2FkKHR5cGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKHR5cGUsJ3VwbG9hZCcpO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+ivhuWIq+S4rScsXG4gICAgICAgIG1hc2s6IHRydWVcbiAgICAgIH0pXG4gICAgICBpZiAodHlwZSA9PT0gJ2NhcmQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9iYW5rY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdiYWNrY2FyZCcpO1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS5yZXN1bHQ7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDljaHlj7fvvJoke3RlbXAuYmFua19jYXJkX251bWJlcn1gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOexu+Wei++8miR7dGVtcC5iYW5rX2NhcmRfdHlwZSA9PT0gMiA/ICfkv6HnlKjljaEnOiflgJ/orrDljaEnfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMiwgdmFsOiBg6ZO26KGM5ZCN56ew77yaJHt0ZW1wLmJhbmtfbmFtZX1gfVxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdpZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2lkY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgc2lkZTogJ2Zyb250JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2lkIHN1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICAvLyBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHMsa2V5Oml0ZW1baXRlbVtpbmRleF1dfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQ7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDlp5PlkI3vvJoke3RlbXBbJ+Wnk+WQjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5oCn5Yir77yaJHt0ZW1wWyfmgKfliKsnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOawkeaXj++8miR7dGVtcFsn5rCR5pePJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAzLCB2YWw6IGDlh7rnlJ/vvJoke3RlbXBbJ+WHuueUnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5L2P5Z2A77yaJHt0ZW1wWyfkvY/lnYAnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOWFrOawkei6q+S7veWPt+egge+8miR7dGVtcFsn5YWs5rCR6Lqr5Lu95Y+356CBJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZHJpdmUnKSB7XG4gICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZHJpdmVjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2RyaXZlIHN1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICAvLyBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHMsa2V5Oml0ZW1baXRlbVtpbmRleF1dfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQ7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXAsJ3RlbXAnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOivgeWPt++8miR7dGVtcFsn6K+B5Y+3J10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDmnInmlYjmnJ/pmZDvvJoke3RlbXBbJ+acieaViOacn+mZkCddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMiwgdmFsOiBg6Iez77yaJHt0ZW1wWyfoh7MnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDMsIHZhbDogYOWHhumpvui9puWei++8miR7dGVtcFsn5YeG6am+6L2m5Z6LJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA0LCB2YWw6IGDliJ3mrKHpoobor4Hml6XmnJ/vvJoke3RlbXBbJ+WIneasoemihuivgeaXpeacnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNSwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDYsIHZhbDogYOaAp+WIq++8miR7dGVtcFsn5oCn5YirJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA3LCB2YWw6IGDlm73nsY3vvJoke3RlbXBbJ+WbveexjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogOCwgdmFsOiBg5Ye655Sf5pel5pyf77yaJHt0ZW1wWyflh7rnlJ/ml6XmnJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDksIHZhbDogYOS9j+WdgO+8miR7dGVtcFsn5L2P5Z2AJ10ud29yZHN9YH1cbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLmluaXRDb3B5KCk7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYodHlwZSA9PT0gJ2VuaGFuY2UnKSB7XG4gICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZW5oYW5jZScsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICBkZWx0YTogMlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2dlbmVyYWwnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuaW5pdENvcHkoKTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5yZXN1bHQuaW1ndXJsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyk7XG4gICAgICB0aGlzLnJlc3VsdC50eXBlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3R5cGUnKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0LnR5cGUsJ3BhcmFtcycpO1xuICAgICAgdGhpcy51cGxvYWQodGhpcy5yZXN1bHQudHlwZSk7XG4gICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGRlc3Ryb3lBdWRpbygpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkZXN0cm95IGF1ZGlvJyk7XG4gICAgICB0aGlzLmlubmVyQXVkaW9Db250ZXh0ICYmIHRoaXMuaW5uZXJBdWRpb0NvbnRleHQuZGVzdHJveSgpO1xuICAgIH1cblxuICB9XG4iXX0=