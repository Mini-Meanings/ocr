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
      wx.showShareMenu({
        withShareTicket: true
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJ0YWdzIiwibmF2cyIsIm15c3dpcGVyIiwicGFuZWwiLCJtaXhpbnMiLCJkYXRhIiwibWV0aG9kcyIsInd4Iiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsInRhcEluZGV4IiwiZmFpbCIsImVyck1zZyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJtYXNrIiwiZHVyYXRpb24iLCJoaWRlTG9hZGluZyIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhO0FBQ1hDLDBCQURXO0FBRVhDLDBCQUZXO0FBR1hDLGdDQUhXO0FBSVhDO0FBSlcsSyxRQU9iQyxNLEdBQVMsZ0IsUUFFVEMsSSxHQUFPLEUsUUFHUEMsTyxHQUFVLEU7Ozs7OzZCQUlEO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxTQUFHQyxlQUFILENBQW1CO0FBQ2pCQyxrQkFBVSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQURPO0FBRWpCQyxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCQyxrQkFBUUMsR0FBUixDQUFZRixJQUFJRyxRQUFoQjtBQUNELFNBSmdCO0FBS2pCQyxjQUFNLGNBQVNKLEdBQVQsRUFBYztBQUNsQkMsa0JBQVFDLEdBQVIsQ0FBWUYsSUFBSUssTUFBaEI7QUFDRDtBQVBnQixPQUFuQjtBQVNEOzs7NkJBRVE7QUFDUFQsU0FBR1UsV0FBSCxDQUFlO0FBQ2JDLGVBQU8sS0FETTtBQUViQyxjQUFNLElBRk87QUFHYkMsa0JBQVU7QUFIRyxPQUFmO0FBS0Q7Ozs4QkFDUztBQUNSYixTQUFHYyxXQUFIO0FBQ0FkLFNBQUdlLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7OztFQXZEZ0MsZUFBS0MsSTs7a0JBQW5CNUIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHRlc3RNaXhpbiBmcm9tICcuLi9taXhpbnMvdGVzdCc7XG4gIGltcG9ydCBUYWdzIGZyb20gJy4uL2NvbXBvbmVudHMvdGFncyc7XG4gIGltcG9ydCBOYXZzIGZyb20gJy4uL2NvbXBvbmVudHMvbmF2cyc7XG4gIGltcG9ydCBNeVN3aXBlciBmcm9tICcuLi9jb21wb25lbnRzL3N3aXBlcic7XG4gIGltcG9ydCBQYW5lbCBmcm9tICcuLi9jb21wb25lbnRzL3BhbmVsJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ0FJIOivhuWbvidcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHRhZ3M6IFRhZ3MsXG4gICAgICBuYXZzOiBOYXZzLFxuICAgICAgbXlzd2lwZXI6IE15U3dpcGVyLFxuICAgICAgcGFuZWw6IFBhbmVsXG4gICAgfVxuXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgIGRhdGEgPSB7XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIFxuICAgIH1cblxuICAgIG15dGVzdCgpIHtcbiAgICAgIC8vIHd4LnNob3dNb2RhbCh7XG4gICAgICAvLyAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIC8vICAgY29udGVudDogJ+i/meaYr+S4gOS4quaooeaAgeW8ueeqlycsXG4gICAgICAvLyAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgLy8gICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgLy8gICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpXG4gICAgICAvLyAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pXG4gICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICBpdGVtTGlzdDogWydBJywgJ0InLCAnQyddLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFwSW5kZXgpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgIGR1cmF0aW9uOiAxNTAwLFxuICAgICAgfSlcbiAgICB9O1xuICAgIG9uUmVhZHkoKSB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgfSlcbiAgICB9O1xuICB9XG4iXX0=