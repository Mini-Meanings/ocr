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
      }]
    }, _this.methods = {
      tap: function tap(e) {
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
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tags, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('tags');
    }
  }]);

  return Tags;
}(_wepy2.default.component);

exports.default = Tags;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhZ3MuanMiXSwibmFtZXMiOlsiVGFncyIsImRhdGEiLCJsaXN0IiwiaWQiLCJ0aXRsZSIsIm1ldGhvZHMiLCJ0YXAiLCJlIiwid3giLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJzZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLEksR0FBTztBQUNMQyxZQUFNLENBQ0o7QUFDRUMsWUFBSSxJQUROO0FBRUVDLGVBQU87QUFGVCxPQURJLEVBS0o7QUFDRUQsWUFBSSxNQUROO0FBRUVDLGVBQU87QUFGVCxPQUxJLEVBU0o7QUFDRUQsWUFBSSxPQUROO0FBRUVDLGVBQU87QUFGVCxPQVRJLEVBYUo7QUFDRUQsWUFBSSxTQUROO0FBRUVDLGVBQU87QUFGVCxPQWJJO0FBREQsSyxRQW9CUEMsTyxHQUFVO0FBQ1JDLFNBRFEsZUFDSEMsQ0FERyxFQUNBO0FBQ05DLFdBQUdDLFdBQUgsQ0FBZTtBQUNiQyxpQkFBTyxDQURNO0FBRWJDLG9CQUFVLENBQUMsVUFBRCxFQUFhLFlBQWIsQ0FGRztBQUdiQyxzQkFBWSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBSEM7QUFJYkMsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixnQkFBSUMsZ0JBQWdCRCxJQUFJQyxhQUF4QjtBQUNBUCxlQUFHUSxjQUFILENBQWtCLFVBQWxCLEVBQTZCRCxjQUFjLENBQWQsQ0FBN0I7O0FBRUEsZ0JBQUdSLE1BQU0sU0FBVCxFQUFvQjtBQUNsQkMsaUJBQUdTLFVBQUgsQ0FBYztBQUNaQztBQURZLGVBQWQ7QUFHQVYsaUJBQUdRLGNBQUgsQ0FBa0IsTUFBbEIsRUFBMEJULENBQTFCO0FBQ0QsYUFMRCxNQUtPO0FBQ0xDLGlCQUFHUyxVQUFILENBQWM7QUFDWkMsdUNBQXFCWDtBQURULGVBQWQ7QUFHQUMsaUJBQUdRLGNBQUgsQ0FBa0IsTUFBbEIsRUFBMEJULENBQTFCO0FBQ0Q7QUFDRjtBQW5CWSxTQUFmO0FBcUJEO0FBdkJPLEs7Ozs7OzZCQTBCQTtBQUNSWSxjQUFRQyxHQUFSLENBQVksTUFBWjtBQUNEOzs7O0VBakQrQixlQUFLQyxTOztrQkFBbEJyQixJIiwiZmlsZSI6InRhZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFncyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdpZCcsXG4gICAgICAgICAgdGl0bGU6ICfouqvku73or4EnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2NhcmQnLFxuICAgICAgICAgIHRpdGxlOiAn6ZO26KGM5Y2hJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdkcml2ZScsXG4gICAgICAgICAgdGl0bGU6ICfpqb7pqbbor4EnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2VuaGFuY2UnLFxuICAgICAgICAgIHRpdGxlOiAn55Sf5YO75a2XJ1xuICAgICAgICB9LFxuICAgICAgXVxuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgdGFwIChlKSB7XG4gICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogMSxcbiAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBsZXQgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzO1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyx0ZW1wRmlsZVBhdGhzWzBdKTtcblxuICAgICAgICAgICAgaWYoZSA9PT0gJ2VuaGFuY2UnKSB7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYGNyb3AxYFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3R5cGUnLCBlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYHByZXZpZXc/dHlwZT0ke2V9YFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3R5cGUnLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICBjb25zb2xlLmxvZygndGFncycpO1xuICAgIH1cbiAgfVxuIl19