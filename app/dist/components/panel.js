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

var Panel = function (_wepy$component) {
  _inherits(Panel, _wepy$component);

  function Panel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Panel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Panel.__proto__ || Object.getPrototypeOf(Panel)).call.apply(_ref, [this].concat(args))), _this), _this.methods = {
      upload: function upload() {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function success(res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            console.log(tempFilePaths, 'tempFilePaths');
            // wx.previewImage({
            //   current: tempFilePaths[0], // 当前显示图片的http链接
            //   urls: tempFilePaths // 需要预览的图片http链接列表
            // })
            wx.setStorageSync('imageurl', tempFilePaths[0]);
            // wx.navigateTo({
            //   url: 'preview?id=1'
            // })
            wx.navigateTo({
              url: 'crop'
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Panel;
}(_wepy2.default.component);

exports.default = Panel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbmVsLmpzIl0sIm5hbWVzIjpbIlBhbmVsIiwibWV0aG9kcyIsInVwbG9hZCIsInd4IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZVBhdGhzIiwiY29uc29sZSIsImxvZyIsInNldFN0b3JhZ2VTeW5jIiwibmF2aWdhdGVUbyIsInVybCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTyxHQUFVO0FBQ1JDLFlBRFEsb0JBQ0M7QUFDUEMsV0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPLENBRE0sRUFDSDtBQUNWQyxvQkFBVSxDQUFDLFVBQUQsRUFBYSxZQUFiLENBRkcsRUFFeUI7QUFDdENDLHNCQUFZLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FIQyxFQUdvQjtBQUNqQ0MsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QjtBQUNBLGdCQUFJQyxnQkFBZ0JELElBQUlDLGFBQXhCO0FBQ0FDLG9CQUFRQyxHQUFSLENBQVlGLGFBQVosRUFBMEIsZUFBMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBUCxlQUFHVSxjQUFILENBQWtCLFVBQWxCLEVBQTZCSCxjQUFjLENBQWQsQ0FBN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQVAsZUFBR1csVUFBSCxDQUFjO0FBQ1pDLG1CQUFLO0FBRE8sYUFBZDtBQUdEO0FBbkJZLFNBQWY7QUFxQkQ7QUF2Qk8sSzs7OztFQUR1QixlQUFLQyxTOztrQkFBbkJoQixLIiwiZmlsZSI6InBhbmVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgdXBsb2FkKCkge1xyXG4gICAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICAgIGNvdW50OiAxLCAvLyDpu5jorqQ5XHJcbiAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sIC8vIOWPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSwgLy8g5Y+v5Lul5oyH5a6a5p2l5rqQ5piv55u45YaM6L+Y5piv55u45py677yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi/lOWbnumAieWumueFp+eJh+eahOacrOWcsOaWh+S7tui3r+W+hOWIl+ihqO+8jHRlbXBGaWxlUGF0aOWPr+S7peS9nOS4umltZ+agh+etvueahHNyY+WxnuaAp+aYvuekuuWbvueJh1xyXG4gICAgICAgICAgICB2YXIgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wRmlsZVBhdGhzLCd0ZW1wRmlsZVBhdGhzJyk7XHJcbiAgICAgICAgICAgIC8vIHd4LnByZXZpZXdJbWFnZSh7XHJcbiAgICAgICAgICAgIC8vICAgY3VycmVudDogdGVtcEZpbGVQYXRoc1swXSwgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxyXG4gICAgICAgICAgICAvLyAgIHVybHM6IHRlbXBGaWxlUGF0aHMgLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxyXG4gICAgICAgICAgICAvLyB9KVxyXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnLHRlbXBGaWxlUGF0aHNbMF0pO1xyXG4gICAgICAgICAgICAvLyB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgLy8gICB1cmw6ICdwcmV2aWV3P2lkPTEnXHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDogJ2Nyb3AnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgIH1cclxuICB9XHJcbiJdfQ==