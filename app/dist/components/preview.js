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
        one: '这里是测试文字～这里是测试文字',
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
      voice: function voice() {
        wx.showToast({
          title: '语音合成中...',
          icon: 'loading',
          duration: 2000
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
                  title: '文字已复制',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibWV0aG9kcyIsIndoaWNoIiwic2hhcmUiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ2b2ljZSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwidG9nZ2xlIiwidHJhbnNmZXIiLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwidGFwSW5kZXgiLCJmYWlsIiwiZXJyTXNnIiwiY29weSIsInNldENsaXBib2FyZERhdGEiLCJnZXRDbGlwYm9hcmREYXRhIiwic2VsZiIsImN0eCIsImNyZWF0ZUNhbnZhc0NvbnRleHQiLCJzaG93TG9hZGluZyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJmaWxlUGF0aCIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJ3b3Jkc19yZXN1bHQiLCJ3b3JkcyIsIiRhcHBseSIsInJlY3QiLCJsb2NhdGlvbiIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsInNldFN0cm9rZVN0eWxlIiwic3Ryb2tlIiwiZHJhdyIsImhpZGVMb2FkaW5nIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNLEVBRkE7QUFHTkMsYUFBSyxpQkFIQztBQUlOQyxnQkFBUTtBQUpGO0FBREgsSyxRQVNQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOLGFBQUtOLE1BQUwsQ0FBWUcsR0FBWixHQUFrQixLQUFLSCxNQUFMLENBQVlFLElBQTlCO0FBQ0QsT0FITztBQUlSSyxXQUpRLG1CQUlBO0FBQ05DLFdBQUdD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RDs7OztFQXRHa0MsZUFBSzJDLFM7O2tCQUFyQnZELE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgaW1ndXJsOiAnJyxcbiAgICAgICAgZGVzYzogJycsXG4gICAgICAgIG9uZTogJ+i/memHjOaYr+a1i+ivleaWh+Wtl++9nui/memHjOaYr+a1i+ivleaWh+WtlycsXG4gICAgICAgIHN0YXR1czogdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB3aGljaCgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQub25lID0gdGhpcy5yZXN1bHQuZGVzYztcbiAgICAgIH0sXG4gICAgICBzaGFyZSgpIHtcbiAgICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdm9pY2UoKSB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfor63pn7PlkIjmiJDkuK0uLi4nLFxuICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5yZXN1bHQuc3RhdHVzID0gIXRoaXMucmVzdWx0LnN0YXR1cztcbiAgICAgIH0sXG4gICAgICB0cmFuc2ZlcigpIHtcbiAgICAgICAgd3guc2hvd0FjdGlvblNoZWV0KHtcbiAgICAgICAgICBpdGVtTGlzdDogWyfkuK3oi7HmlocnLCAn5pel6K+tJywgJ+azleivrSddLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnRhcEluZGV4KVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZXJyTXNnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb3B5KCkge1xuICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICBkYXRhOiAnaGVsbG8gamFydHRvIScsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5a2X5bey5aSN5Yi2JyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBsb2FkKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgY29uc3QgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnbXlDYW52YXMnKTtcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgfSlcbiAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICB1cmw6J2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3JlY29nbi9nZW5lcmFsJyxcbiAgICAgICAgZmlsZVBhdGg6IHRoaXMucmVzdWx0LmltZ3VybCxcbiAgICAgICAgbmFtZTogJ2ZpbGUnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpe1xuICAgICAgICAgIC8vIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICB0aXRsZTogJ+aIkOWKnycsXG4gICAgICAgICAgLy8gICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgLy8gICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGEud29yZHNfcmVzdWx0WzBdLCdzdWNjZXNzJyk7XG4gICAgICAgICAgLy9kbyBzb21ldGhpbmdcbiAgICAgICAgICBzZWxmLnJlc3VsdC5kZXNjID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdFswXS53b3JkcztcbiAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuXG4gICAgICAgICAgLy8gY3R4LnJlY3QoMTAsIDEwLCAxMDAsIDUwKTtcbiAgICAgICAgICBjdHgucmVjdChcbiAgICAgICAgICAgIGRhdGEuZGF0YS53b3Jkc19yZXN1bHRbMF0ubG9jYXRpb24ubGVmdC04MCwgXG4gICAgICAgICAgICBkYXRhLmRhdGEud29yZHNfcmVzdWx0WzBdLmxvY2F0aW9uLnRvcCwgXG4gICAgICAgICAgICBkYXRhLmRhdGEud29yZHNfcmVzdWx0WzBdLmxvY2F0aW9uLndpZHRoLTM1MCwgXG4gICAgICAgICAgICAyNlxuICAgICAgICAgICk7XG4gICAgICAgICAgY3R4LnNldFN0cm9rZVN0eWxlKCdyZWQnKTtcbiAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgY3R4LmRyYXcoKTtcblxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMucmVzdWx0LmltZ3VybCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcpO1xuICAgICAgLy8gdGhpcy51cGxvYWQoKTtcbiAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=