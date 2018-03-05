'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./../npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tags = function (_wepy$component) {
  _inherits(Tags, _wepy$component);

  function Tags() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tags);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tags.__proto__ || Object.getPrototypeOf(Tags)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      list: [{
        id: 'id',
        title: '身份证'
      }, {
        id: 'card',
        title: '银行卡'
      }, {
        id: 'drive',
        title: '驾驶证'
      }, {
        id: 'enhance',
        title: '生僻字'
      }],
      count: {
        general: 0,
        receipt: 0, // 票据
        idcard: 0,
        drivecard: 0,
        bankcard: 0,
        enhance: 0
      }
    }, _this.methods = {
      tap: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log(e, 'tap');
                  _context.next = 3;
                  return this.getOneLimitTimes();

                case 3:
                  if (!(e === 'id' && this.count.idcard === 0)) {
                    _context.next = 8;
                    break;
                  }

                  this.showWarn('身份证');
                  return _context.abrupt('return');

                case 8:
                  if (!(e === 'card' && this.count.bankcard === 0)) {
                    _context.next = 13;
                    break;
                  }

                  this.showWarn('银行卡');
                  return _context.abrupt('return');

                case 13:
                  if (!(e === 'drive' && this.count.drivecard === 0)) {
                    _context.next = 18;
                    break;
                  }

                  this.showWarn('驾驶证');
                  return _context.abrupt('return');

                case 18:
                  if (!(e === 'enhance' && this.count.enhance === 0)) {
                    _context.next = 21;
                    break;
                  }

                  this.showWarn('生僻字');
                  return _context.abrupt('return');

                case 21:
                  wx.chooseImage({
                    count: 1,
                    // sizeType: ['original', 'compressed'],
                    sizeType: ['compressed'],
                    sourceType: ['album', 'camera'],
                    success: function success(res) {
                      var tempFilePaths = res.tempFilePaths;
                      wx.setStorageSync('imageurl', tempFilePaths[0]);

                      if (e === 'enhance') {
                        wx.navigateTo({
                          url: 'crop1'
                        });
                        wx.setStorageSync('type', e);
                      } else {
                        wx.navigateTo({
                          url: 'preview?type=' + e
                        });
                        wx.setStorageSync('type', e);
                      }
                    }
                  });

                case 22:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function tap(_x) {
          return _ref2.apply(this, arguments);
        }

        return tap;
      }()
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tags, [{
    key: 'showWarn',
    value: function showWarn(txt) {
      wx.showModal({
        title: '提示',
        confirmText: '帮助',
        // cancelText: '',
        content: '\u4ECA\u65E5' + txt + '\u300C\u514D\u8D39\u300D\u6B21\u6570\u5DF2\u7ECF\u7528\u5B8C\uFF0C\u8BF7\u4F7F\u7528\u5176\u4ED6\u7C7B\u578B\u3002\u6216\u7B49\u5F85\u6B21\u65E5\u6062\u590D\u4F7F\u7528\u6B21\u6570!',
        success: function success(res) {
          if (res.confirm) {
            // console.log('用户点击确定');
            wx.navigateTo({
              url: 'help'
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }, {
    key: 'getOneLimitTimes',
    value: function getOneLimitTimes() {
      // console.log(wx.getStorageSync('userinfo'),'tags');
      if (!wx.getStorageSync('userinfo')) return;
      var self = this;
      wx.request({
        url: 'https://www.iocr.vip/ai/users/times/me',
        header: { authid: wx.getStorageSync('userinfo') },
        success: function success(res) {
          console.log(res.data, 'tags');
          if (res.data.code === 200) {
            var temp = res.data.data;
            self.count = {
              general: temp.general,
              receipt: temp.receipt,
              idcard: temp.idcard,
              drivecard: temp.drivecard,
              bankcard: temp.bankcard,
              enhance: temp.enhance
            };
            self.$apply();
          }
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.getOneLimitTimes();
    }
  }]);

  return Tags;
}(_wepy2.default.component);

exports.default = Tags;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhZ3MuanMiXSwibmFtZXMiOlsiVGFncyIsImRhdGEiLCJsaXN0IiwiaWQiLCJ0aXRsZSIsImNvdW50IiwiZ2VuZXJhbCIsInJlY2VpcHQiLCJpZGNhcmQiLCJkcml2ZWNhcmQiLCJiYW5rY2FyZCIsImVuaGFuY2UiLCJtZXRob2RzIiwidGFwIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJnZXRPbmVMaW1pdFRpbWVzIiwic2hvd1dhcm4iLCJ3eCIsImNob29zZUltYWdlIiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJzZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0eHQiLCJzaG93TW9kYWwiLCJjb25maXJtVGV4dCIsImNvbnRlbnQiLCJjb25maXJtIiwiY2FuY2VsIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZWxmIiwicmVxdWVzdCIsImhlYWRlciIsImF1dGhpZCIsImNvZGUiLCJ0ZW1wIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsSSxHQUFPO0FBQ0xDLFlBQU0sQ0FDSjtBQUNFQyxZQUFJLElBRE47QUFFRUMsZUFBTztBQUZULE9BREksRUFLSjtBQUNFRCxZQUFJLE1BRE47QUFFRUMsZUFBTztBQUZULE9BTEksRUFTSjtBQUNFRCxZQUFJLE9BRE47QUFFRUMsZUFBTztBQUZULE9BVEksRUFhSjtBQUNFRCxZQUFJLFNBRE47QUFFRUMsZUFBTztBQUZULE9BYkksQ0FERDtBQW1CTEMsYUFBTztBQUNMQyxpQkFBUyxDQURKO0FBRUxDLGlCQUFTLENBRkosRUFFTztBQUNaQyxnQkFBUSxDQUhIO0FBSUxDLG1CQUFXLENBSk47QUFLTEMsa0JBQVUsQ0FMTDtBQU1MQyxpQkFBUztBQU5KO0FBbkJGLEssUUE0QlBDLE8sR0FBVTtBQUNGQyxTQURFO0FBQUEsNkZB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R0FBYTtBQUNYQyx1QkFBU21DLEtBQUtuQyxPQURIO0FBRVhDLHVCQUFTa0MsS0FBS2xDLE9BRkg7QUFHWEMsc0JBQVFpQyxLQUFLakMsTUFIRjtBQUlYQyx5QkFBV2dDLEtBQUtoQyxTQUpMO0FBS1hDLHdCQUFVK0IsS0FBSy9CLFFBTEo7QUFNWEMsdUJBQVM4QixLQUFLOUI7QUFOSCxhQUFiO0FBUUF5QixpQkFBS00sTUFBTDtBQUNEO0FBQ0Y7QUFqQlEsT0FBWDtBQW1CRDs7OzZCQUVTO0FBQ1IsV0FBS3pCLGdCQUFMO0FBQ0Q7Ozs7RUFySCtCLGVBQUswQixTOztrQkFBbEIzQyxJIiwiZmlsZSI6InRhZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbic7IFxuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhZ3MgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgZGF0YSA9IHtcbiAgICAgIGxpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnaWQnLFxuICAgICAgICAgIHRpdGxlOiAn6Lqr5Lu96K+BJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdjYXJkJyxcbiAgICAgICAgICB0aXRsZTogJ+mTtuihjOWNoSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnZHJpdmUnLFxuICAgICAgICAgIHRpdGxlOiAn6am+6am26K+BJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdlbmhhbmNlJyxcbiAgICAgICAgICB0aXRsZTogJ+eUn+WDu+WtlydcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBjb3VudDoge1xuICAgICAgICBnZW5lcmFsOiAwLFxuICAgICAgICByZWNlaXB0OiAwLCAvLyDnpajmja5cbiAgICAgICAgaWRjYXJkOiAwLFxuICAgICAgICBkcml2ZWNhcmQ6IDAsXG4gICAgICAgIGJhbmtjYXJkOiAwLFxuICAgICAgICBlbmhhbmNlOiAwLFxuICAgICAgfSxcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGFzeW5jIHRhcCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLCd0YXAnKTtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRPbmVMaW1pdFRpbWVzKCk7XG4gICAgICAgIGlmKGUgPT09ICdpZCcgJiYgdGhpcy5jb3VudC5pZGNhcmQgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnNob3dXYXJuKCfouqvku73or4EnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZihlID09PSAnY2FyZCcgJiYgdGhpcy5jb3VudC5iYW5rY2FyZCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuc2hvd1dhcm4oJ+mTtuihjOWNoScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmKGUgPT09ICdkcml2ZScgJiYgdGhpcy5jb3VudC5kcml2ZWNhcmQgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnNob3dXYXJuKCfpqb7pqbbor4EnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZihlID09PSAnZW5oYW5jZScgJiYgdGhpcy5jb3VudC5lbmhhbmNlID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zaG93V2Fybign55Sf5YO75a2XJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICAvLyBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICAgICAgc2l6ZVR5cGU6IFsnY29tcHJlc3NlZCddLFxuICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgbGV0IHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRocztcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcsdGVtcEZpbGVQYXRoc1swXSk7XG5cbiAgICAgICAgICAgIGlmKGUgPT09ICdlbmhhbmNlJykge1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGBjcm9wMWBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0eXBlJywgZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGBwcmV2aWV3P3R5cGU9JHtlfWBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0eXBlJywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIHNob3dXYXJuICh0eHQpIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgY29uZmlybVRleHQ6ICfluK7liqknLFxuICAgICAgICAvLyBjYW5jZWxUZXh0OiAnJyxcbiAgICAgICAgY29udGVudDogYOS7iuaXpSR7dHh0feOAjOWFjei0ueOAjeasoeaVsOW3sue7j+eUqOWujO+8jOivt+S9v+eUqOWFtuS7luexu+Wei+OAguaIluetieW+heasoeaXpeaBouWkjeS9v+eUqOasoeaVsCFgLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6ICdoZWxwJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0T25lTGltaXRUaW1lcygpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyaW5mbycpLCd0YWdzJyk7XG4gICAgICBpZighd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJpbmZvJykpIHJldHVybjtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS91c2Vycy90aW1lcy9tZScsXG4gICAgICAgIGhlYWRlcjoge2F1dGhpZDp3eC5nZXRTdG9yYWdlU3luYygndXNlcmluZm8nKX0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLCd0YWdzJyk7XG4gICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgICBzZWxmLmNvdW50ID0ge1xuICAgICAgICAgICAgICBnZW5lcmFsOiB0ZW1wLmdlbmVyYWwsXG4gICAgICAgICAgICAgIHJlY2VpcHQ6IHRlbXAucmVjZWlwdCxcbiAgICAgICAgICAgICAgaWRjYXJkOiB0ZW1wLmlkY2FyZCxcbiAgICAgICAgICAgICAgZHJpdmVjYXJkOiB0ZW1wLmRyaXZlY2FyZCxcbiAgICAgICAgICAgICAgYmFua2NhcmQ6IHRlbXAuYmFua2NhcmQsXG4gICAgICAgICAgICAgIGVuaGFuY2U6IHRlbXAuZW5oYW5jZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuZ2V0T25lTGltaXRUaW1lcygpO1xuICAgIH1cbiAgfVxuIl19