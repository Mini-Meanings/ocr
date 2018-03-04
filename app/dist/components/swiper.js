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
              general: (15 - temp.general || 0) >= 0 ? 15 - temp.general || 0 : 0,
              receipt: (10 - temp.receipt || 0) >= 0 ? 10 - temp.receipt || 0 : 0,
              idcard: (10 - temp.idcard || 0) >= 0 ? 10 - temp.idcard || 0 : 0,
              drivecard: (10 - temp.drivecard || 0) >= 0 ? 10 - temp.drivecard || 0 : 0,
              bankcard: (10 - temp.bankcard || 0) >= 0 ? 10 - temp.bankcard || 0 : 0,
              enhance: (5 - temp.enhance || 0) >= 0 ? 5 - temp.enhance || 0 : 0
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
      this.getEachLimitTimes();
      // this.getUserInfo();
    }
  }]);

  return MySwiper;
}(_wepy2.default.page);

exports.default = MySwiper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJNeVN3aXBlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlU3dpcGVyIiwiZGF0YSIsImluZGV4IiwibGZsYWciLCJyZmxhZyIsImNvdW50IiwiZ2VuZXJhbCIsInJlY2VpcHQiLCJpZGNhcmQiLCJkcml2ZWNhcmQiLCJiYW5rY2FyZCIsImVuaGFuY2UiLCJ1c2VySW5mbyIsInN3aXBlciIsInNsaWRlTGVuZ3RoIiwiaW5pdGlhbFNsaWRlIiwib25Jbml0Iiwid2Vzd2lwZXIiLCJjb25zb2xlIiwibG9nIiwib25Ub3VjaFN0YXJ0IiwiZXZlbnQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hFbmQiLCJvblNsaWRlQ2hhbmdlU3RhcnQiLCJvblNsaWRlQ2hhbmdlRW5kIiwid3giLCJzZXRTdG9yYWdlU3luYyIsImFjdGl2ZUluZGV4Iiwib25UcmFuc2l0aW9uU3RhcnQiLCJvblRyYW5zaXRpb25FbmQiLCJvblNsaWRlTW92ZSIsIm9uU2xpZGVOZXh0U3RhcnQiLCJvblNsaWRlTmV4dEVuZCIsIm9uU2xpZGVQcmV2U3RhcnQiLCJvblNsaWRlUHJldkVuZCIsIm1ldGhvZHMiLCJnb05leHQiLCJnZXRTdG9yYWdlU3luYyIsIiRpbnZva2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImdvUHJldiIsInVwbG9hZCIsImUiLCJ0aW1lcyIsInNob3dNb2RhbCIsImNvbmZpcm1UZXh0IiwiY29udGVudCIsInN1Y2Nlc3MiLCJyZXMiLCJjb25maXJtIiwibmF2aWdhdGVUbyIsInVybCIsImNhbmNlbCIsInNlbGYiLCJjaG9vc2VJbWFnZSIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInRlbXBGaWxlUGF0aHMiLCJyZXF1ZXN0IiwiY29kZSIsInRlbXAiLCIkYXBwbHkiLCJoZWFkZXIiLCJhdXRoaWQiLCJnZXRVc2VySW5mbyIsImdldE9uZUxpbWl0VGltZXMiLCJhdmF0YXJVcmwiLCJmYWlsIiwiZXJyb3IiLCJjYW5jZWxUZXh0Iiwib3BlblNldHRpbmciLCJnZXRFYWNoTGltaXRUaW1lcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBRXBCQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsc0JBQXFCLFFBQXhDLEVBQVosRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFFBSVZDLEksR0FBTztBQUNMQyxhQUFPLENBREY7QUFFTEMsYUFBTyxJQUZGO0FBR0xDLGFBQU8sSUFIRjtBQUlMQyxhQUFPO0FBQ0xDLGlCQUFTLENBREo7QUFFTEMsaUJBQVMsQ0FGSixFQUVPO0FBQ1pDLGdCQUFRLENBSEg7QUFJTEMsbUJBQVcsQ0FKTjtBQUtMQyxrQkFBVSxDQUxMO0FBTUxDLGlCQUFTO0FBTkosT0FKRjtBQVlMQyxnQkFBVSxJQVpMO0FBYUxDLGNBQVE7QUFDTjtBQUNBO0FBQ0FDLHFCQUFhLENBSFA7QUFJTkMsc0JBQWMsQ0FKUjtBQUtOOzs7O0FBSUFDLGNBVE0sa0JBU0VDLFFBVEYsRUFTWTtBQUNoQkMsa0JBQVFDLEdBQVIsQ0FBWUYsUUFBWjtBQUNELFNBWEs7O0FBWU47Ozs7O0FBS0FHLG9CQWpCTSx3QkFpQlFILFFBakJSLEVBaUJrQkksS0FqQmxCLEVBaUJ5QixDQUU5QixDQW5CSzs7QUFvQk47Ozs7O0FBS0FDLG1CQXpCTSx1QkF5Qk9MLFFBekJQLEVBeUJpQkksS0F6QmpCLEVBeUJ3QixDQUU3QixDQTNCSzs7QUE0Qk47Ozs7O0FBS0FFLGtCQWpDTSxzQkFpQ01OLFFBakNOLEVBaUNnQkksS0FqQ2hCLEVBaUN1QjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsU0FoREs7O0FBaUROOzs7QUFHQUcs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SUFBSUksTUFBUixFQUFnQjtBQUNyQnRDLHdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBc0MscUJBQUtwRCxLQUFMLEdBQWE7QUFDWEMsMkJBQVMsQ0FERTtBQUVYQywyQkFBUyxDQUZFO0FBR1hDLDBCQUFRLENBSEc7QUFJWEMsNkJBQVcsQ0FKQTtBQUtYQyw0QkFBVSxDQUxDO0FBTVhDLDJCQUFTO0FBTkUsaUJBQWI7QUFRQThDLHFCQUFLUSxNQUFMO0FBQ0Q7QUFDRjtBQTlCVSxXQUFiO0FBZ0NEO0FBaERZLE9BQWY7QUFrREQ7Ozs2QkFFUTtBQUNQLFdBQUsvRCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFdBQUt5RSxpQkFBTDtBQUNBO0FBQ0Q7Ozs7RUEvVW1DLGVBQUtDLEk7O2tCQUF0QmpGLFEiLCJmaWxlIjoic3dpcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgd2VTd2lwZXIgZnJvbSAnd2VweS1jb20tc3dpcGVyJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNeVN3aXBlciBleHRlbmRzIHdlcHkucGFnZSB7XG5cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wid2VTd2lwZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm9wdGlvbi5vbmNlXCI6XCJzd2lwZXJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgd2VTd2lwZXI6IHdlU3dpcGVyXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGluZGV4OiAwLFxuICAgICAgbGZsYWc6IHRydWUsXG4gICAgICByZmxhZzogdHJ1ZSxcbiAgICAgIGNvdW50OiB7XG4gICAgICAgIGdlbmVyYWw6IDAsXG4gICAgICAgIHJlY2VpcHQ6IDAsIC8vIOelqOaNrlxuICAgICAgICBpZGNhcmQ6IDAsXG4gICAgICAgIGRyaXZlY2FyZDogMCxcbiAgICAgICAgYmFua2NhcmQ6IDAsXG4gICAgICAgIGVuaGFuY2U6IDAsXG4gICAgICB9LFxuICAgICAgdXNlckluZm86IG51bGwsXG4gICAgICBzd2lwZXI6IHtcbiAgICAgICAgLy8gZGlyZWN0aW9uOiAndmVydGljYWwnLFxuICAgICAgICAvLyB3aWR0aDogMTgwLFxuICAgICAgICBzbGlkZUxlbmd0aDogNixcbiAgICAgICAgaW5pdGlhbFNsaWRlOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogc3dpcGVy5Yid5aeL5YyW5ZCO5omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICovXG4gICAgICAgIG9uSW5pdCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh3ZXN3aXBlcik7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnorDop6ZzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaFN0YXJ0ICh3ZXN3aXBlciwgZXZlbnQpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICog5omL5oyH56Kw6Kemc2xpZGXlubbkuJTmu5Hliqjml7bmiafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIG9uVG91Y2hNb3ZlICh3ZXN3aXBlciwgZXZlbnQpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICog5omL5oyH56a75byAc2xpZGXml7bmiafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIG9uVG91Y2hFbmQgKHdlc3dpcGVyLCBldmVudCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCd3ZXN3aXBlci5hY3RpdmVJbmRleCcpO1xuICAgICAgICAgIC8vIGlmKHdlc3dpcGVyLmFjdGl2ZUluZGV4ID09PSA1KXtcbiAgICAgICAgICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICAgIHRpdGxlOiAn5bey57uP5Yiw5bC+5ZWm772eJyxcbiAgICAgICAgICAvLyAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIC8vICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAvLyB9IGVsc2UgaWYod2Vzd2lwZXIuYWN0aXZlSW5kZXggPT09IDApIHtcbiAgICAgICAgICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICAgIHRpdGxlOiAn5bey57uP5Yiw5aS05ZWm772eJyxcbiAgICAgICAgICAvLyAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIC8vICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7bml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVDaGFuZ2VTdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHN3aXBlcuS7juS4gOS4qnNsaWRl6L+H5rih5Yiw5Y+m5LiA5Liqc2xpZGXnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVDaGFuZ2VFbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2luZGV4Jywgd2Vzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOi/h+a4oeaXtuinpuWPkVxuICAgICAgICAgKi9cbiAgICAgICAgb25UcmFuc2l0aW9uU3RhcnQgKHdlc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICDov4fmuKHnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uVHJhbnNpdGlvbkVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgICAvLyBpZih3ZXN3aXBlci5hY3RpdmVJbmRleCA9PT0gNSl7XG4gICAgICAgICAgLy8gICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIC8vICAgICB0aXRsZTogJ+W3sue7j+WIsOWwvuWVpu+9nicsXG4gICAgICAgICAgLy8gICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAvLyAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAvLyAgIH0pXG4gICAgICAgICAgLy8gfSBlbHNlIGlmKHdlc3dpcGVyLmFjdGl2ZUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgLy8gICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIC8vICAgICB0aXRsZTogJ+W3sue7j+WIsOWktOWVpu+9nicsXG4gICAgICAgICAgLy8gICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAvLyAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAvLyAgIH0pXG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgLy8gd3guc2V0U3RvcmFnZVN5bmMoJ2luZGV4Jywgd2Vzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFyZ3VtZW50cywnYXJndW1lbnRzJyk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuaXNCZWdpbm5pbmcsJ2lzQmVnaW5uaW5nJyk7XG4gICAgICAgICAgLy8gaWYgKHdlc3dpcGVyLmlzQmVnaW5uaW5nKXtcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKCd0YWlsJyk7XG4gICAgICAgICAgLy8gICB0aGlzLmxmbGFnID0gZmFsc2U7XG4gICAgICAgICAgLy8gfSBlbHNlIGlmICh3ZXN3aXBlci5pc0VuZCkge1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2coJ2hlYWQnKTtcbiAgICAgICAgICAvLyAgIHRoaXMucmZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAg5omL5oyH6Kem56Kwc3dpcGVy5bm25LiU5ouW5Yqoc2xpZGXml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVNb3ZlICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCd3ZXN3aXBlci5hY3RpdmVJbmRleCcpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOWPs+OAgeS4i++8ieWIh+aNouaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZU5leHRTdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlj7PjgIHkuIvvvInliIfmjaLnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVOZXh0RW5kICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCduZXh0Jyk7XG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2luZGV4Jywgd2Vzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlt6bjgIHkuIrvvInliIfmjaLml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVQcmV2U3RhcnQgKHN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOW3puOAgeS4iu+8ieWIh+aNoue7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZVByZXZFbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3ByZXYnKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29OZXh0KHdlc3dpcGVyKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbmRleCcpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbmRleCk7XG4gICAgICAgIGlmKGluZGV4IDwgNSl7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd3ZVN3aXBlcicsICdzbGlkZU5leHQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/liLDlsL7llabvvZ4nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29QcmV2KHdlc3dpcGVyKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbmRleCcpO1xuICAgICAgICBpZihpbmRleCA+IDApe1xuICAgICAgICAgIHRoaXMuJGludm9rZSgnd2VTd2lwZXInLCAnc2xpZGVQcmV2Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5bey57uP5Yiw5aS05ZWm772eJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwbG9hZChlLHRpbWVzKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRpbWVzLCd0aW1lcycpO1xuICAgICAgICBpZih0aW1lcyA9PT0gMCkge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb25maXJtVGV4dDogJ+W4ruWKqScsXG4gICAgICAgICAgICAvLyBjYW5jZWxUZXh0OiAnJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfku4rml6Xor6XnsbvlnovjgIzlhY3otLnjgI3mrKHmlbDlt7Lnu4/nlKjlrozvvIzor7fkvb/nlKjlhbbku5bnsbvlnovjgILmiJbnrYnlvoXmrKHml6XmgaLlpI3kvb/nlKjmrKHmlbAhJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn55So5oi354K55Ye756Gu5a6aJyk7XG4gICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgICB1cmw6ICdoZWxwJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnlKjmiLfngrnlh7vlj5bmtognKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiAxLCAvLyDpu5jorqQ5XG4gICAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnXSwgLy8g5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXG4gICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSwgLy8g5Y+v5Lul5oyH5a6a5p2l5rqQ5piv55u45YaM6L+Y5piv55u45py677yM6buY6K6k5LqM6ICF6YO95pyJXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgbGV0IHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRocztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbXBGaWxlUGF0aHMsJ3RlbXBGaWxlUGF0aHMnKTtcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcsdGVtcEZpbGVQYXRoc1swXSk7XG5cbiAgICAgICAgICAgIGlmKGUgPT09ICd0aWNrZXQnIHx8IGUgPT09ICdlbmhhbmNlJykge1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGBjcm9wMWBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0eXBlJywgZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6IGBwcmV2aWV3P3R5cGU9JHtlfWBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCd0eXBlJywgZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgIH1cblxuICAgIGdldEVhY2hMaW1pdFRpbWVzKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3VzZXJzL3RpbWVzL2RlZmF1bHQnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YSk7XG4gICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICBsZXQgdGVtcCA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgICAgICBzZWxmLmNvdW50ID0ge1xuICAgICAgICAgICAgICBnZW5lcmFsOiB0ZW1wLmdlbmVyYWwsXG4gICAgICAgICAgICAgIHJlY2VpcHQ6IHRlbXAucmVjZWlwdCxcbiAgICAgICAgICAgICAgaWRjYXJkOiB0ZW1wLmlkY2FyZCxcbiAgICAgICAgICAgICAgZHJpdmVjYXJkOiB0ZW1wLmRyaXZlY2FyZCxcbiAgICAgICAgICAgICAgYmFua2NhcmQ6IHRlbXAuYmFua2NhcmQsXG4gICAgICAgICAgICAgIGVuaGFuY2U6IHRlbXAuZW5oYW5jZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi4kYXBwbHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0T25lTGltaXRUaW1lcygpIHtcbiAgICAgIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyaW5mbycpLCd0aGlzLnVzZXJJbmZvJyk7XG4gICAgICBpZighd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJpbmZvJykpIHJldHVybjtcbiAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICB1cmw6ICdodHRwczovL3d3dy5pb2NyLnZpcC9haS91c2Vycy90aW1lcy9tZScsXG4gICAgICAgIGhlYWRlcjoge2F1dGhpZDp3eC5nZXRTdG9yYWdlU3luYygndXNlcmluZm8nKX0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhLCdtZScpO1xuICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgbGV0IHRlbXAgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgICAgc2VsZi5jb3VudCA9IHtcbiAgICAgICAgICAgICAgZ2VuZXJhbDogKDE1IC0gdGVtcC5nZW5lcmFsIHx8IDApID49IDAgPyAoMTUgLSB0ZW1wLmdlbmVyYWwgfHwgMCkgOiAwLFxuICAgICAgICAgICAgICByZWNlaXB0OiAoMTAgLSB0ZW1wLnJlY2VpcHQgfHwgMCkgPj0gMCA/ICgxMCAtIHRlbXAucmVjZWlwdCB8fCAwKSA6IDAsXG4gICAgICAgICAgICAgIGlkY2FyZDogKDEwIC0gdGVtcC5pZGNhcmQgfHwgMCkgPj0gMCA/ICgxMCAtIHRlbXAuaWRjYXJkIHx8IDApIDogMCxcbiAgICAgICAgICAgICAgZHJpdmVjYXJkOiAoMTAgLSB0ZW1wLmRyaXZlY2FyZCB8fCAwKSA+PSAwID8gKDEwIC0gdGVtcC5kcml2ZWNhcmQgfHwgMCkgOiAwLFxuICAgICAgICAgICAgICBiYW5rY2FyZDogKDEwIC0gdGVtcC5iYW5rY2FyZCB8fCAwKSA+PSAwID8gKDEwIC0gdGVtcC5iYW5rY2FyZCB8fCAwKSA6IDAsXG4gICAgICAgICAgICAgIGVuaGFuY2U6ICg1IC0gdGVtcC5lbmhhbmNlIHx8IDApID49IDAgPyAoNSAtIHRlbXAuZW5oYW5jZSB8fCAwKSA6IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGdldFVzZXJJbmZvKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMudXNlckluZm8pO1xuICAgICAgICAgIHNlbGYudXNlckluZm8gPSByZXMudXNlckluZm87XG4gICAgICAgICAgLy8gbGV0IHVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xuICAgICAgICAgIC8vIGxldCBuaWNrTmFtZSA9IHVzZXJJbmZvLm5pY2tOYW1lXG4gICAgICAgICAgLy8gbGV0IGF2YXRhclVybCA9IHVzZXJJbmZvLmF2YXRhclVybFxuICAgICAgICAgIC8vIGxldCBnZW5kZXIgPSB1c2VySW5mby5nZW5kZXIgLy/mgKfliKsgMO+8muacquefpeOAgTHvvJrnlLfjgIEy77ya5aWzXG4gICAgICAgICAgLy8gbGV0IHByb3ZpbmNlID0gdXNlckluZm8ucHJvdmluY2VcbiAgICAgICAgICAvLyBsZXQgY2l0eSA9IHVzZXJJbmZvLmNpdHlcbiAgICAgICAgICAvLyBsZXQgY291bnRyeSA9IHVzZXJJbmZvLmNvdW50cnlcbiAgICAgICAgICBzZWxmLmdldE9uZUxpbWl0VGltZXMoKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlcmluZm8nLCBzZWxmLnVzZXJJbmZvLmF2YXRhclVybCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+itpuWRiicsXG4gICAgICAgICAgICBjb25maXJtVGV4dDogJ+aOiOadgycsXG4gICAgICAgICAgICBjYW5jZWxUZXh0OiAn5LiN5o6I5p2DJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGDoi6XkuI3mjojmnYPlvq7kv6HnmbvpmYbvvIzliJnml6Dms5Xkvb/nlKjjgIxBSeivhuWbvuOAjeWKn+iDve+8m+eCueWHu+mHjeaWsOiOt+WPluaOiOadg++8jOWImeWPr+mHjeaWsOS9v+eUqO+8m+iLpeeCueWHu+S4jeaOiOadg++8jOWQjuacn+i/mOS9v+eUqOWwj+eoi+W6j++8jOmcgOWcqOW+ruS/oeOAjOWPkeeOsOWwj+eoi+W6j+OAje+8jOWIoOaOieOAjEFJ6K+G5Zu+44CN77yM6YeN5paw5pCc57Si5o6I5p2D55m76ZmG77yM5pa55Y+v5L2/55So44CCYCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICB3eC5vcGVuU2V0dGluZyh7XG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcywncmVzJyk7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfmjojmnYPmiJDlip8nLFxuICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBzZWxmLmdldE9uZUxpbWl0VGltZXMoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn55So5oi354K55Ye75Y+W5raIJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5jb3VudCA9IHtcbiAgICAgICAgICAgICAgICAgIGdlbmVyYWw6IDAsXG4gICAgICAgICAgICAgICAgICByZWNlaXB0OiAwLFxuICAgICAgICAgICAgICAgICAgaWRjYXJkOiAwLFxuICAgICAgICAgICAgICAgICAgZHJpdmVjYXJkOiAwLFxuICAgICAgICAgICAgICAgICAgYmFua2NhcmQ6IDAsXG4gICAgICAgICAgICAgICAgICBlbmhhbmNlOiAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBvbkxvYWQoKSB7XG4gICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgIHRoaXMuZ2V0RWFjaExpbWl0VGltZXMoKTtcbiAgICAgIC8vIHRoaXMuZ2V0VXNlckluZm8oKTtcbiAgICB9XG4gIH1cbiJdfQ==