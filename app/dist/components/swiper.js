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
      userInfo: null,
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
      console.log(this.userInfo, 'this.userInfo');
      // let self = this;
      // wx.request({
      //   url: 'https://www.iocr.vip/ai/users/times/me',
      //   success: function(res) {
      //     console.log(res.data);
      //     if(res.data.code === 200) {
      //       let temp = res.data.data;
      //       self.count = {
      //         general: temp.general,
      //         receipt: temp.receipt,
      //         idcard: temp.idcard,
      //         drivecard: temp.drivecard,
      //         bankcard: temp.bankcard,
      //         enhance: temp.enhance
      //       }
      //       self.$apply();
      //     }
      //   }
      // })
    }
  }, {
    key: 'getUserInfo',
    value: function getUserInfo() {
      var self = this;
      wx.getUserInfo({
        success: function success(res) {
          // console.log(res.userInfo);
          self.userInfo = res.userInfo;
          // let userInfo = res.userInfo;
          // let nickName = userInfo.nickName
          // let avatarUrl = userInfo.avatarUrl
          // let gender = userInfo.gender //性别 0：未知、1：男、2：女
          // let province = userInfo.province
          // let city = userInfo.city
          // let country = userInfo.country
          self.getOneLimitTimes();
          wx.setStorageSync('userinfo', self.userInfo.avatarUrl);
        },
        fail: function fail(error) {
          // console.log(error);
          wx.showModal({
            title: '警告',
            confirmText: '授权',
            cancelText: '不授权',
            content: '\u82E5\u4E0D\u6388\u6743\u5FAE\u4FE1\u767B\u9646\uFF0C\u5219\u65E0\u6CD5\u4F7F\u7528\u300CAI\u8BC6\u56FE\u300D\u529F\u80FD\uFF1B\u70B9\u51FB\u91CD\u65B0\u83B7\u53D6\u6388\u6743\uFF0C\u5219\u53EF\u91CD\u65B0\u4F7F\u7528\uFF1B\u82E5\u70B9\u51FB\u4E0D\u6388\u6743\uFF0C\u540E\u671F\u8FD8\u4F7F\u7528\u5C0F\u7A0B\u5E8F\uFF0C\u9700\u5728\u5FAE\u4FE1\u300C\u53D1\u73B0\u5C0F\u7A0B\u5E8F\u300D\uFF0C\u5220\u6389\u300CAI\u8BC6\u56FE\u300D\uFF0C\u91CD\u65B0\u641C\u7D22\u6388\u6743\u767B\u9646\uFF0C\u65B9\u53EF\u4F7F\u7528\u3002',
            success: function success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function success(res) {
                    // console.log(res,'res');
                    wx.showToast({
                      title: '授权成功',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
                self.count = {
                  general: 0,
                  receipt: 0,
                  idcard: 0,
                  drivecard: 0,
                  bankcard: 0,
                  enhance: 0
                };
                self.$apply();
              }
            }
          });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJNeVN3aXBlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlU3dpcGVyIiwiZGF0YSIsImluZGV4IiwibGZsYWciLCJyZmxhZyIsImNvdW50IiwiZ2VuZXJhbCIsInJlY2VpcHQiLCJpZGNhcmQiLCJkcml2ZWNhcmQiLCJiYW5rY2FyZCIsImVuaGFuY2UiLCJ1c2VySW5mbyIsInN3aXBlciIsInNsaWRlTGVuZ3RoIiwiaW5pdGlhbFNsaWRlIiwib25Jbml0Iiwid2Vzd2lwZXIiLCJjb25zb2xlIiwibG9nIiwib25Ub3VjaFN0YXJ0IiwiZXZlbnQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hFbmQiLCJvblNsaWRlQ2hhbmdlU3RhcnQiLCJvblNsaWRlQ2hhbmdlRW5kIiwid3giLCJzZXRTdG9yYWdlU3luYyIsImFjdGl2ZUluZGV4Iiwib25UcmFuc2l0aW9uU3RhcnQiLCJvblRyYW5zaXRpb25FbmQiLCJvblNsaWRlTW92ZSIsIm9uU2xpZGVOZXh0U3RhcnQiLCJvblNsaWRlTmV4dEVuZCIsIm9uU2xpZGVQcmV2U3RhcnQiLCJvblNsaWRlUHJldkVuZCIsIm1ldGhvZHMiLCJnb05leHQiLCJnZXRTdG9yYWdlU3luYyIsIiRpbnZva2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImdvUHJldiIsInVwbG9hZCIsImUiLCJzZWxmIiwiY2hvb3NlSW1hZ2UiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVQYXRocyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJyZXF1ZXN0IiwiY29kZSIsInRlbXAiLCIkYXBwbHkiLCJnZXRVc2VySW5mbyIsImdldE9uZUxpbWl0VGltZXMiLCJhdmF0YXJVcmwiLCJmYWlsIiwiZXJyb3IiLCJzaG93TW9kYWwiLCJjb25maXJtVGV4dCIsImNhbmNlbFRleHQiLCJjb250ZW50IiwiY29uZmlybSIs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SCxDQUFrQixVQUFsQixFQUE4Qm9CLEtBQUtuQyxRQUFMLENBQWNrRCxTQUE1QztBQUNELFNBYlk7QUFjYkMsY0FBTSxjQUFTQyxLQUFULEVBQWdCO0FBQ3BCO0FBQ0F0QyxhQUFHdUMsU0FBSCxDQUFhO0FBQ1h4QixtQkFBTyxJQURJO0FBRVh5Qix5QkFBYSxJQUZGO0FBR1hDLHdCQUFZLEtBSEQ7QUFJWEMsK2hCQUpXO0FBS1hqQixxQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCLGtCQUFJQSxJQUFJaUIsT0FBUixFQUFpQjtBQUNmM0MsbUJBQUc0QyxXQUFILENBQWU7QUFDYm5CLDJCQUFRLGlCQUFTQyxHQUFULEVBQWE7QUFDbkI7QUFDQTFCLHVCQUFHYyxTQUFILENBQWE7QUFDWEMsNkJBQU8sTUFESTtBQUVYQyw0QkFBTSxNQUZLO0FBR1hDLGdDQUFVO0FBSEMscUJBQWI7QUFLRDtBQVJZLGlCQUFmO0FBVUQsZUFYRCxNQVdPLElBQUlTLElBQUltQixNQUFSLEVBQWdCO0FBQ3JCckQsd0JBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0E0QixxQkFBSzFDLEtBQUwsR0FBYTtBQUNYQywyQkFBUyxDQURFO0FBRVhDLDJCQUFTLENBRkU7QUFHWEMsMEJBQVEsQ0FIRztBQUlYQyw2QkFBVyxDQUpBO0FBS1hDLDRCQUFVLENBTEM7QUFNWEMsMkJBQVM7QUFORSxpQkFBYjtBQVFBb0MscUJBQUtZLE1BQUw7QUFDRDtBQUNGO0FBN0JVLFdBQWI7QUErQkQ7QUEvQ1ksT0FBZjtBQWlERDs7OzZCQUVRO0FBQ1AsV0FBS3pELEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBS3NFLGlCQUFMO0FBQ0EsV0FBS1osV0FBTDtBQUNEOzs7O0VBeFRtQyxlQUFLYSxJOztrQkFBdEI5RSxRIiwiZmlsZSI6InN3aXBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHdlU3dpcGVyIGZyb20gJ3dlcHktY29tLXN3aXBlcic7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlTd2lwZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIndlU3dpcGVyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpvcHRpb24ub25jZVwiOlwic3dpcGVyXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHdlU3dpcGVyOiB3ZVN3aXBlclxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBpbmRleDogMCxcbiAgICAgIGxmbGFnOiB0cnVlLFxuICAgICAgcmZsYWc6IHRydWUsXG4gICAgICBjb3VudDoge1xuICAgICAgICBnZW5lcmFsOiAwLFxuICAgICAgICByZWNlaXB0OiAwLCAvLyDnpajmja5cbiAgICAgICAgaWRjYXJkOiAwLFxuICAgICAgICBkcml2ZWNhcmQ6IDAsXG4gICAgICAgIGJhbmtjYXJkOiAwLFxuICAgICAgICBlbmhhbmNlOiAwLFxuICAgICAgfSxcbiAgICAgIHVzZXJJbmZvOiBudWxsLFxuICAgICAgc3dpcGVyOiB7XG4gICAgICAgIC8vIGRpcmVjdGlvbjogJ3ZlcnRpY2FsJyxcbiAgICAgICAgLy8gd2lkdGg6IDE4MCxcbiAgICAgICAgc2xpZGVMZW5ndGg6IDYsXG4gICAgICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHN3aXBlcuWIneWni+WMluWQjuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqL1xuICAgICAgICBvbkluaXQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cod2Vzd2lwZXIpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICog5omL5oyH56Kw6Kemc2xpZGXml7bmiafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIG9uVG91Y2hTdGFydCAod2Vzd2lwZXIsIGV2ZW50KSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaJi+aMh+eisOinpnNsaWRl5bm25LiU5ruR5Yqo5pe25omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICBvblRvdWNoTW92ZSAod2Vzd2lwZXIsIGV2ZW50KSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaJi+aMh+emu+W8gHNsaWRl5pe25omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICBvblRvdWNoRW5kICh3ZXN3aXBlciwgZXZlbnQpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgICAvLyBpZih3ZXN3aXBlci5hY3RpdmVJbmRleCA9PT0gNSl7XG4gICAgICAgICAgLy8gICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIC8vICAgICB0aXRsZTogJ+W3sue7j+WIsOWwvuWVpu+9nicsXG4gICAgICAgICAgLy8gICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAvLyAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAvLyAgIH0pXG4gICAgICAgICAgLy8gfSBlbHNlIGlmKHdlc3dpcGVyLmFjdGl2ZUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgLy8gICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIC8vICAgICB0aXRsZTogJ+W3sue7j+WIsOWktOWVpu+9nicsXG4gICAgICAgICAgLy8gICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAvLyAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAvLyAgIH0pXG4gICAgICAgICAgLy8gfVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu25pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlQ2hhbmdlU3RhcnQgKHdlc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzd2lwZXLku47kuIDkuKpzbGlkZei/h+a4oeWIsOWPpuS4gOS4qnNsaWRl57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlQ2hhbmdlRW5kICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCd3ZXN3aXBlci5hY3RpdmVJbmRleCcpO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICDov4fmuKHml7bop6blj5FcbiAgICAgICAgICovXG4gICAgICAgIG9uVHJhbnNpdGlvblN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAg6L+H5rih57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblRyYW5zaXRpb25FbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgICAgLy8gaWYod2Vzd2lwZXIuYWN0aXZlSW5kZXggPT09IDUpe1xuICAgICAgICAgIC8vICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgICAgdGl0bGU6ICflt7Lnu4/liLDlsL7llabvvZ4nLFxuICAgICAgICAgIC8vICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vIH0gZWxzZSBpZih3ZXN3aXBlci5hY3RpdmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgIC8vICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgICAgdGl0bGU6ICflt7Lnu4/liLDlpLTllabvvZ4nLFxuICAgICAgICAgIC8vICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vIH1cblxuICAgICAgICAgIC8vIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICBcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhcmd1bWVudHMsJ2FyZ3VtZW50cycpO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmlzQmVnaW5uaW5nLCdpc0JlZ2lubmluZycpO1xuICAgICAgICAgIC8vIGlmICh3ZXN3aXBlci5pc0JlZ2lubmluZyl7XG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZygndGFpbCcpO1xuICAgICAgICAgIC8vICAgdGhpcy5sZmxhZyA9IGZhbHNlO1xuICAgICAgICAgIC8vIH0gZWxzZSBpZiAod2Vzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCdoZWFkJyk7XG4gICAgICAgICAgLy8gICB0aGlzLnJmbGFnID0gZmFsc2U7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOaJi+aMh+inpueisHN3aXBlcuW5tuS4lOaLluWKqHNsaWRl5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTW92ZSAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlj7PjgIHkuIvvvInliIfmjaLml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVOZXh0U3RhcnQgKHdlc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5Y+z44CB5LiL77yJ5YiH5o2i57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTmV4dEVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnbmV4dCcpO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5bem44CB5LiK77yJ5YiH5o2i5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlUHJldlN0YXJ0IChzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlt6bjgIHkuIrvvInliIfmjaLnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVQcmV2RW5kICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCdwcmV2Jyk7XG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2luZGV4Jywgd2Vzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvTmV4dCh3ZXN3aXBlcikge1xuICAgICAgICBsZXQgaW5kZXggPSB3eC5nZXRTdG9yYWdlU3luYygnaW5kZXgnKTtcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgICBpZihpbmRleCA8IDUpe1xuICAgICAgICAgIHRoaXMuJGludm9rZSgnd2VTd2lwZXInLCAnc2xpZGVOZXh0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5bey57uP5Yiw5bC+5ZWm772eJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvUHJldih3ZXN3aXBlcikge1xuICAgICAgICBsZXQgaW5kZXggPSB3eC5nZXRTdG9yYWdlU3luYygnaW5kZXgnKTtcbiAgICAgICAgaWYoaW5kZXggPiAwKXtcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ3dlU3dpcGVyJywgJ3NsaWRlUHJldicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WIsOWktOWVpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGxvYWQoZSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogMSwgLy8g6buY6K6kOVxuICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJ10sIC8vIOWPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxuICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sIC8vIOWPr+S7peaMh+Wumuadpea6kOaYr+ebuOWGjOi/mOaYr+ebuOacuu+8jOm7mOiupOS6jOiAhemDveaciVxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHM7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZW1wRmlsZVBhdGhzLCd0ZW1wRmlsZVBhdGhzJyk7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnLHRlbXBGaWxlUGF0aHNbMF0pO1xuXG4gICAgICAgICAgICBpZihlID09PSAndGlja2V0JyB8fCBlID09PSAnZW5oYW5jZScpIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgY3JvcDFgXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndHlwZScsIGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgcHJldmlldz90eXBlPSR7ZX1gXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndHlwZScsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICB9XG5cbiAgICBnZXRFYWNoTGltaXRUaW1lcygpIHtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS91c2Vycy90aW1lcy9kZWZhdWx0JyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgbGV0IHRlbXAgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgICAgc2VsZi5jb3VudCA9IHtcbiAgICAgICAgICAgICAgZ2VuZXJhbDogdGVtcC5nZW5lcmFsLFxuICAgICAgICAgICAgICByZWNlaXB0OiB0ZW1wLnJlY2VpcHQsXG4gICAgICAgICAgICAgIGlkY2FyZDogdGVtcC5pZGNhcmQsXG4gICAgICAgICAgICAgIGRyaXZlY2FyZDogdGVtcC5kcml2ZWNhcmQsXG4gICAgICAgICAgICAgIGJhbmtjYXJkOiB0ZW1wLmJhbmtjYXJkLFxuICAgICAgICAgICAgICBlbmhhbmNlOiB0ZW1wLmVuaGFuY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGdldE9uZUxpbWl0VGltZXMoKSB7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJJbmZvLCd0aGlzLnVzZXJJbmZvJyk7XG4gICAgICAvLyBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAvLyB3eC5yZXF1ZXN0KHtcbiAgICAgIC8vICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvdXNlcnMvdGltZXMvbWUnLFxuICAgICAgLy8gICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAvLyAgICAgaWYocmVzLmRhdGEuY29kZSA9PT0gMjAwKSB7XG4gICAgICAvLyAgICAgICBsZXQgdGVtcCA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAvLyAgICAgICBzZWxmLmNvdW50ID0ge1xuICAgICAgLy8gICAgICAgICBnZW5lcmFsOiB0ZW1wLmdlbmVyYWwsXG4gICAgICAvLyAgICAgICAgIHJlY2VpcHQ6IHRlbXAucmVjZWlwdCxcbiAgICAgIC8vICAgICAgICAgaWRjYXJkOiB0ZW1wLmlkY2FyZCxcbiAgICAgIC8vICAgICAgICAgZHJpdmVjYXJkOiB0ZW1wLmRyaXZlY2FyZCxcbiAgICAgIC8vICAgICAgICAgYmFua2NhcmQ6IHRlbXAuYmFua2NhcmQsXG4gICAgICAvLyAgICAgICAgIGVuaGFuY2U6IHRlbXAuZW5oYW5jZVxuICAgICAgLy8gICAgICAgfVxuICAgICAgLy8gICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pXG4gICAgfVxuXG4gICAgZ2V0VXNlckluZm8oKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy51c2VySW5mbyk7XG4gICAgICAgICAgc2VsZi51c2VySW5mbyA9IHJlcy51c2VySW5mbztcbiAgICAgICAgICAvLyBsZXQgdXNlckluZm8gPSByZXMudXNlckluZm87XG4gICAgICAgICAgLy8gbGV0IG5pY2tOYW1lID0gdXNlckluZm8ubmlja05hbWVcbiAgICAgICAgICAvLyBsZXQgYXZhdGFyVXJsID0gdXNlckluZm8uYXZhdGFyVXJsXG4gICAgICAgICAgLy8gbGV0IGdlbmRlciA9IHVzZXJJbmZvLmdlbmRlciAvL+aAp+WIqyAw77ya5pyq55+l44CBMe+8mueUt+OAgTLvvJrlpbNcbiAgICAgICAgICAvLyBsZXQgcHJvdmluY2UgPSB1c2VySW5mby5wcm92aW5jZVxuICAgICAgICAgIC8vIGxldCBjaXR5ID0gdXNlckluZm8uY2l0eVxuICAgICAgICAgIC8vIGxldCBjb3VudHJ5ID0gdXNlckluZm8uY291bnRyeVxuICAgICAgICAgIHNlbGYuZ2V0T25lTGltaXRUaW1lcygpO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VyaW5mbycsIHNlbGYudXNlckluZm8uYXZhdGFyVXJsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn5o6I5p2DJyxcbiAgICAgICAgICAgIGNhbmNlbFRleHQ6ICfkuI3mjojmnYMnLFxuICAgICAgICAgICAgY29udGVudDogYOiLpeS4jeaOiOadg+W+ruS/oeeZu+mZhu+8jOWImeaXoOazleS9v+eUqOOAjEFJ6K+G5Zu+44CN5Yqf6IO977yb54K55Ye76YeN5paw6I635Y+W5o6I5p2D77yM5YiZ5Y+v6YeN5paw5L2/55So77yb6Iul54K55Ye75LiN5o6I5p2D77yM5ZCO5pyf6L+Y5L2/55So5bCP56iL5bqP77yM6ZyA5Zyo5b6u5L+h44CM5Y+R546w5bCP56iL5bqP44CN77yM5Yig5o6J44CMQUnor4blm77jgI3vvIzph43mlrDmkJzntKLmjojmnYPnmbvpmYbvvIzmlrnlj6/kvb/nlKjjgIJgLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLCdyZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aOiOadg+aIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgIHNlbGYuY291bnQgPSB7XG4gICAgICAgICAgICAgICAgICBnZW5lcmFsOiAwLFxuICAgICAgICAgICAgICAgICAgcmVjZWlwdDogMCxcbiAgICAgICAgICAgICAgICAgIGlkY2FyZDogMCxcbiAgICAgICAgICAgICAgICAgIGRyaXZlY2FyZDogMCxcbiAgICAgICAgICAgICAgICAgIGJhbmtjYXJkOiAwLFxuICAgICAgICAgICAgICAgICAgZW5oYW5jZTogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgb25Mb2FkKCkge1xuICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICB0aGlzLmdldEVhY2hMaW1pdFRpbWVzKCk7XG4gICAgICB0aGlzLmdldFVzZXJJbmZvKCk7XG4gICAgfVxuICB9XG4iXX0=