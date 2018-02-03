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
      navs: _navs2.default
    }, _this.mixins = [_test2.default], _this.data = {}, _this.methods = {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJ0YWdzIiwibmF2cyIsIm1peGlucyIsImRhdGEiLCJtZXRob2RzIiwidXBsb2FkIiwid3giLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJjb25zb2xlIiwibG9nIiwic2V0U3RvcmFnZVN5bmMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJ0YXBJbmRleCIsImZhaWwiLCJlcnJNc2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWE7QUFDWEMsMEJBRFc7QUFFWEM7QUFGVyxLLFFBS2JDLE0sR0FBUyxnQixRQUVUQyxJLEdBQU8sRSxRQUdQQyxPLEdBQVU7QUFDUkMsWUFEUSxvQkFDQztBQUNQQyxXQUFHQyxXQUFILENBQWU7QUFDYkMsaUJBQU8sQ0FETSxFQUNIO0FBQ1ZDLG9CQUFVLENBQUMsVUFBRCxFQUFhLFlBQWIsQ0FGRyxFQUV5QjtBQUN0Q0Msc0JBQVksQ0FBQyxPQUFELEVBQVUsUUFBVixDQUhDLEVBR29CO0FBQ2pDQyxtQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCO0FBQ0EsZ0JBQUlDLGdCQUFnQkQsSUFBSUMsYUFBeEI7QUFDQUMsb0JBQVFDLEdBQVIsQ0FBWUYsYUFBWixFQUEwQixlQUExQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FQLGVBQUdVLGNBQUgsQ0FBa0IsVUFBbEIsRUFBNkJILGNBQWMsQ0FBZCxDQUE3QjtBQUNBUCxlQUFHVyxVQUFILENBQWM7QUFDWkMsbUJBQUs7QUFETyxhQUFkO0FBR0Q7QUFoQlksU0FBZjtBQWtCRDtBQXBCTyxLOzs7Ozs2QkF1QkQ7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FaLFNBQUdhLGVBQUgsQ0FBbUI7QUFDakJDLGtCQUFVLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBRE87QUFFakJULGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJFLGtCQUFRQyxHQUFSLENBQVlILElBQUlTLFFBQWhCO0FBQ0QsU0FKZ0I7QUFLakJDLGNBQU0sY0FBU1YsR0FBVCxFQUFjO0FBQ2xCRSxrQkFBUUMsR0FBUixDQUFZSCxJQUFJVyxNQUFoQjtBQUNEO0FBUGdCLE9BQW5CO0FBU0Q7Ozs2QkFFUSxDQUNSOzs7O0VBN0RnQyxlQUFLQyxJOztrQkFBbkI1QixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgdGVzdE1peGluIGZyb20gJy4uL21peGlucy90ZXN0JztcbiAgaW1wb3J0IFRhZ3MgZnJvbSAnLi4vY29tcG9uZW50cy90YWdzJztcbiAgaW1wb3J0IE5hdnMgZnJvbSAnLi4vY29tcG9uZW50cy9uYXZzJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ0FJIOivhuWbvidcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHRhZ3M6IFRhZ3MsXG4gICAgICBuYXZzOiBOYXZzXG4gICAgfVxuXG4gICAgbWl4aW5zID0gW3Rlc3RNaXhpbl1cblxuICAgIGRhdGEgPSB7XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHVwbG9hZCgpIHtcbiAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiAxLCAvLyDpu5jorqQ5XG4gICAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvLyDlj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAvLyDlj6/ku6XmjIflrprmnaXmupDmmK/nm7jlhozov5jmmK/nm7jmnLrvvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAvLyDov5Tlm57pgInlrprnhafniYfnmoTmnKzlnLDmlofku7bot6/lvoTliJfooajvvIx0ZW1wRmlsZVBhdGjlj6/ku6XkvZzkuLppbWfmoIfnrb7nmoRzcmPlsZ7mgKfmmL7npLrlm77niYdcbiAgICAgICAgICAgIHZhciB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHM7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wRmlsZVBhdGhzLCd0ZW1wRmlsZVBhdGhzJyk7XG4gICAgICAgICAgICAvLyB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAgICAgLy8gICBjdXJyZW50OiB0ZW1wRmlsZVBhdGhzWzBdLCAvLyDlvZPliY3mmL7npLrlm77niYfnmoRodHRw6ZO+5o6lXG4gICAgICAgICAgICAvLyAgIHVybHM6IHRlbXBGaWxlUGF0aHMgLy8g6ZyA6KaB6aKE6KeI55qE5Zu+54mHaHR0cOmTvuaOpeWIl+ihqFxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcsdGVtcEZpbGVQYXRoc1swXSk7XG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgdXJsOiAncHJldmlldz9pZD0xJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgIH1cblxuICAgIG15dGVzdCgpIHtcbiAgICAgIC8vIHd4LnNob3dNb2RhbCh7XG4gICAgICAvLyAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgIC8vICAgY29udGVudDogJ+i/meaYr+S4gOS4quaooeaAgeW8ueeqlycsXG4gICAgICAvLyAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgLy8gICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgLy8gICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+ehruWumicpXG4gICAgICAvLyAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJylcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pXG4gICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICBpdGVtTGlzdDogWydBJywgJ0InLCAnQyddLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFwSW5kZXgpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgIH1cbiAgfVxuIl19