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
        onTouchEnd: function onTouchEnd(weswiper, event) {},

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
        onTransitionEnd: function onTransitionEnd(weswiper) {},

        /**
         *  手指触碰swiper并且拖动slide时执行
         */
        onSlideMove: function onSlideMove(weswiper) {},

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
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function success(res) {
            var tempFilePaths = res.tempFilePaths;
            console.log(tempFilePaths, 'tempFilePaths');
            wx.setStorageSync('imageurl', tempFilePaths[0]);
            // wx.navigateTo({
            //   url: `preview?type=${e}`
            // })
            wx.navigateTo({
              url: 'crop'
            });
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MySwiper, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return MySwiper;
}(_wepy2.default.page);

exports.default = MySwiper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJNeVN3aXBlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlU3dpcGVyIiwiZGF0YSIsImluZGV4Iiwic3dpcGVyIiwic2xpZGVMZW5ndGgiLCJpbml0aWFsU2xpZGUiLCJvbkluaXQiLCJ3ZXN3aXBlciIsImNvbnNvbGUiLCJsb2ciLCJvblRvdWNoU3RhcnQiLCJldmVudCIsIm9uVG91Y2hNb3ZlIiwib25Ub3VjaEVuZCIsIm9uU2xpZGVDaGFuZ2VTdGFydCIsIm9uU2xpZGVDaGFuZ2VFbmQiLCJ3eCIsInNldFN0b3JhZ2VTeW5jIiwiYWN0aXZlSW5kZXgiLCJvblRyYW5zaXRpb25TdGFydCIsIm9uVHJhbnNpdGlvbkVuZCIsIm9uU2xpZGVNb3ZlIiwib25TbGlkZU5leHRTdGFydCIsIm9uU2xpZGVOZXh0RW5kIiwib25TbGlkZVByZXZTdGFydCIsIm9uU2xpZGVQcmV2RW5kIiwibWV0aG9kcyIsImdvTmV4dCIsImdldFN0b3JhZ2VTeW5jIiwiJGludm9rZSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwiZ29QcmV2IiwidXBsb2FkIiwiZSIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVQYXRocyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUVwQkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHNCQUFxQixRQUF4QyxFQUFaLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1JDO0FBRFEsSyxRQUlWQyxJLEdBQU87QUFDTEMsYUFBTyxDQURGO0FBRUxDLGNBQVE7QUFDTjtBQUNB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QTFCO0FBQ0EzQixlQUFHQyxjQUFILENBQWtCLFVBQWxCLEVBQTZCMEIsY0FBYyxDQUFkLENBQTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EzQixlQUFHNEIsVUFBSCxDQUFjO0FBQ1pDO0FBRFksYUFBZDtBQUdEO0FBZFksU0FBZjtBQWdCRDtBQTNDTyxLOzs7Ozs2QkE4Q0QsQ0FDUjs7OztFQTFKbUMsZUFBS0MsSTs7a0JBQXRCbkQsUSIsImZpbGUiOiJzd2lwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCB3ZVN3aXBlciBmcm9tICd3ZXB5LWNvbS1zd2lwZXInO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE15U3dpcGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcblxuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJ3ZVN3aXBlclwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6b3B0aW9uLm9uY2VcIjpcInN3aXBlclwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICB3ZVN3aXBlcjogd2VTd2lwZXJcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgaW5kZXg6IDAsXG4gICAgICBzd2lwZXI6IHtcbiAgICAgICAgLy8gZGlyZWN0aW9uOiAndmVydGljYWwnLFxuICAgICAgICAvLyB3aWR0aDogMTgwLFxuICAgICAgICBzbGlkZUxlbmd0aDogNixcbiAgICAgICAgaW5pdGlhbFNsaWRlOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogc3dpcGVy5Yid5aeL5YyW5ZCO5omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICovXG4gICAgICAgIG9uSW5pdCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh3ZXN3aXBlcik7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnorDop6ZzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaFN0YXJ0ICh3ZXN3aXBlciwgZXZlbnQpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICog5omL5oyH56Kw6Kemc2xpZGXlubbkuJTmu5Hliqjml7bmiafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIG9uVG91Y2hNb3ZlICh3ZXN3aXBlciwgZXZlbnQpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICog5omL5oyH56a75byAc2xpZGXml7bmiafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIG9uVG91Y2hFbmQgKHdlc3dpcGVyLCBldmVudCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7bml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVDaGFuZ2VTdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHN3aXBlcuS7juS4gOS4qnNsaWRl6L+H5rih5Yiw5Y+m5LiA5Liqc2xpZGXnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVDaGFuZ2VFbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2luZGV4Jywgd2Vzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOi/h+a4oeaXtuinpuWPkVxuICAgICAgICAgKi9cbiAgICAgICAgb25UcmFuc2l0aW9uU3RhcnQgKHdlc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICDov4fmuKHnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uVHJhbnNpdGlvbkVuZCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOaJi+aMh+inpueisHN3aXBlcuW5tuS4lOaLluWKqHNsaWRl5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTW92ZSAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOWPs+OAgeS4i++8ieWIh+aNouaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZU5leHRTdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlj7PjgIHkuIvvvInliIfmjaLnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVOZXh0RW5kICh3ZXN3aXBlcikge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHdlc3dpcGVyLmFjdGl2ZUluZGV4LCduZXh0Jyk7XG4gICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2luZGV4Jywgd2Vzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlt6bjgIHkuIrvvInliIfmjaLml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVQcmV2U3RhcnQgKHN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOW3puOAgeS4iu+8ieWIh+aNoue7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZVByZXZFbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3ByZXYnKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29OZXh0KHdlc3dpcGVyKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbmRleCcpO1xuICAgICAgICBjb25zb2xlLmxvZyhpbmRleCk7XG4gICAgICAgIGlmKGluZGV4IDwgNSl7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd3ZVN3aXBlcicsICdzbGlkZU5leHQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/liLDlsL7llabvvZ4nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ29QcmV2KHdlc3dpcGVyKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbmRleCcpO1xuICAgICAgICBpZihpbmRleCA+IDApe1xuICAgICAgICAgIHRoaXMuJGludm9rZSgnd2VTd2lwZXInLCAnc2xpZGVQcmV2Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5bey57uP5Yiw5aS05ZWm772eJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVwbG9hZChlKSB7XG4gICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICBjb3VudDogMSwgLy8g6buY6K6kOVxuICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJywgJ2NvbXByZXNzZWQnXSwgLy8g5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXG4gICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSwgLy8g5Y+v5Lul5oyH5a6a5p2l5rqQ5piv55u45YaM6L+Y5piv55u45py677yM6buY6K6k5LqM6ICF6YO95pyJXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdmFyIHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRocztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlbXBGaWxlUGF0aHMsJ3RlbXBGaWxlUGF0aHMnKTtcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcsdGVtcEZpbGVQYXRoc1swXSk7XG4gICAgICAgICAgICAvLyB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIC8vICAgdXJsOiBgcHJldmlldz90eXBlPSR7ZX1gXG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogYGNyb3BgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfVxuICAgIFxuICAgIG9uTG9hZCgpIHtcbiAgICB9XG4gIH1cbiJdfQ==