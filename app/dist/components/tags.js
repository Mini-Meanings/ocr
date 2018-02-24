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
        id: 'enhance',
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

            if (e === 'enhance') {
              wx.navigateTo({
                url: 'crop1'
              });
            } else {
              wx.navigateTo({
                url: 'preview?type=' + e
              });
              wx.setStorageSync('type', e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhZ3MuanMiXSwibmFtZXMiOlsiVGFncyIsImRhdGEiLCJsaXN0IiwiaWQiLCJ0aXRsZSIsIm1ldGhvZHMiLCJ0YXAiLCJlIiwid3giLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJzZXRTdG9yYWdlU3luYyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7Ozs7OztrTEFDbkJDLEksR0FBTztBQUNMQyxZQUFNLENBQ0o7QUFDRUMsWUFBSSxJQUROO0FBRUVDLGVBQU87QUFGVCxPQURJLEVBS0o7QUFDRUQsWUFBSSxNQUROO0FBRUVDLGVBQU87QUFGVCxPQUxJLEVBU0o7QUFDRUQsWUFBSSxPQUROO0FBRUVDLGVBQU87QUFGVCxPQVRJLEVBYUo7QUFDRUQsWUFBSSxTQUROO0FBRUVDLGVBQU87QUFGVCxPQWJJO0FBREQsSyxRQW9CUEMsTyxHQUFVO0FBQ1JDLFNBRFEsZUFDSEMsQ0FERyxFQUNBO0FBQ05DLFdBQUdDLFdBQUgsQ0FBZTtBQUNiQyxpQkFBTyxDQURNO0FBRWJDLG9CQUFVLENBQUMsVUFBRCxFQUFhLFlBQWIsQ0FGRztBQUdiQyxzQkFBWSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBSEM7QUFJYkMsbUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixnQkFBSUMsZ0JBQWdCRCxJQUFJQyxhQUF4QjtBQUNBUCxlQUFHUSxjQUFILENBQWtCLFVBQWxCLEVBQTZCRCxjQUFjLENBQWQsQ0FBN0I7O0FBRUEsZ0JBQUdSLE1BQU0sU0FBVCxFQUFvQjtBQUNsQkMsaUJBQUdTLFVBQUgsQ0FBYztBQUNaQztBQURZLGVBQWQ7QUFHRCxhQUpELE1BSU87QUFDTFYsaUJBQUdTLFVBQUgsQ0FBYztBQUNaQyx1Q0FBcUJYO0FBRFQsZUFBZDtBQUdBQyxpQkFBR1EsY0FBSCxDQUFrQixNQUFsQixFQUEwQlQsQ0FBMUI7QUFDRDtBQUNGO0FBbEJZLFNBQWY7QUFvQkQ7QUF0Qk8sSzs7Ozs7NkJBeUJBO0FBQ1JZLGNBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0Q7Ozs7RUFoRCtCLGVBQUtDLFM7O2tCQUFsQnJCLEkiLCJmaWxlIjoidGFncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBUYWdzIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICBsaXN0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2lkJyxcbiAgICAgICAgICB0aXRsZTogJ+i6q+S7veivgSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnY2FyZCcsXG4gICAgICAgICAgdGl0bGU6ICfpk7booYzljaEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogJ2RyaXZlJyxcbiAgICAgICAgICB0aXRsZTogJ+mpvumptuivgSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnZW5oYW5jZScsXG4gICAgICAgICAgdGl0bGU6ICfnlJ/lg7vlrZcnXG4gICAgICAgIH0sXG4gICAgICBdXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0YXAgKGUpIHtcbiAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSxcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHM7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnLHRlbXBGaWxlUGF0aHNbMF0pO1xuXG4gICAgICAgICAgICBpZihlID09PSAnZW5oYW5jZScpIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgY3JvcDFgXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgcHJldmlldz90eXBlPSR7ZX1gXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndHlwZScsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0YWdzJyk7XG4gICAgfVxuICB9XG4iXX0=