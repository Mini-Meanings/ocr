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
      swiper: {
        // direction: 'vertical',
        // width: 180,
        slideLength: 6,
        initialSlide: 1,
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
          if (weswiper.activeIndex === 5) {
            wx.showToast({
              title: '已经到尾啦～',
              icon: 'none',
              duration: 1000
            });
          } else if (weswiper.activeIndex === 0) {
            wx.showToast({
              title: '已经到头啦～',
              icon: 'none',
              duration: 1000
            });
          }
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
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function success(res) {
            var tempFilePaths = res.tempFilePaths;
            console.log(tempFilePaths, 'tempFilePaths');
            wx.setStorageSync('imageurl', tempFilePaths[0]);

            if (e === 'ticket' || e === 'wyw') {
              wx.navigateTo({
                url: 'crop1'
              });
            } else {
              wx.navigateTo({
                url: 'preview?type=' + e
              });
            }
          }
        });
      },
      ticket: function ticket() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MySwiper, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return MySwiper;
}(_wepy2.default.page);

exports.default = MySwiper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJNeVN3aXBlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlU3dpcGVyIiwiZGF0YSIsImluZGV4Iiwic3dpcGVyIiwic2xpZGVMZW5ndGgiLCJpbml0aWFsU2xpZGUiLCJvbkluaXQiLCJ3ZXN3aXBlciIsImNvbnNvbGUiLCJsb2ciLCJvblRvdWNoU3RhcnQiLCJldmVudCIsIm9uVG91Y2hNb3ZlIiwib25Ub3VjaEVuZCIsIm9uU2xpZGVDaGFuZ2VTdGFydCIsIm9uU2xpZGVDaGFuZ2VFbmQiLCJ3eCIsInNldFN0b3JhZ2VTeW5jIiwiYWN0aXZlSW5kZXgiLCJvblRyYW5zaXRpb25TdGFydCIsIm9uVHJhbnNpdGlvbkVuZCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwib25TbGlkZU1vdmUiLCJvblNsaWRlTmV4dFN0YXJ0Iiwib25TbGlkZU5leHRFbmQiLCJvblNsaWRlUHJldlN0YXJ0Iiwib25TbGlkZVByZXZFbmQiLCJtZXRob2RzIiwiZ29OZXh0IiwiZ2V0U3RvcmFnZVN5bmMiLCIkaW52b2tlIiwiZ29QcmV2IiwidXBsb2FkIiwiZSIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVQYXRocyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0aWNrZXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUVwQkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHNCQUFxQixRQUF4QyxFQUFaLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1JDO0FBRFEsSyxRQUlWQyxJLEdBQU87QUFDTEMsYUFBTyxDQURGO0FBRUxDLGNBQVE7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U0FBSCxDQUFhO0FBQ1hDLG1CQUFPLFFBREk7QUFFWEMsa0JBQU0sTUFGSztBQUdYQyxzQkFBVTtBQUhDLFdBQWI7QUFLRDtBQUNGLE9BekJPO0FBMEJSVyxZQTFCUSxrQkEwQkRDLENBMUJDLEVBMEJFO0FBQ1JwQixXQUFHcUIsV0FBSCxDQUFlO0FBQ2JDLGlCQUFPLENBRE0sRUFDSDtBQUNWQyxvQkFBVSxDQUFDLFVBQUQsQ0FGRyxFQUVXO0FBQ3hCQyxzQkFBWSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBSEMsRUFHb0I7QUFDakNDLG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEIsZ0JBQUlDLGdCQUFnQkQsSUFBSUMsYUFBeEI7QUFDQW5DLG9CQUFRQyxHQUFSLENBQVlrQyxhQUFaLEVBQTBCLGVBQTFCO0FBQ0EzQixlQUFHQyxjQUFILENBQWtCLFVBQWxCLEVBQTZCMEIsY0FBYyxDQUFkLENBQTdCOztBQUVBLGdCQUFHUCxNQUFNLFFBQU4sSUFBa0JBLE1BQU0sS0FBM0IsRUFBa0M7QUFDaENwQixpQkFBRzRCLFVBQUgsQ0FBYztBQUNaQztBQURZLGVBQWQ7QUFHRCxhQUpELE1BSU87QUFDTDdCLGlCQUFHNEIsVUFBSCxDQUFjO0FBQ1pDLHVDQUFxQlQ7QUFEVCxlQUFkO0FBR0Q7QUFFRjtBQW5CWSxTQUFmO0FBcUJELE9BaERPO0FBaURSVSxZQWpEUSxvQkFpREMsQ0FFUjtBQW5ETyxLOzs7Ozs2QkFzREQsQ0FDUjs7OztFQTVMbUMsZUFBS0MsSTs7a0JBQXRCcEQsUSIsImZpbGUiOiJzd2lwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCB3ZVN3aXBlciBmcm9tICd3ZXB5LWNvbS1zd2lwZXInO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE15U3dpcGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcblxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ3ZVN3aXBlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6b3B0aW9uLm9uY2VcIjpcInN3aXBlclwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICB3ZVN3aXBlcjogd2VTd2lwZXJcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBzd2lwZXI6IHtcbiAgICAgICAgLy8gZGlyZWN0aW9uOiAndmVydGljYWwnLFxuICAgICAgICAvLyB3aWR0aDogMTgwLFxuICAgICAgICBzbGlkZUxlbmd0aDogNixcbiAgICAgICAgaW5pdGlhbFNsaWRlOiAxLFxuICAgICAgICAvKipcbiAgICAgICAgICogc3dpcGVy5Yid5aeL5YyW5ZCO5omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICovXG4gICAgICAgIG9uSW5pdCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh3ZXN3aXBlcik7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnorDop6ZzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaFN0YXJ0ICh3ZXN3aXBlciwgZXZlbnQpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICog5omL5oyH56Kw6Kemc2xpZGXlubbkuJTmu5Hliqjml7bmiafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIG9uVG91Y2hNb3ZlICh3ZXN3aXBlciwgZXZlbnQpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICog5omL5oyH56a75byAc2xpZGXml7bmiafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIG9uVG91Y2hFbmQgKHdlc3dpcGVyLCBldmVudCkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCd3ZXN3aXBlci5hY3RpdmVJbmRleCcpO1xuICAgICAgICAgIC8vIGlmKHdlc3dpcGVyLmFjdGl2ZUluZGV4ID09PSA1KXtcbiAgICAgICAgICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICAgIHRpdGxlOiAn5bey57uP5Yiw5bC+5ZWm772eJyxcbiAgICAgICAgICAvLyAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIC8vICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAvLyB9IGVsc2UgaWYod2Vzd2lwZXIuYWN0aXZlSW5kZXggPT09IDApIHtcbiAgICAgICAgICAvLyAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgLy8gICAgIHRpdGxlOiAn5bey57uP5Yiw5aS05ZWm772eJyxcbiAgICAgICAgICAvLyAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIC8vICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIC8vICAgfSlcbiAgICAgICAgICAvLyB9XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7bml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVDaGFuZ2VTdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHN3aXBlcuS7juS4gOS4qnNsaWRl6L+H5rih5Yiw5Y+m5LiA5Liqc2xpZGXnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVDaGFuZ2VFbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2luZGV4Jywgd2Vzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOi/h+a4oeaXtuinpuWPkVxuICAgICAgICAgKi9cbiAgICAgICAgb25UcmFuc2l0aW9uU3RhcnQgKHdlc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICDov4fmuKHnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uVHJhbnNpdGlvbkVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgICBpZih3ZXN3aXBlci5hY3RpdmVJbmRleCA9PT0gNSl7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WIsOWwvuWVpu+9nicsXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIGlmKHdlc3dpcGVyLmFjdGl2ZUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WIsOWktOWVpu+9nicsXG4gICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOaJi+aMh+inpueisHN3aXBlcuW5tuS4lOaLluWKqHNsaWRl5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTW92ZSAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlj7PjgIHkuIvvvInliIfmjaLml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVOZXh0U3RhcnQgKHdlc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5Y+z44CB5LiL77yJ5YiH5o2i57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTmV4dEVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnbmV4dCcpO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5bem44CB5LiK77yJ5YiH5o2i5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlUHJldlN0YXJ0IChzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlt6bjgIHkuIrvvInliIfmjaLnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVQcmV2RW5kICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCdwcmV2Jyk7XG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2luZGV4Jywgd2Vzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvTmV4dCh3ZXN3aXBlcikge1xuICAgICAgICBsZXQgaW5kZXggPSB3eC5nZXRTdG9yYWdlU3luYygnaW5kZXgnKTtcbiAgICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgICBpZihpbmRleCA8IDUpe1xuICAgICAgICAgIHRoaXMuJGludm9rZSgnd2VTd2lwZXInLCAnc2xpZGVOZXh0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5bey57uP5Yiw5bC+5ZWm772eJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdvUHJldih3ZXN3aXBlcikge1xuICAgICAgICBsZXQgaW5kZXggPSB3eC5nZXRTdG9yYWdlU3luYygnaW5kZXgnKTtcbiAgICAgICAgaWYoaW5kZXggPiAwKXtcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ3dlU3dpcGVyJywgJ3NsaWRlUHJldicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WIsOWktOWVpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1cGxvYWQoZSkge1xuICAgICAgICB3eC5jaG9vc2VJbWFnZSh7XG4gICAgICAgICAgY291bnQ6IDEsIC8vIOm7mOiupDlcbiAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCddLCAvLyDlj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAvLyDlj6/ku6XmjIflrprmnaXmupDmmK/nm7jlhozov5jmmK/nm7jmnLrvvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB2YXIgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGVtcEZpbGVQYXRocywndGVtcEZpbGVQYXRocycpO1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyx0ZW1wRmlsZVBhdGhzWzBdKTtcblxuICAgICAgICAgICAgaWYoZSA9PT0gJ3RpY2tldCcgfHwgZSA9PT0gJ3d5dycpIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgY3JvcDFgXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiBgcHJldmlldz90eXBlPSR7ZX1gXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRpY2tldCgpIHtcbiAgICAgICAgXG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uTG9hZCgpIHtcbiAgICB9XG4gIH1cbiJdfQ==