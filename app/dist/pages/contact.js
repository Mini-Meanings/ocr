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
      qusetion: '',
      contact: ''
    }, _this.methods = {
      // bindPickerChange: function(e) {
      //   console.log('picker发送选择改变，携带值为', e.detail.value)
      //   this.index = e.detail.value;
      // },
      getQuestion: function getQuestion(e) {
        this.qusetion = e.detail.value;
      },
      getContact: function getContact(e) {
        this.contact = e.detail.value;
      },
      submitInfo: function submitInfo() {
        console.log(this.qusetion, this.contact);
        if (!this.qusetion || !this.contact) {
          wx.showToast({
            title: '请完善信息后提交',
            icon: 'none',
            duration: 1000
          });
        } else {
          wx.showModal({
            title: '操作成功',
            content: '谢谢反馈，我们会尽快处理！',
            // showCancel: false,
            success: function success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhY3QuanMiXSwibmFtZXMiOlsiQ29udGFjdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiaW5kZXgiLCJhcnJheSIsInF1c2V0aW9uIiwiY29udGFjdCIsIm1ldGhvZHMiLCJnZXRRdWVzdGlvbiIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsImdldENvbnRhY3QiLCJzdWJtaXRJbmZvIiwiY29uc29sZSIsImxvZyIsInd4Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJzaG93TW9kYWwiLCJjb250ZW50Iiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImNhbmNlbCIsImdvYmFjayIsImV2ZW50cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNqQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBSVRDLEksR0FBTztBQUNMQyxhQUFPLENBREY7QUFFTEMsYUFBTyxDQUFDLElBQUQsRUFBTyxJQUFQLEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUZGO0FBR0xDLGdCQUFVLEVBSEw7QUFJTEMsZUFBUztBQUpKLEssUUFNUEMsTyxHQUFVO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsbUJBQWEscUJBQVNDLENBQVQsRUFBWTtBQUN2QixhQUFLSixRQUFMLEdBQWdCSSxFQUFFQyxNQUFGLENBQVNDLEtBQXpCO0FBQ0QsT0FQTztBQVFSQyxrQkFBWSxvQkFBVUgsQ0FBVixFQUFhO0FBQ3ZCLGFBQUtILE9BQUwsR0FBZUcsRUFBRUMsTUFBRixDQUFTQyxLQUF4QjtBQUNELE9BVk87QUFXUkUsa0JBQVksc0JBQVc7QUFDckJDLGdCQUFRQyxHQUFSLENBQVksS0FBS1YsUUFBakIsRUFBMEIsS0FBS0MsT0FBL0I7QUFDQSxZQUFHLENBQUMsS0FBS0QsUUFBTixJQUFrQixDQUFDLEtBQUtDLE9BQTNCLEVBQW9DO0FBQ2xDVSxhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sVUFESTtBQUVYQyxrQkFBTSxNQUZLO0FBR1hDLHNCQUFVO0FBSEMsV0FBYjtBQUtELFNBTkQsTUFNTztBQUNMSixhQUFHSyxTQUFILENBQWE7QUFDWEgsbUJBQU8sTUFESTtBQUVYSSxxQkFBUyxlQUZFO0FBR1g7QUFDQUMscUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNyQixrQkFBSUEsSUFBSUMsT0FBUixFQUFpQjtBQUNmVCxtQkFBR1UsWUFBSCxDQUFnQjtBQUNkQyx5QkFBTztBQURPLGlCQUFoQjtBQUdELGVBSkQsTUFJTyxJQUFJSCxJQUFJSSxNQUFSLEVBQWdCO0FBQ3JCZCx3QkFBUUMsR0FBUixDQUFZLFFBQVo7QUFDRDtBQUNGO0FBWlUsV0FBYjtBQWNEO0FBQ0YsT0FuQ087QUFvQ1JjLGNBQVEsa0JBQVc7QUFDakI7QUFDQWIsV0FBR1UsWUFBSCxDQUFnQjtBQUNkQyxpQkFBTztBQURPLFNBQWhCO0FBR0Q7QUF6Q08sSyxRQTRDVkcsTSxHQUFTLEU7Ozs7OzZCQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7O0VBOURnQyxlQUFLQyxJOztrQkFBckJoQyxPIiwiZmlsZSI6ImNvbnRhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5bu66K6u5Y+N6aaIJ1xuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBpbmRleDogMCxcbiAgICAgIGFycmF5OiBbJ+mXrumimCcsICflu7rorq4nLCAn5LyY5YyWJywgJ+W8guW4uCddLFxuICAgICAgcXVzZXRpb246ICcnLFxuICAgICAgY29udGFjdDogJydcbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAvLyBiaW5kUGlja2VyQ2hhbmdlOiBmdW5jdGlvbihlKSB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdwaWNrZXLlj5HpgIHpgInmi6nmlLnlj5jvvIzmkLrluKblgLzkuLonLCBlLmRldGFpbC52YWx1ZSlcbiAgICAgIC8vICAgdGhpcy5pbmRleCA9IGUuZGV0YWlsLnZhbHVlO1xuICAgICAgLy8gfSxcbiAgICAgIGdldFF1ZXN0aW9uOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHRoaXMucXVzZXRpb24gPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIH0sXG4gICAgICBnZXRDb250YWN0OiBmdW5jdGlvbiAoZSkgeyBcbiAgICAgICAgdGhpcy5jb250YWN0ID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgc3VibWl0SW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucXVzZXRpb24sdGhpcy5jb250YWN0KTtcbiAgICAgICAgaWYoIXRoaXMucXVzZXRpb24gfHwgIXRoaXMuY29udGFjdCkge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+ivt+WujOWWhOS/oeaBr+WQjuaPkOS6pCcsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5pON5L2c5oiQ5YqfJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfosKLosKLlj43ppojvvIzmiJHku6zkvJrlsL3lv6vlpITnkIbvvIEnLFxuICAgICAgICAgICAgLy8gc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29iYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coMTExKTtcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICBkZWx0YTogMVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH07XG5cbiAgICBldmVudHMgPSB7fTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICAvLyB3eC5zaG93TG9hZGluZyh7XG4gICAgICAvLyAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICAgIC8vICAgbWFzazogdHJ1ZSxcbiAgICAgIC8vICAgZHVyYXRpb246IDE1MDAsXG4gICAgICAvLyB9KVxuICAgIH07XG4gICAgLy8gb25SZWFkeSgpIHtcbiAgICAvLyAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgLy8gfTtcbn1cbiJdfQ==