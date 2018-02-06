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
        one: '',
        status: true
      }
    }, _this.methods = {
      which: function which() {
        this.result.one = this.result.desc;
      },
      share: function share() {
        wx.showShareMenu({
          withShareTicket: true
        });
      },
      toggle: function toggle() {
        this.result.status = !this.result.status;
      },
      transfer: function transfer() {
        wx.showActionSheet({
          itemList: ['中英文', '日语', '法语'],
          success: function success(res) {
            console.log(res.tapIndex);
          },
          fail: function fail(res) {
            console.log(res.errMsg);
          }
        });
      },
      copy: function copy() {
        wx.setClipboardData({
          data: 'hello jartto!',
          success: function success(res) {
            wx.getClipboardData({
              success: function success(res) {
                wx.showToast({
                  title: '拷贝成功',
                  icon: 'success',
                  duration: 2000
                });
              }
            });
          }
        });
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
      wx.showShareMenu({
        withShareTicket: true
      });
    }
  }]);

  return Preview;
}(_wepy2.default.component);

exports.default = Preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibWV0aG9kcyIsIndoaWNoIiwic2hhcmUiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ0b2dnbGUiLCJ0cmFuc2ZlciIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0Iiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ0YXBJbmRleCIsImZhaWwiLCJlcnJNc2ciLCJjb3B5Iiwic2V0Q2xpcGJvYXJkRGF0YSIsImdldENsaXBib2FyZERhdGEiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInNlbGYiLCJjdHgiLCJjcmVhdGVDYW52YXNDb250ZXh0Iiwic2hvd0xvYWRpbmciLCJ1cGxvYWRGaWxlIiwidXJsIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwid29yZHNfcmVzdWx0Iiwid29yZHMiLCIkYXBwbHkiLCJyZWN0IiwibG9jYXRpb24iLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJzZXRTdHJva2VTdHlsZSIsInN0cm9rZSIsImRyYXciLCJoaWRlTG9hZGluZyIsImdldFN0b3JhZ2VTeW5jIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEksR0FBTztBQUNMQyxjQUFRO0FBQ05DLGdCQUFRLEVBREY7QUFFTkMsY0FBTSxFQUZBO0FBR05DLGFBQUssRUFIQztBQUlOQyxnQkFBUTtBQUpGO0FBREgsSyxRQVNQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOLGFBQUtOLE1BQUwsQ0FBWUcsR0FBWixHQUFrQixLQUFLSCxNQUFMLENBQVlFLElBQTlCO0FBQ0QsT0FITztBQUlSSyxXQUpRLG1CQUlBO0FBQ05DLFdBQUdDLGFBQUgsQ0FBaUI7QUFDZkMsMkJBQWlCO0FBREYsU0FBakI7QUFHRCxPQVJPO0FBU1JDLFlBVFEsb0JBU0M7QUFDUCxhQUFLWCxNQUFMLENBQVlJLE1BQVosR0FBcUIsQ0FBQyxLQUFLSixNQUFMLENBQVlJLE1BQWxDO0FBQ0QsT0FYTztBQVlSUSxjQVpRLHNCQVlHO0FBQ1RKLFdBQUdLLGVBQUgsQ0FBbUI7QUFDakJDLG9CQUFVLENBQUMsS0FBRCxFQUFRLElBQVIsRUFBYyxJQUFkLENBRE87QUFFakJDLG1CQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJDLG9CQUFRQyxHQUFSLENBQVlGLElBQUlHLFFBQWhCO0FBQ0QsV0FKZ0I7QUFLakJDLGdCQUFNLGNBQVNKLEdBQVQsRUFBYztBQUNsQkMsb0JBQVFDLEdBQVIsQ0FBWUYsSUFBSUssTUFBaEI7QUFDRDtBQVBnQixTQUFuQjtBQVNELE9BdEJPO0FBdUJSQyxVQXZCUSxrQkF1QkQ7QUFDTGQsV0FBR2UsZ0JBQUgsQ0FBb0I7QUFDbEJ4QixnQkFBTSxlQURZO0FBRWxCZ0IsbUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQlIsZUFBR2dCLGdCQUFILENBQW9CO0FBQ2xCVCx1QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCUixtQkFBR2lCLFNBQUgsQ0FBYTtBQUNYQyx5QkFBTyxNQURJO0FBRVhDLHdCQUFNLFNBRks7QUFHWEMsNEJBQVU7QUFIQyxpQkFBYjtBQUtEO0FBUGlCLGFBQXBCO0FBU0Q7QUFaaUIsU0FBcEI7QUFjRDtBQXRDTyxLOzs7Ozs2QkF5Q0Q7QUFDUCxVQUFJQyxPQUFPLElBQVg7QUFDQSxVQUFNQyxNQUFNdEIsR0FBR3VCLG1CQUFILENBQXVCLFVBQXZCLENBQVo7QUFDQXZCLFNBQUd3QixXQUFILENBQWU7QUFDYk4sZUFBTztBQURNLE9BQWY7QUFHQWxCLFNBQUd5QixVQUFILENBQWM7QUFDWkMsYUFBSSx3Q0FEUTtBQUVaQyxrQkFBVSxLQUFLbkMsTUFBTCxDQUFZQyxNQUZWO0FBR1ptQyxjQUFNLE1BSE07QUFJWnJCLGlCQUFTLGlCQUFTQyxHQUFULEVBQWE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQUlqQixPQUFPc0MsS0FBS0MsS0FBTCxDQUFXdEIsSUFBSWpCLElBQWYsQ0FBWDtBQUNBa0Isa0JBQVFDLEdBQVIsQ0FBWW5CLEtBQUtBLElBQUwsQ0FBVXdDLFlBQVYsQ0FBdUIsQ0FBdkIsQ0FBWixFQUFzQyxTQUF0QztBQUNBO0FBQ0FWLGVBQUs3QixNQUFMLENBQVlFLElBQVosR0FBbUJILEtBQUtBLElBQUwsQ0FBVXdDLFlBQVYsQ0FBdUIsQ0FBdkIsRUFBMEJDLEtBQTdDO0FBQ0FYLGVBQUtZLE1BQUw7O0FBRUE7QUFDQVgsY0FBSVksSUFBSixDQUNFM0MsS0FBS0EsSUFBTCxDQUFVd0MsWUFBVixDQUF1QixDQUF2QixFQUEwQkksUUFBMUIsQ0FBbUNDLElBQW5DLEdBQXdDLEVBRDFDLEVBRUU3QyxLQUFLQSxJQUFMLENBQVV3QyxZQUFWLENBQXVCLENBQXZCLEVBQTBCSSxRQUExQixDQUFtQ0UsR0FGckMsRUFHRTlDLEtBQUtBLElBQUwsQ0FBVXdDLFlBQVYsQ0FBdUIsQ0FBdkIsRUFBMEJJLFFBQTFCLENBQW1DRyxLQUFuQyxHQUF5QyxHQUgzQyxFQUlFLEVBSkY7QUFNQWhCLGNBQUlpQixjQUFKLENBQW1CLEtBQW5CO0FBQ0FqQixjQUFJa0IsTUFBSjtBQUNBbEIsY0FBSW1CLElBQUo7O0FBRUF6QyxhQUFHMEMsV0FBSDtBQUNEO0FBNUJXLE9BQWQ7QUE4QkQ7Ozs2QkFFUztBQUNSLFdBQUtsRCxNQUFMLENBQVlDLE1BQVosR0FBcUJPLEdBQUcyQyxjQUFILENBQWtCLFVBQWxCLENBQXJCO0FBQ0E7QUFDQTNDLFNBQUdDLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7OztFQS9Ga0MsZUFBSzBDLFM7O2tCQUFyQnRELE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgaW1ndXJsOiAnJyxcbiAgICAgICAgZGVzYzogJycsXG4gICAgICAgIG9uZTogJycsXG4gICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB3aGljaCgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQub25lID0gdGhpcy5yZXN1bHQuZGVzYztcbiAgICAgIH0sXG4gICAgICBzaGFyZSgpIHtcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgPSAhdGhpcy5yZXN1bHQuc3RhdHVzO1xuICAgICAgfSxcbiAgICAgIHRyYW5zZmVyKCkge1xuICAgICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICAgIGl0ZW1MaXN0OiBbJ+S4reiLseaWhycsICfml6Xor60nLCAn5rOV6K+tJ10sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFwSW5kZXgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvcHkoKSB7XG4gICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgIGRhdGE6ICdoZWxsbyBqYXJ0dG8hJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHd4LmdldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmi7fotJ3miJDlip8nLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGxvYWQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICBjb25zdCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdteUNhbnZhcycpO1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICB9KVxuICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2duL2dlbmVyYWwnLFxuICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgLy8gd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgIHRpdGxlOiAn5oiQ5YqfJyxcbiAgICAgICAgICAvLyAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAvLyAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgLy8gfSlcbiAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuZGF0YS53b3Jkc19yZXN1bHRbMF0sJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAvL2RvIHNvbWV0aGluZ1xuICAgICAgICAgIHNlbGYucmVzdWx0LmRlc2MgPSBkYXRhLmRhdGEud29yZHNfcmVzdWx0WzBdLndvcmRzO1xuICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG5cbiAgICAgICAgICAvLyBjdHgucmVjdCgxMCwgMTAsIDEwMCwgNTApO1xuICAgICAgICAgIGN0eC5yZWN0KFxuICAgICAgICAgICAgZGF0YS5kYXRhLndvcmRzX3Jlc3VsdFswXS5sb2NhdGlvbi5sZWZ0LTgwLCBcbiAgICAgICAgICAgIGRhdGEuZGF0YS53b3Jkc19yZXN1bHRbMF0ubG9jYXRpb24udG9wLCBcbiAgICAgICAgICAgIGRhdGEuZGF0YS53b3Jkc19yZXN1bHRbMF0ubG9jYXRpb24ud2lkdGgtMzUwLCBcbiAgICAgICAgICAgIDI2XG4gICAgICAgICAgKTtcbiAgICAgICAgICBjdHguc2V0U3Ryb2tlU3R5bGUoJ3JlZCcpO1xuICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICBjdHguZHJhdygpO1xuXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5yZXN1bHQuaW1ndXJsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyk7XG4gICAgICAvLyB0aGlzLnVwbG9hZCgpO1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==