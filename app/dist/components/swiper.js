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
      var self = this;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJNeVN3aXBlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlU3dpcGVyIiwiZGF0YSIsImluZGV4IiwibGZsYWciLCJyZmxhZyIsImNvdW50IiwiZ2VuZXJhbCIsInJlY2VpcHQiLCJpZGNhcmQiLCJkcml2ZWNhcmQiLCJiYW5rY2FyZCIsImVuaGFuY2UiLCJzd2lwZXIiLCJzbGlkZUxlbmd0aCIsImluaXRpYWxTbGlkZSIsIm9uSW5pdCIsIndlc3dpcGVyIiwiY29uc29sZSIsImxvZyIsIm9uVG91Y2hTdGFydCIsImV2ZW50Iiwib25Ub3VjaE1vdmUiLCJvblRvdWNoRW5kIiwib25TbGlkZUNoYW5nZVN0YXJ0Iiwib25TbGlkZUNoYW5nZUVuZCIsInd4Iiwic2V0U3RvcmFnZVN5bmMiLCJhY3RpdmVJbmRleCIsIm9uVHJhbnNpdGlvblN0YXJ0Iiwib25UcmFuc2l0aW9uRW5kIiwib25TbGlkZU1vdmUiLCJvblNsaWRlTmV4dFN0YXJ0Iiwib25TbGlkZU5leHRFbmQiLCJvblNsaWRlUHJldlN0YXJ0Iiwib25TbGlkZVByZXZFbmQiLCJtZXRob2RzIiwiZ29OZXh0IiwiZ2V0U3RvcmFnZVN5bmMiLCIkaW52b2tlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJnb1ByZXYiLCJ1cGxvYWQiLCJlIiwic2VsZiIsImNob29zZUltYWdlIiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwic3VjY2VzcyIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmVxdWVzdCIsImNvZGUiLCJ0ZW1wIiwiJGFwcGx5IiwiZ2V0VXNlckluZm8iLCJ1c2VySW5mbyIsIm5pY2tOYW1lIiwiYXZhdGFyVXJsIiwiZ2VuZGVyIiwicHJvdmluY2UiLCJjaXR5IiwiY291bnRyeSIsImZhaWwiLCJlcnJvciIsInNob3dNb2RhbCIsImNvbmZpcm1UZXh0IiwiY2FuY2VsVGV4dCIsImNvbnRlbnQiLCJjb25maXJtIiwib3BlblNldHRpbmciLCJjYW5jZWwiLCJnZXRFYWNoTGltaXRUaW1lcyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBRXBCQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsc0JBQXFCLFFBQXhDLEVBQVosRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFFBSVZDLEksR0FBTztBQUNMQyxhQUFPLENBREY7QUFFTEMsYUFBTyxJQUZGO0FBR0xDLGFBQU8sSUFIRjtBQUlMQyxhQUFPO0FBQ0xDLGlCQUFTLENBREo7QUFFTEMsaUJBQVMsQ0FGSixFQUVPO0FBQ1pDLGdCQUFRLENBSEg7QUFJTEMsbUJBQVcsQ0FKTjtBQUtMQyxrQkFBVSxDQUxMO0FBTUxDLGlCQUFTO0FBTkosT0FKRjtBQVlMQyxjQUFRO0FBQ047QUFDQTtBQUNBQyxxQkFBYSxDQUhQO0FBSU5DLHNCQUFjLENBSlI7QUFLTjs7OztBQUlBQyxjQVRNLGtCQVNFQyxRQVRGLEVBU1k7QUFDaEJDLGtCQUFRQyxHQUFSLENBQVlGLFFBQVo7QUFDRCxTQVhLOztBQVlOOzs7OztBQUtBRyxvQkFqQk0sd0JBaUJRSCxRQWpCUixFQWlCa0JJLEtBakJsQixFQWlCeUIsQ0FFOUIsQ0FuQks7O0FBb0JOOzs7OztBQUtBQyxtQkF6Qk0sdUJBeUJPTCxRQXpCUCxFQXlCaUJJLEtBekJqQixFQXlCd0IsQ0FFN0IsQ0EzQks7O0FBNEJOOzs7OztBQUtBRSxrQkFqQ00sc0JBaUNNTixRQWpDTixFQWlDZ0JJLEtBakNoQixFQWlDdUI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELFNBaERLOztBQWlETjs7O0FBR0FHLDBCQXBETSw4QkFvRGNQ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QWE7QUFDWEMsMkJBQVMsQ0FERTtBQUVYQywyQkFBUyxDQUZFO0FBR1hDLDBCQUFRLENBSEc7QUFJWEMsNkJBQVcsQ0FKQTtBQUtYQyw0QkFBVSxDQUxDO0FBTVhDLDJCQUFTO0FBTkUsaUJBQWI7QUFRQW1DLHFCQUFLWSxNQUFMO0FBQ0Q7QUFDRjtBQTdCVSxXQUFiO0FBK0JEO0FBNUNZLE9BQWY7QUE4Q0Q7Ozs2QkFFUTtBQUNQLFdBQUt4RCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFdBQUswRSxpQkFBTDtBQUNBLFdBQUtqQixXQUFMO0FBQ0Q7Ozs7RUFuVG1DLGVBQUtrQixJOztrQkFBdEJsRixRIiwiZmlsZSI6InN3aXBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHdlU3dpcGVyIGZyb20gJ3dlcHktY29tLXN3aXBlcic7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlTd2lwZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIndlU3dpcGVyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpvcHRpb24ub25jZVwiOlwic3dpcGVyXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHdlU3dpcGVyOiB3ZVN3aXBlclxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBpbmRleDogMCxcbiAgICAgIGxmbGFnOiB0cnVlLFxuICAgICAgcmZsYWc6IHRydWUsXG4gICAgICBjb3VudDoge1xuICAgICAgICBnZW5lcmFsOiAwLFxuICAgICAgICByZWNlaXB0OiAwLCAvLyDnpajmja5cbiAgICAgICAgaWRjYXJkOiAwLFxuICAgICAgICBkcml2ZWNhcmQ6IDAsXG4gICAgICAgIGJhbmtjYXJkOiAwLFxuICAgICAgICBlbmhhbmNlOiAwLFxuICAgICAgfSxcbiAgICAgIHN3aXBlcjoge1xuICAgICAgICAvLyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsXG4gICAgICAgIC8vIHdpZHRoOiAxODAsXG4gICAgICAgIHNsaWRlTGVuZ3RoOiA2LFxuICAgICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzd2lwZXLliJ3lp4vljJblkI7miafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKi9cbiAgICAgICAgb25Jbml0ICh3ZXN3aXBlcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHdlc3dpcGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaJi+aMh+eisOinpnNsaWRl5pe25omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICBvblRvdWNoU3RhcnQgKHdlc3dpcGVyLCBldmVudCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnorDop6ZzbGlkZeW5tuS4lOa7keWKqOaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaE1vdmUgKHdlc3dpcGVyLCBldmVudCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnprvlvIBzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaEVuZCAod2Vzd2lwZXIsIGV2ZW50KSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgICAgLy8gaWYod2Vzd2lwZXIuYWN0aXZlSW5kZXggPT09IDUpe1xuICAgICAgICAgIC8vICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgICAgdGl0bGU6ICflt7Lnu4/liLDlsL7llabvvZ4nLFxuICAgICAgICAgIC8vICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vIH0gZWxzZSBpZih3ZXN3aXBlci5hY3RpdmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgIC8vICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgICAgdGl0bGU6ICflt7Lnu4/liLDlpLTllabvvZ4nLFxuICAgICAgICAgIC8vICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tuaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZUNoYW5nZVN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc3dpcGVy5LuO5LiA5Liqc2xpZGXov4fmuKHliLDlj6bkuIDkuKpzbGlkZee7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZUNoYW5nZUVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAg6L+H5rih5pe26Kem5Y+RXG4gICAgICAgICAqL1xuICAgICAgICBvblRyYW5zaXRpb25TdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOi/h+a4oee7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25UcmFuc2l0aW9uRW5kICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCd3ZXN3aXBlci5hY3RpdmVJbmRleCcpO1xuICAgICAgICAgIC8vIGlmKHdlc3dpcGVyLmFjdGl2ZUluZGV4ID09PSA1KXtcbiAgICAgICAgICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICAgIHRpdGxlOiAn5bey57uP5Yiw5bC+5ZWm772eJyxcbiAgICAgICAgICAvLyAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIC8vICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAvLyB9IGVsc2UgaWYod2Vzd2lwZXIuYWN0aXZlSW5kZXggPT09IDApIHtcbiAgICAgICAgICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICAgIHRpdGxlOiAn5bey57uP5Yiw5aS05ZWm772eJyxcbiAgICAgICAgICAvLyAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIC8vICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAvLyB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYXJndW1lbnRzLCdhcmd1bWVudHMnKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5pc0JlZ2lubmluZywnaXNCZWdpbm5pbmcnKTtcbiAgICAgICAgICAvLyBpZiAod2Vzd2lwZXIuaXNCZWdpbm5pbmcpe1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2coJ3RhaWwnKTtcbiAgICAgICAgICAvLyAgIHRoaXMubGZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKHdlc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZygnaGVhZCcpO1xuICAgICAgICAgIC8vICAgdGhpcy5yZmxhZyA9IGZhbHNlO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICDmiYvmjIfop6bnorBzd2lwZXLlubbkuJTmi5bliqhzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZU1vdmUgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5Y+z44CB5LiL77yJ5YiH5o2i5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTmV4dFN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOWPs+OAgeS4i++8ieWIh+aNoue7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZU5leHRFbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ25leHQnKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOW3puOAgeS4iu+8ieWIh+aNouaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZVByZXZTdGFydCAoc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5bem44CB5LiK77yJ5YiH5o2i57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlUHJldkVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwncHJldicpO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb05leHQod2Vzd2lwZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2luZGV4Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4KTtcbiAgICAgICAgaWYoaW5kZXggPCA1KXtcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ3dlU3dpcGVyJywgJ3NsaWRlTmV4dCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WIsOWwvuWVpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb1ByZXYod2Vzd2lwZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2luZGV4Jyk7XG4gICAgICAgIGlmKGluZGV4ID4gMCl7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd3ZVN3aXBlcicsICdzbGlkZVByZXYnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/liLDlpLTllabvvZ4nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBsb2FkKGUpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgY291bnQ6IDEsIC8vIOm7mOiupDlcbiAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCddLCAvLyDlj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAvLyDlj6/ku6XmjIflrprmnaXmupDmmK/nm7jlhozov5jmmK/nm7jmnLrvvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBsZXQgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGVtcEZpbGVQYXRocywndGVtcEZpbGVQYXRocycpO1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyx0ZW1wRmlsZVBhdGhzWzBdKTtcblxuICAgICAgICAgICAgaWYoZSA9PT0gJ3RpY2tldCcgfHwgZSA9PT0gJ2VuaGFuY2UnKSB7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYGNyb3AxYFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3R5cGUnLCBlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYHByZXZpZXc/dHlwZT0ke2V9YFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3R5cGUnLCBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfVxuXG4gICAgZ2V0RWFjaExpbWl0VGltZXMoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly93d3cuaW9jci52aXAvYWkvdXNlcnMvdGltZXMvZGVmYXVsdCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcbiAgICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIGxldCB0ZW1wID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICAgIHNlbGYuY291bnQgPSB7XG4gICAgICAgICAgICAgIGdlbmVyYWw6IHRlbXAuZ2VuZXJhbCxcbiAgICAgICAgICAgICAgcmVjZWlwdDogdGVtcC5yZWNlaXB0LFxuICAgICAgICAgICAgICBpZGNhcmQ6IHRlbXAuaWRjYXJkLFxuICAgICAgICAgICAgICBkcml2ZWNhcmQ6IHRlbXAuZHJpdmVjYXJkLFxuICAgICAgICAgICAgICBiYW5rY2FyZDogdGVtcC5iYW5rY2FyZCxcbiAgICAgICAgICAgICAgZW5oYW5jZTogdGVtcC5lbmhhbmNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRPbmVMaW1pdFRpbWVzKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgIHVybDogJ2h0dHBzOi8vd3d3LmlvY3IudmlwL2FpL3VzZXJzL3RpbWVzL21lJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpO1xuICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgbGV0IHRlbXAgPSByZXMuZGF0YS5kYXRhO1xuICAgICAgICAgICAgc2VsZi5jb3VudCA9IHtcbiAgICAgICAgICAgICAgZ2VuZXJhbDogdGVtcC5nZW5lcmFsLFxuICAgICAgICAgICAgICByZWNlaXB0OiB0ZW1wLnJlY2VpcHQsXG4gICAgICAgICAgICAgIGlkY2FyZDogdGVtcC5pZGNhcmQsXG4gICAgICAgICAgICAgIGRyaXZlY2FyZDogdGVtcC5kcml2ZWNhcmQsXG4gICAgICAgICAgICAgIGJhbmtjYXJkOiB0ZW1wLmJhbmtjYXJkLFxuICAgICAgICAgICAgICBlbmhhbmNlOiB0ZW1wLmVuaGFuY2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuJGFwcGx5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGdldFVzZXJJbmZvKCkge1xuICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICBsZXQgdXNlckluZm8gPSByZXMudXNlckluZm87XG4gICAgICAgICAgY29uc29sZS5sb2codXNlckluZm8pO1xuICAgICAgICAgIGxldCBuaWNrTmFtZSA9IHVzZXJJbmZvLm5pY2tOYW1lXG4gICAgICAgICAgbGV0IGF2YXRhclVybCA9IHVzZXJJbmZvLmF2YXRhclVybFxuICAgICAgICAgIGxldCBnZW5kZXIgPSB1c2VySW5mby5nZW5kZXIgLy/mgKfliKsgMO+8muacquefpeOAgTHvvJrnlLfjgIEy77ya5aWzXG4gICAgICAgICAgbGV0IHByb3ZpbmNlID0gdXNlckluZm8ucHJvdmluY2VcbiAgICAgICAgICBsZXQgY2l0eSA9IHVzZXJJbmZvLmNpdHlcbiAgICAgICAgICBsZXQgY291bnRyeSA9IHVzZXJJbmZvLmNvdW50cnlcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn5o6I5p2DJyxcbiAgICAgICAgICAgIGNhbmNlbFRleHQ6ICfkuI3mjojmnYMnLFxuICAgICAgICAgICAgY29udGVudDogYOiLpeS4jeaOiOadg+W+ruS/oeeZu+mZhu+8jOWImeaXoOazleS9v+eUqOOAjEFJ6K+G5Zu+44CN5Yqf6IO977yb54K55Ye76YeN5paw6I635Y+W5o6I5p2D77yM5YiZ5Y+v6YeN5paw5L2/55So77yb6Iul54K55Ye75LiN5o6I5p2D77yM5ZCO5pyf6L+Y5L2/55So5bCP56iL5bqP77yM6ZyA5Zyo5b6u5L+h44CM5Y+R546w5bCP56iL5bqP44CN77yM5Yig5o6J44CMQUnor4blm77jgI3vvIzph43mlrDmkJzntKLmjojmnYPnmbvpmYbvvIzmlrnlj6/kvb/nlKjjgIJgLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzLCdyZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aOiOadg+aIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eUqOaIt+eCueWHu+WPlua2iCcpO1xuICAgICAgICAgICAgICAgIHNlbGYuY291bnQgPSB7XG4gICAgICAgICAgICAgICAgICBnZW5lcmFsOiAwLFxuICAgICAgICAgICAgICAgICAgcmVjZWlwdDogMCxcbiAgICAgICAgICAgICAgICAgIGlkY2FyZDogMCxcbiAgICAgICAgICAgICAgICAgIGRyaXZlY2FyZDogMCxcbiAgICAgICAgICAgICAgICAgIGJhbmtjYXJkOiAwLFxuICAgICAgICAgICAgICAgICAgZW5oYW5jZTogMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgb25Mb2FkKCkge1xuICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICB0aGlzLmdldEVhY2hMaW1pdFRpbWVzKCk7XG4gICAgICB0aGlzLmdldFVzZXJJbmZvKCk7XG4gICAgfVxuICB9XG4iXX0=