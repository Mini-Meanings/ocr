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
            wx.navigateTo({
              url: 'preview?id=1'
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Panel;
}(_wepy2.default.component);

exports.default = Panel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhbmVsLmpzIl0sIm5hbWVzIjpbIlBhbmVsIiwibWV0aG9kcyIsInVwbG9hZCIsInd4IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZVBhdGhzIiwiY29uc29sZSIsImxvZyIsInNldFN0b3JhZ2VTeW5jIiwibmF2aWdhdGVUbyIsInVybCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTyxHQUFVO0FBQ1JDLFlBRFEsb0JBQ0M7QUFDUEMsV0FBR0MsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPLENBRE0sRUFDSDtBQUNWQyxvQkFBVSxDQUFDLFVBQUQsRUFBYSxZQUFiLENBRkcsRUFFeUI7QUFDdENDLHNCQUFZLENBQUMsT0FBRCxFQUFVLFFBQVYsQ0FIQyxFQUdvQjtBQUNqQ0MsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QjtBQUNBLGdCQUFJQyxnQkFBZ0JELElBQUlDLGFBQXhCO0FBQ0FDLG9CQUFRQyxHQUFSLENBQVlGLGFBQVosRUFBMEIsZUFBMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBUCxlQUFHVSxjQUFILENBQWtCLFVBQWxCLEVBQTZCSCxjQUFjLENBQWQsQ0FBN0I7QUFDQVAsZUFBR1csVUFBSCxDQUFjO0FBQ1pDLG1CQUFLO0FBRE8sYUFBZDtBQUdEO0FBaEJZLFNBQWY7QUFrQkQ7QUFwQk8sSzs7OztFQUR1QixlQUFLQyxTOztrQkFBbkJoQixLIiwiZmlsZSI6InBhbmVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFuZWwgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICB1cGxvYWQoKSB7XHJcbiAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgICAgY291bnQ6IDEsIC8vIOm7mOiupDlcclxuICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSwgLy8g5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAvLyDlj6/ku6XmjIflrprmnaXmupDmmK/nm7jlhozov5jmmK/nm7jmnLrvvIzpu5jorqTkuozogIXpg73mnIlcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L+U5Zue6YCJ5a6a54Wn54mH55qE5pys5Zyw5paH5Lu26Lev5b6E5YiX6KGo77yMdGVtcEZpbGVQYXRo5Y+v5Lul5L2c5Li6aW1n5qCH562+55qEc3Jj5bGe5oCn5pi+56S65Zu+54mHXHJcbiAgICAgICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBGaWxlUGF0aHMsJ3RlbXBGaWxlUGF0aHMnKTtcclxuICAgICAgICAgICAgLy8gd3gucHJldmlld0ltYWdlKHtcclxuICAgICAgICAgICAgLy8gICBjdXJyZW50OiB0ZW1wRmlsZVBhdGhzWzBdLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXHJcbiAgICAgICAgICAgIC8vICAgdXJsczogdGVtcEZpbGVQYXRocyAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcsdGVtcEZpbGVQYXRoc1swXSk7XHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDogJ3ByZXZpZXc/aWQ9MSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gIH1cclxuIl19