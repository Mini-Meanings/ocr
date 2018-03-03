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
      },
      toGeizan: function toGeizan() {
        console.log(1111);
        // wx.navigateToMiniProgram({
        //   appId: 
        // })
      },
      gotoPage: function gotoPage(e) {
        // console.log(e,'e');
        wx.navigateTo({
          url: e
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Navs;
}(_wepy2.default.component);

exports.default = Navs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdnMuanMiXSwibmFtZXMiOlsiTmF2cyIsInByb3BzIiwiZ3JvdXBsaXN0IiwiaW5kZXgiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsInRhcCIsImNvbnNvbGUiLCJsb2ciLCJ0b0dlaXphbiIsImdvdG9QYWdlIiwiZSIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7Ozs7O2tMQUNuQkMsSyxHQUFRO0FBQ05DLGlCQUFXLEVBREw7QUFFTkMsYUFBTztBQUZELEssUUFLUkMsVSxHQUFhLEUsUUFHYkMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0Q7QUFDTEMsZ0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0QsT0FITztBQUlSQyxjQUpRLHNCQUlHO0FBQ1RGLGdCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNBO0FBQ0E7QUFDQTtBQUNELE9BVE87QUFVUkUsY0FWUSxvQkFVQ0MsQ0FWRCxFQVVJO0FBQ1Y7QUFDQUMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUtIO0FBRE8sU0FBZDtBQUdEO0FBZk8sSzs7OztFQVRzQixlQUFLSSxTOztrQkFBbEJmLEkiLCJmaWxlIjoibmF2cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZzIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIHByb3BzID0ge1xuICAgICAgZ3JvdXBsaXN0OiB7fSxcbiAgICAgIGluZGV4OiB7fVxuICAgIH1cblxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRhcCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdteSBuYXYnKTtcbiAgICAgIH0sXG4gICAgICB0b0dlaXphbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coMTExMSk7XG4gICAgICAgIC8vIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XG4gICAgICAgIC8vICAgYXBwSWQ6IFxuICAgICAgICAvLyB9KVxuICAgICAgfSxcbiAgICAgIGdvdG9QYWdlKGUpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZSwnZScpO1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6IGVcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==