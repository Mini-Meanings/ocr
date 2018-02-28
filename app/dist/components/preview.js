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
      },
      copy: []
    }, _this.methods = {
      which: function which() {
        this.result.one = this.result.desc;
      },
      checkboxChange: function checkboxChange(e) {
        var keys = e.detail.value.sort(function (a, b) {
          return a - b;
        });
        this.copy = [];
        for (var i = 0; i < keys.length; i++) {
          this.copy.push(this.result.list[keys[i]].val);
        }
        console.log(this.copy);
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
          data: this.copy.join('\n'),
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

          var results = data.data.words_result.map(function (item, index) {
            return { id: index, val: item.words };
          });
          console.log(results, 'sss');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwib25lIiwic3RhdHVzIiwibGlzdCIsImNvcHkiLCJtZXRob2RzIiwid2hpY2giLCJjaGVja2JveENoYW5nZSIsImUiLCJrZXlzIiwiZGV0YWlsIiwidmFsdWUiLCJzb3J0IiwiYSIsImIiLCJpIiwibGVuZ3RoIiwicHVzaCIsInZhbCIsImNvbnNvbGUiLCJsb2ciLCJzaGFyZSIsInd4Iiwic2hvd1NoYXJlTWVudSIsIndpdGhTaGFyZVRpY2tldCIsInZvaWNlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJ0b2dnbGUiLCJ0cmFuc2ZlciIsInNob3dBY3Rpb25TaGVldCIsIml0ZW1MaXN0Iiwic3VjY2VzcyIsInJlcyIsInRhcEluZGV4IiwiZmFpbCIsImVyck1zZyIsInNldENsaXBib2FyZERhdGEiLCJqb2luIiwiZ2V0Q2xpcGJvYXJkRGF0YSIsInNlbGYiLCJzaG93TG9hZGluZyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJmaWxlUGF0aCIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJ3b3Jkc19yZXN1bHQiLCJyZXN1bHRzIiwibWFwIiwiaXRlbSIsImluZGV4IiwiaWQiLCJ3b3JkcyIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwiZ2V0U3RvcmFnZVN5bmMiLCJ1cGxvYWQiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNLEVBRkE7QUFHTkMsYUFBSyxRQUhDO0FBSU5DLGdCQUFRLEtBSkY7QUFLTkMsY0FBTTtBQUxBLE9BREg7QUFRTEMsWUFBTTtBQVJELEssUUFXUEMsTyxHQUFVO0FBQ1JDLFdBRFEsbUJBQ0E7QUFDTixhQUFLUixNQUFMLENB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QixPQUFaLEVBQW9CLEtBQXBCO0FBQ0FULGVBQUs1QyxNQUFMLENBQVlLLElBQVosR0FBbUJnRCxPQUFuQjtBQUNBVCxlQUFLNUMsTUFBTCxDQUFZSSxNQUFaLEdBQXFCLElBQXJCOztBQUVBd0MsZUFBS2UsTUFBTDtBQUNBbkMsYUFBR29DLFdBQUg7QUFDRDtBQWZXLE9BQWQ7QUFpQkQ7Ozs2QkFFUztBQUNSLFdBQUs1RCxNQUFMLENBQVlDLE1BQVosR0FBcUJ1QixHQUFHcUMsY0FBSCxDQUFrQixVQUFsQixDQUFyQjtBQUNBLFdBQUtDLE1BQUw7QUFDQXRDLFNBQUdDLGFBQUgsQ0FBaUI7QUFDZkMseUJBQWlCO0FBREYsT0FBakI7QUFHRDs7OztFQXBHa0MsZUFBS3FDLFM7O2tCQUFyQmpFLE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICByZXN1bHQ6IHtcbiAgICAgICAgaW1ndXJsOiAnJyxcbiAgICAgICAgZGVzYzogJycsXG4gICAgICAgIG9uZTogJ+ino+aekOWbvueJh+S4re+9nicsXG4gICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgIGxpc3Q6IFtdXG4gICAgICB9LFxuICAgICAgY29weTogW11cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgd2hpY2goKSB7XG4gICAgICAgIHRoaXMucmVzdWx0Lm9uZSA9IHRoaXMucmVzdWx0LmRlc2M7XG4gICAgICB9LFxuICAgICAgY2hlY2tib3hDaGFuZ2UoZSkge1xuICAgICAgICBsZXQga2V5cyA9IGUuZGV0YWlsLnZhbHVlLnNvcnQoKGEsYik9PntcbiAgICAgICAgICByZXR1cm4gYS1iO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb3B5ID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5jb3B5LnB1c2godGhpcy5yZXN1bHQubGlzdFtrZXlzW2ldXS52YWwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29weSk7XG4gICAgICB9LFxuICAgICAgc2hhcmUoKSB7XG4gICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICAgIHdpdGhTaGFyZVRpY2tldDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHZvaWNlKCkge1xuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6K+t6Z+z5ZCI5oiQ5LitLi4uJyxcbiAgICAgICAgICBpY29uOiAnbG9hZGluZycsXG4gICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0LnN0YXR1cyA9ICF0aGlzLnJlc3VsdC5zdGF0dXM7XG4gICAgICB9LFxuICAgICAgdHJhbnNmZXIoKSB7XG4gICAgICAgIHd4LnNob3dBY3Rpb25TaGVldCh7XG4gICAgICAgICAgaXRlbUxpc3Q6IFsn5Lit6Iux5paHJywgJ+aXpeivrScsICfms5Xor60nXSxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy50YXBJbmRleCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5lcnJNc2cpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjb3B5KCkge1xuICAgICAgICB3eC5zZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICBkYXRhOiB0aGlzLmNvcHkuam9pbignXFxuJyksXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB3eC5nZXRDbGlwYm9hcmREYXRhKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5a2X5bey5aSN5Yi2JyxcbiAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBsb2FkKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+ivhuWIq+S4rScsXG4gICAgICB9KVxuICAgICAgd3gudXBsb2FkRmlsZSh7XG4gICAgICAgIHVybDonaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvcmVjb2duL2dlbmVyYWwnLFxuICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGEud29yZHNfcmVzdWx0LCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICBsZXQgcmVzdWx0cyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHQubWFwKChpdGVtLGluZGV4KSA9PiB7IHJldHVybiB7aWQ6aW5kZXgsdmFsOml0ZW0ud29yZHN9OyB9KTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRzLCdzc3MnKTtcbiAgICAgICAgICBzZWxmLnJlc3VsdC5saXN0ID0gcmVzdWx0cztcbiAgICAgICAgICBzZWxmLnJlc3VsdC5zdGF0dXMgPSB0cnVlO1xuXG4gICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLnJlc3VsdC5pbWd1cmwgPSB3eC5nZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnKTtcbiAgICAgIHRoaXMudXBsb2FkKCk7XG4gICAgICB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgd2l0aFNoYXJlVGlja2V0OiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19