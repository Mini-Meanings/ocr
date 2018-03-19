'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navs = function (_wepy$component) {
  _inherits(Navs, _wepy$component);

  function Navs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Navs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Navs.__proto__ || Object.getPrototypeOf(Navs)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      grouplist: {},
      index: {}
    }, _this.components = {}, _this.methods = {
      tap: function tap() {
        console.log('my nav');
      },
      toGeizan: function toGeizan() {
        console.log(1111);
        // wx.navigateTo({
        //   url: 'money'
        // })
        wx.navigateToMiniProgram({
          appId: 'wx18a2ac992306a5a4',
          path: 'pages/apps/largess/detail?accountId=1393991',
          success: function success(res) {
            // 打开成功
            console.log('to gei zan：', res);
          }
        });
      },
      gotoPage: function gotoPage(e) {
        // console.log(e,'e');
        wx.navigateTo({
          url: e
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Navs;
}(_wepy2.default.component);

exports.default = Navs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdnMuanMiXSwibmFtZXMiOlsiTmF2cyIsInByb3BzIiwiZ3JvdXBsaXN0IiwiaW5kZXgiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCJ0b0dlaXphbiIsInd4IiwibmF2aWdhdGVUb01pbmlQcm9ncmFtIiwiYXBwSWQiLCJwYXRoIiwic3VjY2VzcyIsInJlcyIsImdvdG9QYWdlIiwiZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLEssR0FBUTtBQUNOQyxpQkFBVyxFQURMO0FBRU5DLGFBQU87QUFGRCxLLFFBS1JDLFUsR0FBYSxFLFFBR2JDLE8sR0FBVTtBQUNSQyxTQURRLGlCQUNEO0FBQ0xDLGdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNELE9BSE87QUFJUkMsY0FKUSxzQkFJRztBQUNURixnQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDQTtBQUNBO0FBQ0E7QUFDQUUsV0FBR0MscUJBQUgsQ0FBeUI7QUFDdkJDLGlCQUFPLG9CQURnQjtBQUV2QkMsZ0JBQU0sNkNBRmlCO0FBR3ZCQyxpQkFIdUIsbUJBR2ZDLEdBSGUsRUFHVjtBQUNYO0FBQ0FSLG9CQUFRQyxHQUFSLENBQVksYUFBWixFQUEwQk8sR0FBMUI7QUFDRDtBQU5zQixTQUF6QjtBQVFELE9BakJPO0FBa0JSQyxjQWxCUSxvQkFrQkNDLENBbEJELEVBa0JJO0FBQ1Y7QUFDQVAsV0FBR1EsVUFBSCxDQUFjO0FBQ1pDLGVBQUtGO0FBRE8sU0FBZDtBQUdEO0FBdkJPLEs7Ozs7RUFUc0IsZUFBS0csUzs7a0JBQWxCcEIsSSIsImZpbGUiOiJuYXZzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdnMgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgICBncm91cGxpc3Q6IHt9LFxuICAgICAgaW5kZXg6IHt9XG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgdGFwICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ215IG5hdicpO1xuICAgICAgfSxcbiAgICAgIHRvR2VpemFuKCkge1xuICAgICAgICBjb25zb2xlLmxvZygxMTExKTtcbiAgICAgICAgLy8gd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIC8vICAgdXJsOiAnbW9uZXknXG4gICAgICAgIC8vIH0pXG4gICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XG4gICAgICAgICAgYXBwSWQ6ICd3eDE4YTJhYzk5MjMwNmE1YTQnLFxuICAgICAgICAgIHBhdGg6ICdwYWdlcy9hcHBzL2xhcmdlc3MvZGV0YWlsP2FjY291bnRJZD0xMzkzOTkxJyxcbiAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndG8gZ2VpIHphbu+8micscmVzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgZ290b1BhZ2UoZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhlLCdlJyk7XG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19