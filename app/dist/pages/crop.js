'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _cropper = require('./../components/cropper.js');

var _cropper2 = _interopRequireDefault(_cropper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var device = wx.getSystemInfoSync();
var width = device.windowWidth;
var height = device.windowHeight - 50;

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      cropperOpt: {
        width: width,
        height: height,
        scale: 2.5,
        zoom: 8,
        cut: {
          x: (width - 300) / 2,
          y: (height - 300) / 2,
          width: 300,
          height: 300
        }
      },
      imgurl: '',
      desc: ''
    }, _this.$repeat = {}, _this.$props = { "cropper": { "xmlns:v-bind": "", "v-bind:options.once": "cropperOpt", "bindbeforeImageLoad": "bl" } }, _this.$events = {}, _this.components = {
      cropper: _cropper2.default
    }, _this.events = {
      ready: function ready() {
        console.log('we-cropper ready');
      },
      beforeImageLoad: function beforeImageLoad() {
        console.log('we-cropper beforeImageLoad');
      },
      imageLoad: function imageLoad() {
        console.log('we-cropper imageLoad');
      },
      beforeDraw: function beforeDraw() {
        console.log('we-cropper beforeDraw');
      }
    }, _this.methods = {
      getCropperImage: function getCropperImage() {
        var self = this;
        wx.showLoading({
          title: '加载中'
        });
        this.$invoke('cropper', 'getCropperImage', function (src) {
          console.log(src, 'src');
          wx.uploadFile({
            url: 'https://www.iocr.vip/ai/recogn/general',
            filePath: src,
            name: 'file',
            success: function success(res) {
              var data = JSON.parse(res.data);
              console.log(data.data.words_result, 'success');

              var results = data.data.words_result.map(function (item) {
                return item.words;
              });
              console.log(results, 'results');
              self.desc = results.join('');
              // self.result.status = true;

              self.$apply();
              wx.hideLoading();
            }
          });
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'cropWindow',
    value: function cropWindow() {
      this.imgurl = wx.getStorageSync('imageurl');
      this.$invoke('cropper', 'pushOrigin', this.imgurl);
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.cropWindow();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/crop'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNyb3AuanMiXSwibmFtZXMiOlsiZGV2aWNlIiwid3giLCJnZXRTeXN0ZW1JbmZvU3luYyIsIndpZHRoIiwid2luZG93V2lkdGgiLCJoZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJJbmRleCIsImRhdGEiLCJjcm9wcGVyT3B0Iiwic2NhbGUiLCJ6b29tIiwiY3V0IiwieCIsInkiLCJpbWd1cmwiLCJkZXNjIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY3JvcHBlciIsImV2ZW50cyIsInJlYWR5IiwiY29uc29sZSIsImxvZyIsImJlZm9yZUltYWdlTG9hZCIsImltYWdlTG9hZCIsImJlZm9yZURyYXciLCJtZXRob2RzIiwiZ2V0Q3JvcHBlckltYWdlIiwic2VsZiIsInNob3dMb2FkaW5nIiwidGl0bGUiLCIkaW52b2tlIiwic3JjIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwibmFtZSIsInN1Y2Nlc3MiLCJyZXMiLCJKU09OIiwicGFyc2UiLCJ3b3Jkc19yZXN1bHQiLCJyZXN1bHRzIiwibWFwIiwiaXRlbSIsIndvcmRzIiwiam9pbiIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwiZ2V0U3RvcmFnZVN5bmMiLCJjcm9wV2luZG93IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsU0FBU0MsR0FBR0MsaUJBQUgsRUFBZjtBQUNBLElBQU1DLFFBQVFILE9BQU9JLFdBQXJCO0FBQ0EsSUFBTUMsU0FBU0wsT0FBT00sWUFBUCxHQUFzQixFQUFyQzs7SUFFcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsSSxHQUFPO0FBQ0xDLGtCQUFZO0FBQ1ZOLG9CQURVO0FBRVZFLHNCQUZVO0FBR1ZLLGVBQU8sR0FIRztBQUlWQyxjQUFNLENBSkk7QUFLVkMsYUFBSztBQUNIQyxhQUFHLENBQUNWLFFBQVEsR0FBVCxJQUFnQixDQURoQjtBQUVIVyxhQUFHLENBQUNULFNBQVMsR0FBVixJQUFpQixDQUZqQjtBQUdIRixpQkFBTyxHQUhKO0FBSUhFLGtCQUFRO0FBSkw7QUFMSyxPQURQO0FBYUxVLGNBQVEsRUFiSDtBQWNMQyxZQUFNO0FBZEQsSyxRQWlCUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsV0FBVSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHVCQUFzQixZQUF6QyxFQUFzRCx1QkFBc0IsSUFBNUUsRUFBWCxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQztBQURVLEssUUFJWkMsTSxHQUFTO0FBQ1BDLFdBRE8sbUJBQ0U7QUFDUEMsZ0JBQVFDLEdBQVIsQ0FBWSxrQkFBWjtBQUNELE9BSE07QUFJUEMscUJBSk8sNkJBSVk7QUFDakJGLGdCQUFRQyxHQUFSLENBQVksNEJBQVo7QUFDRCxPQU5NO0FBT1BFLGVBUE8sdUJBT007QUFDWEgsZ0JBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNELE9BVE07QUFVUEcsZ0JBVk8sd0JBVU87QUFDWkosZ0JBQVFDLEdBQVIsQ0FBWSx1QkFBWjtBQUNEO0FBWk0sSyxRQWVUSSxPLEdBQVU7QUFDUkMscUJBRFEsNkJBQ1c7QUFDakIsWUFBSUMsT0FBTyxJQUFYO0FBQ0E5QixXQUFHK0IsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPO0FBRE0sU0FBZjtBQUdBLGFBQUtDLE9BQUwsQ0FBYSxTQUFiLEVBQXdCLGlCQUF4QixFQUEyQyxVQUFDQyxHQUFELEVBQVM7QUFDbERYLGtCQUFRQyxHQUFSLENBQVlVLEdBQVosRUFBZ0IsS0FBaEI7QUFDQWxDLGFBQUdtQyxVQUFILENBQWM7QUFDWkMsaUJBQUksd0NBRFE7QUFFWkMsc0JBQVVILEdBRkU7QUFHWkksa0JBQU0sTUFITTtBQUlaQyxxQkFBUyxpQkFBU0MsR0FBVCxFQUFhO0FBQ3BCLGtCQUFJakMsT0FBT2tDLEtBQUtDLEtBQUwsQ0FBV0YsSUFBSWpDLElBQWYsQ0FBWDtBQUNBZ0Isc0JBQVFDLEdBQVIsQ0FBWWpCLEtBQUtBLElBQUwsQ0FBVW9DLFlBQXRCLEVBQW1DLFNBQW5DOztBQUVBLGtCQUFJQyxVQUFVckMsS0FBS0EsSUFBTCxDQUFVb0MsWUFBVixDQUF1QkUsR0FBdkIsQ0FBMkIsVUFBQ0MsSUFBRCxFQUFVO0FBQUUsdUJBQU9BLEtBQUtDLEtBQVo7QUFBb0IsZUFBM0QsQ0FBZDtBQUNBeEIsc0JBQVFDLEdBQVIsQ0FBWW9CLE9BQVosRUFBb0IsU0FBcEI7QUFDQWQsbUJBQUtmLElBQUwsR0FBWTZCLFFBQVFJLElBQVIsQ0FBYSxFQUFiLENBQVo7QUFDQTs7QUFFQWxCLG1CQUFLbUIsTUFBTDtBQUNBakQsaUJBQUdrRCxXQUFIO0FBQ0Q7QUFmVyxXQUFkO0FBaUJELFNBbkJEO0FBb0JEO0FBMUJPLEs7Ozs7O2lDQTZCSTtBQUNaLFdBQUtwQyxNQUFMLEdBQWNkLEdBQUdtRCxjQUFILENBQWtCLFVBQWxCLENBQWQ7QUFDQSxXQUFLbEIsT0FBTCxDQUFhLFNBQWIsRUFBd0IsWUFBeEIsRUFBc0MsS0FBS25CLE1BQTNDO0FBQ0Q7Ozs2QkFFUztBQUNSLFdBQUtzQyxVQUFMO0FBQ0Q7Ozs7RUE1RWdDLGVBQUtDLEk7O2tCQUFuQi9DLEsiLCJmaWxlIjoiY3JvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgQ3JvcHBlciBmcm9tICcuLi9jb21wb25lbnRzL2Nyb3BwZXInO1xuY29uc3QgZGV2aWNlID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbmNvbnN0IHdpZHRoID0gZGV2aWNlLndpbmRvd1dpZHRoO1xuY29uc3QgaGVpZ2h0ID0gZGV2aWNlLndpbmRvd0hlaWdodCAtIDUwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGRhdGEgPSB7XG4gICAgY3JvcHBlck9wdDoge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBzY2FsZTogMi41LFxuICAgICAgem9vbTogOCxcbiAgICAgIGN1dDoge1xuICAgICAgICB4OiAod2lkdGggLSAzMDApIC8gMixcbiAgICAgICAgeTogKGhlaWdodCAtIDMwMCkgLyAyLFxuICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICBoZWlnaHQ6IDMwMFxuICAgICAgfVxuICAgIH0sXG4gICAgaW1ndXJsOiAnJyxcbiAgICBkZXNjOiAnJ1xuICB9XG5cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNyb3BwZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm9wdGlvbnMub25jZVwiOlwiY3JvcHBlck9wdFwiLFwiYmluZGJlZm9yZUltYWdlTG9hZFwiOlwiYmxcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGNyb3BwZXI6IENyb3BwZXJcbiAgfVxuXG4gIGV2ZW50cyA9IHtcbiAgICByZWFkeSAoKSB7XG4gICAgICBjb25zb2xlLmxvZygnd2UtY3JvcHBlciByZWFkeScpO1xuICAgIH0sXG4gICAgYmVmb3JlSW1hZ2VMb2FkICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd3ZS1jcm9wcGVyIGJlZm9yZUltYWdlTG9hZCcpO1xuICAgIH0sXG4gICAgaW1hZ2VMb2FkICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd3ZS1jcm9wcGVyIGltYWdlTG9hZCcpO1xuICAgIH0sXG4gICAgYmVmb3JlRHJhdyAoKSB7XG4gICAgICBjb25zb2xlLmxvZygnd2UtY3JvcHBlciBiZWZvcmVEcmF3Jyk7XG4gICAgfVxuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBnZXRDcm9wcGVySW1hZ2UgKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICB9KVxuICAgICAgdGhpcy4kaW52b2tlKCdjcm9wcGVyJywgJ2dldENyb3BwZXJJbWFnZScsIChzcmMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coc3JjLCdzcmMnKTtcbiAgICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ24vZ2VuZXJhbCcsXG4gICAgICAgICAgZmlsZVBhdGg6IHNyYyxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGEud29yZHNfcmVzdWx0LCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0pID0+IHsgcmV0dXJuIGl0ZW0ud29yZHM7IH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0cywncmVzdWx0cycpO1xuICAgICAgICAgICAgc2VsZi5kZXNjID0gcmVzdWx0cy5qb2luKCcnKTtcbiAgICAgICAgICAgIC8vIHNlbGYucmVzdWx0LnN0YXR1cyA9IHRydWU7XG5cbiAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgY3JvcFdpbmRvdyAoKSB7XG4gICAgdGhpcy5pbWd1cmwgPSB3eC5nZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnKTtcbiAgICB0aGlzLiRpbnZva2UoJ2Nyb3BwZXInLCAncHVzaE9yaWdpbicsIHRoaXMuaW1ndXJsKTtcbiAgfVxuXG4gIG9uTG9hZCAoKSB7XG4gICAgdGhpcy5jcm9wV2luZG93KCk7XG4gIH1cbn1cbiJdfQ==