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

var Navs = function (_wepy$component) {
  _inherits(Navs, _wepy$component);

  function Navs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Navs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Navs.__proto__ || Object.getPrototypeOf(Navs)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      grouplist: {},
      index: {}
    }, _this.components = {}, _this.methods = {
      tap: function tap() {
        console.log('my nav');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Navs;
}(_wepy2.default.component);

exports.default = Navs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdi5qcyJdLCJuYW1lcyI6WyJOYXZzIiwicHJvcHMiLCJncm91cGxpc3QiLCJpbmRleCIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwidGFwIiwiY29uc29sZSIsImxvZyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsYUFBTztBQUZELEssUUFLUkMsVSxHQUFhLEUsUUFHYkMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0Q7QUFDTEMsZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0Q7QUFITyxLOzs7O0VBVHNCLGVBQUtDLFM7O2tCQUFsQlQsSSIsImZpbGUiOiJuYXYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2cyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGdyb3VwbGlzdDoge30sXG4gICAgICBpbmRleDoge31cbiAgICB9XG5cbiAgICBjb21wb25lbnRzID0ge1xuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0YXAgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnbXkgbmF2Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=