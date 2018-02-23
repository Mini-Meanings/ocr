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
      authid: Math.random().toString(16).substring(2)
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
          duration: 2000
        });
      },
      toggle: function toggle() {
        this.result.status = !this.result.status;
      },
      transfer: function transfer() {
        wx.showActionSheet({
          itemList: ['中英文', '日语', '法语'],
          success: function success(res) {
            console.log(res.tapIndex);
            wx.request({
              url: 'https://www.iocr.vip/ai/switchs/translate',
              formData: {
                destLan: 'en',
                q: '王'
              },
              header: { authid: this.authid },
              success: function success(res) {
                console.log('translate', res.data);
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
                title: '异常提示',
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
                title: '异常提示',
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
                title: '异常提示',
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
                title: '异常提示',
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
                title: '异常提示',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyaW5nIiwibWV0aG9kcyIsIndoaWNoIiwiY2hlY2tib3hDaGFuZ2UiLCJlIiwia2V5cyIsImRldGFpbCIsInZhbHVlIiwic29ydCIsImEiLCJiIiwiaSIsImxlbmd0aCIsInB1c2giLCJ2YWwiLCJjb25zb2xlIiwibG9nIiwic2hhcmUiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ2b2ljZSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwidG9nZ2xlIiwidHJhbnNmZXIiLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInN1Y2Nlc3MiLCJyZXMiLCJ0YXBJbmRleCIsInJlcXVlc3QiLCJ1cmwiLCJmb3JtRGF0YSIsImRlc3RMYW4iLCJxIiwiaGVhZGVyIiwiZmFpbCIsImVyck1zZyIsInNldENsaXBib2FyZERhdGEiLCJqb2luIiwiZ2V0Q2xpcGJvYXJkRGF0YSIsInNlbGYiLCJzaG93TG9hZGluZyIsIm1hc2siLCJ1cGxvYWRGaWxlIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwic2hvd01vZGFsIiwiY29udGVudCIsImNvbmZpcm0iLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImNhbmNlbCIsInRlbXAiLCJpZCIsImJhbmtfY2FyZF9udW1iZXIiLCJiYW5rX2NhcmRfdHlwZSIsImJhbmtfbmFtZSIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwiZXJyIiwic2lkZSIsIndvcmRzX3Jlc3VsdCIsIndvcmRzIiwiaW5pdENvcHkiLCJyZXN1bHRzIiwibWFwIiwiaXRlbSIsImluZGV4IiwiZ2V0U3RvcmFnZVN5bmMiLCJ1cGxvYWQiLCJj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QzlCLGtCQUFJOEUsVUFBVW5GLEtBQUtBLElBQUwsQ0FBVWdGLFlBQVYsQ0FBdUJJLEdBQXZCLENBQTJCLFVBQUNDLElBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUFFLHVCQUFPLEVBQUNkLElBQUdjLEtBQUosRUFBVTNELEtBQUkwRCxLQUFLSixLQUFuQixFQUFQO0FBQW1DLGVBQWhGLENBQWQ7QUFDQTtBQUNBeEIsbUJBQUt4RCxNQUFMLENBQVlLLElBQVosR0FBbUI2RSxPQUFuQjtBQUNBMUIsbUJBQUt4RCxNQUFMLENBQVlJLE1BQVosR0FBcUIsSUFBckI7O0FBRUFvRCxtQkFBS21CLE1BQUw7QUFDRDtBQUNEN0MsZUFBRzhDLFdBQUg7QUFDRCxXQWhDVztBQWlDWnpCLGdCQUFNLGNBQVMwQixHQUFULEVBQWM7QUFDbEI7QUFDQS9DLGVBQUc4QyxXQUFIO0FBQ0Q7QUFwQ1csU0FBZDtBQXNDRDtBQUNGOzs7NkJBRVM7QUFDUixXQUFLNUUsTUFBTCxDQUFZQyxNQUFaLEdBQXFCNkIsR0FBR3dELGNBQUgsQ0FBa0IsVUFBbEIsQ0FBckI7QUFDQSxXQUFLdEYsTUFBTCxDQUFZTSxJQUFaLEdBQW1Cd0IsR0FBR3dELGNBQUgsQ0FBa0IsTUFBbEIsQ0FBbkI7QUFDQTtBQUNBLFdBQUtDLE1BQUwsQ0FBWSxLQUFLdkYsTUFBTCxDQUFZTSxJQUF4QjtBQUNBd0IsU0FBR0MsYUFBSCxDQUFpQjtBQUNmQyx5QkFBaUI7QUFERixPQUFqQjtBQUdEOzs7O0VBalZrQyxlQUFLd0QsUzs7a0JBQXJCMUYsTyIsImZpbGUiOiJwcmV2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXcgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgZGF0YSA9IHtcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICBpbWd1cmw6ICcnLFxuICAgICAgICBkZXNjOiAnJyxcbiAgICAgICAgb25lOiAn6Kej5p6Q5Zu+54mH5Lit772eJyxcbiAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgbGlzdDogW10sXG4gICAgICAgIHR5cGU6ICcnXG4gICAgICB9LFxuICAgICAgY29weTogW10sXG4gICAgICBhdXRoaWQ6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygyKVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB3aGljaCgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQub25lID0gdGhpcy5yZXN1bHQuZGVzYztcbiAgICAgIH0sXG4gICAgICBjaGVja2JveENoYW5nZShlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdjaGVja2JveENoYW5nZScpO1xuICAgICAgICBsZXQga2V5cyA9IGUuZGV0YWlsLnZhbHVlLnNvcnQoKGEsYik9PntcbiAgICAgICAgICByZXR1cm4gYS1iO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb3B5ID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtrZXlzW2ldXS52YWwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29weSk7XG4gICAgICB9LFxuICAgICAgc2hhcmUoKSB7XG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHZvaWNlKCkge1xuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6K+t6Z+z5ZCI5oiQ5LitLi4uJyxcbiAgICAgICAgICBpY29uOiAnbG9hZGluZycsXG4gICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0LnN0YXR1cyA9ICF0aGlzLnJlc3VsdC5zdGF0dXM7XG4gICAgICB9LFxuICAgICAgdHJhbnNmZXIoKSB7XG4gICAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgICAgaXRlbUxpc3Q6IFsn5Lit6Iux5paHJywgJ+aXpeivrScsICfms5Xor60nXSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleCk7XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvc3dpdGNocy90cmFuc2xhdGUnLCBcbiAgICAgICAgICAgICAgZm9ybURhdGE6IHsgXG4gICAgICAgICAgICAgICAgZGVzdExhbjogJ2VuJyxcbiAgICAgICAgICAgICAgICBxOiAn546LJ1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndHJhbnNsYXRlJyxyZXMuZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb3B5KCkge1xuICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmNvcHkuam9pbignXFxuJyksXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5a2X5bey5aSN5Yi2JyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5pdENvcHkoKSB7XG4gICAgICBsZXQga2V5cyA9IHRoaXMucmVzdWx0Lmxpc3Quc29ydCgoYSxiKT0+e1xuICAgICAgICByZXR1cm4gYS1iO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmNvcHkgPSBbXTtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuY29weS5wdXNoKHRoaXMucmVzdWx0Lmxpc3RbaV0udmFsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGxvYWQodHlwZSkge1xuICAgICAgY29uc29sZS5sb2codHlwZSwndXBsb2FkJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn6K+G5Yir5LitJyxcbiAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgfSlcbiAgICAgIGlmICh0eXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2JhbmtjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2JhY2tjYXJkJyk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+W8guW4uOaPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLnJlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWNoeWPt++8miR7dGVtcC5iYW5rX2NhcmRfbnVtYmVyfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg57G75Z6L77yaJHt0ZW1wLmJhbmtfY2FyZF90eXBlID09PSAyID8gJ+S/oeeUqOWNoSc6J+WAn+iusOWNoSd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDpk7booYzlkI3np7DvvJoke3RlbXAuYmFua19uYW1lfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdpZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2lkY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgc2lkZTogJ2Zyb250JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2lkIHN1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflvILluLjmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICAvLyBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHMsa2V5Oml0ZW1baXRlbVtpbmRleF1dfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQ7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDlp5PlkI3vvJoke3RlbXBbJ+Wnk+WQjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5oCn5Yir77yaJHt0ZW1wWyfmgKfliKsnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOawkeaXj++8miR7dGVtcFsn5rCR5pePJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAzLCB2YWw6IGDlh7rnlJ/vvJoke3RlbXBbJ+WHuueUnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5L2P5Z2A77yaJHt0ZW1wWyfkvY/lnYAnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOWFrOawkei6q+S7veWPt+egge+8miR7dGVtcFsn5YWs5rCR6Lqr5Lu95Y+356CBJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZHJpdmUnKSB7XG4gICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZHJpdmVjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2RyaXZlIHN1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflvILluLjmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICAvLyBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHMsa2V5Oml0ZW1baXRlbVtpbmRleF1dfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQ7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDor4Hlj7fvvJoke3RlbXBbJ+ivgeWPtyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5pyJ5pWI5pyf6ZmQ77yaJHt0ZW1wWyfmnInmlYjmnJ/pmZAnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOWHhumpvui9puWei++8miR7dGVtcFsn5YeG6am+6L2m5Z6LJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAzLCB2YWw6IGDliJ3mrKHpoobor4Hml6XmnJ/vvJoke3RlbXBbJ+WIneasoemihuivgeaXpeacnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOaAp+WIq++8miR7dGVtcFsn5oCn5YirJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA2LCB2YWw6IGDlm73nsY3vvJoke3RlbXBbJ+WbveexjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNywgdmFsOiBg5Ye655Sf5pel5pyf77yaJHt0ZW1wWyflh7rnlJ/ml6XmnJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDgsIHZhbDogYOS9j+WdgO+8miR7dGVtcFsn5L2P5Z2AJ10ud29yZHN9YH1cbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdlbmhhbmNlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2VuaGFuY2UnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+W8guW4uOaPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9nZW5lcmFsJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflvILluLjmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMucmVzdWx0LmltZ3VybCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcpO1xuICAgICAgdGhpcy5yZXN1bHQudHlwZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0eXBlJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlc3VsdC50eXBlLCdwYXJhbXMnKTtcbiAgICAgIHRoaXMudXBsb2FkKHRoaXMucmVzdWx0LnR5cGUpO1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==