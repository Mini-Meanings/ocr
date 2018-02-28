'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyCropper = require('./../npm/wepy-cropper/wepy-cropper.js');

var _wepyCropper2 = _interopRequireDefault(_wepyCropper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Crop1 = function (_wepy$page) {
  _inherits(Crop1, _wepy$page);

  function Crop1() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Crop1);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Crop1.__proto__ || Object.getPrototypeOf(Crop1)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      clipParams: {
        src: "", //字符串, 图片path 必填
        mode: "rectangle", //选填,默认rectangle
        /* 两种模式
        通过的mode设定
        mode:'rectangle' 返回图片
        mode:'quadrangle' 并不返回图片，只返回在图片中的四个点，用于perspective correction（可以查找OpenCV相关资料）
        */
        sizeType: ["original"] //数组,选填 ['original', 'compressed'], 默认original
      }
    }, _this.$repeat = {}, _this.$props = { "wepyCropper": { "xmlns:v-bind": "", "v-bind:params.sync": "clipParams" } }, _this.$events = {}, _this.components = {
      wepyCropper: _wepyCropper2.default
    }, _this.events = {
      //裁剪完的图片
      wepyCropperFinsh: function wepyCropperFinsh(path) {
        wx.setStorageSync('imageurl', path);
        wx.redirectTo({
          url: 'preview'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Crop1, [{
    key: 'onLoad',
    value: function onLoad() {
      this.clipParams.src = wx.getStorageSync('imageurl');
    }
  }]);

  return Crop1;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Crop1 , 'pages/crop1'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyb3AxLmpzIl0sIm5hbWVzIjpbIkNyb3AxIiwiZGF0YSIsImNsaXBQYXJhbXMiLCJzcmMiLCJtb2RlIiwic2l6ZVR5cGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJ3ZXB5Q3JvcHBlciIsImV2ZW50cyIsIndlcHlDcm9wcGVyRmluc2giLCJwYXRoIiwid3giLCJzZXRTdG9yYWdlU3luYyIsInJlZGlyZWN0VG8iLCJ1cmwiLCJnZXRTdG9yYWdlU3luYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxJLEdBQU87QUFDTEMsa0JBQVk7QUFDVkMsYUFBSyxFQURLLEVBQ0Q7QUFDVEMsY0FBTSxXQUZJLEVBRVM7QUFDbkI7Ozs7O0FBS0FDLGtCQUFVLENBQUMsVUFBRCxDQVJBLENBUWE7QUFSYjtBQURQLEssUUFZUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsZUFBYyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHNCQUFxQixZQUF4QyxFQUFmLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDO0FBRFUsSyxRQVFaQyxNLEdBQVM7QUFDUDtBQUNBQyxzQkFGTyw0QkFFVUMsSUFGVixFQUVnQjtBQUNyQkMsV0FBR0MsY0FBSCxDQUFrQixVQUFsQixFQUE2QkYsSUFBN0I7QUFDQUMsV0FBR0UsVUFBSCxDQUFjO0FBQ1pDLGVBQUs7QUFETyxTQUFkO0FBR0Q7QUFQTSxLOzs7Ozs2QkFKQTtBQUNQLFdBQUtmLFVBQUwsQ0FBZ0JDLEdBQWhCLEdBQXNCVyxHQUFHSSxjQUFILENBQWtCLFVBQWxCLENBQXRCO0FBQ0Q7Ozs7RUF0QmdDLGVBQUtDLEk7O2tCQUFuQm5CLEsiLCJmaWxlIjoiY3JvcDEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IHdlcHlDcm9wcGVyIGZyb20gJ3dlcHktY3JvcHBlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENyb3AxIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgZGF0YSA9IHtcbiAgICBjbGlwUGFyYW1zOiB7XG4gICAgICBzcmM6IFwiXCIsIC8v5a2X56ym5LiyLCDlm77niYdwYXRoIOW/heWhq1xuICAgICAgbW9kZTogXCJyZWN0YW5nbGVcIiwgLy/pgInloass6buY6K6kcmVjdGFuZ2xlXG4gICAgICAvKiDkuKTnp43mqKHlvI9cbiAgICAgIOmAmui/h+eahG1vZGXorr7lrppcbiAgICAgIG1vZGU6J3JlY3RhbmdsZScg6L+U5Zue5Zu+54mHXG4gICAgICBtb2RlOidxdWFkcmFuZ2xlJyDlubbkuI3ov5Tlm57lm77niYfvvIzlj6rov5Tlm57lnKjlm77niYfkuK3nmoTlm5vkuKrngrnvvIznlKjkuo5wZXJzcGVjdGl2ZSBjb3JyZWN0aW9u77yI5Y+v5Lul5p+l5om+T3BlbkNW55u45YWz6LWE5paZ77yJXG4gICAgICAqL1xuICAgICAgc2l6ZVR5cGU6IFtcIm9yaWdpbmFsXCJdIC8v5pWw57uELOmAieWhqyBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSwg6buY6K6kb3JpZ2luYWxcbiAgICB9XG4gIH07XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ3ZXB5Q3JvcHBlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6cGFyYW1zLnN5bmNcIjpcImNsaXBQYXJhbXNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHdlcHlDcm9wcGVyXG4gIH07XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuY2xpcFBhcmFtcy5zcmMgPSB3eC5nZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnKTtcbiAgfVxuXG4gIGV2ZW50cyA9IHtcbiAgICAvL+ijgeWJquWujOeahOWbvueJh1xuICAgIHdlcHlDcm9wcGVyRmluc2gocGF0aCkge1xuICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyxwYXRoKTtcbiAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICB1cmw6ICdwcmV2aWV3J1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl19