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
      copy: []
    }, _this.methods = {
      which: function which() {
        this.result.one = this.result.desc;
      },
      checkboxChange: function checkboxChange(e) {
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
    key: 'upload',
    value: function upload(type) {
      console.log(type, 'upload');
      var self = this;
      wx.showLoading({
        title: '识别中'
      });
      if (type === 'card') {
        wx.uploadFile({
          url: 'https://www.iocr.vip/ai/recogn/bankcard',
          filePath: this.result.imgurl,
          name: 'file',
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
          header: { authid: 'test001' },
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
              self.result.list = [{ id: 0, val: '\u59D3\u540D\uFF1A' + temp['姓名'].words }, { id: 1, val: '\u6027\u522B\uFF1A' + temp['性别'].words }, { id: 2, val: '\u6C11\u65CF\uFF1A' + temp['民族'].words },
              // {id: 3, val: `出生日期：${temp['出生日期'].words}`},
              { id: 4, val: '\u4F4F\u5740\uFF1A' + temp['住址'].words }, { id: 5, val: '\u516C\u6C11\u8EAB\u4EFD\u53F7\u7801\uFF1A' + temp['公民身份号码'].words }];

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
          url: 'https://www.iocr.vip/ai/recogn/general',
          filePath: this.result.imgurl,
          name: 'file',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwibWV0aG9kcyIsIndoaWNoIiwiY2hlY2tib3hDaGFuZ2UiLCJlIiwia2V5cyIsImRldGFpbCIsInZhbHVlIiwic29ydCIsImEiLCJiIiwiaSIsImxlbmd0aCIsInB1c2giLCJ2YWwiLCJjb25zb2xlIiwibG9nIiwic2hhcmUiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ2b2ljZSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwidG9nZ2xlIiwidHJhbnNmZXIiLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInN1Y2Nlc3MiLCJyZXMiLCJ0YXBJbmRleCIsImZhaWwiLCJlcnJNc2ciLCJzZXRDbGlwYm9hcmREYXRhIiwiam9pbiIsImdldENsaXBib2FyZERhdGEiLCJzZWxmIiwic2hvd0xvYWRpbmciLCJ1cGxvYWRGaWxlIiwidXJsIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwic2hvd01vZGFsIiwiY29udGVudCIsImNvbmZpcm0iLCJjYW5jZWwiLCJ0ZW1wIiwiaWQiLCJiYW5rX2NhcmRfbnVtYmVyIiwiYmFua19jYXJkX3R5cGUiLCJiYW5rX25hbWUiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsImVyciIsImhlYWRlciIsImF1dGhpZCIsImZvcm1EYXRhIiwic2lkZSIsIndvcmRzX3Jlc3VsdCIsIndvcmRzIiwicmVzdWx0cyIsIm1hcCIsIml0ZW0iLCJpbmRleCIsImdldFN0b3JhZ2VTeW5jIiwidXBsb2FkIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLGdC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LEVBQXlCO0FBQzlCLGtCQUFJbUUsVUFBVXhFLEtBQUtBLElBQUwsQ0FBVXNFLFlBQVYsQ0FBdUJHLEdBQXZCLENBQTJCLFVBQUNDLElBQUQsRUFBTUMsS0FBTixFQUFnQjtBQUFFLHVCQUFPLEVBQUNoQixJQUFHZ0IsS0FBSixFQUFVckQsS0FBSW9ELEtBQUtILEtBQW5CLEVBQVA7QUFBbUMsZUFBaEYsQ0FBZDtBQUNBO0FBQ0F6QixtQkFBSzdDLE1BQUwsQ0FBWUssSUFBWixHQUFtQmtFLE9BQW5CO0FBQ0ExQixtQkFBSzdDLE1BQUwsQ0FBWUksTUFBWixHQUFxQixJQUFyQjs7QUFFQXlDLG1CQUFLaUIsTUFBTDtBQUNEO0FBQ0RyQyxlQUFHc0MsV0FBSDtBQUNELFdBN0JXO0FBOEJadkIsZ0JBQU0sY0FBU3dCLEdBQVQsRUFBYztBQUNsQjtBQUNBdkMsZUFBR3NDLFdBQUg7QUFDRDtBQWpDVyxTQUFkO0FBbUNEO0FBQ0Y7Ozs2QkFFUztBQUNSLFdBQUsvRCxNQUFMLENBQVlDLE1BQVosR0FBcUJ3QixHQUFHa0QsY0FBSCxDQUFrQixVQUFsQixDQUFyQjtBQUNBLFdBQUszRSxNQUFMLENBQVlNLElBQVosR0FBbUJtQixHQUFHa0QsY0FBSCxDQUFrQixNQUFsQixDQUFuQjtBQUNBO0FBQ0EsV0FBS0MsTUFBTCxDQUFZLEtBQUs1RSxNQUFMLENBQVlNLElBQXhCO0FBQ0FtQixTQUFHQyxhQUFILENBQWlCO0FBQ2ZDLHlCQUFpQjtBQURGLE9BQWpCO0FBR0Q7Ozs7RUFwTmtDLGVBQUtrRCxTOztrQkFBckIvRSxPIiwiZmlsZSI6InByZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlldyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGltZ3VybDogJycsXG4gICAgICAgIGRlc2M6ICcnLFxuICAgICAgICBvbmU6ICfop6PmnpDlm77niYfkuK3vvZ4nLFxuICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICBsaXN0OiBbXSxcbiAgICAgICAgdHlwZTogJydcbiAgICAgIH0sXG4gICAgICBjb3B5OiBbXVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB3aGljaCgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQub25lID0gdGhpcy5yZXN1bHQuZGVzYztcbiAgICAgIH0sXG4gICAgICBjaGVja2JveENoYW5nZShlKSB7XG4gICAgICAgIGxldCBrZXlzID0gZS5kZXRhaWwudmFsdWUuc29ydCgoYSxiKT0+e1xuICAgICAgICAgIHJldHVybiBhLWI7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvcHkgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmNvcHkucHVzaCh0aGlzLnJlc3VsdC5saXN0W2tleXNbaV1dLnZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb3B5KTtcbiAgICAgIH0sXG4gICAgICBzaGFyZSgpIHtcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdm9pY2UoKSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfor63pn7PlkIjmiJDkuK0uLi4nLFxuICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQuc3RhdHVzID0gIXRoaXMucmVzdWx0LnN0YXR1cztcbiAgICAgIH0sXG4gICAgICB0cmFuc2ZlcigpIHtcbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICBpdGVtTGlzdDogWyfkuK3oi7HmlocnLCAn5pel6K+tJywgJ+azleivrSddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcEluZGV4KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvcHkoKSB7XG4gICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgIGRhdGE6IHRoaXMuY29weS5qb2luKCdcXG4nKSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHd4LmdldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmloflrZflt7LlpI3liLYnLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGxvYWQodHlwZSkge1xuICAgICAgY29uc29sZS5sb2codHlwZSwndXBsb2FkJyk7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn6K+G5Yir5LitJyxcbiAgICAgIH0pXG4gICAgICBpZiAodHlwZSA9PT0gJ2NhcmQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2duL2JhbmtjYXJkJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdiYWNrY2FyZCcpO1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflvILluLjmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS5yZXN1bHQ7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDljaHlj7fvvJoke3RlbXAuYmFua19jYXJkX251bWJlcn1gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOexu+Wei++8miR7dGVtcC5iYW5rX2NhcmRfdHlwZSA9PT0gMiA/ICfkv6HnlKjljaEnOiflgJ/orrDljaEnfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMiwgdmFsOiBg6ZO26KGM5ZCN56ew77yaJHt0ZW1wLmJhbmtfbmFtZX1gfVxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZih0eXBlID09PSAnaWQnKSB7XG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9pZGNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDondGVzdDAwMSd9LFxuICAgICAgICAgIGZvcm1EYXRhOiB7XG4gICAgICAgICAgICBzaWRlOiAnZnJvbnQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnaWQgc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+W8guW4uOaPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIC8vIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3JkcyxrZXk6aXRlbVtpdGVtW2luZGV4XV19OyB9KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0cywnc3NzJyk7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0Lmxpc3QgPSByZXN1bHRzO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWnk+WQje+8miR7dGVtcFsn5aeT5ZCNJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAxLCB2YWw6IGDmgKfliKvvvJoke3RlbXBbJ+aAp+WIqyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMiwgdmFsOiBg5rCR5peP77yaJHt0ZW1wWyfmsJHml48nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICAvLyB7aWQ6IDMsIHZhbDogYOWHuueUn+aXpeacn++8miR7dGVtcFsn5Ye655Sf5pel5pyfJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA0LCB2YWw6IGDkvY/lnYDvvJoke3RlbXBbJ+S9j+WdgCddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNSwgdmFsOiBg5YWs5rCR6Lqr5Lu95Y+356CB77yaJHt0ZW1wWyflhazmsJHouqvku73lj7fnoIEnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ24vZ2VuZXJhbCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+W8guW4uOaPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5yZXN1bHQuaW1ndXJsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyk7XG4gICAgICB0aGlzLnJlc3VsdC50eXBlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3R5cGUnKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0LnR5cGUsJ3BhcmFtcycpO1xuICAgICAgdGhpcy51cGxvYWQodGhpcy5yZXN1bHQudHlwZSk7XG4gICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19