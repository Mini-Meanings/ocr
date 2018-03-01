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
      authid: 'temp002'
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
      // console.log('initCopy');
      var keys = this.result.list.sort(function (a, b) {
        return a - b;
      });
      this.copy = [];
      for (var i = 0; i < keys.length; i++) {
        this.copy.push(this.result.list[i].val);
      }
      // console.log(this.copy,'init copy');
    }
  }, {
    key: 'upload',
    value: function upload(type) {
      console.log(type, 'upload');
      var self = this;
      wx.showLoading({
        title: '识别中'
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
                    console.log('用户点击确定');
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
                    console.log('用户点击确定');
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
                    console.log('用户点击确定');
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
                    console.log('用户点击确定');
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
                    console.log('用户点击确定');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwiYXV0aGlkIiwibWV0aG9kcyIsIndoaWNoIiwiY2hlY2tib3hDaGFuZ2UiLCJlIiwia2V5cyIsImRldGFpbCIsInZhbHVlIiwic29ydCIsImEiLCJiIiwiaSIsImxlbmd0aCIsInB1c2giLCJ2YWwiLCJjb25zb2xlIiwibG9nIiwic2hhcmUiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ2b2ljZSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwidG9nZ2xlIiwidHJhbnNmZXIiLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInN1Y2Nlc3MiLCJyZXMiLCJ0YXBJbmRleCIsImZhaWwiLCJlcnJNc2ciLCJzZXRDbGlwYm9hcmREYXRhIiwiam9pbiIsImdldENsaXBib2FyZERhdGEiLCJzZWxmIiwic2hvd0xvYWRpbmciLCJ1cGxvYWRGaWxlIiwidXJsIiwiZmlsZVBhdGgiLCJuYW1lIiwiaGVhZGVyIiwiSlNPTiIsInBhcnNlIiwic2hvd01vZGFsIiwiY29udGVudCIsImNvbmZpcm0iLCJjYW5jZWwiLCJ0ZW1wIiwiaWQiLCJiYW5rX2NhcmRfbnVtYmVyIiwiYmFua19jYXJkX3R5cGUiLCJiYW5rX25hbWUiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsImVyciIsImZvcm1EYXRhIiwic2lkZSIsIndvcmRzX3Jlc3VsdCIsIndvcmRzIiwiaW5pdENvcHkiLCJyZXN1bHRzIiwibWFwIiwiaXRlbSIsImluZGV4IiwiZ2V0U3RvcmFnZVN5bmMiLCJ1cGxvYWQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNB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Y0FBSCxDQUFrQixNQUFsQixDQUFuQjtBQUNBO0FBQ0EsV0FBS0MsTUFBTCxDQUFZLEtBQUs3RSxNQUFMLENBQVlNLElBQXhCO0FBQ0FvQixTQUFHQyxhQUFILENBQWlCO0FBQ2ZDLHlCQUFpQjtBQURGLE9BQWpCO0FBR0Q7Ozs7RUE3VGtDLGVBQUtrRCxTOztrQkFBckJoRixPIiwiZmlsZSI6InByZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlldyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGltZ3VybDogJycsXG4gICAgICAgIGRlc2M6ICcnLFxuICAgICAgICBvbmU6ICfop6PmnpDlm77niYfkuK3vvZ4nLFxuICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICBsaXN0OiBbXSxcbiAgICAgICAgdHlwZTogJydcbiAgICAgIH0sXG4gICAgICBjb3B5OiBbXSxcbiAgICAgIGF1dGhpZDogJ3RlbXAwMDInXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHdoaWNoKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5vbmUgPSB0aGlzLnJlc3VsdC5kZXNjO1xuICAgICAgfSxcbiAgICAgIGNoZWNrYm94Q2hhbmdlKGUpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ2NoZWNrYm94Q2hhbmdlJyk7XG4gICAgICAgIGxldCBrZXlzID0gZS5kZXRhaWwudmFsdWUuc29ydCgoYSxiKT0+e1xuICAgICAgICAgIHJldHVybiBhLWI7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvcHkgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmNvcHkucHVzaCh0aGlzLnJlc3VsdC5saXN0W2tleXNbaV1dLnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb3B5KTtcbiAgICAgIH0sXG4gICAgICBzaGFyZSgpIHtcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdm9pY2UoKSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfor63pn7PlkIjmiJDkuK0uLi4nLFxuICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQuc3RhdHVzID0gIXRoaXMucmVzdWx0LnN0YXR1cztcbiAgICAgIH0sXG4gICAgICB0cmFuc2ZlcigpIHtcbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICBpdGVtTGlzdDogWyfkuK3oi7HmlocnLCAn5pel6K+tJywgJ+azleivrSddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcEluZGV4KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvcHkoKSB7XG4gICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuY29weS5qb2luKCdcXG4nKSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHd4LmdldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmloflrZflt7LlpI3liLYnLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0Q29weSgpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdpbml0Q29weScpO1xuICAgICAgbGV0IGtleXMgPSB0aGlzLnJlc3VsdC5saXN0LnNvcnQoKGEsYik9PntcbiAgICAgICAgcmV0dXJuIGEtYjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5jb3B5ID0gW107XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmNvcHkucHVzaCh0aGlzLnJlc3VsdC5saXN0W2ldLnZhbCk7XG4gICAgICB9XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvcHksJ2luaXQgY29weScpO1xuICAgIH1cblxuICAgIHVwbG9hZCh0eXBlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlLCd1cGxvYWQnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfor4bliKvkuK0nLFxuICAgICAgfSlcbiAgICAgIGlmICh0eXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2JhbmtjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2JhY2tjYXJkJyk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+W8guW4uOaPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLnJlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWNoeWPt++8miR7dGVtcC5iYW5rX2NhcmRfbnVtYmVyfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg57G75Z6L77yaJHt0ZW1wLmJhbmtfY2FyZF90eXBlID09PSAyID8gJ+S/oeeUqOWNoSc6J+WAn+iusOWNoSd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDpk7booYzlkI3np7DvvJoke3RlbXAuYmFua19uYW1lfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdpZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2lkY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnRoaXMuYXV0aGlkfSxcbiAgICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgICAgc2lkZTogJ2Zyb250JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2lkIHN1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflvILluLjmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICAvLyBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHMsa2V5Oml0ZW1baXRlbVtpbmRleF1dfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQ7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDlp5PlkI3vvJoke3RlbXBbJ+Wnk+WQjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5oCn5Yir77yaJHt0ZW1wWyfmgKfliKsnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOawkeaXj++8miR7dGVtcFsn5rCR5pePJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAzLCB2YWw6IGDlh7rnlJ/vvJoke3RlbXBbJ+WHuueUnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5L2P5Z2A77yaJHt0ZW1wWyfkvY/lnYAnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOWFrOawkei6q+S7veWPt+egge+8miR7dGVtcFsn5YWs5rCR6Lqr5Lu95Y+356CBJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi5pbml0Q29weSgpO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZHJpdmUnKSB7XG4gICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbnMvZHJpdmVjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2RyaXZlIHN1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflvILluLjmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICAvLyBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHMsa2V5Oml0ZW1baXRlbVtpbmRleF1dfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQ7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDor4Hlj7fvvJoke3RlbXBbJ+ivgeWPtyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5pyJ5pWI5pyf6ZmQ77yaJHt0ZW1wWyfmnInmlYjmnJ/pmZAnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOWHhumpvui9puWei++8miR7dGVtcFsn5YeG6am+6L2m5Z6LJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAzLCB2YWw6IGDliJ3mrKHpoobor4Hml6XmnJ/vvJoke3RlbXBbJ+WIneasoemihuivgeaXpeacnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOaAp+WIq++8miR7dGVtcFsn5oCn5YirJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA2LCB2YWw6IGDlm73nsY3vvJoke3RlbXBbJ+WbveexjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNywgdmFsOiBg5Ye655Sf5pel5pyf77yaJHt0ZW1wWyflh7rnlJ/ml6XmnJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDgsIHZhbDogYOS9j+WdgO+8miR7dGVtcFsn5L2P5Z2AJ10ud29yZHN9YH1cbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdlbmhhbmNlJykge1xuICAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2VuaGFuY2UnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDp0aGlzLmF1dGhpZH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+W8guW4uOaPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9nZW5lcmFsJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBoZWFkZXI6IHthdXRoaWQ6dGhpcy5hdXRoaWR9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflvILluLjmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMucmVzdWx0LmltZ3VybCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcpO1xuICAgICAgdGhpcy5yZXN1bHQudHlwZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0eXBlJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlc3VsdC50eXBlLCdwYXJhbXMnKTtcbiAgICAgIHRoaXMudXBsb2FkKHRoaXMucmVzdWx0LnR5cGUpO1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==