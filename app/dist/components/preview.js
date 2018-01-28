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
      imgurl: '',
      result: ''
    }, _this.methods = {
      upload: function upload() {
        // wepy.request({
        //   url: 'http://47.93.248.225:3345/recogn/general/local',
        //   method: 'POST',
        //   data: this.imgurl,
        //   success: function (data) {
        //     console.log(data,'success');
        //   }
        // })
        wx.uploadFile({
          url: 'http://47.93.248.225:3345/recogn/general/local',
          filePath: this.imgurl,
          name: 'file',
          // formData:{
          //   'user': 'test'
          // },
          success: function success(res) {
            var data = res.data;
            console.log(data, 'success');
            //do something
          }
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Preview, [{
    key: 'getDataUri',
    value: function getDataUri(url) {
      return new Promise(function (resolve, reject) {
        /* eslint-disable */
        var image = new Image();
        image.onload = function () {
          var canvas = document.createElement('canvas');
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;
          canvas.getContext('2d').drawImage(this, 0, 0);
          // Data URI
          resolve(canvas.toDataURL('image/png'));
        };
        image.src = url;
        // console.log(image.src);
        image.onerror = function () {
          reject(new Error('图片流异常'));
        };
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.imgurl = wx.getStorageSync('imageurl');
    }
  }]);

  return Preview;
}(_wepy2.default.component);

exports.default = Preview;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpZXcuanMiXSwibmFtZXMiOlsiUHJldmlldyIsImRhdGEiLCJpbWd1cmwiLCJyZXN1bHQiLCJtZXRob2RzIiwidXBsb2FkIiwid3giLCJ1cGxvYWRGaWxlIiwidXJsIiwiZmlsZVBhdGgiLCJuYW1lIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ3aWR0aCIsIm5hdHVyYWxXaWR0aCIsImhlaWdodCIsIm5hdHVyYWxIZWlnaHQiLCJnZXRDb250ZXh0IiwiZHJhd0ltYWdlIiwidG9EYXRhVVJMIiwic3JjIiwib25lcnJvciIsIkVycm9yIiwiZ2V0U3RvcmFnZVN5bmMiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSSxHQUFPO0FBQ0xDLGNBQVEsRUFESDtBQUVMQyxjQUFRO0FBRkgsSyxRQUtQQyxPLEdBQVU7QUFDUkMsWUFEUSxvQkFDQztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUssZ0RBRE87QUFFWkMsb0JBQVUsS0FBS1AsTUFGSDtBQUdaUSxnQkFBTSxNQUhNO0FBSVo7QUFDQTtBQUNBO0FBQ0FDLG1CQUFTLGlCQUFTQyxHQUFULEVBQWE7QUFDcEIsZ0JBQUlYLE9BQU9XLElBQUlYLElBQWY7QUFDQVksb0JBQVFDLEdBQVIsQ0FBWWIsSUFBWixFQUFpQixTQUFqQjtBQUNBO0FBQ0Q7QUFYVyxTQUFkO0FBYUQ7QUF2Qk8sSzs7Ozs7K0JBMEJDTyxHLEVBQUs7QUFDZCxhQUFPLElBQUlPLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEM7QUFDQSxZQUFJQyxRQUFRLElBQUlDLEtBQUosRUFBWjtBQUNBRCxjQUFNRSxNQUFOLEdBQWUsWUFBVztBQUN4QixjQUFJQyxTQUFTQyxTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQWI7QUFDQUYsaUJBQU9HLEtBQVAsR0FBZSxLQUFLQyxZQUFwQjtBQUNBSixpQkFBT0ssTUFBUCxHQUFnQixLQUFLQyxhQUFyQjtBQUNBTixpQkFBT08sVUFBUCxDQUFrQixJQUFsQixFQUF3QkMsU0FBeEIsQ0FBa0MsSUFBbEMsRUFBd0MsQ0FBeEMsRUFBMkMsQ0FBM0M7QUFDQTtBQUNBYixrQkFBUUssT0FBT1MsU0FBUCxDQUFpQixXQUFqQixDQUFSO0FBQ0QsU0FQRDtBQVFBWixjQUFNYSxHQUFOLEdBQVl2QixHQUFaO0FBQ0E7QUFDQVUsY0FBTWMsT0FBTixHQUFnQixZQUFNO0FBQ3BCZixpQkFBTyxJQUFJZ0IsS0FBSixDQUFVLE9BQVYsQ0FBUDtBQUNELFNBRkQ7QUFHRCxPQWhCTSxDQUFQO0FBaUJEOzs7NkJBRVM7QUFDUixXQUFLL0IsTUFBTCxHQUFjSSxHQUFHNEIsY0FBSCxDQUFrQixVQUFsQixDQUFkO0FBQ0Q7Ozs7RUF0RGtDLGVBQUtDLFM7O2tCQUFyQm5DLE8iLCJmaWxlIjoicHJldmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQcmV2aWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICAgIGRhdGEgPSB7XG4gICAgICBpbWd1cmw6ICcnLFxuICAgICAgcmVzdWx0OiAnJ1xuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB1cGxvYWQoKSB7XG4gICAgICAgIC8vIHdlcHkucmVxdWVzdCh7XG4gICAgICAgIC8vICAgdXJsOiAnaHR0cDovLzQ3LjkzLjI0OC4yMjU6MzM0NS9yZWNvZ24vZ2VuZXJhbC9sb2NhbCcsXG4gICAgICAgIC8vICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIC8vICAgZGF0YTogdGhpcy5pbWd1cmwsXG4gICAgICAgIC8vICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGRhdGEsJ3N1Y2Nlc3MnKTtcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vIH0pXG4gICAgICAgIHd4LnVwbG9hZEZpbGUoe1xuICAgICAgICAgIHVybDogJ2h0dHA6Ly80Ny45My4yNDguMjI1OjMzNDUvcmVjb2duL2dlbmVyYWwvbG9jYWwnLFxuICAgICAgICAgIGZpbGVQYXRoOiB0aGlzLmltZ3VybCxcbiAgICAgICAgICBuYW1lOiAnZmlsZScsXG4gICAgICAgICAgLy8gZm9ybURhdGE6e1xuICAgICAgICAgIC8vICAgJ3VzZXInOiAndGVzdCdcbiAgICAgICAgICAvLyB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSwnc3VjY2VzcycpO1xuICAgICAgICAgICAgLy9kbyBzb21ldGhpbmdcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RGF0YVVyaSh1cmwpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlICovXG4gICAgICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5uYXR1cmFsV2lkdGg7XG4gICAgICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMubmF0dXJhbEhlaWdodDtcbiAgICAgICAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodGhpcywgMCwgMCk7XG4gICAgICAgICAgLy8gRGF0YSBVUklcbiAgICAgICAgICByZXNvbHZlKGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW1hZ2Uuc3JjID0gdXJsO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbWFnZS5zcmMpO1xuICAgICAgICBpbWFnZS5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ+WbvueJh+a1geW8guW4uCcpKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICB0aGlzLmltZ3VybCA9IHd4LmdldFN0b3JhZ2VTeW5jKCdpbWFnZXVybCcpO1xuICAgIH1cbiAgfVxuIl19