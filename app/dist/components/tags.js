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
        id: 'wyw',
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

            if (e === 'wyw') {
              wx.navigateTo({
                url: 'crop1'
              });
            } else {
              wx.navigateTo({
                url: 'preview?type=' + e
              });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhZ3MuanMiXSwibmFtZXMiOlsiVGFncyIsImRhdGEiLCJsaXN0IiwiaWQiLCJ0aXRsZSIsIm1ldGhvZHMiLCJ0YXAiLCJlIiwid3giLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJzZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLEksR0FBTztBQUNMQyxZQUFNLENBQ0o7QUFDRUMsWUFBSSxJQUROO0FBRUVDLGVBQU87QUFGVCxPQURJLEVBS0o7QUFDRUQsWUFBSSxNQUROO0FBRUVDLGVBQU87QUFGVCxPQUxJLEVBU0o7QUFDRUQsWUFBSSxPQUROO0FBRUVDLGVBQU87QUFGVCxPQVRJLEVBYUo7QUFDRUQsWUFBSSxLQUROO0FBRUVDLGVBQU87QUFGVCxPQWJJO0FBREQsSyxRQW9CUEMsTyxHQUFVO0FBQ1JDLFNBRFEsZUFDSEMsQ0FERyxFQUNBO0FBQ05DLFdBQUdDLFdBQUgsQ0FBZTtBQUNiQyxpQkFBTyxDQURNO0FBRWJDLG9CQUFVLENBQUMsVUFBRCxFQUFhLFlBQWIsQ0FGRztBQUdiQyxzQkFBWSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBSEM7QUFJYkMsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixnQkFBSUMsZ0JBQWdCRCxJQUFJQyxhQUF4QjtBQUNBUCxlQUFHUSxjQUFILENBQWtCLFVBQWxCLEVBQTZCRCxjQUFjLENBQWQsQ0FBN0I7O0FBRUEsZ0JBQUdSLE1BQU0sS0FBVCxFQUFnQjtBQUNkQyxpQkFBR1MsVUFBSCxDQUFjO0FBQ1pDO0FBRFksZUFBZDtBQUdELGFBSkQsTUFJTztBQUNMVixpQkFBR1MsVUFBSCxDQUFjO0FBQ1pDLHVDQUFxQlg7QUFEVCxlQUFkO0FBR0Q7QUFDRjtBQWpCWSxTQUFmO0FBbUJEO0FBckJPLEs7Ozs7OzZCQXdCQTtBQUNSWSxjQUFRQyxHQUFSLENBQVksTUFBWjtBQUNEOzs7O0VBL0MrQixlQUFLQyxTOztrQkFBbEJyQixJIiwiZmlsZSI6InRhZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFncyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgbGlzdDogW1xuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdpZCcsXG4gICAgICAgICAgdGl0bGU6ICfouqvku73or4EnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2NhcmQnLFxuICAgICAgICAgIHRpdGxlOiAn6ZO26KGM5Y2hJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICdkcml2ZScsXG4gICAgICAgICAgdGl0bGU6ICfpqb7pqbbor4EnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ3d5dycsXG4gICAgICAgICAgdGl0bGU6ICfnlJ/lg7vlrZcnXG4gICAgICAgIH0sXG4gICAgICBdXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0YXAgKGUpIHtcbiAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHM7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnLHRlbXBGaWxlUGF0aHNbMF0pO1xuXG4gICAgICAgICAgICBpZihlID09PSAnd3l3Jykge1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGBjcm9wMWBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGBwcmV2aWV3P3R5cGU9JHtlfWBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgY29uc29sZS5sb2coJ3RhZ3MnKVxuICAgIH1cbiAgfVxuIl19