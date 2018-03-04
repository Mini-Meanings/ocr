'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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
      navigationBarTitleText: '赞赏'
    }, _this.data = {}, _this.methods = {
      previewImg: function previewImg() {
        wx.previewImage({
          current: 'https://www.iocr.vip/ai/money.jpeg', // 当前显示图片的http链接
          urls: ['https://www.iocr.vip/ai/money.jpeg'] // 需要预览的图片http链接列表
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Contact, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Contact;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Contact , 'pages/money'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vbmV5LmpzIl0sIm5hbWVzIjpbIkNvbnRhY3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1ldGhvZHMiLCJwcmV2aWV3SW1nIiwid3giLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwidXJscyIsImV2ZW50cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTyxFLFFBRVBDLE8sR0FBVTtBQUNSQyxnQkFEUSx3QkFDSztBQUNYQyxXQUFHQyxZQUFILENBQWdCO0FBQ2RDLG1CQUFTLG9DQURLLEVBQ2lDO0FBQy9DQyxnQkFBTSxDQUFDLG9DQUFELENBRlEsQ0FFK0I7QUFGL0IsU0FBaEI7QUFJRDtBQU5PLEssUUFTVkMsTSxHQUFTLEU7Ozs7OzZCQUNBLENBQ1I7Ozs7RUFsQmdDLGVBQUtDLEk7O2tCQUFyQlgsTyIsImZpbGUiOiJtb25leS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3QgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfotZ7otY8nXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICBwcmV2aWV3SW1nKCkge1xuICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAgIGN1cnJlbnQ6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS9tb25leS5qcGVnJywgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxuICAgICAgICAgIHVybHM6IFsnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvbW9uZXkuanBlZyddIC8vIOmcgOimgemihOiniOeahOWbvueJh2h0dHDpk77mjqXliJfooahcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZXZlbnRzID0ge307XG4gICAgb25Mb2FkKCkge1xuICAgIH07XG59XG4iXX0=