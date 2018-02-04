'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _preview = require('./../components/preview.js');

var _preview2 = _interopRequireDefault(_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Contact = function (_wepy$page) {
  _inherits(Contact, _wepy$page);

  function Contact() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Contact);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Contact.__proto__ || Object.getPrototypeOf(Contact)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '建议反馈'
    }, _this.components = { preview: _preview2.default }, _this.data = {
      index: 0,
      array: ['问题', '建议', '优化', '异常']
    }, _this.methods = {
      bindPickerChange: function bindPickerChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.index = e.detail.value;
      },
      goback: function goback() {
        wx.navigateBack({
          delta: 1
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Contact, [{
    key: 'onLoad',
    value: function onLoad() {
      wx.showLoading({
        title: '加载中',
        mask: true,
        duration: 1500
      });
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      wx.hideLoading();
    }
  }]);

  return Contact;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Contact , 'pages/contact'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QuanMiXSwibmFtZXMiOlsiQ29udGFjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwicHJldmlldyIsImRhdGEiLCJpbmRleCIsImFycmF5IiwibWV0aG9kcyIsImJpbmRQaWNrZXJDaGFuZ2UiLCJlIiwiY29uc29sZSIsImxvZyIsImRldGFpbCIsInZhbHVlIiwiZ29iYWNrIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImV2ZW50cyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiZHVyYXRpb24iLCJoaWRlTG9hZGluZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEVBQUNDLDBCQUFELEUsUUFFYkMsSSxHQUFPO0FBQ0xDLGFBQU8sQ0FERjtBQUVMQyxhQUFPLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CO0FBRkYsSyxRQUlQQyxPLEdBQVU7QUFDUkMsd0JBQWtCLDBCQUFTQyxDQUFULEVBQVk7QUFDNUJDLGdCQUFRQyxHQUFSLENBQVksbUJBQVosRUFBaUNGLEVBQUVHLE1BQUYsQ0FBU0MsS0FBMUM7QUFDQSxhQUFLUixLQUFMLEdBQWFJLEVBQUVHLE1BQUYsQ0FBU0MsS0FBdEI7QUFDRCxPQUpPO0FBS1JDLGNBQVEsa0JBQVc7QUFDakJDLFdBQUdDLFlBQUgsQ0FBZ0I7QUFDZEMsaUJBQU87QUFETyxTQUFoQjtBQUdEO0FBVE8sSyxRQVlWQyxNLEdBQVMsRTs7Ozs7NkJBQ0E7QUFDUEgsU0FBR0ksV0FBSCxDQUFlO0FBQ2JDLGVBQU8sS0FETTtBQUViQyxjQUFNLElBRk87QUFHYkMsa0JBQVU7QUFIRyxPQUFmO0FBS0Q7Ozs4QkFDUztBQUNSUCxTQUFHUSxXQUFIO0FBQ0Q7Ozs7RUFoQ2dDLGVBQUtDLEk7O2tCQUFyQnpCLE8iLCJmaWxlIjoiY29udGFjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgUHJldmlldyBmcm9tICcuLi9jb21wb25lbnRzL3ByZXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5bu66K6u5Y+N6aaIJ1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge3ByZXZpZXc6IFByZXZpZXd9O1xuXG4gICAgZGF0YSA9IHtcbiAgICAgIGluZGV4OiAwLFxuICAgICAgYXJyYXk6IFsn6Zeu6aKYJywgJ+W7uuiuricsICfkvJjljJYnLCAn5byC5bi4J10sXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgYmluZFBpY2tlckNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zb2xlLmxvZygncGlja2Vy5Y+R6YCB6YCJ5oup5pS55Y+Y77yM5pC65bim5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgICAgIHRoaXMuaW5kZXggPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIH0sXG4gICAgICBnb2JhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZCgpIHtcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICBtYXNrOiB0cnVlLFxuICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgIH0pXG4gICAgfTtcbiAgICBvblJlYWR5KCkge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICB9O1xufVxuIl19