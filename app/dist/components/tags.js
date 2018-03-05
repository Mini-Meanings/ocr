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
                  _context.next = 2;
                  return this.getOneLimitTimes();

                case 2:
                  if (!(e === 'id' && this.count.idcard === 0)) {
                    _context.next = 7;
                    break;
                  }

                  this.showWarn('身份证');
                  return _context.abrupt('return');

                case 7:
                  if (!(e === 'card' && this.count.bankcard === 0)) {
                    _context.next = 12;
                    break;
                  }

                  this.showWarn('银行卡');
                  return _context.abrupt('return');

                case 12:
                  if (!(e === 'drive' && this.count.drivecard === 0)) {
                    _context.next = 17;
                    break;
                  }

                  this.showWarn('驾驶证');
                  return _context.abrupt('return');

                case 17:
                  if (!(e === 'enhance' && this.count.enhance === 0)) {
                    _context.next = 20;
                    break;
                  }

                  this.showWarn('生僻字');
                  return _context.abrupt('return');

                case 20:
                  wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
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

                case 21:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhZ3MuanMiXSwibmFtZXMiOlsiVGFncyIsImRhdGEiLCJsaXN0IiwiaWQiLCJ0aXRsZSIsImNvdW50IiwiZ2VuZXJhbCIsInJlY2VpcHQiLCJpZGNhcmQiLCJkcml2ZWNhcmQiLCJiYW5rY2FyZCIsImVuaGFuY2UiLCJtZXRob2RzIiwidGFwIiwiZSIsImdldE9uZUxpbWl0VGltZXMiLCJzaG93V2FybiIsInd4IiwiY2hvb3NlSW1hZ2UiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVQYXRocyIsInNldFN0b3JhZ2VTeW5jIiwibmF2aWdhdGVUbyIsInVybCIsInR4dCIsInNob3dNb2RhbCIsImNvbmZpcm1UZXh0IiwiY29udGVudCIsImNvbmZpcm0iLCJjYW5jZWwiLCJjb25zb2xlIiwibG9nIiwiZ2V0U3RvcmFnZVN5bmMiLCJzZWxmIiwicmVxdWVzdCIsImhlYWRlciIsImF1dGhpZCIsImNvZGUiLCJ0ZW1wIiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsSSxHQUFPO0FBQ0xDLFlBQU0sQ0FDSjtBQUNFQyxZQUFJLElBRE47QUFFRUMsZUFBTztBQUZULE9BREksRUFLSjtBQUNFRCxZQUFJLE1BRE47QUFFRUMsZUFBTztBQUZULE9BTEksRUFTSjtBQUNFRCxZQUFJLE9BRE47QUFFRUMsZUFBTztBQUZULE9BVEksRUFhSjtBQUNFRCxZQUFJLFNBRE47QUFFRUMsZUFBTztBQUZULE9BYkksQ0FERDtBQW1CTEMsYUFBTztBQUNMQyxpQkFBUyxDQURKO0FBRUxDLGlCQUFTLENBRkosRUFFTztBQUNaQyxnQkFBUSxDQUhIO0FBSUxDLG1CQUFXLENBSk47QUFLTEMsa0JBQVUsQ0FMTDtBQU1MQyxpQkFBUztBQU5KO0FBbkJGLEssUUE0QlBDLE8sR0FBVTtBQUNGQyxTQURFO0FBQUEsNkZBQ0dDLENBREg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBRUEsS0FBS0MsZ0JBQUwsRUFGQTs7QUFBQTtBQUFBLHdCQUdIRCxNQUFNLElBQU4sSUFBYyxLQUFLVCxLQUFMLENBQVdHLE1BQVgsS0FBc0IsQ0FIakM7QUFBQTtBQUFBO0FBQUE7O0FBSUosdUJBQUtRLFFBQUwsQ0FBYyxLQUFkO0FBSkk7O0FBQUE7QUFBQSx3QkFNSUYsTUFBTSxNQUFOLElBQWdCLEtBQUtULEtBQUwsQ0FBV0ssUUFBWCxLQUF3QixDQU41QztBQUFBO0FBQUE7QUFBQTs7QUFPSix1QkFBS00sUUFBTCxDQUFjLEtBQWQ7QUFQSTs7QUFBQTtBQUFBLHdCQVNJRixNQUFNLE9BQU4sSUFBaUIsS0FBS1QsS0FBTCxDQUFXSSxTQUFYLEtBQXlCLENBVDlDO0FBQUE7QUFBQTtBQUFBOztBQVVKLHVCQUFLTyxRQUFMLENBQWMsS0FBZDtBQVZJOztBQUFBO0FBQUEsd0JBWUlGLE1BQU0sU0FBTixJQUFtQixLQUFLVCxLQUFMLENBQVdNLE9BQVgsS0FBdUIsQ0FaOUM7QUFBQTtBQUFBO0FBQUE7O0FBYUosdUJBQUtLLFFBQUwsQ0FBYyxLQUFkO0FBYkk7O0FBQUE7QUFnQk5DLHFCQUFHQyxXQUFILENBQWU7QUFDYmIsMkJBQU8sQ0FETTtBQUViYyw4QkFBVSxDQUFDLFVBQUQsRUFBYSxZQUFiLENBRkc7QUFHYkMsZ0NBQVksQ0FBQyxPQUFELEVBQVUsUUFBVixDQUhDO0FBSWJDLDZCQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEIsMEJBQUlDLGdCQUFnQkQsSUFBSUMsYUFBeEI7QUFDQU4seUJBQUdPLGNBQUgsQ0FBa0IsVUFBbEIsRUFBNkJELGNBQWMsQ0FBZCxDQUE3Qjs7QUFFQSwwQkFBR1QsTUFBTSxTQUFULEVBQW9CO0FBQ2xCRywyQkFBR1EsVUFBSCxDQUFjO0FBQ1pDO0FBRFkseUJBQWQ7QUFHQVQsMkJBQUdPLGNBQUgsQ0FBa0IsTUFBbEIsRUFBMEJWLENBQTFCO0FBQ0QsdUJBTEQsTUFLTztBQUNMRywyQkFBR1EsVUFBSCxDQUFjO0FBQ1pDLGlEQUFxQlo7QUFEVCx5QkFBZDtBQUdBRywyQkFBR08sY0FBSCxDQUFrQixNQUFsQixFQUEwQlYsQ0FBMUI7QUFDRDtBQUNGO0FBbkJZLG1CQUFmOztBQWhCTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLEs7Ozs7OzZCQXdDQWEsRyxFQUFLO0FBQ2JWLFNBQUdXLFNBQUgsQ0FBYTtBQUNYeEIsZUFBTyxJQURJO0FBRVh5QixxQkFBYSxJQUZGO0FBR1g7QUFDQUMsa0NBQWNILEdBQWQsMExBSlc7QUFLWE4saUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixjQUFJQSxJQUFJUyxPQUFSLEVBQWlCO0FBQ2Y7QUFDQWQsZUFBR1EsVUFBSCxDQUFjO0FBQ1pDLG1CQUFLO0FBRE8sYUFBZDtBQUdELFdBTEQsTUFLTyxJQUFJSixJQUFJVSxNQUFSLEVBQWdCO0FBQ3JCQyxvQkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQUNGO0FBZFUsT0FBYjtBQWdCRDs7O3VDQUVrQjtBQUNqQjtBQUNBLFVBQUcsQ0FBQ2pCLEdBQUdrQixjQUFILENBQWtCLFVBQWxCLENBQUosRUFBbUM7QUFDbkMsVUFBSUMsT0FBTyxJQUFYO0FBQ0FuQixTQUFHb0IsT0FBSCxDQUFXO0FBQ1RYLGFBQUssd0NBREk7QUFFVFksZ0JBQVEsRUFBQ0MsUUFBT3RCLEdBQUdrQixjQUFILENBQWtCLFVBQWxCLENBQVIsRUFGQztBQUdUZCxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCVyxrQkFBUUMsR0FBUixDQUFZWixJQUFJckIsSUFBaEIsRUFBcUIsTUFBckI7QUFDQSxjQUFHcUIsSUFBSXJCLElBQUosQ0FBU3VDLElBQVQsS0FBa0IsR0FBckIsRUFBMEI7QUFDeEIsZ0JBQUlDLE9BQU9uQixJQUFJckIsSUFBSixDQUFTQSxJQUFwQjtBQUNBbUMsaUJBQUsvQixLQUFMLEdBQWE7QUFDWEMsdUJBQVNtQyxLQUFLbkMsT0FESDtBQUVYQyx1QkFBU2tDLEtBQUtsQyxPQUZIO0FBR1hDLHNCQUFRaUMsS0FBS2pDLE1BSEY7QUFJWEMseUJBQVdnQyxLQUFLaEMsU0FKTDtBQUtYQyx3QkFBVStCLEtBQUsvQixRQUxKO0FBTVhDLHVCQUFTOEIsS0FBSzlCO0FBTkgsYUFBYjtBQVFBeUIsaUJBQUtNLE1BQUw7QUFDRDtBQUNGO0FBakJRLE9BQVg7QUFtQkQ7Ozs2QkFFUztBQUNSLFdBQUszQixnQkFBTDtBQUNEOzs7O0VBbkgrQixlQUFLNEIsUzs7a0JBQWxCM0MsSSIsImZpbGUiOiJ0YWdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nOyBcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBUYWdzIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICBsaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2lkJyxcbiAgICAgICAgICB0aXRsZTogJ+i6q+S7veivgSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnY2FyZCcsXG4gICAgICAgICAgdGl0bGU6ICfpk7booYzljaEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2RyaXZlJyxcbiAgICAgICAgICB0aXRsZTogJ+mpvumptuivgSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnZW5oYW5jZScsXG4gICAgICAgICAgdGl0bGU6ICfnlJ/lg7vlrZcnXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgY291bnQ6IHtcbiAgICAgICAgZ2VuZXJhbDogMCxcbiAgICAgICAgcmVjZWlwdDogMCwgLy8g56Wo5o2uXG4gICAgICAgIGlkY2FyZDogMCxcbiAgICAgICAgZHJpdmVjYXJkOiAwLFxuICAgICAgICBiYW5rY2FyZDogMCxcbiAgICAgICAgZW5oYW5jZTogMCxcbiAgICAgIH0sXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBhc3luYyB0YXAgKGUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRPbmVMaW1pdFRpbWVzKCk7XG4gICAgICAgIGlmKGUgPT09ICdpZCcgJiYgdGhpcy5jb3VudC5pZGNhcmQgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnNob3dXYXJuKCfouqvku73or4EnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZihlID09PSAnY2FyZCcgJiYgdGhpcy5jb3VudC5iYW5rY2FyZCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuc2hvd1dhcm4oJ+mTtuihjOWNoScpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmKGUgPT09ICdkcml2ZScgJiYgdGhpcy5jb3VudC5kcml2ZWNhcmQgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnNob3dXYXJuKCfpqb7pqbbor4EnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZihlID09PSAnZW5oYW5jZScgJiYgdGhpcy5jb3VudC5lbmhhbmNlID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5zaG93V2Fybign55Sf5YO75a2XJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBsZXQgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzO1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyx0ZW1wRmlsZVBhdGhzWzBdKTtcblxuICAgICAgICAgICAgaWYoZSA9PT0gJ2VuaGFuY2UnKSB7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYGNyb3AxYFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3R5cGUnLCBlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYHByZXZpZXc/dHlwZT0ke2V9YFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3R5cGUnLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1dhcm4gKHR4dCkge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICBjb25maXJtVGV4dDogJ+W4ruWKqScsXG4gICAgICAgIC8vIGNhbmNlbFRleHQ6ICcnLFxuICAgICAgICBjb250ZW50OiBg5LuK5pelJHt0eHR944CM5YWN6LS544CN5qyh5pWw5bey57uP55So5a6M77yM6K+35L2/55So5YW25LuW57G75Z6L44CC5oiW562J5b6F5qyh5pel5oGi5aSN5L2/55So5qyh5pWwIWAsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpO1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJ2hlbHAnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRPbmVMaW1pdFRpbWVzKCkge1xuICAgICAgLy8gY29uc29sZS5sb2cod3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJpbmZvJyksJ3RhZ3MnKTtcbiAgICAgIGlmKCF3eC5nZXRTdG9yYWdlU3luYygndXNlcmluZm8nKSkgcmV0dXJuO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3VzZXJzL3RpbWVzL21lJyxcbiAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyaW5mbycpfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEsJ3RhZ3MnKTtcbiAgICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIGxldCB0ZW1wID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICAgIHNlbGYuY291bnQgPSB7XG4gICAgICAgICAgICAgIGdlbmVyYWw6IHRlbXAuZ2VuZXJhbCxcbiAgICAgICAgICAgICAgcmVjZWlwdDogdGVtcC5yZWNlaXB0LFxuICAgICAgICAgICAgICBpZGNhcmQ6IHRlbXAuaWRjYXJkLFxuICAgICAgICAgICAgICBkcml2ZWNhcmQ6IHRlbXAuZHJpdmVjYXJkLFxuICAgICAgICAgICAgICBiYW5rY2FyZDogdGVtcC5iYW5rY2FyZCxcbiAgICAgICAgICAgICAgZW5oYW5jZTogdGVtcC5lbmhhbmNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5nZXRPbmVMaW1pdFRpbWVzKCk7XG4gICAgfVxuICB9XG4iXX0=