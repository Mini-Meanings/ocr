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
    key: 'onLoad',
    value: function onLoad() {
      this.index = 0;
    }
  }]);

  return MySwiper;
}(_wepy2.default.page);

exports.default = MySwiper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJNeVN3aXBlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlU3dpcGVyIiwiZGF0YSIsImluZGV4IiwibGZsYWciLCJyZmxhZyIsInN3aXBlciIsInNsaWRlTGVuZ3RoIiwiaW5pdGlhbFNsaWRlIiwib25Jbml0Iiwid2Vzd2lwZXIiLCJjb25zb2xlIiwibG9nIiwib25Ub3VjaFN0YXJ0IiwiZXZlbnQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hFbmQiLCJvblNsaWRlQ2hhbmdlU3RhcnQiLCJvblNsaWRlQ2hhbmdlRW5kIiwid3giLCJzZXRTdG9yYWdlU3luYyIsImFjdGl2ZUluZGV4Iiwib25UcmFuc2l0aW9uU3RhcnQiLCJvblRyYW5zaXRpb25FbmQiLCJvblNsaWRlTW92ZSIsIm9uU2xpZGVOZXh0U3RhcnQiLCJvblNsaWRlTmV4dEVuZCIsIm9uU2xpZGVQcmV2U3RhcnQiLCJvblNsaWRlUHJldkVuZCIsIm1ldGhvZHMiLCJnb05leHQiLCJnZXRTdG9yYWdlU3luYyIsIiRpbnZva2UiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImdvUHJldiIsInVwbG9hZCIsImUiLCJzZWxmIiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZVBhdGhzIiwibmF2aWdhdGVUbyIsInVybCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBRXBCQyxPLEdBQVUsRSxRQUNiQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsc0JBQXFCLFFBQXhDLEVBQVosRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUkM7QUFEUSxLLFFBSVZDLEksR0FBTztBQUNMQyxhQUFPLENB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QkEwQkRDLENBMUJDLEVBMEJFO0FBQ1IsWUFBSUMsT0FBTyxJQUFYO0FBQ0FyQixXQUFHc0IsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPLENBRE0sRUFDSDtBQUNWQyxvQkFBVSxDQUFDLFVBQUQsQ0FGRyxFQUVXO0FBQ3hCQyxzQkFBWSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBSEMsRUFHb0I7QUFDakNDLG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEIsZ0JBQUlDLGdCQUFnQkQsSUFBSUMsYUFBeEI7QUFDQTtBQUNBNUIsZUFBR0MsY0FBSCxDQUFrQixVQUFsQixFQUE2QjJCLGNBQWMsQ0FBZCxDQUE3Qjs7QUFFQSxnQkFBR1IsTUFBTSxRQUFOLElBQWtCQSxNQUFNLFNBQTNCLEVBQXNDO0FBQ3BDcEIsaUJBQUc2QixVQUFILENBQWM7QUFDWkM7QUFEWSxlQUFkO0FBR0E5QixpQkFBR0MsY0FBSCxDQUFrQixNQUFsQixFQUEwQm1CLENBQTFCO0FBQ0QsYUFMRCxNQUtPO0FBQ0xwQixpQkFBRzZCLFVBQUgsQ0FBYztBQUNaQyx1Q0FBcUJWO0FBRFQsZUFBZDtBQUdBcEIsaUJBQUdDLGNBQUgsQ0FBa0IsTUFBbEIsRUFBMEJtQixDQUExQjtBQUNEO0FBRUY7QUFyQlksU0FBZjtBQXVCRDtBQW5ETyxLOzs7Ozs2QkFzREQ7QUFDUCxXQUFLcEMsS0FBTCxHQUFhLENBQWI7QUFDRDs7OztFQTNNbUMsZUFBSytDLEk7O2tCQUF0QnRELFEiLCJmaWxlIjoic3dpcGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQgd2VTd2lwZXIgZnJvbSAnd2VweS1jb20tc3dpcGVyJztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNeVN3aXBlciBleHRlbmRzIHdlcHkucGFnZSB7XG5cbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wid2VTd2lwZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOm9wdGlvbi5vbmNlXCI6XCJzd2lwZXJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgd2VTd2lwZXI6IHdlU3dpcGVyXG4gICAgfVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGluZGV4OiAwLFxuICAgICAgbGZsYWc6IHRydWUsXG4gICAgICByZmxhZzogdHJ1ZSxcbiAgICAgIHN3aXBlcjoge1xuICAgICAgICAvLyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsXG4gICAgICAgIC8vIHdpZHRoOiAxODAsXG4gICAgICAgIHNsaWRlTGVuZ3RoOiA2LFxuICAgICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzd2lwZXLliJ3lp4vljJblkI7miafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKi9cbiAgICAgICAgb25Jbml0ICh3ZXN3aXBlcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHdlc3dpcGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaJi+aMh+eisOinpnNsaWRl5pe25omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICBvblRvdWNoU3RhcnQgKHdlc3dpcGVyLCBldmVudCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnorDop6ZzbGlkZeW5tuS4lOa7keWKqOaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaE1vdmUgKHdlc3dpcGVyLCBldmVudCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnprvlvIBzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaEVuZCAod2Vzd2lwZXIsIGV2ZW50KSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgICAgLy8gaWYod2Vzd2lwZXIuYWN0aXZlSW5kZXggPT09IDUpe1xuICAgICAgICAgIC8vICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgICAgdGl0bGU6ICflt7Lnu4/liLDlsL7llabvvZ4nLFxuICAgICAgICAgIC8vICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vIH0gZWxzZSBpZih3ZXN3aXBlci5hY3RpdmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgIC8vICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAvLyAgICAgdGl0bGU6ICflt7Lnu4/liLDlpLTllabvvZ4nLFxuICAgICAgICAgIC8vICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgLy8gICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgLy8gICB9KVxuICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tuaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZUNoYW5nZVN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc3dpcGVy5LuO5LiA5Liqc2xpZGXov4fmuKHliLDlj6bkuIDkuKpzbGlkZee7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZUNoYW5nZUVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAg6L+H5rih5pe26Kem5Y+RXG4gICAgICAgICAqL1xuICAgICAgICBvblRyYW5zaXRpb25TdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOi/h+a4oee7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25UcmFuc2l0aW9uRW5kICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCd3ZXN3aXBlci5hY3RpdmVJbmRleCcpO1xuICAgICAgICAgIC8vIGlmKHdlc3dpcGVyLmFjdGl2ZUluZGV4ID09PSA1KXtcbiAgICAgICAgICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICAgIHRpdGxlOiAn5bey57uP5Yiw5bC+5ZWm772eJyxcbiAgICAgICAgICAvLyAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIC8vICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAvLyB9IGVsc2UgaWYod2Vzd2lwZXIuYWN0aXZlSW5kZXggPT09IDApIHtcbiAgICAgICAgICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICAgIHRpdGxlOiAn5bey57uP5Yiw5aS05ZWm772eJyxcbiAgICAgICAgICAvLyAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIC8vICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAvLyB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYXJndW1lbnRzLCdhcmd1bWVudHMnKTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5pc0JlZ2lubmluZywnaXNCZWdpbm5pbmcnKTtcbiAgICAgICAgICAvLyBpZiAod2Vzd2lwZXIuaXNCZWdpbm5pbmcpe1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2coJ3RhaWwnKTtcbiAgICAgICAgICAvLyAgIHRoaXMubGZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAvLyB9IGVsc2UgaWYgKHdlc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZygnaGVhZCcpO1xuICAgICAgICAgIC8vICAgdGhpcy5yZmxhZyA9IGZhbHNlO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICDmiYvmjIfop6bnorBzd2lwZXLlubbkuJTmi5bliqhzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZU1vdmUgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5Y+z44CB5LiL77yJ5YiH5o2i5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTmV4dFN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOWPs+OAgeS4i++8ieWIh+aNoue7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZU5leHRFbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ25leHQnKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOW3puOAgeS4iu+8ieWIh+aNouaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZVByZXZTdGFydCAoc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5bem44CB5LiK77yJ5YiH5o2i57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlUHJldkVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwncHJldicpO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb05leHQod2Vzd2lwZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2luZGV4Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4KTtcbiAgICAgICAgaWYoaW5kZXggPCA1KXtcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ3dlU3dpcGVyJywgJ3NsaWRlTmV4dCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WIsOWwvuWVpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb1ByZXYod2Vzd2lwZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2luZGV4Jyk7XG4gICAgICAgIGlmKGluZGV4ID4gMCl7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd3ZVN3aXBlcicsICdzbGlkZVByZXYnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/liLDlpLTllabvvZ4nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBsb2FkKGUpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgY291bnQ6IDEsIC8vIOm7mOiupDlcbiAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCddLCAvLyDlj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAvLyDlj6/ku6XmjIflrprmnaXmupDmmK/nm7jlhozov5jmmK/nm7jmnLrvvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBsZXQgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGVtcEZpbGVQYXRocywndGVtcEZpbGVQYXRocycpO1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyx0ZW1wRmlsZVBhdGhzWzBdKTtcblxuICAgICAgICAgICAgaWYoZSA9PT0gJ3RpY2tldCcgfHwgZSA9PT0gJ2VuaGFuY2UnKSB7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYGNyb3AxYFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3R5cGUnLCBlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogYHByZXZpZXc/dHlwZT0ke2V9YFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3R5cGUnLCBlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfVxuICAgIFxuICAgIG9uTG9hZCgpIHtcbiAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIH1cbiAgfVxuIl19