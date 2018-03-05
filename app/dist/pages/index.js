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
      myswiper: _swiper2.default
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
  }, {
    key: 'onShow',
    value: function onShow() {
      console.log('on show');
      this.$invoke('myswiper', 'getUserInfo');
      this.$invoke('tags', 'getOneLimitTimes');
      // this.getUserInfo();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJ0YWdzIiwibmF2cyIsIm15c3dpcGVyIiwibWl4aW5zIiwiZGF0YSIsIm1ldGhvZHMiLCJ3eCIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0Iiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ0YXBJbmRleCIsImZhaWwiLCJlcnJNc2ciLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsImR1cmF0aW9uIiwiaGlkZUxvYWRpbmciLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0IiwiJGludm9rZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhO0FBQ1hDLDBCQURXO0FBRVhDLDBCQUZXO0FBR1hDO0FBSFcsSyxRQU1iQyxNLEdBQVMsZ0IsUUFFVEMsSSxHQUFPLEUsUUFHUEMsTyxHQUFVLEU7Ozs7OzZCQUlEO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxTQUFHQyxlQUFILENBQW1CO0FBQ2pCQyxrQkFBVSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxDQURPO0FBRWpCQyxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCQyxrQkFBUUMsR0FBUixDQUFZRixJQUFJRyxRQUFoQjtBQUNELFNBSmdCO0FBS2pCQyxjQUFNLGNBQVNKLEdBQVQsRUFBYztBQUNsQkMsa0JBQVFDLEdBQVIsQ0FBWUYsSUFBSUssTUFBaEI7QUFDRDtBQVBnQixPQUFuQjtBQVNEOzs7NkJBRVE7QUFDUFQsU0FBR1UsV0FBSCxDQUFlO0FBQ2JDLGVBQU8sS0FETTtBQUViQyxjQUFNLElBRk87QUFHYkMsa0JBQVU7QUFIRyxPQUFmO0FBS0Q7Ozs4QkFDUztBQUNSYixTQUFHYyxXQUFIO0FBQ0FkLFNBQUdlLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7OzZCQUNRO0FBQ1BYLGNBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0EsV0FBS1csT0FBTCxDQUFhLFVBQWIsRUFBeUIsYUFBekI7QUFDQSxXQUFLQSxPQUFMLENBQWEsTUFBYixFQUFxQixrQkFBckI7QUFDQTtBQUNEOzs7O0VBNURnQyxlQUFLQyxJOztrQkFBbkI1QixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0JztcbiAgaW1wb3J0IFRhZ3MgZnJvbSAnLi4vY29tcG9uZW50cy90YWdzJztcbiAgaW1wb3J0IE5hdnMgZnJvbSAnLi4vY29tcG9uZW50cy9uYXZzJztcbiAgaW1wb3J0IE15U3dpcGVyIGZyb20gJy4uL2NvbXBvbmVudHMvc3dpcGVyJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ0FJIOivhuWbvidcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHRhZ3M6IFRhZ3MsXG4gICAgICBuYXZzOiBOYXZzLFxuICAgICAgbXlzd2lwZXI6IE15U3dpcGVyLFxuICAgIH1cblxuICAgIG1peGlucyA9IFt0ZXN0TWl4aW5dXG5cbiAgICBkYXRhID0ge1xuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBcbiAgICB9XG5cbiAgICBteXRlc3QoKSB7XG4gICAgICAvLyB3eC5zaG93TW9kYWwoe1xuICAgICAgLy8gICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAvLyAgIGNvbnRlbnQ6ICfov5nmmK/kuIDkuKrmqKHmgIHlvLnnqpcnLFxuICAgICAgLy8gICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgIC8vICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKVxuICAgICAgLy8gICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgLy8gICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAvLyAgICAgfVxuICAgICAgLy8gICB9XG4gICAgICAvLyB9KVxuICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgaXRlbUxpc3Q6IFsnQScsICdCJywgJ0MnXSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcEluZGV4KVxuICAgICAgICB9LFxuICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICBtYXNrOiB0cnVlLFxuICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgIH0pXG4gICAgfTtcbiAgICBvblJlYWR5KCkge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgIH0pXG4gICAgfTtcbiAgICBvblNob3coKSB7XG4gICAgICBjb25zb2xlLmxvZygnb24gc2hvdycpO1xuICAgICAgdGhpcy4kaW52b2tlKCdteXN3aXBlcicsICdnZXRVc2VySW5mbycpO1xuICAgICAgdGhpcy4kaW52b2tlKCd0YWdzJywgJ2dldE9uZUxpbWl0VGltZXMnKTtcbiAgICAgIC8vIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgICB9XG4gIH1cbiJdfQ==