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
        one: '解析图片中～',
        status: false
        // list: []
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
          data: this.result.desc,
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
      wx.showLoading({
        title: '加载中'
      });
      wx.uploadFile({
        url: 'https://www.iocr.vip/ai/recogn/general',
        filePath: this.result.imgurl,
        name: 'file',
        success: function success(res) {
          var data = JSON.parse(res.data);
          console.log(data.data.words_result, 'success');

          var results = data.data.words_result.map(function (item) {
            return item.words;
          });
          console.log(results, 'results');
          self.result.desc = results.join('');
          self.result.status = true;

          self.$apply();
          wx.hideLoading();
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.result.imgurl = wx.getStorageSync('imageurl');
      this.upload();
      wx.showShareMenu({
        withShareTicket: true
      });
    }
  }]);

  return Preview;
}(_wepy2.default.component);

exports.default = Preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibWV0aG9kcyIsIndoaWNoIiwic2hhcmUiLCJ3eCIsInNob3dTaGFyZU1lbnUiLCJ3aXRoU2hhcmVUaWNrZXQiLCJ2b2ljZSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwidG9nZ2xlIiwidHJhbnNmZXIiLCJzaG93QWN0aW9uU2hlZXQiLCJpdGVtTGlzdCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwidGFwSW5kZXgiLCJmYWlsIiwiZXJyTXNnIiwiY29weSIsInNldENsaXBib2FyZERhdGEiLCJnZXRDbGlwYm9hcmREYXRhIiwic2VsZiIsInNob3dMb2FkaW5nIiwidXBsb2FkRmlsZSIsInVybCIsImZpbGVQYXRoIiwibmFtZSIsIkpTT04iLCJwYXJzZSIsIndvcmRzX3Jlc3VsdCIsInJlc3VsdHMiLCJtYXAiLCJpdGVtIiwid29yZHMiLCJqb2luIiwiJGFwcGx5IiwiaGlkZUxvYWRpbmciLCJnZXRTdG9yYWdlU3luYyIsInVwbG9hZCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxJLEdBQU87QUFDTEMsY0FBUTtBQUNOQyxnQkFBUSxFQURGO0FBRU5DLGNBQU0sRUFGQTtBQUdOQyxhQUFLLFFBSEM7QUFJTkMsZ0JBQVE7QUFDUjtBQUxNO0FBREgsSyxRQVVQQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOLGFBQUtOLE1BQUwsQ0FBWUcsR0FBWixHQUFrQixLQUFLSCxNQUFMLENBQVlFLElBQTlCO0FBQ0QsT0FITztBQUlSSyxXQUpRLG1CQUlBO0FBQ05DLFdBQUdDLGFBQUgsQ0FBaUI7QUFDZkMsMkJBQWlCO0FBREYsU0FBakI7QUFHRCxPQVJPO0FBU1JDLFdBVFEsbUJBU0E7QUFDTkgsV0FBR0ksU0FBSCxDQUFhO0FBQ1hDLGlCQUFPLFVBREk7QUFFWEMsZ0JBQU0sU0FGSztBQUdYQyxvQkFBVTtBQUhDLFNBQWI7QUFLRCxPQWZPO0FBZ0JSQyxZQWhCUSxvQkFnQkM7QUFDUCxhQUFLaEIsTUFBTCxDQUFZSSxNQUFaLEdBQXFCLENBQUMsS0FBS0osTUFBTCxDQUFZSSxNQUFsQztBQUNELE9BbEJPO0FBbUJSYSxjQW5CUSxzQkFtQkc7QUFDVFQsV0FBR1UsZUFBSCxDQUFtQjtBQUNqQkMsb0JBQVUsQ0FBQyxLQUFELEVBQVEsSUFBUixFQUFjLElBQWQsQ0FETztBQUVqQkMsbUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQkMsb0JBQVFDLEdBQVIsQ0FBWUYsSUFBSUcsUUFBaEI7QUFDRCxXQUpnQjtBQUtqQkMsZ0JBQU0sY0FBU0osR0FBVCxFQUFjO0FBQ2xCQyxvQkFBUUMsR0FBUixDQUFZRixJQUFJSyxNQUFoQjtBQUNEO0FBUGdCLFNBQW5CO0FBU0QsT0E3Qk87QUE4QlJDLFVBOUJRLGtCQThCRDtBQUNMbkIsV0FBR29CLGdCQUFILENBQW9CO0FBQ2xCN0IsZ0JBQU0sS0FBS0MsTUFBTCxDQUFZRSxJQURBO0FBRWxCa0IsbUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQmIsZUFBR3FCLGdCQUFILENBQW9CO0FBQ2xCVCx1QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCYixtQkFBR0ksU0FBSCxDQUFhO0FBQ1hDLHlCQUFPLE9BREk7QUFFWEMsd0JBQU0sU0FGSztBQUdYQyw0QkFBVTtBQUhDLGlCQUFiO0FBS0Q7QUFQaUIsYUFBcEI7QUFTRDtBQVppQixTQUFwQjtBQWNEO0FBN0NPLEs7Ozs7OzZCQWdERDtBQUNQLFVBQUllLE9BQU8sSUFBWDtBQUNBdEIsU0FBR3VCLFdBQUgsQ0FBZTtBQUNibEIsZUFBTztBQURNLE9BQWY7QUFHQUwsU0FBR3dCLFVBQUgsQ0FBYztBQUNaQyxhQUFJLHdDQURRO0FBRVpDLGtCQUFVLEtBQUtsQyxNQUFMLENBQVlDLE1BRlY7QUFHWmtDLGNBQU0sTUFITTtBQUlaZixpQkFBUyxpQkFBU0MsR0FBVCxFQUFhO0FBQ3BCLGNBQUl0QixPQUFPcUMsS0FBS0MsS0FBTCxDQUFXaEIsSUFBSXRCLElBQWYsQ0FBWDtBQUNBdUIsa0JBQVFDLEdBQVIsQ0FBWXhCLEtBQUtBLElBQUwsQ0FBVXVDLFlBQXRCLEVBQW1DLFNBQW5DOztBQUVBLGNBQUlDLFVBQVV4QyxLQUFLQSxJQUFMLENBQVV1QyxZQUFWLENBQXVCRSxHQUF2QixDQUEyQixVQUFDQyxJQUFELEVBQVU7QUFBRSxtQkFBT0EsS0FBS0MsS0FBWjtBQUFvQixXQUEzRCxDQUFkO0FBQ0FwQixrQkFBUUMsR0FBUixDQUFZZ0IsT0FBWixFQUFvQixTQUFwQjtBQUNBVCxlQUFLOUIsTUFBTCxDQUFZRSxJQUFaLEdBQW1CcUMsUUFBUUksSUFBUixDQUFhLEVBQWIsQ0FBbkI7QUFDQWIsZUFBSzlCLE1BQUwsQ0FBWUksTUFBWixHQUFxQixJQUFyQjs7QUFFQTBCLGVBQUtjLE1BQUw7QUFDQXBDLGFBQUdxQyxXQUFIO0FBQ0Q7QUFmVyxPQUFkO0FBaUJEOzs7NkJBRVM7QUFDUixXQUFLN0MsTUFBTCxDQUFZQyxNQUFaLEdBQXFCTyxHQUFHc0MsY0FBSCxDQUFrQixVQUFsQixDQUFyQjtBQUNBLFdBQUtDLE1BQUw7QUFDQXZDLFNBQUdDLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7OztFQXpGa0MsZUFBS3NDLFM7O2tCQUFyQmxELE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgaW1ndXJsOiAnJyxcbiAgICAgICAgZGVzYzogJycsXG4gICAgICAgIG9uZTogJ+ino+aekOWbvueJh+S4re+9nicsXG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgIC8vIGxpc3Q6IFtdXG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHdoaWNoKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5vbmUgPSB0aGlzLnJlc3VsdC5kZXNjO1xuICAgICAgfSxcbiAgICAgIHNoYXJlKCkge1xuICAgICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB2b2ljZSgpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+ivremfs+WQiOaIkOS4rS4uLicsXG4gICAgICAgICAgaWNvbjogJ2xvYWRpbmcnLFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnJlc3VsdC5zdGF0dXMgPSAhdGhpcy5yZXN1bHQuc3RhdHVzO1xuICAgICAgfSxcbiAgICAgIHRyYW5zZmVyKCkge1xuICAgICAgICB3eC5zaG93QWN0aW9uU2hlZXQoe1xuICAgICAgICAgIGl0ZW1MaXN0OiBbJ+S4reiLseaWhycsICfml6Xor60nLCAn5rOV6K+tJ10sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudGFwSW5kZXgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNvcHkoKSB7XG4gICAgICAgIHd4LnNldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgIGRhdGE6IHRoaXMucmVzdWx0LmRlc2MsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5a2X5bey5aSN5Yi2JyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBsb2FkKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICB9KVxuICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2duL2dlbmVyYWwnLFxuICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGEud29yZHNfcmVzdWx0LCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtKSA9PiB7IHJldHVybiBpdGVtLndvcmRzOyB9KTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRzLCdyZXN1bHRzJyk7XG4gICAgICAgICAgc2VsZi5yZXN1bHQuZGVzYyA9IHJlc3VsdHMuam9pbignJyk7XG4gICAgICAgICAgc2VsZi5yZXN1bHQuc3RhdHVzID0gdHJ1ZTtcblxuICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5yZXN1bHQuaW1ndXJsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyk7XG4gICAgICB0aGlzLnVwbG9hZCgpO1xuICAgICAgd3guc2hvd1NoYXJlTWVudSh7XG4gICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==