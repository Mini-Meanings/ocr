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
        if (!this.question.trim() || !this.contact.trim()) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QuanMiXSwibmFtZXMiOlsiQ29udGFjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaW5kZXgiLCJhcnJheSIsInF1ZXN0aW9uIiwiY29udGFjdCIsIm1ldGhvZHMiLCJnZXRRdWVzdGlvbiIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImdldENvbnRhY3QiLCJzdWJtaXRJbmZvIiwic2VsZiIsInBhdCIsImNvbnNvbGUiLCJsb2ciLCJ0cmltIiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInRlc3QiLCJyZXF1ZXN0IiwidXJsIiwibWV0aG9kIiwiY29udGVudCIsImVtYWlsIiwic3VjY2VzcyIsInJlcyIsImNvZGUiLCIkYXBwbHkiLCJzaG93TW9kYWwiLCJjb25maXJtIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYW5jZWwiLCJmYWlsIiwiZ29iYWNrIiwiZXZlbnRzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7d0xBQ2pCQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGFBQU8sQ0FERjtBQUVMQyxhQUFPLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLENBRkY7QUFHTEMsZ0JBQVUsRUFITDtBQUlMQyxlQUFTO0FBSkosSyxRQU1QQyxPLEdBQVU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxtQkFBYSxxQkFBU0MsQ0FBVCxFQUFZO0FBQ3ZCLGFBQUtKLFFBQUwsR0FBZ0JJLEVBQUVDLE1BQUYsQ0FBU0MsS0FBekI7QUFDRCxPQVBPO0FBUVJDLGtCQUFZLG9CQUFVSCxDQUFWLEVBQWE7QUFDdkIsYUFBS0gsT0FBTCxHQUFlRyxFQUFFQyxNQUFGLENBQVNDLEtBQXhCO0FBQ0QsT0FWTztBQVdSRSxrQkFBWSxzQkFBVztBQUNyQixZQUFJQyxPQUFPLElBQVg7QUFDQSxZQUFJQyxNQUFNLG9EQUFWO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksS0FBS1osUUFBakIsRUFBMEIsS0FBS0MsT0FBL0I7QUFDQSxZQUFHLENBQUMsS0FBS0QsUUFBTCxDQUFjYSxJQUFkLEVBQUQsSUFBeUIsQ0FBQyxLQUFLWixPQUFMLENBQWFZLElBQWIsRUFBN0IsRUFBa0Q7QUFDaERDLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxVQURJO0FBRVhDLGtCQUFNLE1BRks7QUFHWEMsc0JBQVU7QUFIQyxXQUFiO0FBS0QsU0FORCxNQU1PLElBQUcsQ0FBQ1IsSUFBSVMsSUFBSixDQUFTLEtBQUtsQixPQUFkLENBQUosRUFBNEI7QUFDakNhLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxTQURJO0FBRVhDLGtCQUFNLE1BRks7QUFHWEMsc0JBQVU7QUFIQyxXQUFiO0FBS0QsU0FOTSxNQU1BO0FBQ0xKLGFBQUdNLE9BQUgsQ0FBVztBQUNUQyxpQkFBSyx3Q0FESTtBQUVUQyxvQkFBUSxNQUZDO0FBR1R6QixrQkFBTTtBQUNKMEIsdUJBQVMsS0FBS3ZCLFFBRFY7QUFFSndCLHFCQUFPLEtBQUt2QjtBQUZSLGFBSEc7QUFPVHdCLHFCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJmLHNCQUFRQyxHQUFSLENBQVljLElBQUk3QixJQUFoQixFQUFxQixVQUFyQjtBQUNBLGtCQUFHNkIsSUFBSTdCLElBQUosQ0FBUzhCLElBQVQsS0FBa0IsR0FBckIsRUFBMEI7QUFDeEJiLG1CQUFHQyxTQUFILENBQWE7QUFDWEMseUJBQU9VLElBQUk3QixJQUFKLENBQVNBLElBREw7QUFFWG9CLHdCQUFNLE1BRks7QUFHWEMsNEJBQVU7QUFIQyxpQkFBYjtBQUtBO0FBQ0FULHFCQUFLVCxRQUFMLEdBQWdCLEVBQWhCO0FBQ0FTLHFCQUFLUixPQUFMLEdBQWUsRUFBZjtBQUNBUSxxQkFBS21CLE1BQUw7QUFDRCxlQVZELE1BVU87QUFDTGQsbUJBQUdlLFNBQUgsQ0FBYTtBQUNYYix5QkFBTyxJQURJO0FBRVhPLDJCQUFTRyxJQUFJN0IsSUFBSixDQUFTQSxJQUZQO0FBR1g0QiwyQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLHdCQUFJQSxJQUFJSSxPQUFSLEVBQWlCO0FBQ2ZoQix5QkFBR2lCLFlBQUgsQ0FBZ0I7QUFDZEMsK0JBQU87QUFETyx1QkFBaEI7QUFHRCxxQkFKRCxNQUlPLElBQUlOLElBQUlPLE1BQVIsRUFBZ0I7QUFDckJ0Qiw4QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQUNGO0FBWFUsaUJBQWI7QUFhRDtBQUNGLGFBbENRO0FBbUNUc0Isa0JBQU0sY0FBVTlCLENBQVYsRUFBYTtBQUNqQk8sc0JBQVFDLEdBQVIsQ0FBWVIsQ0FBWixFQUFjLG9CQUFkO0FBQ0Q7QUFyQ1EsV0FBWDtBQXVDRDtBQUNGLE9BcEVPO0FBcUVSK0IsY0FBUSxrQkFBVztBQUNqQjtBQUNBckIsV0FBR2lCLFlBQUgsQ0FBZ0I7QUFDZEMsaUJBQU87QUFETyxTQUFoQjtBQUdEO0FBMUVPLEssUUE2RVZJLE0sR0FBUyxFOzs7Ozs2QkFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQS9GZ0MsZUFBS0MsSTs7a0JBQXJCM0MsTyIsImZpbGUiOiJjb250YWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFjdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W7uuiuruWPjemmiCdcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBhcnJheTogWyfpl67popgnLCAn5bu66K6uJywgJ+S8mOWMlicsICflvILluLgnXSxcbiAgICAgIHF1ZXN0aW9uOiAnJyxcbiAgICAgIGNvbnRhY3Q6ICcnXG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgLy8gYmluZFBpY2tlckNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgICAgLy8gICBjb25zb2xlLmxvZygncGlja2Vy5Y+R6YCB6YCJ5oup5pS55Y+Y77yM5pC65bim5YC85Li6JywgZS5kZXRhaWwudmFsdWUpXG4gICAgICAvLyAgIHRoaXMuaW5kZXggPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIC8vIH0sXG4gICAgICBnZXRRdWVzdGlvbjogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgZ2V0Q29udGFjdDogZnVuY3Rpb24gKGUpIHsgXG4gICAgICAgIHRoaXMuY29udGFjdCA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHN1Ym1pdEluZm86IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBwYXQgPSAvXihbYS16QS1aMC05Li1dKStAKFthLXpBLVowLTktXSkrKC5bYS16QS1aMC05Xy1dKSsvO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnF1ZXN0aW9uLHRoaXMuY29udGFjdCk7XG4gICAgICAgIGlmKCF0aGlzLnF1ZXN0aW9uLnRyaW0oKSB8fCAhdGhpcy5jb250YWN0LnRyaW0oKSkge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WujOWWhOS/oeaBr+WQjuaPkOS6pCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZighcGF0LnRlc3QodGhpcy5jb250YWN0KSkge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+mCrueuseagvOW8j+S4jeato+ehricsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS91c2Vycy9mZWVkYmFjaycsXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgY29udGVudDogdGhpcy5xdWVzdGlvbiAsXG4gICAgICAgICAgICAgIGVtYWlsOiB0aGlzLmNvbnRhY3RcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEsJ2ZlZWRiYWNrJyk7XG4gICAgICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyDph43nva7ooajljZXln59cbiAgICAgICAgICAgICAgICBzZWxmLnF1ZXN0aW9uID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi5jb250YWN0ID0gJyc7XG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICAgICAgY29udGVudDogcmVzLmRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDJcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGUpIHsgXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUsJ2ZlZWRiYWNrIGFwaSBlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb2JhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygxMTEpO1xuICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfTtcblxuICAgIGV2ZW50cyA9IHt9O1xuICAgIG9uTG9hZCgpIHtcbiAgICAgIC8vIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIC8vICAgdGl0bGU6ICfliqDovb3kuK0nLFxuICAgICAgLy8gICBtYXNrOiB0cnVlLFxuICAgICAgLy8gICBkdXJhdGlvbjogMTUwMCxcbiAgICAgIC8vIH0pXG4gICAgfTtcbiAgICAvLyBvblJlYWR5KCkge1xuICAgIC8vICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAvLyB9O1xufVxuIl19