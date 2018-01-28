'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preview = function (_wepy$component) {
  _inherits(Preview, _wepy$component);

  function Preview() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Preview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Preview.__proto__ || Object.getPrototypeOf(Preview)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      result: {
        imgurl: '',
        desc: ''
      }
    }, _this.methods = {
      upload: function upload() {
        var self = this;
        // wepy.request({
        //   url: 'http://47.93.248.225:3345/recogn/general/local',
        //   method: 'POST',
        //   data: this.imgurl,
        //   success: function (data) {
        //     console.log(data,'success');
        //   }
        // })
        wx.uploadFile({
          url: 'https://mocha-city-api.sensoro.com/prov1/boss/general',
          filePath: this.result.imgurl,
          name: 'file',
          // formData:{
          //   'user': 'test'
          // },
          success: function success(res) {
            var data = JSON.parse(res.data);
            console.log(data.data.words_result[0], 'success');
            //do something
            self.result.desc = data.data.words_result[0].words;
            self.$apply();
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Preview, [{
    key: 'onLoad',
    value: function onLoad() {
      this.result.imgurl = wx.getStorageSync('imageurl');
    }
  }]);

  return Preview;
}(_wepy2.default.component);

exports.default = Preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJyZXN1bHQiLCJpbWd1cmwiLCJkZXNjIiwibWV0aG9kcyIsInVwbG9hZCIsInNlbGYiLCJ3eCIsInVwbG9hZEZpbGUiLCJ1cmwiLCJmaWxlUGF0aCIsIm5hbWUiLCJzdWNjZXNzIiwicmVzIiwiSlNPTiIsInBhcnNlIiwiY29uc29sZSIsImxvZyIsIndvcmRzX3Jlc3VsdCIsIndvcmRzIiwiJGFwcGx5IiwiZ2V0U3RvcmFnZVN5bmMiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVE7QUFDTkMsZ0JBQVEsRUFERjtBQUVOQyxjQUFNO0FBRkE7QUFESCxLLFFBT1BDLE8sR0FBVTtBQUNSQyxZQURRLG9CQUNDO0FBQ1AsWUFBSUMsT0FBTyxJQUFYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxXQUFHQyxVQUFILENBQWM7QUFDWkMsZUFBSSx1REFEUTtBQUVaQyxvQkFBVSxLQUFLVCxNQUFMLENBQVlDLE1BRlY7QUFHWlMsZ0JBQU0sTUFITTtBQUlaO0FBQ0E7QUFDQTtBQUNBQyxtQkFBUyxpQkFBU0MsR0FBVCxFQUFhO0FBQ3BCLGdCQUFJYixPQUFPYyxLQUFLQyxLQUFMLENBQVdGLElBQUliLElBQWYsQ0FBWDtBQUNBZ0Isb0JBQVFDLEdBQVIsQ0FBWWpCLEtBQUtBLElBQUwsQ0FBVWtCLFlBQVYsQ0FBdUIsQ0FBdkIsQ0FBWixFQUFzQyxTQUF0QztBQUNBO0FBQ0FaLGlCQUFLTCxNQUFMLENBQVlFLElBQVosR0FBbUJILEtBQUtBLElBQUwsQ0FBVWtCLFlBQVYsQ0FBdUIsQ0FBdkIsRUFBMEJDLEtBQTdDO0FBQ0FiLGlCQUFLYyxNQUFMO0FBQ0Q7QUFiVyxTQUFkO0FBZUQ7QUExQk8sSzs7Ozs7NkJBNkJBO0FBQ1IsV0FBS25CLE1BQUwsQ0FBWUMsTUFBWixHQUFxQkssR0FBR2MsY0FBSCxDQUFrQixVQUFsQixDQUFyQjtBQUNEOzs7O0VBdkNrQyxlQUFLQyxTOztrQkFBckJ2QixPIiwiZmlsZSI6InByZXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJldmlldyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBkYXRhID0ge1xuICAgICAgcmVzdWx0OiB7XG4gICAgICAgIGltZ3VybDogJycsXG4gICAgICAgIGRlc2M6ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHVwbG9hZCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAvLyAgIHVybDogJ2h0dHA6Ly80Ny45My4yNDguMjI1OjMzNDUvcmVjb2duL2dlbmVyYWwvbG9jYWwnLFxuICAgICAgICAvLyAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAvLyAgIGRhdGE6IHRoaXMuaW1ndXJsLFxuICAgICAgICAvLyAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhkYXRhLCdzdWNjZXNzJyk7XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyB9KVxuICAgICAgICB3eC51cGxvYWRGaWxlKHtcbiAgICAgICAgICB1cmw6J2h0dHBzOi8vbW9jaGEtY2l0eS1hcGkuc2Vuc29yby5jb20vcHJvdjEvYm9zcy9nZW5lcmFsJyxcbiAgICAgICAgICBmaWxlUGF0aDogdGhpcy5yZXN1bHQuaW1ndXJsLFxuICAgICAgICAgIG5hbWU6ICdmaWxlJyxcbiAgICAgICAgICAvLyBmb3JtRGF0YTp7XG4gICAgICAgICAgLy8gICAndXNlcic6ICd0ZXN0J1xuICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXMuZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGEud29yZHNfcmVzdWx0WzBdLCdzdWNjZXNzJyk7XG4gICAgICAgICAgICAvL2RvIHNvbWV0aGluZ1xuICAgICAgICAgICAgc2VsZi5yZXN1bHQuZGVzYyA9IGRhdGEuZGF0YS53b3Jkc19yZXN1bHRbMF0ud29yZHM7XG4gICAgICAgICAgICBzZWxmLiRhcHBseSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgdGhpcy5yZXN1bHQuaW1ndXJsID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2ltYWdldXJsJyk7XG4gICAgfVxuICB9XG4iXX0=