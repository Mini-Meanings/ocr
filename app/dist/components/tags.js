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
        id: '0',
        title: '生僻字'
      }, {
        id: '1',
        title: '身份证'
      }, {
        id: '2',
        title: '银行卡'
      }, {
        id: '3',
        title: '驾驶证'
      }]
    }, _this.methods = {
      tap: function tap() {
        console.log('tag click');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhZ3MuanMiXSwibmFtZXMiOlsiVGFncyIsImRhdGEiLCJsaXN0IiwiaWQiLCJ0aXRsZSIsIm1ldGhvZHMiLCJ0YXAiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLEksR0FBTztBQUNMQyxZQUFNLENBQ0o7QUFDRUMsWUFBSSxHQUROO0FBRUVDLGVBQU87QUFGVCxPQURJLEVBS0o7QUFDRUQsWUFBSSxHQUROO0FBRUVDLGVBQU87QUFGVCxPQUxJLEVBU0o7QUFDRUQsWUFBSSxHQUROO0FBRUVDLGVBQU87QUFGVCxPQVRJLEVBYUo7QUFDRUQsWUFBSSxHQUROO0FBRUVDLGVBQU87QUFGVCxPQWJJO0FBREQsSyxRQW9CUEMsTyxHQUFVO0FBQ1JDLFNBRFEsaUJBQ0Q7QUFDTEMsZ0JBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0Q7QUFITyxLOzs7Ozs2QkFNQTtBQUNSRCxjQUFRQyxHQUFSLENBQVksTUFBWjtBQUNEOzs7O0VBN0IrQixlQUFLQyxTOztrQkFBbEJULEkiLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBUYWdzIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICBsaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJzAnLFxuICAgICAgICAgIHRpdGxlOiAn55Sf5YO75a2XJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6ICcxJyxcbiAgICAgICAgICB0aXRsZTogJ+i6q+S7veivgSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnMicsXG4gICAgICAgICAgdGl0bGU6ICfpk7booYzljaEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJzMnLFxuICAgICAgICAgIHRpdGxlOiAn6am+6am26K+BJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0YXAgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygndGFnIGNsaWNrJyk7XG4gICAgICB9LFxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICBjb25zb2xlLmxvZygndGFncycpXG4gICAgfVxuICB9XG4iXX0=