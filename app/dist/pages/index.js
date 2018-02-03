'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

var _tags = require('./../components/tags.js');

var _tags2 = _interopRequireDefault(_tags);

var _navs = require('./../components/navs.js');

var _navs2 = _interopRequireDefault(_navs);

var _swiper = require('./../components/swiper.js');

var _swiper2 = _interopRequireDefault(_swiper);

var _panel = require('./../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: 'AI 识图'
    }, _this.components = {
      tags: _tags2.default,
      navs: _navs2.default,
      myswiper: _swiper2.default,
      panel: _panel2.default
    }, _this.mixins = [_test2.default], _this.data = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'mytest',
    value: function mytest() {
      // wx.showModal({
      //   title: '提示',
      //   content: '这是一个模态弹窗',
      //   success: function(res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
      wx.showActionSheet({
        itemList: ['A', 'B', 'C'],
        success: function success(res) {
          console.log(res.tapIndex);
        },
        fail: function fail(res) {
          console.log(res.errMsg);
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJ0YWdzIiwibmF2cyIsIm15c3dpcGVyIiwicGFuZWwiLCJtaXhpbnMiLCJkYXRhIiwibWV0aG9kcyIsInd4Iiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsInRhcEluZGV4IiwiZmFpbCIsImVyck1zZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWEMsMEJBRFc7QUFFWEMsMEJBRlc7QUFHWEMsZ0NBSFc7QUFJWEM7QUFKVyxLLFFBT2JDLE0sR0FBUyxnQixRQUVUQyxJLEdBQU8sRSxRQUdQQyxPLEdBQVUsRTs7Ozs7NkJBSUQ7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLFNBQUdDLGVBQUgsQ0FBbUI7QUFDakJDLGtCQUFVLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBRE87QUFFakJDLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJDLGtCQUFRQyxHQUFSLENBQVlGLElBQUlHLFFBQWhCO0FBQ0QsU0FKZ0I7QUFLakJDLGNBQU0sY0FBU0osR0FBVCxFQUFjO0FBQ2xCQyxrQkFBUUMsR0FBUixDQUFZRixJQUFJSyxNQUFoQjtBQUNEO0FBUGdCLE9BQW5CO0FBU0Q7Ozs2QkFFUSxDQUNSOzs7O0VBNUNnQyxlQUFLQyxJOztrQkFBbkJyQixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0JztcbiAgaW1wb3J0IFRhZ3MgZnJvbSAnLi4vY29tcG9uZW50cy90YWdzJztcbiAgaW1wb3J0IE5hdnMgZnJvbSAnLi4vY29tcG9uZW50cy9uYXZzJztcbiAgaW1wb3J0IE15U3dpcGVyIGZyb20gJy4uL2NvbXBvbmVudHMvc3dpcGVyJztcbiAgaW1wb3J0IFBhbmVsIGZyb20gJy4uL2NvbXBvbmVudHMvcGFuZWwnO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAnQUkg6K+G5Zu+J1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgICAgdGFnczogVGFncyxcbiAgICAgIG5hdnM6IE5hdnMsXG4gICAgICBteXN3aXBlcjogTXlTd2lwZXIsXG4gICAgICBwYW5lbDogUGFuZWxcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgXG4gICAgfVxuXG4gICAgbXl0ZXN0KCkge1xuICAgICAgLy8gd3guc2hvd01vZGFsKHtcbiAgICAgIC8vICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgLy8gICBjb250ZW50OiAn6L+Z5piv5LiA5Liq5qih5oCB5by556qXJyxcbiAgICAgIC8vICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAvLyAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJylcbiAgICAgIC8vICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKVxuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSlcbiAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgIGl0ZW1MaXN0OiBbJ0EnLCAnQicsICdDJ10sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleClcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZylcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgfVxuICB9XG4iXX0=