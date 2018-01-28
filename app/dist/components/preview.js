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
      upload: function upload() {
        var self = this;
        var ctx = wx.createCanvasContext('myCanvas');
        wx.showLoading({
          title: '加载中'
        });
        wx.uploadFile({
          url: 'https://mocha-city-api.sensoro.com/prov1/boss/general',
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
      },
      which: function which() {
        this.result.one = this.result.desc;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Preview, [{
    key: 'onLoad',
    value: function onLoad() {
      this.result.imgurl = wx.getStorageSync('imageurl');
    }
  }]);

  return Preview;
}(_wepy2.default.component);

exports.default = Preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwibWV0aG9kcyIsInVwbG9hZCIsInNlbGYiLCJjdHgiLCJ3eCIsImNyZWF0ZUNhbnZhc0NvbnRleHQiLCJzaG93TG9hZGluZyIsInRpdGxlIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwibmFtZSIsInN1Y2Nlc3MiLCJyZXMiLCJKU09OIiwicGFyc2UiLCJjb25zb2xlIiwibG9nIiwid29yZHNfcmVzdWx0Iiwid29yZHMiLCIkYXBwbHkiLCJyZWN0IiwibG9jYXRpb24iLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJzZXRTdHJva2VTdHlsZSIsInN0cm9rZSIsImRyYXciLCJoaWRlTG9hZGluZyIsIndoaWNoIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNLEVBRkE7QUFHTkMsYUFBSztBQUhDO0FBREgsSyxRQVFQQyxPLEdBQVU7QUFDUkMsWUFEUSxvQkFDQztBQUNQLFlBQUlDLE9BQU8sSUFBWDtBQUNBLFlBQU1DLE1BQU1DLEdBQUdDLG1CQUFILENBQXVCLFVBQXZCLENBQVo7QUFDQUQsV0FBR0UsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPO0FBRE0sU0FBZjtBQUdBSCxXQUFHSSxVQUFILENBQWM7QUFDWkMsZUFBSSx1REFEUTtBQUVaQyxvQkFBVSxLQUFLZCxNQUFMLENBQVlDLE1BRlY7QUFHWmMsZ0JBQU0sTUFITTtBQUlaQyxtQkFBUyxpQkFBU0MsR0FBVCxFQUFhO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBSWxCLE9BQU9tQixLQUFLQyxLQUFMLENBQVdGLElBQUlsQixJQUFmLENBQVg7QUFDQXFCLG9CQUFRQyxHQUFSLENBQVl0QixLQUFLQSxJQUFMLENBQVV1QixZQUFWLENBQXVCLENBQXZCLENBQVosRUFBc0MsU0FBdEM7QUFDQTtBQUNBaEIsaUJBQUtOLE1BQUwsQ0FBWUUsSUFBWixHQUFtQkgsS0FBS0EsSUFBTCxDQUFVdUIsWUFBVixDQUF1QixDQUF2QixFQUEwQkMsS0FBN0M7QUFDQWpCLGlCQUFLa0IsTUFBTDs7QUFFQTtBQUNBakIsZ0JBQUlrQixJQUFKLENBQ0UxQixLQUFLQSxJQUFMLENBQVV1QixZQUFWLENBQXVCLENBQXZCLEVBQTBCSSxRQUExQixDQUFtQ0MsSUFBbkMsR0FBd0MsRUFEMUMsRUFFRTVCLEtBQUtBLElBQUwsQ0FBVXVCLFlBQVYsQ0FBdUIsQ0FBdkIsRUFBMEJJLFFBQTFCLENBQW1DRSxHQUZyQyxFQUdFN0IsS0FBS0EsSUFBTCxDQUFVdUIsWUFBVixDQUF1QixDQUF2QixFQUEwQkksUUFBMUIsQ0FBbUNHLEtBQW5DLEdBQXlDLEdBSDNDLEVBSUUsRUFKRjtBQU1BdEIsZ0JBQUl1QixjQUFKLENBQW1CLEtBQW5CO0FBQ0F2QixnQkFBSXdCLE1BQUo7QUFDQXhCLGdCQUFJeUIsSUFBSjs7QUFFQXhCLGVBQUd5QixXQUFIO0FBQ0Q7QUE1QlcsU0FBZDtBQThCRCxPQXJDTztBQXNDUkMsV0F0Q1EsbUJBc0NBO0FBQ04sYUFBS2xDLE1BQUwsQ0FBWUcsR0FBWixHQUFrQixLQUFLSCxNQUFMLENBQVlFLElBQTlCO0FBQ0Q7QUF4Q08sSzs7Ozs7NkJBMkNBO0FBQ1IsV0FBS0YsTUFBTCxDQUFZQyxNQUFaLEdBQXFCTyxHQUFHMkIsY0FBSCxDQUFrQixVQUFsQixDQUFyQjtBQUNEOzs7O0VBdERrQyxlQUFLQyxTOztrQkFBckJ0QyxPIiwiZmlsZSI6InByZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlldyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGltZ3VybDogJycsXG4gICAgICAgIGRlc2M6ICcnLFxuICAgICAgICBvbmU6ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHVwbG9hZCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdteUNhbnZhcycpO1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgICB9KVxuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vbW9jaGEtY2l0eS1hcGkuc2Vuc29yby5jb20vcHJvdjEvYm9zcy9nZW5lcmFsJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgLy8gd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIC8vICAgdGl0bGU6ICfmiJDlip8nLFxuICAgICAgICAgICAgLy8gICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAvLyAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuZGF0YS53b3Jkc19yZXN1bHRbMF0sJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgIC8vZG8gc29tZXRoaW5nXG4gICAgICAgICAgICBzZWxmLnJlc3VsdC5kZXNjID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdFswXS53b3JkcztcbiAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG5cbiAgICAgICAgICAgIC8vIGN0eC5yZWN0KDEwLCAxMCwgMTAwLCA1MCk7XG4gICAgICAgICAgICBjdHgucmVjdChcbiAgICAgICAgICAgICAgZGF0YS5kYXRhLndvcmRzX3Jlc3VsdFswXS5sb2NhdGlvbi5sZWZ0LTgwLCBcbiAgICAgICAgICAgICAgZGF0YS5kYXRhLndvcmRzX3Jlc3VsdFswXS5sb2NhdGlvbi50b3AsIFxuICAgICAgICAgICAgICBkYXRhLmRhdGEud29yZHNfcmVzdWx0WzBdLmxvY2F0aW9uLndpZHRoLTM1MCwgXG4gICAgICAgICAgICAgIDI2XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY3R4LnNldFN0cm9rZVN0eWxlKCdyZWQnKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGN0eC5kcmF3KCk7XG5cbiAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHdoaWNoKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5vbmUgPSB0aGlzLnJlc3VsdC5kZXNjO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnJlc3VsdC5pbWd1cmwgPSB3eC5nZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnKTtcbiAgICB9XG4gIH1cbiJdfQ==