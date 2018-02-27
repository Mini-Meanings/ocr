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
            wx.navigateTo({
              url: 'preview?type=' + e
            });
            // wx.navigateTo({
            //   url: `crop`
            // })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJNeVN3aXBlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlU3dpcGVyIiwiZGF0YSIsImluZGV4Iiwic3dpcGVyIiwic2xpZGVMZW5ndGgiLCJpbml0aWFsU2xpZGUiLCJvbkluaXQiLCJ3ZXN3aXBlciIsImNvbnNvbGUiLCJsb2ciLCJvblRvdWNoU3RhcnQiLCJldmVudCIsIm9uVG91Y2hNb3ZlIiwib25Ub3VjaEVuZCIsIm9uU2xpZGVDaGFuZ2VTdGFydCIsIm9uU2xpZGVDaGFuZ2VFbmQiLCJ3eCIsInNldFN0b3JhZ2VTeW5jIiwiYWN0aXZlSW5kZXgiLCJvblRyYW5zaXRpb25TdGFydCIsIm9uVHJhbnNpdGlvbkVuZCIsIm9uU2xpZGVNb3ZlIiwib25TbGlkZU5leHRTdGFydCIsIm9uU2xpZGVOZXh0RW5kIiwib25TbGlkZVByZXZTdGFydCIsIm9uU2xpZGVQcmV2RW5kIiwibWV0aG9kcyIsImdvTmV4dCIsImdldFN0b3JhZ2VTeW5jIiwiJGludm9rZSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwiZ29QcmV2IiwidXBsb2FkIiwiZSIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVQYXRocyIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUVwQkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHNCQUFxQixRQUF4QyxFQUFaLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1JDO0FBRFEsSyxRQUlWQyxJLEdBQU87QUFDTEMsYUFBTyxDQURGO0FBRUxDLGNBQVE7QUFDTjtBQUNB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QTFCO0FBQ0EzQixlQUFHQyxjQUFILENBQWtCLFVBQWxCLEVBQTZCMEIsY0FBYyxDQUFkLENBQTdCO0FBQ0EzQixlQUFHNEIsVUFBSCxDQUFjO0FBQ1pDLHFDQUFxQlQ7QUFEVCxhQUFkO0FBR0E7QUFDQTtBQUNBO0FBQ0Q7QUFkWSxTQUFmO0FBZ0JEO0FBM0NPLEs7Ozs7OzZCQThDRCxDQUNSOzs7O0VBMUptQyxlQUFLVSxJOztrQkFBdEJuRCxRIiwiZmlsZSI6InN3aXBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHdlU3dpcGVyIGZyb20gJ3dlcHktY29tLXN3aXBlcic7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlTd2lwZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIndlU3dpcGVyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpvcHRpb24ub25jZVwiOlwic3dpcGVyXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHdlU3dpcGVyOiB3ZVN3aXBlclxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBpbmRleDogMCxcbiAgICAgIHN3aXBlcjoge1xuICAgICAgICAvLyBkaXJlY3Rpb246ICd2ZXJ0aWNhbCcsXG4gICAgICAgIC8vIHdpZHRoOiAxODAsXG4gICAgICAgIHNsaWRlTGVuZ3RoOiA2LFxuICAgICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzd2lwZXLliJ3lp4vljJblkI7miafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKi9cbiAgICAgICAgb25Jbml0ICh3ZXN3aXBlcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHdlc3dpcGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaJi+aMh+eisOinpnNsaWRl5pe25omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICogQHBhcmFtIGV2ZW50XG4gICAgICAgICAqL1xuICAgICAgICBvblRvdWNoU3RhcnQgKHdlc3dpcGVyLCBldmVudCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnorDop6ZzbGlkZeW5tuS4lOa7keWKqOaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaE1vdmUgKHdlc3dpcGVyLCBldmVudCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnprvlvIBzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaEVuZCAod2Vzd2lwZXIsIGV2ZW50KSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tuaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZUNoYW5nZVN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc3dpcGVy5LuO5LiA5Liqc2xpZGXov4fmuKHliLDlj6bkuIDkuKpzbGlkZee7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZUNoYW5nZUVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwnd2Vzd2lwZXIuYWN0aXZlSW5kZXgnKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAg6L+H5rih5pe26Kem5Y+RXG4gICAgICAgICAqL1xuICAgICAgICBvblRyYW5zaXRpb25TdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOi/h+a4oee7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25UcmFuc2l0aW9uRW5kICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAg5omL5oyH6Kem56Kwc3dpcGVy5bm25LiU5ouW5Yqoc2xpZGXml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVNb3ZlICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5Y+z44CB5LiL77yJ5YiH5o2i5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTmV4dFN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOWPs+OAgeS4i++8ieWIh+aNoue7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZU5leHRFbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ25leHQnKTtcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnaW5kZXgnLCB3ZXN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOW3puOAgeS4iu+8ieWIh+aNouaXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZVByZXZTdGFydCAoc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5bem44CB5LiK77yJ5YiH5o2i57uT5p2f5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlUHJldkVuZCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh3ZXN3aXBlci5hY3RpdmVJbmRleCwncHJldicpO1xuICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKCdpbmRleCcsIHdlc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnb05leHQod2Vzd2lwZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2luZGV4Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGluZGV4KTtcbiAgICAgICAgaWYoaW5kZXggPCA1KXtcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ3dlU3dpcGVyJywgJ3NsaWRlTmV4dCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+W3sue7j+WIsOWwvuWVpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnb1ByZXYod2Vzd2lwZXIpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2luZGV4Jyk7XG4gICAgICAgIGlmKGluZGV4ID4gMCl7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCd3ZVN3aXBlcicsICdzbGlkZVByZXYnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflt7Lnu4/liLDlpLTllabvvZ4nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdXBsb2FkKGUpIHtcbiAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgICAgIGNvdW50OiAxLCAvLyDpu5jorqQ5XG4gICAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAvLyDlj6/ku6XmjIflrprmmK/ljp/lm77ov5jmmK/ljovnvKnlm77vvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAvLyDlj6/ku6XmjIflrprmnaXmupDmmK/nm7jlhozov5jmmK/nm7jmnLrvvIzpu5jorqTkuozogIXpg73mnIlcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB2YXIgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGVtcEZpbGVQYXRocywndGVtcEZpbGVQYXRocycpO1xuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyx0ZW1wRmlsZVBhdGhzWzBdKTtcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICB1cmw6IGBwcmV2aWV3P3R5cGU9JHtlfWBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIC8vICAgdXJsOiBgY3JvcGBcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICB9XG4gICAgXG4gICAgb25Mb2FkKCkge1xuICAgIH1cbiAgfVxuIl19