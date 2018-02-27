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
        status: false,
        list: []
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
        title: '识别中'
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
          self.result.list = results;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsIm1ldGhvZHMiLCJ3aGljaCIsInNoYXJlIiwid3giLCJzaG93U2hhcmVNZW51Iiwid2l0aFNoYXJlVGlja2V0Iiwidm9pY2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInRvZ2dsZSIsInRyYW5zZmVyIiwic2hvd0FjdGlvblNoZWV0IiwiaXRlbUxpc3QiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsInRhcEluZGV4IiwiZmFpbCIsImVyck1zZyIsImNvcHkiLCJzZXRDbGlwYm9hcmREYXRhIiwiZ2V0Q2xpcGJvYXJkRGF0YSIsInNlbGYiLCJzaG93TG9hZGluZyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJmaWxlUGF0aCIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJ3b3Jkc19yZXN1bHQiLCJyZXN1bHRzIiwibWFwIiwiaXRlbSIsIndvcmRzIiwiJGFwcGx5IiwiaGlkZUxvYWRpbmciLCJnZXRTdG9yYWdlU3luYyIsInVwbG9hZCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ25CQyxJLEdBQU87QUFDTEMsY0FBUTtBQUNOQyxnQkFBUSxFQURGO0FBRU5DLGNBQU0sRUFGQTtBQUdOQyxhQUFLLFFBSEM7QUFJTkMsZ0JBQVEsS0FKRjtBQUtOQyxjQUFNO0FBTEE7QUFESCxLLFFBVVBDLE8sR0FBVTtBQUNSQyxXQURRLG1CQUNBO0FBQ04sYUFBS1AsTUFBTCxDQUFZRyxHQUFaLEdBQWtCLEtBQUtILE1BQUwsQ0FBWUUsSUFBOUI7QUFDRCxPQUhPO0FBSVJNLFdBSlEsbUJBSUE7QUFDTkMsV0FBR0MsYUFBSCxDQUFpQjtBQUNmQywyQkFBaUI7QUFERixTQUFqQjtBQUdELE9BUk87QUFTUkMsV0FUUSxtQkFTQTtBQUNOSCxXQUFHSSxTQUFILENBQWE7QUFDWEMsaUJBQU8sVUFESTtBQUVYQyxnQkFBTSxTQUZLO0FBR1hDLG9CQUFVO0FBSEMsU0FBYjtBQUtELE9BZk87QUFnQlJDLFlBaEJRLG9CQWdCQztBQUNQLGFBQUtqQixNQUFMLENBQVlJLE1BQVosR0FBcUIsQ0FBQyxLQUFLSixNQUFMLENBQVlJLE1BQWxDO0FBQ0QsT0FsQk87QUFtQlJjLGNBbkJRLHNCQW1CRztBQUNUVCxXQUFHVSxlQUFILENBQW1CO0FBQ2pCQyxvQkFBVSxDQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWMsSUFBZCxDQURPO0FBRWpCQyxtQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCQyxvQkFBUUMsR0FBUixDQUFZRixJQUFJRyxRQUFoQjtBQUNELFdBSmdCO0FBS2pCQyxnQkFBTSxjQUFTSixHQUFULEVBQWM7QUFDbEJDLG9CQUFRQyxHQUFSLENBQVlGLElBQUlLLE1BQWhCO0FBQ0Q7QUFQZ0IsU0FBbkI7QUFTRCxPQTdCTztBQThCUkMsVUE5QlEsa0JBOEJEO0FBQ0xuQixXQUFHb0IsZ0JBQUgsQ0FBb0I7QUFDbEI5QixnQkFBTSxLQUFLQyxNQUFMLENBQVlFLElBREE7QUFFbEJtQixtQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCYixlQUFHcUIsZ0JBQUgsQ0FBb0I7QUFDbEJULHVCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJiLG1CQUFHSSxTQUFILENBQWE7QUFDWEMseUJBQU8sT0FESTtBQUVYQyx3QkFBTSxTQUZLO0FBR1hDLDRCQUFVO0FBSEMsaUJBQWI7QUFLRDtBQVBpQixhQUFwQjtBQVNEO0FBWmlCLFNBQXBCO0FBY0Q7QUE3Q08sSzs7Ozs7NkJBZ0REO0FBQ1AsVUFBSWUsT0FBTyxJQUFYO0FBQ0F0QixTQUFHdUIsV0FBSCxDQUFlO0FBQ2JsQixlQUFPO0FBRE0sT0FBZjtBQUdBTCxTQUFHd0IsVUFBSCxDQUFjO0FBQ1pDLGFBQUksd0NBRFE7QUFFWkMsa0JBQVUsS0FBS25DLE1BQUwsQ0FBWUMsTUFGVjtBQUdabUMsY0FBTSxNQUhNO0FBSVpmLGlCQUFTLGlCQUFTQyxHQUFULEVBQWE7QUFDcEIsY0FBSXZCLE9BQU9zQyxLQUFLQyxLQUFMLENBQVdoQixJQUFJdkIsSUFBZixDQUFYO0FBQ0F3QixrQkFBUUMsR0FBUixDQUFZekIsS0FBS0EsSUFBTCxDQUFVd0MsWUFBdEIsRUFBbUMsU0FBbkM7O0FBRUEsY0FBSUMsVUFBVXpDLEtBQUtBLElBQUwsQ0FBVXdDLFlBQVYsQ0FBdUJFLEdBQXZCLENBQTJCLFVBQUNDLElBQUQsRUFBVTtBQUFFLG1CQUFPQSxLQUFLQyxLQUFaO0FBQW9CLFdBQTNELENBQWQ7QUFDQXBCLGtCQUFRQyxHQUFSLENBQVlnQixPQUFaLEVBQW9CLFNBQXBCO0FBQ0FULGVBQUsvQixNQUFMLENBQVlLLElBQVosR0FBbUJtQyxPQUFuQjtBQUNBVCxlQUFLL0IsTUFBTCxDQUFZSSxNQUFaLEdBQXFCLElBQXJCOztBQUVBMkIsZUFBS2EsTUFBTDtBQUNBbkMsYUFBR29DLFdBQUg7QUFDRDtBQWZXLE9BQWQ7QUFpQkQ7Ozs2QkFFUztBQUNSLFdBQUs3QyxNQUFMLENBQVlDLE1BQVosR0FBcUJRLEdBQUdxQyxjQUFILENBQWtCLFVBQWxCLENBQXJCO0FBQ0EsV0FBS0MsTUFBTDtBQUNBdEMsU0FBR0MsYUFBSCxDQUFpQjtBQUNmQyx5QkFBaUI7QUFERixPQUFqQjtBQUdEOzs7O0VBekZrQyxlQUFLcUMsUzs7a0JBQXJCbEQsTyIsImZpbGUiOiJwcmV2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXZpZXcgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgZGF0YSA9IHtcbiAgICAgIHJlc3VsdDoge1xuICAgICAgICBpbWd1cmw6ICcnLFxuICAgICAgICBkZXNjOiAnJyxcbiAgICAgICAgb25lOiAn6Kej5p6Q5Zu+54mH5Lit772eJyxcbiAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgbGlzdDogW11cbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgd2hpY2goKSB7XG4gICAgICAgIHRoaXMucmVzdWx0Lm9uZSA9IHRoaXMucmVzdWx0LmRlc2M7XG4gICAgICB9LFxuICAgICAgc2hhcmUoKSB7XG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHZvaWNlKCkge1xuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6K+t6Z+z5ZCI5oiQ5LitLi4uJyxcbiAgICAgICAgICBpY29uOiAnbG9hZGluZycsXG4gICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0LnN0YXR1cyA9ICF0aGlzLnJlc3VsdC5zdGF0dXM7XG4gICAgICB9LFxuICAgICAgdHJhbnNmZXIoKSB7XG4gICAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgICAgaXRlbUxpc3Q6IFsn5Lit6Iux5paHJywgJ+aXpeivrScsICfms5Xor60nXSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleClcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmVyck1zZylcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgY29weSgpIHtcbiAgICAgICAgd3guc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgICAgZGF0YTogdGhpcy5yZXN1bHQuZGVzYyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHd4LmdldENsaXBib2FyZERhdGEoe1xuICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmloflrZflt7LlpI3liLYnLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB1cGxvYWQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn6K+G5Yir5LitJyxcbiAgICAgIH0pXG4gICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgdXJsOidodHRwczovL3d3dy5pb2NyLnZpcC9haS9yZWNvZ24vZ2VuZXJhbCcsXG4gICAgICAgIGZpbGVQYXRoOiB0aGlzLnJlc3VsdC5pbWd1cmwsXG4gICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UocmVzLmRhdGEpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuZGF0YS53b3Jkc19yZXN1bHQsJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgIGxldCByZXN1bHRzID0gZGF0YS5kYXRhLndvcmRzX3Jlc3VsdC5tYXAoKGl0ZW0pID0+IHsgcmV0dXJuIGl0ZW0ud29yZHM7IH0pO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdHMsJ3Jlc3VsdHMnKTtcbiAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnJlc3VsdC5pbWd1cmwgPSB3eC5nZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnKTtcbiAgICAgIHRoaXMudXBsb2FkKCk7XG4gICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19