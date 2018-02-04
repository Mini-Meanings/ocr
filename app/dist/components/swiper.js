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
      swiper: {
        // direction: 'vertical',
        // width: 180,
        slideLength: 3,
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
          console.log(weswiper.activeIndex, 'weswiper.activeIndex');
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
        onSlideNextEnd: function onSlideNextEnd(weswiper) {},

        /**
         *  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
         */
        onSlidePrevStart: function onSlidePrevStart(swiper) {},

        /**
         *  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
         */
        onSlidePrevEnd: function onSlidePrevEnd(weswiper) {}
      }
    }, _this.methods = {
      goNext: function goNext(weswiper) {
        this.$invoke('weSwiper', 'slideNext');
      },
      goPrev: function goPrev(weswiper) {
        this.$invoke('weSwiper', 'slidePrev');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MySwiper, [{
    key: 'onLoad',
    value: function onLoad() {
      // setTimeout(() =>this.$invoke('weSwiper', 'slideTo', 2), 3000)
    }
  }]);

  return MySwiper;
}(_wepy2.default.page);

exports.default = MySwiper;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN3aXBlci5qcyJdLCJuYW1lcyI6WyJNeVN3aXBlciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIndlU3dpcGVyIiwiZGF0YSIsInN3aXBlciIsInNsaWRlTGVuZ3RoIiwiaW5pdGlhbFNsaWRlIiwib25Jbml0Iiwid2Vzd2lwZXIiLCJjb25zb2xlIiwibG9nIiwib25Ub3VjaFN0YXJ0IiwiZXZlbnQiLCJvblRvdWNoTW92ZSIsIm9uVG91Y2hFbmQiLCJvblNsaWRlQ2hhbmdlU3RhcnQiLCJvblNsaWRlQ2hhbmdlRW5kIiwiYWN0aXZlSW5kZXgiLCJvblRyYW5zaXRpb25TdGFydCIsIm9uVHJhbnNpdGlvbkVuZCIsIm9uU2xpZGVNb3ZlIiwib25TbGlkZU5leHRTdGFydCIsIm9uU2xpZGVOZXh0RW5kIiwib25TbGlkZVByZXZTdGFydCIsIm9uU2xpZGVQcmV2RW5kIiwibWV0aG9kcyIsImdvTmV4dCIsIiRpbnZva2UiLCJnb1ByZXYiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUVwQkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHNCQUFxQixRQUF4QyxFQUFaLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1JDO0FBRFEsSyxRQUlWQyxJLEdBQU87QUFDTEMsY0FBUTtBQUNOO0FBQ0E7QUFDQUMscUJBQWEsQ0FIUDtBQUlOQyxzQkFBYyxDQUpSO0FBS047Ozs7QUFJQUMsY0FUTSxrQkFTRUMsUUFURixFQVNZO0FBQ2hCQyxrQkFBUUMsR0FBUixDQUFZRixRQUFaO0FBQ0QsU0FYSzs7QUFZTjs7Ozs7QUFLQUcsb0JBakJNLHdCQWlCUUgsUUFqQlIsRUFpQmtCSSxLQWpCbEIsRUFpQnlCLENBRTlCLENBbkJLOztBQW9CTjs7Ozs7QUFLQUMsbUJBekJNLHVCQXlCT0wsUUF6QlAsRUF5QmlCSSxLQXpCakIsRUF5QndCLENBRTdCLENBM0JLOztBQTRCTjs7Ozs7QUFLQUUsa0JBakNNLHNCQWlDTU4sUUFqQ04sRUFpQ2dCSSxLQWpDaEIsRUFpQ3VCLENBRTVCLENBbkNLOztBQW9DTjs7O0FBR0FHLDBCQXZDTSw4QkF1Q2NQLFFBdkNkLEVBdUN3QixDQUU3QixDQXpDSzs7QUEwQ047OztBQUdBUSx3QkE3Q00sNEJBNkNZUixRQTdDWixFQTZDc0I7QUFDMUJDLGtCQUFRQyxHQUFSLENBQVlGLFNBQVNTLFdBQXJCLEVBQWlDLHNCQUFqQztBQUNELFNBL0NLOztBQWdETjs7O0FBR0FDLHlCQW5ETSw2QkFtRGFWLFFBbkRiLEVBbUR1QixDQUU1QixDQXJESzs7QUFzRE47OztBQUdBVyx1QkF6RE0sMkJBeURXWCxRQXpEWCxFQXlEcUIsQ0FFMUIsQ0EzREs7O0FBNEROOzs7QUFHQVksbUJBL0RNLHVCQStET1osUUEvRFAsRUErRGlCLENBRXRCLENBakVLOztBQWtFTjs7O0FBR0FhLHdCQXJFTSw0QkFxRVliLFFBckVaLEVBcUVzQixDQUUzQixDQXZFSzs7QUF3RU47OztBQUdBYyxzQkEzRU0sMEJBMkVVZCxRQTNFVixFQTJFb0IsQ0FFekIsQ0E3RUs7O0FBOEVOOzs7QUFHQWUsd0JBakZNLDRCQWlGWW5CLE1BakZaLEVBaUZvQixDQUV6QixDQW5GSzs7QUFvRk47OztBQUdBb0Isc0JBdkZNLDBCQXVGVWhCLFFBdkZWLEVBdUZvQixDQUV6QjtBQXpGSztBQURILEssUUE4RlBpQixPLEdBQVU7QUFDUkMsWUFEUSxrQkFDRGxCLFFBREMsRUFDUztBQUNmLGFBQUttQixPQUFMLENBQWEsVUFBYixFQUF5QixXQUF6QjtBQUNELE9BSE87QUFJUkMsWUFKUSxrQkFJRHBCLFFBSkMsRUFJUztBQUNmLGFBQUttQixPQUFMLENBQWEsVUFBYixFQUF5QixXQUF6QjtBQUNEO0FBTk8sSzs7Ozs7NkJBU0Q7QUFDUDtBQUNEOzs7O0VBbEhtQyxlQUFLRSxJOztrQkFBdEJoQyxRIiwiZmlsZSI6InN3aXBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHdlU3dpcGVyIGZyb20gJ3dlcHktY29tLXN3aXBlcic7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlTd2lwZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIndlU3dpcGVyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpvcHRpb24ub25jZVwiOlwic3dpcGVyXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHdlU3dpcGVyOiB3ZVN3aXBlclxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBzd2lwZXI6IHtcbiAgICAgICAgLy8gZGlyZWN0aW9uOiAndmVydGljYWwnLFxuICAgICAgICAvLyB3aWR0aDogMTgwLFxuICAgICAgICBzbGlkZUxlbmd0aDogMyxcbiAgICAgICAgaW5pdGlhbFNsaWRlOiAwLFxuICAgICAgICAvKipcbiAgICAgICAgICogc3dpcGVy5Yid5aeL5YyW5ZCO5omn6KGMXG4gICAgICAgICAqIEBwYXJhbSBzd2lwZXJcbiAgICAgICAgICovXG4gICAgICAgIG9uSW5pdCAod2Vzd2lwZXIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh3ZXN3aXBlcik7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmiYvmjIfnorDop6ZzbGlkZeaXtuaJp+ihjFxuICAgICAgICAgKiBAcGFyYW0gc3dpcGVyXG4gICAgICAgICAqIEBwYXJhbSBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgb25Ub3VjaFN0YXJ0ICh3ZXN3aXBlciwgZXZlbnQpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICog5omL5oyH56Kw6Kemc2xpZGXlubbkuJTmu5Hliqjml7bmiafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIG9uVG91Y2hNb3ZlICh3ZXN3aXBlciwgZXZlbnQpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICog5omL5oyH56a75byAc2xpZGXml7bmiafooYxcbiAgICAgICAgICogQHBhcmFtIHN3aXBlclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgICAgICovXG4gICAgICAgIG9uVG91Y2hFbmQgKHdlc3dpcGVyLCBldmVudCkge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7bml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVDaGFuZ2VTdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHN3aXBlcuS7juS4gOS4qnNsaWRl6L+H5rih5Yiw5Y+m5LiA5Liqc2xpZGXnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVDaGFuZ2VFbmQgKHdlc3dpcGVyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cod2Vzd2lwZXIuYWN0aXZlSW5kZXgsJ3dlc3dpcGVyLmFjdGl2ZUluZGV4Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAg6L+H5rih5pe26Kem5Y+RXG4gICAgICAgICAqL1xuICAgICAgICBvblRyYW5zaXRpb25TdGFydCAod2Vzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIOi/h+a4oee7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25UcmFuc2l0aW9uRW5kICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAg5omL5oyH6Kem56Kwc3dpcGVy5bm25LiU5ouW5Yqoc2xpZGXml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVNb3ZlICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5Y+z44CB5LiL77yJ5YiH5o2i5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlTmV4dFN0YXJ0ICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAgc2xpZGXovr7liLDov4fmuKHmnaHku7Yg5LiU6KeE5a6a5LqG5pa55ZCRIOWQkeWJje+8iOWPs+OAgeS4i++8ieWIh+aNoue7k+adn+aXtuaJp+ihjFxuICAgICAgICAgKi9cbiAgICAgICAgb25TbGlkZU5leHRFbmQgKHdlc3dpcGVyKSB7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqICBzbGlkZei+vuWIsOi/h+a4oeadoeS7tiDkuJTop4TlrprkuobmlrnlkJEg5ZCR5YmN77yI5bem44CB5LiK77yJ5YiH5o2i5pe25omn6KGMXG4gICAgICAgICAqL1xuICAgICAgICBvblNsaWRlUHJldlN0YXJ0IChzd2lwZXIpIHtcblxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogIHNsaWRl6L6+5Yiw6L+H5rih5p2h5Lu2IOS4lOinhOWumuS6huaWueWQkSDlkJHliY3vvIjlt6bjgIHkuIrvvInliIfmjaLnu5PmnZ/ml7bmiafooYxcbiAgICAgICAgICovXG4gICAgICAgIG9uU2xpZGVQcmV2RW5kICh3ZXN3aXBlcikge1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29OZXh0KHdlc3dpcGVyKSB7XG4gICAgICAgIHRoaXMuJGludm9rZSgnd2VTd2lwZXInLCAnc2xpZGVOZXh0Jyk7XG4gICAgICB9LFxuICAgICAgZ29QcmV2KHdlc3dpcGVyKSB7XG4gICAgICAgIHRoaXMuJGludm9rZSgnd2VTd2lwZXInLCAnc2xpZGVQcmV2Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uTG9hZCgpIHtcbiAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT50aGlzLiRpbnZva2UoJ3dlU3dpcGVyJywgJ3NsaWRlVG8nLCAyKSwgMzAwMClcbiAgICB9XG4gIH1cbiJdfQ==