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
      upload: function upload(e, times) {
        // console.log(times,'times');
        if (times === 0) {
          wx.showModal({
            title: '提示',
            confirmText: '帮助',
            // cancelText: '',
            content: '今日该类型「免费」次数已经用完，请使用其他类型。或等待次日恢复使用次数!',
            success: function success(res) {
              if (res.confirm) {
                // console.log('用户点击确定');
                wx.navigateTo({
                  url: 'help'
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          });
          return;
        }
        var self = this;
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
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
    key: 'getOneLimitTimes',
    value: function getOneLimitTimes() {
      console.log(wx.getStorageSync('userinfo'), 'this.userInfo');
      if (!wx.getStorageSync('userinfo')) return;
      var self = this;
      wx.request({
        url: 'https://www.iocr.vip/ai/users/times/me',
        header: { authid: wx.getStorageSync('userinfo') },
        success: function success(res) {
          console.log(res.data, 'me');
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
          wx.setStorageSync('userinfo', self.userInfo.avatarUrl);
          self.getOneLimitTimes();
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
                    self.getOneLimitTimes();
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
    }
  }]);

  return MySwiper;
}(_wepy2.default.page);

exports.default = MySwiper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJNeVN3aXBlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlU3dpcGVyIiwiZGF0YSIsImluZGV4IiwibGZsYWciLCJyZmxhZyIsImNvdW50IiwiZ2VuZXJhbCIsInJlY2VpcHQiLCJpZGNhcmQiLCJkcml2ZWNhcmQiLCJiYW5rY2FyZCIsImVuaGFuY2UiLCJ1c2VySW5mbyIsInN3aXBlciIsInNsaWRlTGVuZ3RoIiwiaW5pdGlhbFNsaWRlIiwib25Jbml0Iiwid2Vzd2lwZXIiLCJjb25zb2xlIiwibG9nIiwib25Ub3VjaFN0YXJ0IiwiZXZlbnQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hFbmQiLCJvblNsaWRlQ2hhbmdlU3RhcnQiLCJvblNsaWRlQ2hhbmdlRW5kIiwid3giLCJzZXRTdG9yYWdlU3luYyIsImFjdGl2ZUluZGV4Iiwib25UcmFuc2l0aW9uU3RhcnQiLCJvblRyYW5zaXRpb25FbmQiLCJvblNsaWRlTW92ZSIsIm9uU2xpZGVOZXh0U3RhcnQiLCJvblNsaWRlTmV4dEVuZCIsIm9uU2xpZGVQcmV2U3RhcnQiLCJvblNsaWRlUHJldkVuZCIsIm1ldGhvZHMiLCJnb05leHQiLCJnZXRTdG9yYWdlU3luYyIsIiRpbnZva2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImdvUHJldiIsInVwbG9hZCIsImUiLCJ0aW1lcyIsInNob3dNb2RhbCIsImNvbmZpcm1UZXh0IiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwibmF2aWdhdGVUbyIsInVybCIsImNhbmNlbCIsInNlbGYiLCJjaG9vc2VJbWFnZSIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInRlbXBGaWxlUGF0aHMiLCJyZXF1ZXN0IiwiaGVhZGVyIiwiYXV0aGlkIiwiY29kZSIsInRlbXAiLCIkYXBwbHkiLCJnZXRVc2VySW5mbyIsImF2YXRhclVybCIsImdldE9uZUxpbWl0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QUVYQywyQkFBUyxDQUZFO0FBR1hDLDBCQUFRLENBSEc7QUFJWEMsNkJBQVcsQ0FKQTtBQUtYQyw0QkFBVSxDQUxDO0FBTVhDLDJCQUFTO0FBTkUsaUJBQWI7QUFRQThDLHFCQUFLVSxNQUFMO0FBQ0Q7QUFDRjtBQTlCVSxXQUFiO0FBZ0NEO0FBaERZLE9BQWY7QUFrREQ7Ozs2QkFFUTtBQUNQLFdBQUtqRSxLQUFMLEdBQWEsQ0FBYjtBQUNEOzs7O0VBdlRtQyxlQUFLeUUsSTs7a0JBQXRCaEYsUSIsImZpbGUiOiJzd2lwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCB3ZVN3aXBlciBmcm9tICd3ZXB5LWNvbS1zd2lwZXInO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE15U3dpcGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcblxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ3ZVN3aXBlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6b3B0aW9uLm9uY2VcIjpcInN3aXBlclwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICB3ZVN3aXBlcjogd2VTd2lwZXJcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBsZmxhZzogdHJ1ZSxcbiAgICAgIHJmbGFnOiB0cnVlLFxuICAgICAgY291bnQ6IHtcbiAgICAgICAgZ2VuZXJhbDogMCxcbiAgICAgICAgcmVjZWlwdDogMCwgLy8g56Wo5o2uXG4gICAgICAgIGlkY2FyZDogMCxcbiAgICAgICAgZHJpdmVjYXJkOiAwLFxuICAgICAgICBiYW5rY2FyZDogMCxcbiAgICAgICAgZW5oYW5jZTogMCxcbiAgICAgIH0sXG4gICAgICB1c2VySW5mbzogbnVsbCxcbiAgICAgIHN3aXBlcjoge1xuICAgICAgICAvLyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsXG4gICAgICAgIC8vIHdpZHRoOiAxODAsXG4gICAgICAgIHNsaWRlTGVuZ3RoOiA2LFxuICAgICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzd2lwZXLliJ3lp4vljJblkI7miafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKi9cbiAgICAgICAgb25Jbml0ICh3ZXN3aXBlcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHdlc3dpcGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaJi+aMh+eisOinpnNsaWRl5pe25omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICBvblRvdWNoU3RhcnQgKHdlc3dpcGVyLCBldmVudCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnorDop6ZzbGlkZeW5tuS4lOa7keWKqOaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaE1vdmUgKHdlc3dpcGVyLCBldmVudCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnprvlvIBzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaEVuZCAod2Vzd2lwZXIsIGV2ZW50KSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgICAgLy8gaWYod2Vzd2lwZXIuYWN0aXZlSW5kZXggPT09IDUpe1xuICAgICAgICAgIC8vICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgICAgdGl0bGU6ICflt7Lnu4/liLDlsL7llabvvZ4nLFxuICAgICAgICAgIC8vICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vIH0gZWxzZSBpZih3ZXN3aXBlci5hY3RpdmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgIC8vICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgICAgdGl0bGU6ICflt7Lnu4/liLDlpLTllabvvZ4nLFxuICAgICAgICAgIC8vICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tuaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZUNoYW5nZVN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc3dpcGVy5LuO5LiA5Liqc2xpZGXov4fmuKHliLDlj6bkuIDkuKpzbGlkZee7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZUNoYW5nZUVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAg6L+H5rih5pe26Kem5Y+RXG4gICAgICAgICAqL1xuICAgICAgICBvblRyYW5zaXRpb25TdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOi/h+a4oee7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25UcmFuc2l0aW9uRW5kICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCd3ZXN3aXBlci5hY3RpdmVJbmRleCcpO1xuICAgICAgICAgIC8vIGlmKHdlc3dpcGVyLmFjdGl2ZUluZGV4ID09PSA1KXtcbiAgICAgICAgICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICAgIHRpdGxlOiAn5bey57uP5Yiw5bC+5ZWm772eJyxcbiAgICAgICAgICAvLyAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIC8vICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAvLyB9IGVsc2UgaWYod2Vzd2lwZXIuYWN0aXZlSW5kZXggPT09IDApIHtcbiAgICAgICAgICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICAgIHRpdGxlOiAn5bey57uP5Yiw5aS05ZWm772eJyxcbiAgICAgICAgICAvLyAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIC8vICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAvLyB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYXJndW1lbnRzLCdhcmd1bWVudHMnKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5pc0JlZ2lubmluZywnaXNCZWdpbm5pbmcnKTtcbiAgICAgICAgICAvLyBpZiAod2Vzd2lwZXIuaXNCZWdpbm5pbmcpe1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2coJ3RhaWwnKTtcbiAgICAgICAgICAvLyAgIHRoaXMubGZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKHdlc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZygnaGVhZCcpO1xuICAgICAgICAgIC8vICAgdGhpcy5yZmxhZyA9IGZhbHNlO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICDmiYvmjIfop6bnorBzd2lwZXLlubbkuJTmi5bliqhzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZU1vdmUgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5Y+z44CB5LiL77yJ5YiH5o2i5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTmV4dFN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOWPs+OAgeS4i++8ieWIh+aNoue7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZU5leHRFbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ25leHQnKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOW3puOAgeS4iu+8ieWIh+aNouaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZVByZXZTdGFydCAoc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5bem44CB5LiK77yJ5YiH5o2i57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlUHJldkVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwncHJldicpO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb05leHQod2Vzd2lwZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2luZGV4Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4KTtcbiAgICAgICAgaWYoaW5kZXggPCA1KXtcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ3dlU3dpcGVyJywgJ3NsaWRlTmV4dCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WIsOWwvuWVpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb1ByZXYod2Vzd2lwZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2luZGV4Jyk7XG4gICAgICAgIGlmKGluZGV4ID4gMCl7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd3ZVN3aXBlcicsICdzbGlkZVByZXYnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/liLDlpLTllabvvZ4nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBsb2FkKGUsdGltZXMpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGltZXMsJ3RpbWVzJyk7XG4gICAgICAgIGlmKHRpbWVzID09PSAwKSB7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn5biu5YqpJyxcbiAgICAgICAgICAgIC8vIGNhbmNlbFRleHQ6ICcnLFxuICAgICAgICAgICAgY29udGVudDogJ+S7iuaXpeivpeexu+Wei+OAjOWFjei0ueOAjeasoeaVsOW3sue7j+eUqOWujO+8jOivt+S9v+eUqOWFtuS7luexu+Wei+OAguaIluetieW+heasoeaXpeaBouWkjeS9v+eUqOasoeaVsCEnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vnoa7lrponKTtcbiAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICAgIHVybDogJ2hlbHAnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgY291bnQ6IDEsIC8vIOm7mOiupDlcbiAgICAgICAgICBzaXplVHlwZTogWydjb21wcmVzc2VkJ10sIC8vIOWPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxuICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sIC8vIOWPr+S7peaMh+Wumuadpea6kOaYr+ebuOWGjOi/mOaYr+ebuOacuu+8jOm7mOiupOS6jOiAhemDveaciVxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHM7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZW1wRmlsZVBhdGhzLCd0ZW1wRmlsZVBhdGhzJyk7XG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW1hZ2V1cmwnLHRlbXBGaWxlUGF0aHNbMF0pO1xuXG4gICAgICAgICAgICBpZihlID09PSAndGlja2V0JyB8fCBlID09PSAnZW5oYW5jZScpIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgY3JvcDFgXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndHlwZScsIGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgcHJldmlldz90eXBlPSR7ZX1gXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndHlwZScsIGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICB9XG5cbiAgICBnZXRPbmVMaW1pdFRpbWVzKCkge1xuICAgICAgY29uc29sZS5sb2cod3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJpbmZvJyksJ3RoaXMudXNlckluZm8nKTtcbiAgICAgIGlmKCF3eC5nZXRTdG9yYWdlU3luYygndXNlcmluZm8nKSkgcmV0dXJuO1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3VzZXJzL3RpbWVzL21lJyxcbiAgICAgICAgaGVhZGVyOiB7YXV0aGlkOnd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyaW5mbycpfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEsJ21lJyk7XG4gICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgICBzZWxmLmNvdW50ID0ge1xuICAgICAgICAgICAgICBnZW5lcmFsOiB0ZW1wLmdlbmVyYWwsXG4gICAgICAgICAgICAgIHJlY2VpcHQ6IHRlbXAucmVjZWlwdCxcbiAgICAgICAgICAgICAgaWRjYXJkOiB0ZW1wLmlkY2FyZCxcbiAgICAgICAgICAgICAgZHJpdmVjYXJkOiB0ZW1wLmRyaXZlY2FyZCxcbiAgICAgICAgICAgICAgYmFua2NhcmQ6IHRlbXAuYmFua2NhcmQsXG4gICAgICAgICAgICAgIGVuaGFuY2U6IHRlbXAuZW5oYW5jZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0VXNlckluZm8oKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcy51c2VySW5mbyk7XG4gICAgICAgICAgc2VsZi51c2VySW5mbyA9IHJlcy51c2VySW5mbztcbiAgICAgICAgICAvLyBsZXQgdXNlckluZm8gPSByZXMudXNlckluZm87XG4gICAgICAgICAgLy8gbGV0IG5pY2tOYW1lID0gdXNlckluZm8ubmlja05hbWVcbiAgICAgICAgICAvLyBsZXQgYXZhdGFyVXJsID0gdXNlckluZm8uYXZhdGFyVXJsXG4gICAgICAgICAgLy8gbGV0IGdlbmRlciA9IHVzZXJJbmZvLmdlbmRlciAvL+aAp+WIqyAw77ya5pyq55+l44CBMe+8mueUt+OAgTLvvJrlpbNcbiAgICAgICAgICAvLyBsZXQgcHJvdmluY2UgPSB1c2VySW5mby5wcm92aW5jZVxuICAgICAgICAgIC8vIGxldCBjaXR5ID0gdXNlckluZm8uY2l0eVxuICAgICAgICAgIC8vIGxldCBjb3VudHJ5ID0gdXNlckluZm8uY291bnRyeVxuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd1c2VyaW5mbycsIHNlbGYudXNlckluZm8uYXZhdGFyVXJsKTtcbiAgICAgICAgICBzZWxmLmdldE9uZUxpbWl0VGltZXMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn5o6I5p2DJyxcbiAgICAgICAgICAgIGNhbmNlbFRleHQ6ICfkuI3mjojmnYMnLFxuICAgICAgICAgICAgY29udGVudDogYOiLpeS4jeaOiOadg+W+ruS/oeeZu+mZhu+8jOWImeaXoOazleS9v+eUqOOAjEFJ6K+G5Zu+44CN5Yqf6IO977yb54K55Ye76YeN5paw6I635Y+W5o6I5p2D77yM5YiZ5Y+v6YeN5paw5L2/55So77yb6Iul54K55Ye75LiN5o6I5p2D77yM5ZCO5pyf6L+Y5L2/55So5bCP56iL5bqP77yM6ZyA5Zyo5b6u5L+h44CM5Y+R546w5bCP56iL5bqP44CN77yM5Yig5o6J44CMQUnor4blm77jgI3vvIzph43mlrDmkJzntKLmjojmnYPnmbvpmYbvvIzmlrnlj6/kvb/nlKjjgIJgLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLCdyZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aOiOadg+aIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZ2V0T25lTGltaXRUaW1lcygpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgICBzZWxmLmNvdW50ID0ge1xuICAgICAgICAgICAgICAgICAgZ2VuZXJhbDogMCxcbiAgICAgICAgICAgICAgICAgIHJlY2VpcHQ6IDAsXG4gICAgICAgICAgICAgICAgICBpZGNhcmQ6IDAsXG4gICAgICAgICAgICAgICAgICBkcml2ZWNhcmQ6IDAsXG4gICAgICAgICAgICAgICAgICBiYW5rY2FyZDogMCxcbiAgICAgICAgICAgICAgICAgIGVuaGFuY2U6IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIG9uTG9hZCgpIHtcbiAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIH1cbiAgfVxuIl19