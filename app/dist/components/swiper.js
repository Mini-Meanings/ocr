'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyComSwiper = require('./../npm/wepy-com-swiper/swiper.js');

var _wepyComSwiper2 = _interopRequireDefault(_wepyComSwiper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MySwiper = function (_wepy$page) {
  _inherits(MySwiper, _wepy$page);

  function MySwiper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MySwiper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MySwiper.__proto__ || Object.getPrototypeOf(MySwiper)).call.apply(_ref, [this].concat(args))), _this), _this.$repeat = {}, _this.$props = { "weSwiper": { "xmlns:v-bind": "", "v-bind:option.once": "swiper" } }, _this.$events = {}, _this.components = {
      weSwiper: _wepyComSwiper2.default
    }, _this.data = {
      index: 0,
      lflag: true,
      rflag: true,
      count: {
        general: 0,
        receipt: 0, // 票据
        idcard: 0,
        drivecard: 0,
        bankcard: 0,
        enhance: 0
      },
      swiper: {
        // direction: 'vertical',
        // width: 180,
        slideLength: 6,
        initialSlide: 0,
        /**
         * swiper初始化后执行
         * @param swiper
         */
        onInit: function onInit(weswiper) {
          console.log(weswiper);
        },

        /**
         * 手指碰触slide时执行
         * @param swiper
         * @param event
         */
        onTouchStart: function onTouchStart(weswiper, event) {},

        /**
         * 手指碰触slide并且滑动时执行
         * @param swiper
         * @param event
         */
        onTouchMove: function onTouchMove(weswiper, event) {},

        /**
         * 手指离开slide时执行
         * @param swiper
         * @param event
         */
        onTouchEnd: function onTouchEnd(weswiper, event) {
          // console.log(weswiper.activeIndex,'weswiper.activeIndex');
          // if(weswiper.activeIndex === 5){
          //   wx.showToast({
          //     title: '已经到尾啦～',
          //     icon: 'none',
          //     duration: 1000
          //   })
          // } else if(weswiper.activeIndex === 0) {
          //   wx.showToast({
          //     title: '已经到头啦～',
          //     icon: 'none',
          //     duration: 1000
          //   })
          // }
        },

        /**
         *  slide达到过渡条件时执行
         */
        onSlideChangeStart: function onSlideChangeStart(weswiper) {},

        /**
         *  swiper从一个slide过渡到另一个slide结束时执行
         */
        onSlideChangeEnd: function onSlideChangeEnd(weswiper) {
          // console.log(weswiper.activeIndex,'weswiper.activeIndex');
          wx.setStorageSync('index', weswiper.activeIndex);
        },

        /**
         *  过渡时触发
         */
        onTransitionStart: function onTransitionStart(weswiper) {},

        /**
         *  过渡结束时执行
         */
        onTransitionEnd: function onTransitionEnd(weswiper) {
          // console.log(weswiper.activeIndex,'weswiper.activeIndex');
          // if(weswiper.activeIndex === 5){
          //   wx.showToast({
          //     title: '已经到尾啦～',
          //     icon: 'none',
          //     duration: 1000
          //   })
          // } else if(weswiper.activeIndex === 0) {
          //   wx.showToast({
          //     title: '已经到头啦～',
          //     icon: 'none',
          //     duration: 1000
          //   })
          // }

          // wx.setStorageSync('index', weswiper.activeIndex);

          // console.log(arguments,'arguments');
          // console.log(weswiper.isBeginning,'isBeginning');
          // if (weswiper.isBeginning){
          //   console.log('tail');
          //   this.lflag = false;
          // } else if (weswiper.isEnd) {
          //   console.log('head');
          //   this.rflag = false;
          // }
        },

        /**
         *  手指触碰swiper并且拖动slide时执行
         */
        onSlideMove: function onSlideMove(weswiper) {
          // console.log(weswiper.activeIndex,'weswiper.activeIndex');
        },

        /**
         * slide达到过渡条件 且规定了方向 向前（右、下）切换时执行
         */
        onSlideNextStart: function onSlideNextStart(weswiper) {},

        /**
         *  slide达到过渡条件 且规定了方向 向前（右、下）切换结束时执行
         */
        onSlideNextEnd: function onSlideNextEnd(weswiper) {
          // console.log(weswiper.activeIndex,'next');
          wx.setStorageSync('index', weswiper.activeIndex);
        },

        /**
         *  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
         */
        onSlidePrevStart: function onSlidePrevStart(swiper) {},

        /**
         *  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
         */
        onSlidePrevEnd: function onSlidePrevEnd(weswiper) {
          // console.log(weswiper.activeIndex,'prev');
          wx.setStorageSync('index', weswiper.activeIndex);
        }
      }
    }, _this.methods = {
      goNext: function goNext(weswiper) {
        var index = wx.getStorageSync('index');
        console.log(index);
        if (index < 5) {
          this.$invoke('weSwiper', 'slideNext');
        } else {
          wx.showToast({
            title: '已经到尾啦～',
            icon: 'none',
            duration: 1000
          });
        }
      },
      goPrev: function goPrev(weswiper) {
        var index = wx.getStorageSync('index');
        if (index > 0) {
          this.$invoke('weSwiper', 'slidePrev');
        } else {
          wx.showToast({
            title: '已经到头啦～',
            icon: 'none',
            duration: 1000
          });
        }
      },
      upload: function upload(e) {
        var self = this;
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function success(res) {
            var tempFilePaths = res.tempFilePaths;
            // console.log(tempFilePaths,'tempFilePaths');
            wx.setStorageSync('imageurl', tempFilePaths[0]);

            if (e === 'ticket' || e === 'enhance') {
              wx.navigateTo({
                url: 'crop1'
              });
              wx.setStorageSync('type', e);
            } else {
              wx.navigateTo({
                url: 'preview?type=' + e
              });
              wx.setStorageSync('type', e);
            }
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MySwiper, [{
    key: 'getEachLimitTimes',
    value: function getEachLimitTimes() {
      var self = this;
      wx.request({
        url: 'https://www.iocr.vip/ai/users/times/default',
        success: function success(res) {
          console.log(res.data);
          if (res.data.code === 200) {
            var temp = res.data.data;
            self.count = {
              general: temp.general,
              receipt: temp.receipt,
              idcard: temp.idcard,
              drivecard: temp.drivecard,
              bankcard: temp.bankcard,
              enhance: temp.enhance
            };
            self.$apply();
          }
        }
      });
    }
  }, {
    key: 'getOneLimitTimes',
    value: function getOneLimitTimes() {
      var self = this;
      wx.request({
        url: 'https://www.iocr.vip/ai/users/times/me',
        success: function success(res) {
          console.log(res.data);
          if (res.data.code === 200) {
            var temp = res.data.data;
            self.count = {
              general: temp.general,
              receipt: temp.receipt,
              idcard: temp.idcard,
              drivecard: temp.drivecard,
              bankcard: temp.bankcard,
              enhance: temp.enhance
            };
            self.$apply();
          }
        }
      });
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo() {
      wx.getUserInfo({
        success: function success(res) {
          var userInfo = res.userInfo;
          console.log(userInfo);
          var nickName = userInfo.nickName;
          var avatarUrl = userInfo.avatarUrl;
          var gender = userInfo.gender; //性别 0：未知、1：男、2：女
          var province = userInfo.province;
          var city = userInfo.city;
          var country = userInfo.country;
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.index = 0;
      this.getEachLimitTimes();
      this.getUserInfo();
    }
  }]);

  return MySwiper;
}(_wepy2.default.page);

exports.default = MySwiper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJNeVN3aXBlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlU3dpcGVyIiwiZGF0YSIsImluZGV4IiwibGZsYWciLCJyZmxhZyIsImNvdW50IiwiZ2VuZXJhbCIsInJlY2VpcHQiLCJpZGNhcmQiLCJkcml2ZWNhcmQiLCJiYW5rY2FyZCIsImVuaGFuY2UiLCJzd2lwZXIiLCJzbGlkZUxlbmd0aCIsImluaXRpYWxTbGlkZSIsIm9uSW5pdCIsIndlc3dpcGVyIiwiY29uc29sZSIsImxvZyIsIm9uVG91Y2hTdGFydCIsImV2ZW50Iiwib25Ub3VjaE1vdmUiLCJvblRvdWNoRW5kIiwib25TbGlkZUNoYW5nZVN0YXJ0Iiwib25TbGlkZUNoYW5nZUVuZCIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJhY3RpdmVJbmRleCIsIm9uVHJhbnNpdGlvblN0YXJ0Iiwib25UcmFuc2l0aW9uRW5kIiwib25TbGlkZU1vdmUiLCJvblNsaWRlTmV4dFN0YXJ0Iiwib25TbGlkZU5leHRFbmQiLCJvblNsaWRlUHJldlN0YXJ0Iiwib25TbGlkZVByZXZFbmQiLCJtZXRob2RzIiwiZ29OZXh0IiwiZ2V0U3RvcmFnZVN5bmMiLCIkaW52b2tlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJnb1ByZXYiLCJ1cGxvYWQiLCJlIiwic2VsZiIsImNob29zZUltYWdlIiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVxdWVzdCIsImNvZGUiLCJ0ZW1wIiwiJGFwcGx5IiwiZ2V0VXNlckluZm8iLCJ1c2VySW5mbyIsIm5pY2tOYW1lIiwiYXZhdGFyVXJsIiwiZ2VuZGVyIiwicHJvdmluY2UiLCJjaXR5IiwiY291bnRyeSIsImdldEVhY2hMaW1pdFRpbWVzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7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QUw7QUFDRDtBQUNGO0FBaEJRLE9BQVg7QUFrQkQ7OztrQ0FFYTtBQUNaakMsU0FBR2tDLFdBQUgsQ0FBZTtBQUNiVCxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLGNBQUlTLFdBQVdULElBQUlTLFFBQW5CO0FBQ0EzQyxrQkFBUUMsR0FBUixDQUFZMEMsUUFBWjtBQUNBLGNBQUlDLFdBQVdELFNBQVNDLFFBQXhCO0FBQ0EsY0FBSUMsWUFBWUYsU0FBU0UsU0FBekI7QUFDQSxjQUFJQyxTQUFTSCxTQUFTRyxNQUF0QixDQUxxQixDQUtRO0FBQzdCLGNBQUlDLFdBQVdKLFNBQVNJLFFBQXhCO0FBQ0EsY0FBSUMsT0FBT0wsU0FBU0ssSUFBcEI7QUFDQSxjQUFJQyxVQUFVTixTQUFTTSxPQUF2QjtBQUNEO0FBVlksT0FBZjtBQVlEOzs7NkJBRVE7QUFDUCxXQUFLaEUsS0FBTCxHQUFhLENBQWI7QUFDQSxXQUFLaUUsaUJBQUw7QUFDQSxXQUFLUixXQUFMO0FBQ0Q7Ozs7RUFoUm1DLGVBQUtTLEk7O2tCQUF0QnpFLFEiLCJmaWxlIjoic3dpcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgd2VTd2lwZXIgZnJvbSAnd2VweS1jb20tc3dpcGVyJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNeVN3aXBlciBleHRlbmRzIHdlcHkucGFnZSB7XG5cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wid2VTd2lwZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm9wdGlvbi5vbmNlXCI6XCJzd2lwZXJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgd2VTd2lwZXI6IHdlU3dpcGVyXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGluZGV4OiAwLFxuICAgICAgbGZsYWc6IHRydWUsXG4gICAgICByZmxhZzogdHJ1ZSxcbiAgICAgIGNvdW50OiB7XG4gICAgICAgIGdlbmVyYWw6IDAsXG4gICAgICAgIHJlY2VpcHQ6IDAsIC8vIOelqOaNrlxuICAgICAgICBpZGNhcmQ6IDAsXG4gICAgICAgIGRyaXZlY2FyZDogMCxcbiAgICAgICAgYmFua2NhcmQ6IDAsXG4gICAgICAgIGVuaGFuY2U6IDAsXG4gICAgICB9LFxuICAgICAgc3dpcGVyOiB7XG4gICAgICAgIC8vIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJyxcbiAgICAgICAgLy8gd2lkdGg6IDE4MCxcbiAgICAgICAgc2xpZGVMZW5ndGg6IDYsXG4gICAgICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHN3aXBlcuWIneWni+WMluWQjuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqL1xuICAgICAgICBvbkluaXQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cod2Vzd2lwZXIpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICog5omL5oyH56Kw6Kemc2xpZGXml7bmiafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIG9uVG91Y2hTdGFydCAod2Vzd2lwZXIsIGV2ZW50KSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaJi+aMh+eisOinpnNsaWRl5bm25LiU5ruR5Yqo5pe25omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICBvblRvdWNoTW92ZSAod2Vzd2lwZXIsIGV2ZW50KSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaJi+aMh+emu+W8gHNsaWRl5pe25omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICBvblRvdWNoRW5kICh3ZXN3aXBlciwgZXZlbnQpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgICAvLyBpZih3ZXN3aXBlci5hY3RpdmVJbmRleCA9PT0gNSl7XG4gICAgICAgICAgLy8gICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIC8vICAgICB0aXRsZTogJ+W3sue7j+WIsOWwvuWVpu+9nicsXG4gICAgICAgICAgLy8gICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAvLyAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAvLyAgIH0pXG4gICAgICAgICAgLy8gfSBlbHNlIGlmKHdlc3dpcGVyLmFjdGl2ZUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgLy8gICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIC8vICAgICB0aXRsZTogJ+W3sue7j+WIsOWktOWVpu+9nicsXG4gICAgICAgICAgLy8gICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAvLyAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAvLyAgIH0pXG4gICAgICAgICAgLy8gfVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu25pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlQ2hhbmdlU3RhcnQgKHdlc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzd2lwZXLku47kuIDkuKpzbGlkZei/h+a4oeWIsOWPpuS4gOS4qnNsaWRl57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlQ2hhbmdlRW5kICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCd3ZXN3aXBlci5hY3RpdmVJbmRleCcpO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICDov4fmuKHml7bop6blj5FcbiAgICAgICAgICovXG4gICAgICAgIG9uVHJhbnNpdGlvblN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAg6L+H5rih57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblRyYW5zaXRpb25FbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgICAgLy8gaWYod2Vzd2lwZXIuYWN0aXZlSW5kZXggPT09IDUpe1xuICAgICAgICAgIC8vICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgICAgdGl0bGU6ICflt7Lnu4/liLDlsL7llabvvZ4nLFxuICAgICAgICAgIC8vICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vIH0gZWxzZSBpZih3ZXN3aXBlci5hY3RpdmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgIC8vICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgICAgdGl0bGU6ICflt7Lnu4/liLDlpLTllabvvZ4nLFxuICAgICAgICAgIC8vICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vIH1cblxuICAgICAgICAgIC8vIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhcmd1bWVudHMsJ2FyZ3VtZW50cycpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmlzQmVnaW5uaW5nLCdpc0JlZ2lubmluZycpO1xuICAgICAgICAgIC8vIGlmICh3ZXN3aXBlci5pc0JlZ2lubmluZyl7XG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZygndGFpbCcpO1xuICAgICAgICAgIC8vICAgdGhpcy5sZmxhZyA9IGZhbHNlO1xuICAgICAgICAgIC8vIH0gZWxzZSBpZiAod2Vzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdoZWFkJyk7XG4gICAgICAgICAgLy8gICB0aGlzLnJmbGFnID0gZmFsc2U7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOaJi+aMh+inpueisHN3aXBlcuW5tuS4lOaLluWKqHNsaWRl5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTW92ZSAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlj7PjgIHkuIvvvInliIfmjaLml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVOZXh0U3RhcnQgKHdlc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5Y+z44CB5LiL77yJ5YiH5o2i57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTmV4dEVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnbmV4dCcpO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5bem44CB5LiK77yJ5YiH5o2i5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlUHJldlN0YXJ0IChzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlt6bjgIHkuIrvvInliIfmjaLnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVQcmV2RW5kICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCdwcmV2Jyk7XG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2luZGV4Jywgd2Vzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvTmV4dCh3ZXN3aXBlcikge1xuICAgICAgICBsZXQgaW5kZXggPSB3eC5nZXRTdG9yYWdlU3luYygnaW5kZXgnKTtcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgICBpZihpbmRleCA8IDUpe1xuICAgICAgICAgIHRoaXMuJGludm9rZSgnd2VTd2lwZXInLCAnc2xpZGVOZXh0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5bey57uP5Yiw5bC+5ZWm772eJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvUHJldih3ZXN3aXBlcikge1xuICAgICAgICBsZXQgaW5kZXggPSB3eC5nZXRTdG9yYWdlU3luYygnaW5kZXgnKTtcbiAgICAgICAgaWYoaW5kZXggPiAwKXtcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ3dlU3dpcGVyJywgJ3NsaWRlUHJldicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WIsOWktOWVpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGxvYWQoZSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogMSwgLy8g6buY6K6kOVxuICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJ10sIC8vIOWPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxuICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sIC8vIOWPr+S7peaMh+Wumuadpea6kOaYr+ebuOWGjOi/mOaYr+ebuOacuu+8jOm7mOiupOS6jOiAhemDveaciVxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHM7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZW1wRmlsZVBhdGhzLCd0ZW1wRmlsZVBhdGhzJyk7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnLHRlbXBGaWxlUGF0aHNbMF0pO1xuXG4gICAgICAgICAgICBpZihlID09PSAndGlja2V0JyB8fCBlID09PSAnZW5oYW5jZScpIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgY3JvcDFgXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndHlwZScsIGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgcHJldmlldz90eXBlPSR7ZX1gXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndHlwZScsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICB9XG5cbiAgICBnZXRFYWNoTGltaXRUaW1lcygpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS91c2Vycy90aW1lcy9kZWZhdWx0JyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgbGV0IHRlbXAgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgICAgc2VsZi5jb3VudCA9IHtcbiAgICAgICAgICAgICAgZ2VuZXJhbDogdGVtcC5nZW5lcmFsLFxuICAgICAgICAgICAgICByZWNlaXB0OiB0ZW1wLnJlY2VpcHQsXG4gICAgICAgICAgICAgIGlkY2FyZDogdGVtcC5pZGNhcmQsXG4gICAgICAgICAgICAgIGRyaXZlY2FyZDogdGVtcC5kcml2ZWNhcmQsXG4gICAgICAgICAgICAgIGJhbmtjYXJkOiB0ZW1wLmJhbmtjYXJkLFxuICAgICAgICAgICAgICBlbmhhbmNlOiB0ZW1wLmVuaGFuY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGdldE9uZUxpbWl0VGltZXMoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvdXNlcnMvdGltZXMvbWUnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgICBzZWxmLmNvdW50ID0ge1xuICAgICAgICAgICAgICBnZW5lcmFsOiB0ZW1wLmdlbmVyYWwsXG4gICAgICAgICAgICAgIHJlY2VpcHQ6IHRlbXAucmVjZWlwdCxcbiAgICAgICAgICAgICAgaWRjYXJkOiB0ZW1wLmlkY2FyZCxcbiAgICAgICAgICAgICAgZHJpdmVjYXJkOiB0ZW1wLmRyaXZlY2FyZCxcbiAgICAgICAgICAgICAgYmFua2NhcmQ6IHRlbXAuYmFua2NhcmQsXG4gICAgICAgICAgICAgIGVuaGFuY2U6IHRlbXAuZW5oYW5jZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0VXNlckluZm8oKSB7XG4gICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGxldCB1c2VySW5mbyA9IHJlcy51c2VySW5mbztcbiAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySW5mbyk7XG4gICAgICAgICAgbGV0IG5pY2tOYW1lID0gdXNlckluZm8ubmlja05hbWVcbiAgICAgICAgICBsZXQgYXZhdGFyVXJsID0gdXNlckluZm8uYXZhdGFyVXJsXG4gICAgICAgICAgbGV0IGdlbmRlciA9IHVzZXJJbmZvLmdlbmRlciAvL+aAp+WIqyAw77ya5pyq55+l44CBMe+8mueUt+OAgTLvvJrlpbNcbiAgICAgICAgICBsZXQgcHJvdmluY2UgPSB1c2VySW5mby5wcm92aW5jZVxuICAgICAgICAgIGxldCBjaXR5ID0gdXNlckluZm8uY2l0eVxuICAgICAgICAgIGxldCBjb3VudHJ5ID0gdXNlckluZm8uY291bnRyeVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBvbkxvYWQoKSB7XG4gICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgIHRoaXMuZ2V0RWFjaExpbWl0VGltZXMoKTtcbiAgICAgIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgICB9XG4gIH1cbiJdfQ==