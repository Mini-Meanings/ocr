'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Contact = function (_wepy$page) {
  _inherits(Contact, _wepy$page);

  function Contact() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Contact);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Contact.__proto__ || Object.getPrototypeOf(Contact)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '建议反馈'
    }, _this.data = {
      index: 0,
      array: ['问题', '建议', '优化', '异常'],
      question: '',
      contact: ''
    }, _this.methods = {
      // bindPickerChange: function(e) {
      //   console.log('picker发送选择改变，携带值为', e.detail.value)
      //   this.index = e.detail.value;
      // },
      getQuestion: function getQuestion(e) {
        this.question = e.detail.value;
      },
      getContact: function getContact(e) {
        this.contact = e.detail.value;
      },
      submitInfo: function submitInfo() {
        var self = this;
        console.log(this.question, this.contact);
        if (!this.question || !this.contact) {
          wx.showToast({
            title: '请完善信息后提交',
            icon: 'none',
            duration: 1000
          });
        } else {
          wx.request({
            url: 'https://www.iocr.vip/ai/users/feedback',
            method: 'POST',
            data: {
              content: this.question,
              email: this.contact
            },
            success: function success(res) {
              console.log(res.data, 'feedback');
              if (res.data.code === 200) {
                wx.showToast({
                  title: res.data.data,
                  icon: 'none',
                  duration: 2000
                });
                // 重置表单域
                self.question = '';
                self.contact = '';
                self.$apply();
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.data,
                  success: function success(res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 2
                      });
                    } else if (res.cancel) {
                      console.log('用户点击取消');
                    }
                  }
                });
              }
            },
            fail: function fail(e) {
              console.log(e, 'feedback api error');
            }
          });
        }
      },
      goback: function goback() {
        // console.log(111);
        wx.navigateBack({
          delta: 1
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Contact, [{
    key: 'onLoad',
    value: function onLoad() {
      // wx.showLoading({
      //   title: '加载中',
      //   mask: true,
      //   duration: 1500,
      // })
    }
  }]);

  return Contact;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Contact , 'pages/contact'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QuanMiXSwibmFtZXMiOlsiQ29udGFjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaW5kZXgiLCJhcnJheSIsInF1ZXN0aW9uIiwiY29udGFjdCIsIm1ldGhvZHMiLCJnZXRRdWVzdGlvbiIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImdldENvbnRhY3QiLCJzdWJtaXRJbmZvIiwic2VsZiIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImNvbnRlbnQiLCJlbWFpbCIsInN1Y2Nlc3MiLCJyZXMiLCJjb2RlIiwiJGFwcGx5Iiwic2hvd01vZGFsIiwiY29uZmlybSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiY2FuY2VsIiwiZmFpbCIsImdvYmFjayIsImV2ZW50cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxhQUFPLENBREY7QUFFTEMsYUFBTyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUZGO0FBR0xDLGdCQUFVLEVBSEw7QUFJTEMsZUFBUztBQUpKLEssUUFNUEMsTyxHQUFVO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsbUJBQWEscUJBQVNDLENBQVQsRUFBWTtBQUN2QixhQUFLSixRQUFMLEdBQWdCSSxFQUFFQyxNQUFGLENBQVNDLEtBQXpCO0FBQ0QsT0FQTztBQVFSQyxrQkFBWSxvQkFBVUgsQ0FBVixFQUFhO0FBQ3ZCLGFBQUtILE9BQUwsR0FBZUcsRUFBRUMsTUFBRixDQUFTQyxLQUF4QjtBQUNELE9BVk87QUFXUkUsa0JBQVksc0JBQVc7QUFDckIsWUFBSUMsT0FBTyxJQUFYO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksS0FBS1gsUUFBakIsRUFBMEIsS0FBS0MsT0FBL0I7QUFDQSxZQUFHLENBQUMsS0FBS0QsUUFBTixJQUFrQixDQUFDLEtBQUtDLE9BQTNCLEVBQW9DO0FBQ2xDVyxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sVUFESTtBQUVYQyxrQkFBTSxNQUZLO0FBR1hDLHNCQUFVO0FBSEMsV0FBYjtBQUtELFNBTkQsTUFNTztBQUNMSixhQUFHSyxPQUFILENBQVc7QUFDVEMsaUJBQUssd0NBREk7QUFFVEMsb0JBQVEsTUFGQztBQUdUdEIsa0JBQU07QUFDSnVCLHVCQUFTLEtBQUtwQixRQURWO0FBRUpxQixxQkFBTyxLQUFLcEI7QUFGUixhQUhHO0FBT1RxQixxQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCYixzQkFBUUMsR0FBUixDQUFZWSxJQUFJMUIsSUFBaEIsRUFBcUIsVUFBckI7QUFDQSxrQkFBRzBCLElBQUkxQixJQUFKLENBQVMyQixJQUFULEtBQWtCLEdBQXJCLEVBQTBCO0FBQ3hCWixtQkFBR0MsU0FBSCxDQUFhO0FBQ1hDLHlCQUFPUyxJQUFJMUIsSUFBSixDQUFTQSxJQURMO0FBRVhrQix3QkFBTSxNQUZLO0FBR1hDLDRCQUFVO0FBSEMsaUJBQWI7QUFLQTtBQUNBUCxxQkFBS1QsUUFBTCxHQUFnQixFQUFoQjtBQUNBUyxxQkFBS1IsT0FBTCxHQUFlLEVBQWY7QUFDQVEscUJBQUtnQixNQUFMO0FBQ0QsZUFWRCxNQVVPO0FBQ0xiLG1CQUFHYyxTQUFILENBQWE7QUFDWFoseUJBQU8sSUFESTtBQUVYTSwyQkFBU0csSUFBSTFCLElBQUosQ0FBU0EsSUFGUDtBQUdYeUIsMkJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQix3QkFBSUEsSUFBSUksT0FBUixFQUFpQjtBQUNmZix5QkFBR2dCLFlBQUgsQ0FBZ0I7QUFDZEMsK0JBQU87QUFETyx1QkFBaEI7QUFHRCxxQkFKRCxNQUlPLElBQUlOLElBQUlPLE1BQVIsRUFBZ0I7QUFDckJwQiw4QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQUNGO0FBWFUsaUJBQWI7QUFhRDtBQUNGLGFBbENRO0FBbUNUb0Isa0JBQU0sY0FBVTNCLENBQVYsRUFBYTtBQUNqQk0sc0JBQVFDLEdBQVIsQ0FBWVAsQ0FBWixFQUFjLG9CQUFkO0FBQ0Q7QUFyQ1EsV0FBWDtBQXVDRDtBQUNGLE9BN0RPO0FBOERSNEIsY0FBUSxrQkFBVztBQUNqQjtBQUNBcEIsV0FBR2dCLFlBQUgsQ0FBZ0I7QUFDZEMsaUJBQU87QUFETyxTQUFoQjtBQUdEO0FBbkVPLEssUUFzRVZJLE0sR0FBUyxFOzs7Ozs2QkFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQXhGZ0MsZUFBS0MsSTs7a0JBQXJCeEMsTyIsImZpbGUiOiJjb250YWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFjdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W7uuiuruWPjemmiCdcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBhcnJheTogWyfpl67popgnLCAn5bu66K6uJywgJ+S8mOWMlicsICflvILluLgnXSxcbiAgICAgIHF1ZXN0aW9uOiAnJyxcbiAgICAgIGNvbnRhY3Q6ICcnXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgLy8gYmluZFBpY2tlckNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgICAgLy8gICBjb25zb2xlLmxvZygncGlja2Vy5Y+R6YCB6YCJ5oup5pS55Y+Y77yM5pC65bim5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgICAvLyAgIHRoaXMuaW5kZXggPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIC8vIH0sXG4gICAgICBnZXRRdWVzdGlvbjogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgZ2V0Q29udGFjdDogZnVuY3Rpb24gKGUpIHsgXG4gICAgICAgIHRoaXMuY29udGFjdCA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHN1Ym1pdEluZm86IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucXVlc3Rpb24sdGhpcy5jb250YWN0KTtcbiAgICAgICAgaWYoIXRoaXMucXVlc3Rpb24gfHwgIXRoaXMuY29udGFjdCkge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WujOWWhOS/oeaBr+WQjuaPkOS6pCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS91c2Vycy9mZWVkYmFjaycsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgY29udGVudDogdGhpcy5xdWVzdGlvbiAsXG4gICAgICAgICAgICAgIGVtYWlsOiB0aGlzLmNvbnRhY3RcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEsJ2ZlZWRiYWNrJyk7XG4gICAgICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyDph43nva7ooajljZXln59cbiAgICAgICAgICAgICAgICBzZWxmLnF1ZXN0aW9uID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250YWN0ID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgY29udGVudDogcmVzLmRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGUpIHsgXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUsJ2ZlZWRiYWNrIGFwaSBlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb2JhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygxMTEpO1xuICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZCgpIHtcbiAgICAgIC8vIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIC8vICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgLy8gICBtYXNrOiB0cnVlLFxuICAgICAgLy8gICBkdXJhdGlvbjogMTUwMCxcbiAgICAgIC8vIH0pXG4gICAgfTtcbiAgICAvLyBvblJlYWR5KCkge1xuICAgIC8vICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAvLyB9O1xufVxuIl19