'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _preview = require('./../components/preview.js');

var _preview2 = _interopRequireDefault(_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Help = function (_wepy$page) {
  _inherits(Help, _wepy$page);

  function Help() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Help);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Help.__proto__ || Object.getPrototypeOf(Help)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '帮助文档'
    }, _this.components = { preview: _preview2.default }, _this.data = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Help, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Help;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Help , 'pages/help'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHAuanMiXSwibmFtZXMiOlsiSGVscCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwicHJldmlldyIsImRhdGEiLCJtZXRob2RzIiwiZXZlbnRzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDakJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRUFBQ0MsMEJBQUQsRSxRQUViQyxJLEdBQU8sRSxRQUNQQyxPLEdBQVUsRSxRQUVWQyxNLEdBQVMsRTs7Ozs7NkJBQ0EsQ0FBRTs7OztFQVZtQixlQUFLQyxJOztrQkFBbEJSLEkiLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgUHJldmlldyBmcm9tICcuLi9jb21wb25lbnRzL3ByZXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWxwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5biu5Yqp5paH5qGjJ1xuICAgIH1cbiAgICBjb21wb25lbnRzID0ge3ByZXZpZXc6IFByZXZpZXd9O1xuXG4gICAgZGF0YSA9IHt9O1xuICAgIG1ldGhvZHMgPSB7fTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZCgpIHt9O1xufVxuIl19