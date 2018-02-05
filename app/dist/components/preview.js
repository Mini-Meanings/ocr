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

var Preview = function (_wepy$component) {
  _inherits(Preview, _wepy$component);

  function Preview() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Preview.__proto__ || Object.getPrototypeOf(Preview)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      result: {
        imgurl: '',
        desc: '',
        one: ''
      }
    }, _this.methods = {
      which: function which() {
        this.result.one = this.result.desc;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Preview, [{
    key: 'upload',
    value: function upload() {
      var self = this;
      var ctx = wx.createCanvasContext('myCanvas');
      wx.showLoading({
        title: '加载中'
      });
      wx.uploadFile({
        url: 'https://www.iocr.vip/ai/recogn/general',
        filePath: this.result.imgurl,
        name: 'file',
        success: function success(res) {
          // wx.showToast({
          //   title: '成功',
          //   icon: 'success',
          //   duration: 2000
          // })
          var data = JSON.parse(res.data);
          console.log(data.data.words_result[0], 'success');
          //do something
          self.result.desc = data.data.words_result[0].words;
          self.$apply();

          // ctx.rect(10, 10, 100, 50);
          ctx.rect(data.data.words_result[0].location.left - 80, data.data.words_result[0].location.top, data.data.words_result[0].location.width - 350, 26);
          ctx.setStrokeStyle('red');
          ctx.stroke();
          ctx.draw();

          wx.hideLoading();
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.result.imgurl = wx.getStorageSync('imageurl');
      // this.upload();
    }
  }]);

  return Preview;
}(_wepy2.default.component);

exports.default = Preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwibWV0aG9kcyIsIndoaWNoIiwic2VsZiIsImN0eCIsInd4IiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJ1cGxvYWRGaWxlIiwidXJsIiwiZmlsZVBhdGgiLCJuYW1lIiwic3VjY2VzcyIsInJlcyIsIkpTT04iLCJwYXJzZSIsImNvbnNvbGUiLCJsb2ciLCJ3b3Jkc19yZXN1bHQiLCJ3b3JkcyIsIiRhcHBseSIsInJlY3QiLCJsb2NhdGlvbiIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsInNldFN0cm9rZVN0eWxlIiwic3Ryb2tlIiwiZHJhdyIsImhpZGVMb2FkaW5nIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNLEVBRkE7QUFHTkMsYUFBSztBQUhDO0FBREgsSyxRQVFQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOLGFBQUtMLE1BQUwsQ0FBWUcsR0FBWixHQUFrQixLQUFLSCxNQUFMLENBQVlFLElBQTlCO0FBQ0Q7QUFITyxLOzs7Ozs2QkFNRDtBQUNQLFVBQUlJLE9BQU8sSUFBWDtBQUNBLFVBQU1DLE1BQU1DLEdBQUdDLG1CQUFILENBQXVCLFVBQXZCLENBQVo7QUFDQUQsU0FBR0UsV0FBSCxDQUFlO0FBQ2JDLGVBQU87QUFETSxPQUFmO0FBR0FILFNBQUdJLFVBQUgsQ0FBYztBQUNaQyxhQUFJLHdDQURRO0FBRVpDLGtCQUFVLEtBQUtkLE1BQUwsQ0FBWUMsTUFGVjtBQUdaYyxjQUFNLE1BSE07QUFJWkMsaUJBQVMsaUJBQVNDLEdBQVQsRUFBYTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBSWxCLE9BQU9tQixLQUFLQyxLQUFMLENBQVdGLElBQUlsQixJQUFmLENBQVg7QUFDQXFCLGtCQUFRQyxHQUFSLENBQVl0QixLQUFLQSxJQUFMLENBQVV1QixZQUFWLENBQXVCLENBQXZCLENBQVosRUFBc0MsU0FBdEM7QUFDQTtBQUNBaEIsZUFBS04sTUFBTCxDQUFZRSxJQUFaLEdBQW1CSCxLQUFLQSxJQUFMLENBQVV1QixZQUFWLENBQXVCLENBQXZCLEVBQTBCQyxLQUE3QztBQUNBakIsZUFBS2tCLE1BQUw7O0FBRUE7QUFDQWpCLGNBQUlrQixJQUFKLENBQ0UxQixLQUFLQSxJQUFMLENBQVV1QixZQUFWLENBQXVCLENBQXZCLEVBQTBCSSxRQUExQixDQUFtQ0MsSUFBbkMsR0FBd0MsRUFEMUMsRUFFRTVCLEtBQUtBLElBQUwsQ0FBVXVCLFlBQVYsQ0FBdUIsQ0FBdkIsRUFBMEJJLFFBQTFCLENBQW1DRSxHQUZyQyxFQUdFN0IsS0FBS0EsSUFBTCxDQUFVdUIsWUFBVixDQUF1QixDQUF2QixFQUEwQkksUUFBMUIsQ0FBbUNHLEtBQW5DLEdBQXlDLEdBSDNDLEVBSUUsRUFKRjtBQU1BdEIsY0FBSXVCLGNBQUosQ0FBbUIsS0FBbkI7QUFDQXZCLGNBQUl3QixNQUFKO0FBQ0F4QixjQUFJeUIsSUFBSjs7QUFFQXhCLGFBQUd5QixXQUFIO0FBQ0Q7QUE1QlcsT0FBZDtBQThCRDs7OzZCQUVTO0FBQ1IsV0FBS2pDLE1BQUwsQ0FBWUMsTUFBWixHQUFxQk8sR0FBRzBCLGNBQUgsQ0FBa0IsVUFBbEIsQ0FBckI7QUFDQTtBQUNEOzs7O0VBeERrQyxlQUFLQyxTOztrQkFBckJyQyxPIiwiZmlsZSI6InByZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlldyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGltZ3VybDogJycsXG4gICAgICAgIGRlc2M6ICcnLFxuICAgICAgICBvbmU6ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHdoaWNoKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5vbmUgPSB0aGlzLnJlc3VsdC5kZXNjO1xuICAgICAgfVxuICAgIH1cblxuICAgIHVwbG9hZCgpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIGNvbnN0IGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoJ215Q2FudmFzJyk7XG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIH0pXG4gICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ24vZ2VuZXJhbCcsXG4gICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAvLyB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIC8vICAgdGl0bGU6ICfmiJDlip8nLFxuICAgICAgICAgIC8vICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIC8vICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAvLyB9KVxuICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YS5kYXRhLndvcmRzX3Jlc3VsdFswXSwnc3VjY2VzcycpO1xuICAgICAgICAgIC8vZG8gc29tZXRoaW5nXG4gICAgICAgICAgc2VsZi5yZXN1bHQuZGVzYyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHRbMF0ud29yZHM7XG4gICAgICAgICAgc2VsZi4kYXBwbHkoKTtcblxuICAgICAgICAgIC8vIGN0eC5yZWN0KDEwLCAxMCwgMTAwLCA1MCk7XG4gICAgICAgICAgY3R4LnJlY3QoXG4gICAgICAgICAgICBkYXRhLmRhdGEud29yZHNfcmVzdWx0WzBdLmxvY2F0aW9uLmxlZnQtODAsIFxuICAgICAgICAgICAgZGF0YS5kYXRhLndvcmRzX3Jlc3VsdFswXS5sb2NhdGlvbi50b3AsIFxuICAgICAgICAgICAgZGF0YS5kYXRhLndvcmRzX3Jlc3VsdFswXS5sb2NhdGlvbi53aWR0aC0zNTAsIFxuICAgICAgICAgICAgMjZcbiAgICAgICAgICApO1xuICAgICAgICAgIGN0eC5zZXRTdHJva2VTdHlsZSgncmVkJyk7XG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgIGN0eC5kcmF3KCk7XG5cbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnJlc3VsdC5pbWd1cmwgPSB3eC5nZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnKTtcbiAgICAgIC8vIHRoaXMudXBsb2FkKCk7XG4gICAgfVxuICB9XG4iXX0=