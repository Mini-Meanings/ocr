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
        var pat = /^([a-zA-Z0-9.-])+@([a-zA-Z0-9-])+(.[a-zA-Z0-9_-])+/;
        console.log(this.question, this.contact);
        if (!this.question || !this.contact) {
          wx.showToast({
            title: '请完善信息后提交',
            icon: 'none',
            duration: 1000
          });
        } else if (!pat.test(this.contact)) {
          wx.showToast({
            title: '邮箱格式不正确',
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QuanMiXSwibmFtZXMiOlsiQ29udGFjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaW5kZXgiLCJhcnJheSIsInF1ZXN0aW9uIiwiY29udGFjdCIsIm1ldGhvZHMiLCJnZXRRdWVzdGlvbiIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImdldENvbnRhY3QiLCJzdWJtaXRJbmZvIiwic2VsZiIsInBhdCIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwidGVzdCIsInJlcXVlc3QiLCJ1cmwiLCJtZXRob2QiLCJjb250ZW50IiwiZW1haWwiLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsIiRhcHBseSIsInNob3dNb2RhbCIsImNvbmZpcm0iLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImNhbmNlbCIsImZhaWwiLCJnb2JhY2siLCJldmVudHMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDakJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsYUFBTyxDQURGO0FBRUxDLGFBQU8sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsQ0FGRjtBQUdMQyxnQkFBVSxFQUhMO0FBSUxDLGVBQVM7QUFKSixLLFFBTVBDLE8sR0FBVTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLG1CQUFhLHFCQUFTQyxDQUFULEVBQVk7QUFDdkIsYUFBS0osUUFBTCxHQUFnQkksRUFBRUMsTUFBRixDQUFTQyxLQUF6QjtBQUNELE9BUE87QUFRUkMsa0JBQVksb0JBQVVILENBQVYsRUFBYTtBQUN2QixhQUFLSCxPQUFMLEdBQWVHLEVBQUVDLE1BQUYsQ0FBU0MsS0FBeEI7QUFDRCxPQVZPO0FBV1JFLGtCQUFZLHNCQUFXO0FBQ3JCLFlBQUlDLE9BQU8sSUFBWDtBQUNBLFlBQUlDLE1BQU0sb0RBQVY7QUFDQUMsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLWixRQUFqQixFQUEwQixLQUFLQyxPQUEvQjtBQUNBLFlBQUcsQ0FBQyxLQUFLRCxRQUFOLElBQWtCLENBQUMsS0FBS0MsT0FBM0IsRUFBb0M7QUFDbENZLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxVQURJO0FBRVhDLGtCQUFNLE1BRks7QUFHWEMsc0JBQVU7QUFIQyxXQUFiO0FBS0QsU0FORCxNQU1PLElBQUcsQ0FBQ1AsSUFBSVEsSUFBSixDQUFTLEtBQUtqQixPQUFkLENBQUosRUFBNEI7QUFDakNZLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxTQURJO0FBRVhDLGtCQUFNLE1BRks7QUFHWEMsc0JBQVU7QUFIQyxXQUFiO0FBS0QsU0FOTSxNQU1BO0FBQ0xKLGFBQUdNLE9BQUgsQ0FBVztBQUNUQyxpQkFBSyx3Q0FESTtBQUVUQyxvQkFBUSxNQUZDO0FBR1R4QixrQkFBTTtBQUNKeUIsdUJBQVMsS0FBS3RCLFFBRFY7QUFFSnVCLHFCQUFPLEtBQUt0QjtBQUZSLGFBSEc7QUFPVHVCLHFCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJkLHNCQUFRQyxHQUFSLENBQVlhLElBQUk1QixJQUFoQixFQUFxQixVQUFyQjtBQUNBLGtCQUFHNEIsSUFBSTVCLElBQUosQ0FBUzZCLElBQVQsS0FBa0IsR0FBckIsRUFBMEI7QUFDeEJiLG1CQUFHQyxTQUFILENBQWE7QUFDWEMseUJBQU9VLElBQUk1QixJQUFKLENBQVNBLElBREw7QUFFWG1CLHdCQUFNLE1BRks7QUFHWEMsNEJBQVU7QUFIQyxpQkFBYjtBQUtBO0FBQ0FSLHFCQUFLVCxRQUFMLEdBQWdCLEVBQWhCO0FBQ0FTLHFCQUFLUixPQUFMLEdBQWUsRUFBZjtBQUNBUSxxQkFBS2tCLE1BQUw7QUFDRCxlQVZELE1BVU87QUFDTGQsbUJBQUdlLFNBQUgsQ0FBYTtBQUNYYix5QkFBTyxJQURJO0FBRVhPLDJCQUFTRyxJQUFJNUIsSUFBSixDQUFTQSxJQUZQO0FBR1gyQiwyQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLHdCQUFJQSxJQUFJSSxPQUFSLEVBQWlCO0FBQ2ZoQix5QkFBR2lCLFlBQUgsQ0FBZ0I7QUFDZEMsK0JBQU87QUFETyx1QkFBaEI7QUFHRCxxQkFKRCxNQUlPLElBQUlOLElBQUlPLE1BQVIsRUFBZ0I7QUFDckJyQiw4QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQUNGO0FBWFUsaUJBQWI7QUFhRDtBQUNGLGFBbENRO0FBbUNUcUIsa0JBQU0sY0FBVTdCLENBQVYsRUFBYTtBQUNqQk8sc0JBQVFDLEdBQVIsQ0FBWVIsQ0FBWixFQUFjLG9CQUFkO0FBQ0Q7QUFyQ1EsV0FBWDtBQXVDRDtBQUNGLE9BcEVPO0FBcUVSOEIsY0FBUSxrQkFBVztBQUNqQjtBQUNBckIsV0FBR2lCLFlBQUgsQ0FBZ0I7QUFDZEMsaUJBQU87QUFETyxTQUFoQjtBQUdEO0FBMUVPLEssUUE2RVZJLE0sR0FBUyxFOzs7Ozs2QkFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQS9GZ0MsZUFBS0MsSTs7a0JBQXJCMUMsTyIsImZpbGUiOiJjb250YWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFjdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W7uuiuruWPjemmiCdcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBhcnJheTogWyfpl67popgnLCAn5bu66K6uJywgJ+S8mOWMlicsICflvILluLgnXSxcbiAgICAgIHF1ZXN0aW9uOiAnJyxcbiAgICAgIGNvbnRhY3Q6ICcnXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgLy8gYmluZFBpY2tlckNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgICAgLy8gICBjb25zb2xlLmxvZygncGlja2Vy5Y+R6YCB6YCJ5oup5pS55Y+Y77yM5pC65bim5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgICAvLyAgIHRoaXMuaW5kZXggPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIC8vIH0sXG4gICAgICBnZXRRdWVzdGlvbjogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgZ2V0Q29udGFjdDogZnVuY3Rpb24gKGUpIHsgXG4gICAgICAgIHRoaXMuY29udGFjdCA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHN1Ym1pdEluZm86IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBwYXQgPSAvXihbYS16QS1aMC05Li1dKStAKFthLXpBLVowLTktXSkrKC5bYS16QS1aMC05Xy1dKSsvO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnF1ZXN0aW9uLHRoaXMuY29udGFjdCk7XG4gICAgICAgIGlmKCF0aGlzLnF1ZXN0aW9uIHx8ICF0aGlzLmNvbnRhY3QpIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7flrozlloTkv6Hmga/lkI7mj5DkuqQnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYoIXBhdC50ZXN0KHRoaXMuY29udGFjdCkpIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfpgq7nrrHmoLzlvI/kuI3mraPnoa4nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvdXNlcnMvZmVlZGJhY2snLFxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMucXVlc3Rpb24gLFxuICAgICAgICAgICAgICBlbWFpbDogdGhpcy5jb250YWN0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLCdmZWVkYmFjaycpO1xuICAgICAgICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8g6YeN572u6KGo5Y2V5Z+fXG4gICAgICAgICAgICAgICAgc2VsZi5xdWVzdGlvbiA9ICcnO1xuICAgICAgICAgICAgICAgIHNlbGYuY29udGFjdCA9ICcnO1xuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAyXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlKSB7IFxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLCdmZWVkYmFjayBhcGkgZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29iYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coMTExKTtcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICBkZWx0YTogMVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH07XG5cbiAgICBldmVudHMgPSB7fTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAvLyB3eC5zaG93TG9hZGluZyh7XG4gICAgICAvLyAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIC8vICAgbWFzazogdHJ1ZSxcbiAgICAgIC8vICAgZHVyYXRpb246IDE1MDAsXG4gICAgICAvLyB9KVxuICAgIH07XG4gICAgLy8gb25SZWFkeSgpIHtcbiAgICAvLyAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgLy8gfTtcbn1cbiJdfQ==