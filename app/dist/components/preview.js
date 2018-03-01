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
              self.result.list = [{ id: 0, val: '\u59D3\u540D\uFF1A' + temp['姓名'].words }, { id: 1, val: '\u6027\u522B\uFF1A' + temp['性别'].words }, { id: 2, val: '\u6C11\u65CF\uFF1A' + temp['民族'].words }, { id: 3, val: '\u51FA\u751F\uFF1A' + temp['出生'].words }, { id: 4, val: '\u4F4F\u5740\uFF1A' + temp['住址'].words }, { id: 5, val: '\u516C\u6C11\u8EAB\u4EFD\u53F7\u7801\uFF1A' + temp['公民身份号码'].words }];

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
      } else if (type === 'drive') {
        wx.uploadFile({
          url: 'https://www.iocr.vip/ai/recogns/drivecard',
          filePath: this.result.imgurl,
          name: 'file',
          header: { authid: 'test001' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsInR5cGUiLCJjb3B5IiwibWV0aG9kcyIsIndoaWNoIiwiY2hlY2tib3hDaGFuZ2UiLCJlIiwia2V5cyIsImRldGFpbCIsInZhbHVlIiwic29ydCIsImEiLCJiIiwiaSIsImxlbmd0aCIsInB1c2giLCJ2YWwiLCJjb25zb2xlIiwibG9nIiwic2hhcmUiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ2b2ljZSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwidG9nZ2xlIiwidHJhbnNmZXIiLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInN1Y2Nlc3MiLCJyZXMiLCJ0YXBJbmRleCIsImZhaWwiLCJlcnJNc2ciLCJzZXRDbGlwYm9hcmREYXRhIiwiam9pbiIsImdldENsaXBib2FyZERhdGEiLCJzZWxmIiwic2hvd0xvYWRpbmciLCJ1cGxvYWRGaWxlIiwidXJsIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwic2hvd01vZGFsIiwiY29udGVudCIsImNvbmZpcm0iLCJjYW5jZWwiLCJ0ZW1wIiwiaWQiLCJiYW5rX2NhcmRfbnVtYmVyIiwiYmFua19jYXJkX3R5cGUiLCJiYW5rX25hbWUiLCIkYXBwbHkiLCJoaWRlTG9hZGluZyIsImVyciIsImhlYWRlciIsImF1dGhpZCIsImZvcm1EYXRhIiwic2lkZSIsIndvcmRzX3Jlc3VsdCIsIndvcmRzIiwicmVzdWx0cyIsIm1hcCIsIml0ZW0iLCJpbmRleCIsImdldFN0b3JhZ2VTeW5jIiwidXBsb2FkIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLGdC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QUFLN0MsTUFBTCxDQUFZSSxNQUFaLEdBQXFCLElBQXJCOztBQUVBeUMsbUJBQUtpQixNQUFMO0FBQ0Q7QUFDRHJDLGVBQUdzQyxXQUFIO0FBQ0QsV0E3Qlc7QUE4Qlp2QixnQkFBTSxjQUFTd0IsR0FBVCxFQUFjO0FBQ2xCO0FBQ0F2QyxlQUFHc0MsV0FBSDtBQUNEO0FBakNXLFNBQWQ7QUFtQ0Q7QUFDRjs7OzZCQUVTO0FBQ1IsV0FBSy9ELE1BQUwsQ0FBWUMsTUFBWixHQUFxQndCLEdBQUdrRCxjQUFILENBQWtCLFVBQWxCLENBQXJCO0FBQ0EsV0FBSzNFLE1BQUwsQ0FBWU0sSUFBWixHQUFtQm1CLEdBQUdrRCxjQUFILENBQWtCLE1BQWxCLENBQW5CO0FBQ0E7QUFDQSxXQUFLQyxNQUFMLENBQVksS0FBSzVFLE1BQUwsQ0FBWU0sSUFBeEI7QUFDQW1CLFNBQUdDLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7OztFQXZRa0MsZUFBS2tELFM7O2tCQUFyQi9FLE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgaW1ndXJsOiAnJyxcbiAgICAgICAgZGVzYzogJycsXG4gICAgICAgIG9uZTogJ+ino+aekOWbvueJh+S4re+9nicsXG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgIGxpc3Q6IFtdLFxuICAgICAgICB0eXBlOiAnJ1xuICAgICAgfSxcbiAgICAgIGNvcHk6IFtdXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHdoaWNoKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5vbmUgPSB0aGlzLnJlc3VsdC5kZXNjO1xuICAgICAgfSxcbiAgICAgIGNoZWNrYm94Q2hhbmdlKGUpIHtcbiAgICAgICAgbGV0IGtleXMgPSBlLmRldGFpbC52YWx1ZS5zb3J0KChhLGIpPT57XG4gICAgICAgICAgcmV0dXJuIGEtYjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29weSA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuY29weS5wdXNoKHRoaXMucmVzdWx0Lmxpc3Rba2V5c1tpXV0udmFsKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvcHkpO1xuICAgICAgfSxcbiAgICAgIHNoYXJlKCkge1xuICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB2b2ljZSgpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+ivremfs+WQiOaIkOS4rS4uLicsXG4gICAgICAgICAgaWNvbjogJ2xvYWRpbmcnLFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgPSAhdGhpcy5yZXN1bHQuc3RhdHVzO1xuICAgICAgfSxcbiAgICAgIHRyYW5zZmVyKCkge1xuICAgICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICAgIGl0ZW1MaXN0OiBbJ+S4reiLseaWhycsICfml6Xor60nLCAn5rOV6K+tJ10sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFwSW5kZXgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29weSgpIHtcbiAgICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgZGF0YTogdGhpcy5jb3B5LmpvaW4oJ1xcbicpLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgd3guZ2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ+aWh+Wtl+W3suWkjeWIticsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIHVwbG9hZCh0eXBlKSB7XG4gICAgICBjb25zb2xlLmxvZyh0eXBlLCd1cGxvYWQnKTtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfor4bliKvkuK0nLFxuICAgICAgfSlcbiAgICAgIGlmICh0eXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ24vYmFua2NhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2JhY2tjYXJkJyk7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+W8guW4uOaPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCB0ZW1wID0gZGF0YS5kYXRhLnJlc3VsdDtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IFtcbiAgICAgICAgICAgICAgICB7aWQ6IDAsIHZhbDogYOWNoeWPt++8miR7dGVtcC5iYW5rX2NhcmRfbnVtYmVyfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg57G75Z6L77yaJHt0ZW1wLmJhbmtfY2FyZF90eXBlID09PSAyID8gJ+S/oeeUqOWNoSc6J+WAn+iusOWNoSd9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDpk7booYzlkI3np7DvvJoke3RlbXAuYmFua19uYW1lfWB9XG4gICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmKHR5cGUgPT09ICdpZCcpIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ25zL2lkY2FyZCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgaGVhZGVyOiB7YXV0aGlkOid0ZXN0MDAxJ30sXG4gICAgICAgICAgZm9ybURhdGE6IHtcbiAgICAgICAgICAgIHNpZGU6ICdmcm9udCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLCdpZCBzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5byC5bi45o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBkYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHJlc3VsdHMgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0Lm1hcCgoaXRlbSxpbmRleCkgPT4geyByZXR1cm4ge2lkOmluZGV4LHZhbDppdGVtLndvcmRzLGtleTppdGVtW2l0ZW1baW5kZXhdXX07IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgbGV0IHRlbXAgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0O1xuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gW1xuICAgICAgICAgICAgICAgIHtpZDogMCwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDEsIHZhbDogYOaAp+WIq++8miR7dGVtcFsn5oCn5YirJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAyLCB2YWw6IGDmsJHml4/vvJoke3RlbXBbJ+awkeaXjyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMywgdmFsOiBg5Ye655Sf77yaJHt0ZW1wWyflh7rnlJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDQsIHZhbDogYOS9j+WdgO+8miR7dGVtcFsn5L2P5Z2AJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA1LCB2YWw6IGDlhazmsJHouqvku73lj7fnoIHvvJoke3RlbXBbJ+WFrOawkei6q+S7veWPt+eggSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnIsJ2VycicpO1xuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkcml2ZScpIHtcbiAgICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2ducy9kcml2ZWNhcmQnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICAgIGhlYWRlcjoge2F1dGhpZDondGVzdDAwMSd9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEsJ2RyaXZlIHN1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnZXJyb3InKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflvILluLjmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhLnN0YXR1cyA9PT0gJ29rJykge1xuICAgICAgICAgICAgICAvLyBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHMsa2V5Oml0ZW1baXRlbVtpbmRleF1dfTsgfSk7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3NzcycpO1xuICAgICAgICAgICAgICAvLyBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgLy8gc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBsZXQgdGVtcCA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQ7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0Lmxpc3QgPSBbXG4gICAgICAgICAgICAgICAge2lkOiAwLCB2YWw6IGDor4Hlj7fvvJoke3RlbXBbJ+ivgeWPtyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogMSwgdmFsOiBg5pyJ5pWI5pyf6ZmQ77yaJHt0ZW1wWyfmnInmlYjmnJ/pmZAnXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDIsIHZhbDogYOWHhumpvui9puWei++8miR7dGVtcFsn5YeG6am+6L2m5Z6LJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiAzLCB2YWw6IGDliJ3mrKHpoobor4Hml6XmnJ/vvJoke3RlbXBbJ+WIneasoemihuivgeaXpeacnyddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNCwgdmFsOiBg5aeT5ZCN77yaJHt0ZW1wWyflp5PlkI0nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDUsIHZhbDogYOaAp+WIq++8miR7dGVtcFsn5oCn5YirJ10ud29yZHN9YH0sXG4gICAgICAgICAgICAgICAge2lkOiA2LCB2YWw6IGDlm73nsY3vvJoke3RlbXBbJ+WbveexjSddLndvcmRzfWB9LFxuICAgICAgICAgICAgICAgIHtpZDogNywgdmFsOiBg5Ye655Sf5pel5pyf77yaJHt0ZW1wWyflh7rnlJ/ml6XmnJ8nXS53b3Jkc31gfSxcbiAgICAgICAgICAgICAgICB7aWQ6IDgsIHZhbDogYOS9j+WdgO+8miR7dGVtcFsn5L2P5Z2AJ10ud29yZHN9YH1cbiAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyLCdlcnInKTtcbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ24vZ2VuZXJhbCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+W8guW4uOaPkOekuicsXG4gICAgICAgICAgICAgICAgY29udGVudDogZGF0YS5kYXRhLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0saW5kZXgpID0+IHsgcmV0dXJuIHtpZDppbmRleCx2YWw6aXRlbS53b3Jkc307IH0pO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICAgICAgc2VsZi5yZXN1bHQubGlzdCA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVyciwnZXJyJyk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5yZXN1bHQuaW1ndXJsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyk7XG4gICAgICB0aGlzLnJlc3VsdC50eXBlID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3R5cGUnKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0LnR5cGUsJ3BhcmFtcycpO1xuICAgICAgdGhpcy51cGxvYWQodGhpcy5yZXN1bHQudHlwZSk7XG4gICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19