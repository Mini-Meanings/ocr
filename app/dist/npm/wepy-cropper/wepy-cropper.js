'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var device = wx.getSystemInfoSync();
var W = device.windowWidth;
var H = device.windowHeight - 50;
// 获取选中区域的(x, y, w, h)
var getCropRect = function getCropRect(cropperMovableItems) {
  var maxX = 0,
      maxY = 0;
  for (var key in cropperMovableItems) {
    var item = cropperMovableItems[key];
    maxX = item.x > maxX ? item.x : maxX;
    maxY = item.y > maxY ? item.y : maxY;
  }

  var minX = maxX,
      minY = maxY;
  for (var _key in cropperMovableItems) {
    var _item = cropperMovableItems[_key];
    minX = _item.x < minX ? _item.x : minX;
    minY = _item.y < minY ? _item.y : minY;
  }

  return {
    x: minX,
    y: minY,
    w: maxX - minX,
    h: maxY - minY
  };
};
// http://www.geeksforgeeks.org/convex-hull-set-1-jarviss-algorithm-or-wrapping/

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(p, q, r) {
  var val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (val == 0) return 0; // collinear
  return val > 0 ? 1 : 2; // clock or counterclock wise
}

function convexHull(points, n) {
  // There must be at least 3 points
  if (n < 3) return;

  // Initialize Result
  var hull = [];

  // Find the leftmost point
  var l = 0;
  for (var i = 1; i < n; i++) {
    if (points[i].x < points[l].x) {
      l = i;
    }
  }
  // Start from leftmost point, keep moving
  // counterclockwise until reach the start point
  // again. This loop runs O(h) times where h is
  // number of points in result or output.
  var p = l,
      q;
  do {
    // Add current point to result
    // Prevent duplicates object
    // if (hull.findIndex(i => i.x == points[p].x && i.y == points[p].y)==-1){
    hull.push(points[p]);
    // }

    // Search for a point 'q' such that
    // orientation(p, x, q) is counterclockwise
    // for all points 'x'. The idea is to keep
    // track of last visited most counterclock-
    // wise point in q. If any point 'i' is more
    // counterclock-wise than q, then update q.
    q = (p + 1) % n;

    for (var i = 0; i < n; i++) {
      // If i is more counterclockwise than
      // current q, then update q
      if (orientation(points[p], points[i], points[q]) == 2) q = i;
    }

    // Now q is the most counterclockwise with
    // respect to p. Set p as q for next iteration,
    // so that q is added to result 'hull'
    p = q;
  } while (p != l); // While we don't come to first
  // point

  // Print Result
  // for (var i in hull) {
  //     var temp = hull[i]
  //     console.log("(" + temp.x + ", " + temp.y + ")");
  // }
  return hull;
}

function drawImageWithDegree(canvasId, path, width, height, degree) {
  var ctx = wx.createCanvasContext(canvasId);

  var isVertical = degree % 180 > 0;

  var drawWidth = isVertical ? height : width;
  var drawHeight = isVertical ? width : height;

  var centerX = width / 2;
  var cneterY = height / 2;

  var drawCenterX = drawWidth / 2;
  var drawCneterY = drawHeight / 2;

  var d = Math.abs(width - height) / 2;

  // ctx.translate(drawCenterX, drawCneterY)
  // ctx.rotate(degree * Math.PI / 180)
  // ctx.translate(-drawCenterX, -drawCneterY)

  ctx.translate(centerX, cneterY);
  ctx.rotate(degree * Math.PI / 180);
  ctx.translate(-centerX, -cneterY);

  // ctx.translate(-d, d)
  if (isVertical) {
    if (drawHeight > drawWidth) {
      ctx.drawImage(path, d, -d, drawWidth, drawHeight);
    } else {
      ctx.drawImage(path, -d, d, drawWidth, drawHeight);
    }
  } else {
    ctx.drawImage(path, 0, 0, drawWidth, drawHeight);
  }

  ctx.draw(false, function (e) {
    console.log('draw callback');
  });
}

// 获取适应屏幕的图片显示大小
var getAdjustSize = function getAdjustSize(W, H, width, height) {
  if (width > W) {
    height = W / width * height;
    width = W;
  }

  if (height > H) {
    width = H / height * width;
    height = H;
  }

  return {
    width: width,
    height: height
  };
};
var cropperUtil = {
  getCropRect: getCropRect,
  getAdjustSize: getAdjustSize,
  convexHull: convexHull,
  drawImageWithDegree: drawImageWithDegree
};

var MyPage = function (_wepy$component) {
  _inherits(MyPage, _wepy$component);

  function MyPage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MyPage);

    for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyPage.__proto__ || Object.getPrototypeOf(MyPage)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      params: {
        type: Object,
        default: {
          src: '',
          mode: "rectangle",
          sizeType: "compressed"
        },
        twoWay: true
      }
    }, _this.customData = {}, _this.config = {}, _this.data = {
      cropperData: {},
      cropperMovableItems: {},
      cropperChangableData: {}

    }, _this.components = {}, _this.mixins = [], _this.computed = {}, _this.watch = {
      params: function params(newVal) {
        newVal.mode = newVal.mode ? newVal.mode : 'rectangle';
        newVal.sizeType = newVal.sizeType ? newVal.sizeType : 'compressed';
        this.showCropper(newVal);
      }
    }, _this.methods = {
      // moveable-view touchmove
      moveEvent: function moveEvent(key, e) {
        var originalSize = this.cropperChangableData.originalSize;

        this.setupMoveItem(key, e.changedTouches, {
          path: this.cropperData.imageInfo.path,
          width: originalSize.width,
          height: originalSize.height
        });
      },


      // moveable-view touchend，end的时候设置movable-view的位置，如果在move阶段设置位置，选中会不流畅
      endEvent: function endEvent(key, e) {
        var _this2 = this;

        var cropperData = this.cropperData;
        var cropperMovableItems = this.cropperMovableItems;
        var cropperChangableData = this.cropperChangableData;
        var originalSize = cropperChangableData.originalSize;

        this.setupMoveItem(key, e.changedTouches, {
          path: this.cropperData.imageInfo.path,
          width: originalSize.width,
          height: originalSize.height
        }, function (cropperMovableItems, canCrop) {
          cropperChangableData.canCrop = canCrop;
          _this2.cropperChangableData = cropperChangableData;
          _this2.cropperMovableItems = cropperMovableItems;
          _this2.$apply();
        });
      },
      goback: function goback() {
        // console.log(this);
        wx.navigateBack({
          delta: 3
        });
      },


      // 隐藏cropper
      hideCropper: function hideCropper() {

        this.cropperData.hidden = true;
        this.cropperData.cropCallback = null;

        this.cropperData = this.data.cropperData, this.cropperMovableItems = {
          topleft: {
            x: -1,
            y: -1
          },
          topright: {
            x: -1,
            y: -1
          },
          bottomleft: {
            x: -1,
            y: -1
          },
          bottomright: {
            x: -1,
            y: -1
          }
        }, this.cropperChangableData = {
          canCrop: true,
          rotateDegree: 0
        };

        this.clearCanvas(this.cropperData.imageInfo);
      },


      // 旋转图片
      rotateImage: function rotateImage() {
        var imageInfo = this.data.cropperData.imageInfo;
        var width = imageInfo.width;
        var height = imageInfo.height;
        var rotateDegree = this.cropperChangableData.rotateDegree;

        rotateDegree = rotateDegree == 360 ? 90 : rotateDegree + 90;

        // 判断是否为垂直方向
        var isVertical = rotateDegree % 180 > 0;
        var rotateWidth = isVertical ? height : width;
        var rotateHeight = isVertical ? width : height;

        var size = cropperUtil.getAdjustSize(W, H, rotateWidth, rotateHeight);

        // 适应屏幕的位置
        var left = (W - size.width) / 2;
        var top = (H - size.height) / 2;
        var cropperData = this.cropperData;

        cropperData.left = left;
        cropperData.top = top;

        var cropperChangableData = this.cropperChangableData;
        cropperChangableData.originalSize = {
          width: rotateWidth,
          height: rotateHeight
        };
        cropperChangableData.scaleSize = {
          width: size.width,
          height: size.height
        };
        cropperChangableData.rotateDegree = rotateDegree;

        this.cropperChangableData = cropperChangableData;
        this.cropperData = cropperData;

        var cropperMovableItemsCopy = this.cropperMovableItems;
        var cropperMovableItems = {
          topleft: {
            x: 0,
            y: 0
          },
          topright: {
            x: 0,
            y: 0
          },
          bottomleft: {
            x: 0,
            y: 0
          },
          bottomright: {
            x: 0,
            y: 0
          }
        };

        this.cropperMovableItems = cropperMovableItems;
        var that = this;
        setTimeout(function () {
          that.loadImage(imageInfo.path, rotateWidth, rotateHeight, true);
          // that.setData({
          //     cropperMovableItems: cropperMovableItemsCopy
          // })
        }, 100);
      },


      // 原图按钮被点击
      originalChange: function originalChange() {
        var imageInfo = this.cropperData.imageInfo;
        var originalSize = this.cropperChangableData.originalSize;
        var width = originalSize.width;
        var height = originalSize.height;
        var original = !this.cropperData.original;

        var compressedScale = original ? 1.0 : 0.4;
        var size = cropperUtil.getAdjustSize(W, H, width, height);

        console.log("change original=" + original);

        this.cropperData.original = original;
        this.cropperData.scaleInfo = {
          x: width * compressedScale / size.width,
          y: height * compressedScale / size.height

          // 之所以要设置cropperMovableItems，然后延时在设置一次，是因为改变cropperData后，movable-view会莫名其妙移动到左上角
        };var cropperMovableItemsCopy = this.cropperMovableItems;
        var cropperMovableItems = {
          topleft: {
            x: 0,
            y: 0
          },
          topright: {
            x: 0,
            y: 0
          },
          bottomleft: {
            x: 0,
            y: 0
          },
          bottomright: {
            x: 0,
            y: 0
          }
        };

        this.cropperDat = this.cropperData;
        this.cropperMovableItems = cropperMovableItems;
        var that = this;
        setTimeout(function () {
          that.cropperMovableItems = cropperMovableItemsCopy;
          that.$apply();
        }, 100);

        this.$apply();
        this.drawOriginalImage();
      },


      // 截取选中图片，如果有回调，则调用
      cropImage: function cropImage() {
        var _this3 = this;

        var cropperData = this.cropperData;
        var mode = cropperData.mode;
        var scaleInfo = cropperData.scaleInfo;
        var width = cropperData.width;
        var height = cropperData.height;

        var cropperMovableItems = this.cropperMovableItems;

        if (mode == 'rectangle') {
          var maxX = 0,
              maxY = 0;
          for (var key in cropperMovableItems) {
            var item = cropperMovableItems[key];
            maxX = item.x > maxX ? item.x : maxX;
            maxY = item.y > maxY ? item.y : maxY;
          }

          var minX = maxX,
              minY = maxY;
          for (var _key3 in cropperMovableItems) {
            var _item2 = cropperMovableItems[_key3];
            minX = _item2.x < minX ? _item2.x : minX;
            minY = _item2.y < minY ? _item2.y : minY;
          }

          var w = maxX - minX,
              h = maxY - minY;
          w *= scaleInfo.x;
          h *= scaleInfo.y;

          var x = minX * scaleInfo.x,
              y = minY * scaleInfo.y;

          console.log('crop rect: x=' + x + ',y=' + y + ',w=' + w + ',h=' + h);

          var ctx = wx.createCanvasContext("originalCanvas");

          wx.showLoading({
            title: '正在截取...'
          });
          wx.canvasToTempFilePath({
            x: x,
            y: y,
            width: w,
            height: h,
            destWidth: w,
            destHeight: h,
            canvasId: 'originalCanvas',
            success: function success(res) {
              var tempFilePath = res.tempFilePath;
              wx.hideLoading();
              _this3.cropperData.hidden = true;
              _this3.$apply();
              _this3.$emit("wepyCropperFinsh", tempFilePath);
            },
            fail: function fail(res) {
              console.log("fail res:");
              console.log(res);
            }
          });
        } else {
          var res = [[0, 0], [0, 0], [0, 0], [0, 0]];
          var points = [];
          for (var _key4 in cropperMovableItems) {
            var _x = Math.ceil(cropperMovableItems[_key4].x * scaleInfo.x);
            var _y = Math.ceil(cropperMovableItems[_key4].y * scaleInfo.y);

            var index = 0;
            if (_key4 == 'topleft') {
              index = 0;
            } else if (_key4 == 'bottomleft') {
              index = 1;
            } else if (_key4 == 'bottomright') {
              index = 2;
            } else if (_key4 == 'topright') {
              index = 3;
            }
            res[index] = [_x, _y];

            points.push({ x: _x, y: _y });
          }

          cropperUtil.convexHull(points, points.length);
          this.cropperData.hidden = true;
          this.$apply();
          this.$emit("wepyCropperFinsh", res);
        }
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MyPage, [{
    key: 'customFunction',
    // 自定义数据

    value: function customFunction() {} // 自定义方法

  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      this.init(W, H);
    } // 在Page和Component共用的生命周期函数

  }, {
    key: 'onShow',
    value: function onShow() {} // 只在Page中存在的页面生命周期函数

    // 只在Page实例中存在的配置数据，对应于原生的page.json文件

    // 页面所需数据均需在这里声明，可用于模板数据绑定

    // 声明页面中所引用的组件，或声明组件中所引用的子组件

    // 声明页面所引用的Mixin实例

    // 声明计算属性（详见后文介绍）

    // 声明数据watcher（详见后文介绍）

    // 声明页面wxml中标签的事件处理函数。注意，此处只用于声明页面wxml中标签的bind、catch事件，自定义方法需以自定义方法的方式声明

  }, {
    key: 'init',
    // 声明组件之间的事件处理函数


    value: function init(W, H) {
      this.cropperData = {
        hidden: true,
        left: 0,
        top: 0,
        width: W,
        height: H,
        itemLength: 50,
        imageInfo: {
          path: '',
          width: 0,
          height: 0
        },
        scaleInfo: {
          x: 1,
          y: 1
        },
        cropCallback: null,
        sizeType: ['original', 'compressed'], //'original'(default) | 'compressed'
        original: false, // 默认压缩，压缩比例为截图的0.4
        mode: 'quadrangle' //默认矩形
      };
      this.cropperMovableItems = {
        topleft: {
          x: 50,
          y: 50
        },
        topright: {
          x: W - 50,
          y: 50
        },
        bottomleft: {
          x: 50,
          y: H - 50
        },
        bottomright: {
          x: W - 50,
          y: H - 50
        }
      };
      this.cropperChangableData = {
        canCrop: true,
        rotateDegree: 0,
        originalSize: {
          width: 0,
          height: 0
        },
        scaleSize: {
          width: 0,
          height: 0
        }
      };
    }

    // 显示cropper，如果有图片则载入

  }, {
    key: 'showCropper',
    value: function showCropper(options) {
      var _this4 = this;

      var src = options.src;
      var callback = options.callback;
      var sizeType = options.sizeType;
      var mode = options.mode;

      var filterType = [];
      if (sizeType.indexOf('original') > -1) {
        filterType.push('original');
      }
      if (sizeType.indexOf('compressed') > -1) {
        filterType.push('compressed');
      }
      if (filterType.length == 1 && filterType.indexOf('original') > -1) {
        this.cropperData.original = true;
      }

      if (mode) {
        this.cropperData.mode = mode;
      }
      this.cropperData.hidden = false;
      this.cropperData.cropCallback = callback;
      this.cropperData.sizeType = filterType;
      this.$apply();

      if (src) {
        wx.getImageInfo({
          src: src,
          success: function success(res) {
            var w = res.width,
                h = res.height;

            _this4.loadImage(src, w, h, false);
          }
        });
      }
    }

    // 测试


    // 根据图片大小设置canvas大小，并绘制图片

  }, {
    key: 'loadImage',
    value: function loadImage(src, width, height, isRotate) {
      var size = cropperUtil.getAdjustSize(W, H, width, height);

      // 适应屏幕的位置
      var left = (W - size.width) / 2;
      var top = (H - size.height) / 2;

      // set data
      var updateData = {};
      var cropperData = this.cropperData;

      if (!isRotate) {
        cropperData.imageInfo = {
          path: src,
          width: width,
          height: height
        };
      }
      cropperData.left = left;
      cropperData.top = top;
      cropperData.width = size.width;
      cropperData.height = size.height;

      var compressedScale = this.cropperData.original ? 1.0 : 0.4;
      // let scaleSize = cropperUtil.getAdjustSize(W, H, width, height)

      cropperData.scaleInfo = {
        x: width * compressedScale / size.width,
        y: height * compressedScale / size.height
      };

      updateData.cropperData = cropperData;

      updateData.cropperMovableItems = {
        topleft: {
          x: 50,
          y: 50
        },
        topright: {
          x: size.width - 50,
          y: 50
        },
        bottomleft: {
          x: 50,
          y: size.height - 50
        },
        bottomright: {
          x: size.width - 50,
          y: size.height - 50
        }
      };

      var cropperChangableData = this.cropperChangableData;
      cropperChangableData.originalSize = {
        width: width,
        height: height
      };
      cropperChangableData.scaleSize = {
        width: size.width,
        height: size.height
      };

      updateData.cropperChangableData = cropperChangableData;

      this.cropperData = updateData.cropperData;
      this.cropperMovableItems = updateData.cropperMovableItems;

      // console.log("loadImage size:" + width + "*" + height)
      this.drawImage({
        path: this.cropperData.imageInfo.path,
        width: width,
        height: height
      });
      // that.drawImage(that.data.cropperData.imageInfo)
      this.drawLines(this.cropperMovableItems, this.cropperData.imageInfo);
    }

    // 清空canvas上的数据

  }, {
    key: 'clearCanvas',
    value: function clearCanvas(imageInfo) {
      var cropperData = this.cropperData;
      var size = cropperUtil.getAdjustSize(W, H, imageInfo.width, imageInfo.height);

      if (imageInfo.path != '') {
        var compressedScale = this.cropperData.original ? 1.0 : 0.4;

        //清空原图
        var ctx = wx.createCanvasContext("originalCanvas");
        ctx.clearRect(0, 0, imageInfo.width * compressedScale, imageInfo.height * compressedScale);
        ctx.draw();

        //清空选择区图片
        var canvas = wx.createCanvasContext("canvas");
        canvas.clearRect(0, 0, size.width, size.height);
        canvas.draw();

        // 清空白线框
        var moveCanvas = wx.createCanvasContext("moveCanvas");
        moveCanvas.clearRect(0, 0, size.width, size.height);
        moveCanvas.draw();
      }
    }

    //绘制图片

  }, {
    key: 'drawImage',
    value: function drawImage(imageInfo) {
      var cropperData = this.cropperData;
      var size = cropperUtil.getAdjustSize(W, H, imageInfo.width, imageInfo.height);

      if (imageInfo.path != '') {
        var path = imageInfo.path;
        var compressedScale = this.cropperData.original ? 1.0 : 0.4;
        var rotateDegree = this.cropperChangableData.rotateDegree;

        //绘制原图
        cropperUtil.drawImageWithDegree("originalCanvas", path, imageInfo.width * compressedScale, imageInfo.height * compressedScale, rotateDegree);
        // let originalCanvas = wx.createCanvasContext("originalCanvas")
        // originalCanvas.drawImage(path, 0, 0, imageInfo.width * compressedScale, imageInfo.height * compressedScale)
        // originalCanvas.draw()

        //绘制选择区图片
        cropperUtil.drawImageWithDegree("canvas", path, size.width, size.height, rotateDegree);
        // let canvas = wx.createCanvasContext("canvas")
        // canvas.drawImage(path, 0, 0, size.width, size.height)
        // canvas.draw()
        this.$apply();
        console.log("draw=" + path);
      }
    }

    // 单独绘制原图，当切换原图与非原图时使用

  }, {
    key: 'drawOriginalImage',
    value: function drawOriginalImage() {
      var cropperData = this.cropperData;
      var imageInfo = cropperData.imageInfo;
      var originalSize = this.cropperChangableData.originalSize;

      if (imageInfo.path != '') {
        var path = imageInfo.path;
        var compressedScale = this.cropperData.original ? 1.0 : 0.4;
        var rotateDegree = this.cropperChangableData.rotateDegree;

        //绘制原图
        cropperUtil.drawImageWithDegree("originalCanvas", path, originalSize.width * compressedScale, originalSize.height * compressedScale, rotateDegree);
        // let originalCanvas = wx.createCanvasContext("originalCanvas")
        // originalCanvas.drawImage(path, 0, 0, imageInfo.width * compressedScale, imageInfo.height * compressedScale)
        // originalCanvas.draw()
      }
    }

    //绘制选框

  }, {
    key: 'drawLines',
    value: function drawLines(cropperMovableItems, imageInfo, callback) {
      var cropperData = this.cropperData;
      var mode = cropperData.mode;
      var size = cropperUtil.getAdjustSize(W, H, imageInfo.width, imageInfo.height);

      var convexDots = [];
      var orderedDots = [];
      orderedDots.push(cropperMovableItems['topleft']);
      orderedDots.push(cropperMovableItems['topright']);
      orderedDots.push(cropperMovableItems['bottomright']);
      orderedDots.push(cropperMovableItems['bottomleft']);

      // 获取凸边形的点
      convexDots = cropperUtil.convexHull(orderedDots, orderedDots.length);

      // 四个点组成的四边形是不是凸四边形
      var canCrop = convexDots.length == 4;
      if (callback) {
        callback(canCrop);
      }

      var ctx = wx.createCanvasContext("moveCanvas");

      //绘制高亮选中区域
      var rect = cropperUtil.getCropRect(convexDots);

      if (mode == 'rectangle') {
        // 绘制半透明遮罩
        ctx.setFillStyle('rgba(0,0,0,0.5)');
        ctx.fillRect(0, 0, size.width, size.height);

        // 清除选中区域的半透明遮罩，使选中区域高亮
        ctx.setFillStyle('rgba(0,0,0,0)');
        ctx.clearRect(rect.x, rect.y, rect.w, rect.h);

        //绘制选中边框
        ctx.setStrokeStyle('white');
        ctx.setLineWidth(2);
        ctx.beginPath();
        ctx.moveTo(rect.x, rect.y);
        ctx.lineTo(rect.x + rect.w, rect.y);
        ctx.lineTo(rect.x + rect.w, rect.y + rect.h);
        ctx.lineTo(rect.x, rect.y + rect.h);
        ctx.lineTo(rect.x, rect.y);

        ctx.stroke();
        ctx.closePath();
      } else {
        //绘制选中边框
        // 如果四个点组成的四边形不是凸四边形，则显示红色，表示不可取
        var color = canCrop ? 'white' : 'red';

        ctx.setStrokeStyle(color);
        ctx.setLineWidth(2);
        ctx.beginPath();
        for (var i = 0, len = convexDots.length; i < len; i++) {
          var _dot = convexDots[i];
          if (i == 0) {
            ctx.moveTo(_dot.x, _dot.y);
          } else {
            ctx.lineTo(_dot.x, _dot.y);
          }
        }
        var dot = convexDots[0];
        ctx.lineTo(dot.x, dot.y);

        ctx.stroke();
        ctx.closePath();
      }

      //绘制四个角
      var cornerType = mode == 'rectangle' ? 'rect' : 'circle';
      ctx.setFillStyle('white');
      ctx.setStrokeStyle('white');

      // 绘制不同样式的角
      if (cornerType == 'circle') {
        for (var _i = 0, _len2 = orderedDots.length; _i < _len2; _i++) {
          var _dot2 = orderedDots[_i];

          ctx.beginPath();
          ctx.arc(_dot2.x, _dot2.y, 10, 0, 2 * Math.PI, true);
          ctx.fill();
          ctx.closePath();
        }
      } else if (cornerType == 'rect') {
        var _len3 = 20,
            w = 3.0,
            offset = w / 2.0;

        ctx.setLineWidth(w);
        ctx.beginPath();

        ctx.moveTo(rect.x - offset, rect.y - offset + _len3);
        ctx.lineTo(rect.x - offset, rect.y - offset);
        ctx.lineTo(rect.x - offset + _len3, rect.y - offset);

        ctx.moveTo(rect.x + offset + rect.w - _len3, rect.y - offset);
        ctx.lineTo(rect.x + offset + rect.w, rect.y - offset);
        ctx.lineTo(rect.x + offset + rect.w, rect.y - offset + _len3);

        ctx.moveTo(rect.x + offset + rect.w, rect.y + offset + rect.h - _len3);
        ctx.lineTo(rect.x + offset + rect.w, rect.y + offset + rect.h);
        ctx.lineTo(rect.x + offset + rect.w - _len3, rect.y + offset + rect.h);

        ctx.moveTo(rect.x - offset, rect.y + offset + rect.h - _len3);
        ctx.lineTo(rect.x - offset, rect.y + offset + rect.h);
        ctx.lineTo(rect.x - offset + _len3, rect.y + offset + rect.h);

        ctx.stroke();

        ctx.closePath();
      }

      ctx.draw();
    }

    // move events

  }, {
    key: 'setupMoveItem',
    value: function setupMoveItem(key, changedTouches, imageInfo, callback) {
      var cropperData = this.cropperData;
      var cropperMovableItems = this.cropperMovableItems;
      var left = cropperData.left;
      var top = cropperData.top;
      var mode = cropperData.mode;
      var size = cropperUtil.getAdjustSize(W, H, imageInfo.width, imageInfo.height);

      if (changedTouches.length == 1) {
        var touch = changedTouches[0];
        var x = touch.clientX;
        var y = touch.clientY;

        // 相对画布的点
        x = x - left;
        y = y - top;

        cropperMovableItems[key].x = x;
        cropperMovableItems[key].y = y;

        // 边界检测，使截图不超出截图区域
        x = x < 0 ? 0 : x > size.width ? size.width : x;
        y = y < 0 ? 0 : y > size.height ? size.height : y;
        cropperMovableItems[key].x = x;
        cropperMovableItems[key].y = y;

        // 如果是在矩形模式下
        if (mode == 'rectangle') {
          // 同时设置相连两个点的位置，是相邻的两个点跟随着移动点动，保证选框为矩形
          if (key == 'topleft') {
            cropperMovableItems['bottomleft'].x = x;
            cropperMovableItems['topright'].y = y;
          } else if (key == 'topright') {
            cropperMovableItems['bottomright'].x = x;
            cropperMovableItems['topleft'].y = y;
          } else if (key == 'bottomleft') {
            cropperMovableItems['topleft'].x = x;
            cropperMovableItems['bottomright'].y = y;
          } else if (key == 'bottomright') {
            cropperMovableItems['topright'].x = x;
            cropperMovableItems['bottomleft'].y = y;
          }
        }

        this.drawLines(cropperMovableItems, imageInfo, function (canCrop) {
          if (callback) {
            callback(cropperMovableItems, canCrop);
          }
        });
      }
    }
  }]);

  return MyPage;
}(_wepy2.default.component);

exports.default = MyPage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlcHktY3JvcHBlci5qcyJdLCJuYW1lcyI6WyJkZXZpY2UiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwiVyIsIndpbmRvd1dpZHRoIiwiSCIsIndpbmRvd0hlaWdodCIsImdldENyb3BSZWN0IiwiY3JvcHBlck1vdmFibGVJdGVtcyIsIm1heFgiLCJtYXhZIiwia2V5IiwiaXRlbSIsIngiLCJ5IiwibWluWCIsIm1pblkiLCJ3IiwiaCIsIm9yaWVudGF0aW9uIiwicCIsInEiLCJyIiwidmFsIiwiY29udmV4SHVsbCIsInBvaW50cyIsIm4iLCJodWxsIiwibCIsImkiLCJwdXNoIiwiZHJhd0ltYWdlV2l0aERlZ3JlZSIsImNhbnZhc0lkIiwicGF0aCIsIndpZHRoIiwiaGVpZ2h0IiwiZGVncmVlIiwiY3R4IiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsImlzVmVydGljYWwiLCJkcmF3V2lkdGgiLCJkcmF3SGVpZ2h0IiwiY2VudGVyWCIsImNuZXRlclkiLCJkcmF3Q2VudGVyWCIsImRyYXdDbmV0ZXJZIiwiZCIsIk1hdGgiLCJhYnMiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJQSSIsImRyYXdJbWFnZSIsImRyYXciLCJlIiwiY29uc29sZSIsImxvZyIsImdldEFkanVzdFNpemUiLCJjcm9wcGVyVXRpbCIsIk15UGFnZSIsInByb3BzIiwicGFyYW1zIiwidHlwZSIsIk9iamVjdCIsImRlZmF1bHQiLCJzcmMiLCJtb2RlIiwic2l6ZVR5cGUiLCJ0d29XYXkiLCJjdXN0b21EYXRhIiwiY29uZmlnIiwiZGF0YSIsImNyb3BwZXJEYXRhIiwiY3JvcHBlckNoYW5nYWJsZURhdGEiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiY29tcHV0ZWQiLCJ3YXRjaCIsIm5ld1ZhbCIsInNob3dDcm9wcGVyIiwibWV0aG9kcyIsIm1vdmVFdmVudCIsIm9yaWdpbmFsU2l6ZSIsInNldHVwTW92ZUl0ZW0iLCJjaGFuZ2VkVG91Y2hlcyIsImltYWdlSW5mbyIsImVuZEV2ZW50IiwiY2FuQ3JvcCIsIiRhcHBseSIsImdvYmFjayIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiaGlkZUNyb3BwZXIiLCJoaWRkZW4iLCJjcm9wQ2FsbGJhY2siLCJ0b3BsZWZ0IiwidG9wcmlnaHQiLCJib3R0b21sZWZ0IiwiYm90dG9tcmlnaHQiLCJyb3RhdGVEZWdyZWUiLCJjbGVhckNhbnZhcyIsInJvdGF0ZUltYWdlIiwicm90YXRlV2lkdGgiLCJyb3RhdGVIZWlnaHQiLCJzaXplIiwibGVmdCIsInRvcCIsInNjYWxlU2l6ZSIsImNyb3BwZXJNb3ZhYmxlSXRlbXNDb3B5IiwidGhhdCIsInNldFRpbWVvdXQiLCJsb2FkSW1hZ2UiLCJvcmlnaW5hbENoYW5nZSIsIm9yaWdpbmFsIiwiY29tcHJlc3NlZFNjYWxlIiwic2NhbGVJbmZvIiwiY3JvcHBlckRhdCIsImRyYXdPcmlnaW5hbEltYWdlIiwiY3JvcEltYWdlIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImNhbnZhc1RvVGVtcEZpbGVQYXRoIiwiZGVzdFdpZHRoIiwiZGVzdEhlaWdodCIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZVBhdGgiLCJoaWRlTG9hZGluZyIsIiRlbWl0IiwiZmFpbCIsImNlaWwiLCJpbmRleCIsImxlbmd0aCIsImV2ZW50cyIsIm9wdGlvbnMiLCJpbml0IiwiaXRlbUxlbmd0aCIsImNhbGxiYWNrIiwiZmlsdGVyVHlwZSIsImluZGV4T2YiLCJnZXRJbWFnZUluZm8iLCJpc1JvdGF0ZSIsInVwZGF0ZURhdGEiLCJkcmF3TGluZXMiLCJjbGVhclJlY3QiLCJjYW52YXMiLCJtb3ZlQ2FudmFzIiwiY29udmV4RG90cyIsIm9yZGVyZWREb3RzIiwicmVjdCIsInNldEZpbGxTdHlsZSIsImZpbGxSZWN0Iiwic2V0U3Ryb2tlU3R5bGUiLCJzZXRMaW5lV2lkdGgiLCJiZWdpblBhdGgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2UiLCJjbG9zZVBhdGgiLCJjb2xvciIsImxlbiIsImRvdCIsImNvcm5lclR5cGUiLCJhcmMiLCJmaWxsIiwi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MEI7QUFDN0JILGdDQUFvQixVQUFwQixFQUFnQ0ssQ0FBaEMsR0FBb0NBLENBQXBDO0FBQ0FMLGdDQUFvQixZQUFwQixFQUFrQ00sQ0FBbEMsR0FBc0NBLENBQXRDO0FBQ0Q7QUFDRjs7QUFFRCxhQUFLaUksU0FBTCxDQUFldkksbUJBQWYsRUFBb0M2RSxTQUFwQyxFQUErQyxVQUFVRSxPQUFWLEVBQW1CO0FBQ2hFLGNBQUlrRCxRQUFKLEVBQWM7QUFDWkEscUJBQVNqSSxtQkFBVCxFQUE4QitFLE9BQTlCO0FBQ0Q7QUFDRixTQUpEO0FBS0Q7QUFDRjs7OztFQXZ3QmlDLGVBQUtrRixTOztrQkFBcEI5RyxNIiwiZmlsZSI6IndlcHktY3JvcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBjb25zdCBkZXZpY2UgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICBjb25zdCBXID0gZGV2aWNlLndpbmRvd1dpZHRoO1xuICBjb25zdCBIID0gZGV2aWNlLndpbmRvd0hlaWdodCAtIDUwO1xuICAvLyDojrflj5bpgInkuK3ljLrln5/nmoQoeCwgeSwgdywgaClcbiAgY29uc3QgZ2V0Q3JvcFJlY3QgPSAoY3JvcHBlck1vdmFibGVJdGVtcykgPT4ge1xuICAgIGxldCBtYXhYID0gMCwgbWF4WSA9IDBcbiAgICBmb3IgKGxldCBrZXkgaW4gY3JvcHBlck1vdmFibGVJdGVtcykge1xuICAgICAgbGV0IGl0ZW0gPSBjcm9wcGVyTW92YWJsZUl0ZW1zW2tleV1cbiAgICAgIG1heFggPSBpdGVtLnggPiBtYXhYID8gaXRlbS54IDogbWF4WFxuICAgICAgbWF4WSA9IGl0ZW0ueSA+IG1heFkgPyBpdGVtLnkgOiBtYXhZXG4gICAgfVxuXG4gICAgbGV0IG1pblggPSBtYXhYLCBtaW5ZID0gbWF4WVxuICAgIGZvciAobGV0IGtleSBpbiBjcm9wcGVyTW92YWJsZUl0ZW1zKSB7XG4gICAgICBsZXQgaXRlbSA9IGNyb3BwZXJNb3ZhYmxlSXRlbXNba2V5XVxuICAgICAgbWluWCA9IGl0ZW0ueCA8IG1pblggPyBpdGVtLnggOiBtaW5YXG4gICAgICBtaW5ZID0gaXRlbS55IDwgbWluWSA/IGl0ZW0ueSA6IG1pbllcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogbWluWCxcbiAgICAgIHk6IG1pblksXG4gICAgICB3OiBtYXhYIC0gbWluWCxcbiAgICAgIGg6IG1heFkgLSBtaW5ZXG4gICAgfVxuICB9XG4gIC8vIGh0dHA6Ly93d3cuZ2Vla3Nmb3JnZWVrcy5vcmcvY29udmV4LWh1bGwtc2V0LTEtamFydmlzcy1hbGdvcml0aG0tb3Itd3JhcHBpbmcvXG5cbiAgLy8gVG8gZmluZCBvcmllbnRhdGlvbiBvZiBvcmRlcmVkIHRyaXBsZXQgKHAsIHEsIHIpLlxuICAvLyBUaGUgZnVuY3Rpb24gcmV0dXJucyBmb2xsb3dpbmcgdmFsdWVzXG4gIC8vIDAgLS0+IHAsIHEgYW5kIHIgYXJlIGNvbGluZWFyXG4gIC8vIDEgLS0+IENsb2Nrd2lzZVxuICAvLyAyIC0tPiBDb3VudGVyY2xvY2t3aXNlXG4gIGZ1bmN0aW9uIG9yaWVudGF0aW9uKHAsIHEsIHIpIHtcbiAgICB2YXIgdmFsID0gKHEueSAtIHAueSkgKiAoci54IC0gcS54KSAtIChxLnggLSBwLngpICogKHIueSAtIHEueSk7XG5cbiAgICBpZiAodmFsID09IDApIHJldHVybiAwOyAgLy8gY29sbGluZWFyXG4gICAgcmV0dXJuICh2YWwgPiAwKSA/IDEgOiAyOyAvLyBjbG9jayBvciBjb3VudGVyY2xvY2sgd2lzZVxuICB9XG5cbiAgZnVuY3Rpb24gY29udmV4SHVsbChwb2ludHMsIG4pIHtcbiAgICAvLyBUaGVyZSBtdXN0IGJlIGF0IGxlYXN0IDMgcG9pbnRzXG4gICAgaWYgKG4gPCAzKSByZXR1cm47XG5cbiAgICAvLyBJbml0aWFsaXplIFJlc3VsdFxuICAgIHZhciBodWxsID0gW107XG5cbiAgICAvLyBGaW5kIHRoZSBsZWZ0bW9zdCBwb2ludFxuICAgIHZhciBsID0gMDtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgaWYgKHBvaW50c1tpXS54IDwgcG9pbnRzW2xdLngpIHtcbiAgICAgICAgbCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFN0YXJ0IGZyb20gbGVmdG1vc3QgcG9pbnQsIGtlZXAgbW92aW5nXG4gICAgLy8gY291bnRlcmNsb2Nrd2lzZSB1bnRpbCByZWFjaCB0aGUgc3RhcnQgcG9pbnRcbiAgICAvLyBhZ2Fpbi4gVGhpcyBsb29wIHJ1bnMgTyhoKSB0aW1lcyB3aGVyZSBoIGlzXG4gICAgLy8gbnVtYmVyIG9mIHBvaW50cyBpbiByZXN1bHQgb3Igb3V0cHV0LlxuICAgIHZhciBwID0gbCwgcTtcbiAgICBkbyB7XG4gICAgICAvLyBBZGQgY3VycmVudCBwb2ludCB0byByZXN1bHRcbiAgICAgIC8vIFByZXZlbnQgZHVwbGljYXRlcyBvYmplY3RcbiAgICAgIC8vIGlmIChodWxsLmZpbmRJbmRleChpID0+IGkueCA9PSBwb2ludHNbcF0ueCAmJiBpLnkgPT0gcG9pbnRzW3BdLnkpPT0tMSl7XG4gICAgICBodWxsLnB1c2gocG9pbnRzW3BdKTtcbiAgICAgIC8vIH1cblxuICAgICAgLy8gU2VhcmNoIGZvciBhIHBvaW50ICdxJyBzdWNoIHRoYXRcbiAgICAgIC8vIG9yaWVudGF0aW9uKHAsIHgsIHEpIGlzIGNvdW50ZXJjbG9ja3dpc2VcbiAgICAgIC8vIGZvciBhbGwgcG9pbnRzICd4Jy4gVGhlIGlkZWEgaXMgdG8ga2VlcFxuICAgICAgLy8gdHJhY2sgb2YgbGFzdCB2aXNpdGVkIG1vc3QgY291bnRlcmNsb2NrLVxuICAgICAgLy8gd2lzZSBwb2ludCBpbiBxLiBJZiBhbnkgcG9pbnQgJ2knIGlzIG1vcmVcbiAgICAgIC8vIGNvdW50ZXJjbG9jay13aXNlIHRoYW4gcSwgdGhlbiB1cGRhdGUgcS5cbiAgICAgIHEgPSAocCArIDEpICUgbjtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgLy8gSWYgaSBpcyBtb3JlIGNvdW50ZXJjbG9ja3dpc2UgdGhhblxuICAgICAgICAvLyBjdXJyZW50IHEsIHRoZW4gdXBkYXRlIHFcbiAgICAgICAgaWYgKG9yaWVudGF0aW9uKHBvaW50c1twXSwgcG9pbnRzW2ldLCBwb2ludHNbcV0pID09IDIpXG4gICAgICAgICAgcSA9IGk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vdyBxIGlzIHRoZSBtb3N0IGNvdW50ZXJjbG9ja3dpc2Ugd2l0aFxuICAgICAgLy8gcmVzcGVjdCB0byBwLiBTZXQgcCBhcyBxIGZvciBuZXh0IGl0ZXJhdGlvbixcbiAgICAgIC8vIHNvIHRoYXQgcSBpcyBhZGRlZCB0byByZXN1bHQgJ2h1bGwnXG4gICAgICBwID0gcTtcblxuICAgIH0gd2hpbGUgKHAgIT0gbCk7ICAvLyBXaGlsZSB3ZSBkb24ndCBjb21lIHRvIGZpcnN0XG4gICAgLy8gcG9pbnRcblxuICAgIC8vIFByaW50IFJlc3VsdFxuICAgIC8vIGZvciAodmFyIGkgaW4gaHVsbCkge1xuICAgIC8vICAgICB2YXIgdGVtcCA9IGh1bGxbaV1cbiAgICAvLyAgICAgY29uc29sZS5sb2coXCIoXCIgKyB0ZW1wLnggKyBcIiwgXCIgKyB0ZW1wLnkgKyBcIilcIik7XG4gICAgLy8gfVxuICAgIHJldHVybiBodWxsXG4gIH1cblxuICBmdW5jdGlvbiBkcmF3SW1hZ2VXaXRoRGVncmVlKGNhbnZhc0lkLCBwYXRoLCB3aWR0aCwgaGVpZ2h0LCBkZWdyZWUpIHtcbiAgICBsZXQgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dChjYW52YXNJZClcblxuICAgIGxldCBpc1ZlcnRpY2FsID0gZGVncmVlICUgMTgwID4gMFxuXG4gICAgbGV0IGRyYXdXaWR0aCA9IGlzVmVydGljYWwgPyBoZWlnaHQgOiB3aWR0aFxuICAgIGxldCBkcmF3SGVpZ2h0ID0gaXNWZXJ0aWNhbCA/IHdpZHRoIDogaGVpZ2h0XG5cbiAgICBsZXQgY2VudGVyWCA9IHdpZHRoIC8gMlxuICAgIGxldCBjbmV0ZXJZID0gaGVpZ2h0IC8gMlxuXG4gICAgbGV0IGRyYXdDZW50ZXJYID0gZHJhd1dpZHRoIC8gMlxuICAgIGxldCBkcmF3Q25ldGVyWSA9IGRyYXdIZWlnaHQgLyAyXG5cbiAgICBsZXQgZCA9IE1hdGguYWJzKHdpZHRoLWhlaWdodCkvMlxuXG4gICAgLy8gY3R4LnRyYW5zbGF0ZShkcmF3Q2VudGVyWCwgZHJhd0NuZXRlclkpXG4gICAgLy8gY3R4LnJvdGF0ZShkZWdyZWUgKiBNYXRoLlBJIC8gMTgwKVxuICAgIC8vIGN0eC50cmFuc2xhdGUoLWRyYXdDZW50ZXJYLCAtZHJhd0NuZXRlclkpXG5cbiAgICBjdHgudHJhbnNsYXRlKGNlbnRlclgsIGNuZXRlclkpXG4gICAgY3R4LnJvdGF0ZShkZWdyZWUgKiBNYXRoLlBJIC8gMTgwKVxuICAgIGN0eC50cmFuc2xhdGUoLWNlbnRlclgsIC1jbmV0ZXJZKVxuXG4gICAgLy8gY3R4LnRyYW5zbGF0ZSgtZCwgZClcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgaWYgKGRyYXdIZWlnaHQgPiBkcmF3V2lkdGgpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShwYXRoLCBkLCAtZCwgZHJhd1dpZHRoLCBkcmF3SGVpZ2h0KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UocGF0aCwgLWQsIGQsIGRyYXdXaWR0aCwgZHJhd0hlaWdodClcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjdHguZHJhd0ltYWdlKHBhdGgsIDAsIDAsIGRyYXdXaWR0aCwgZHJhd0hlaWdodClcbiAgICB9XG5cbiAgICBjdHguZHJhdyhmYWxzZSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkcmF3IGNhbGxiYWNrJylcbiAgICB9KVxuICB9XG5cbiAgLy8g6I635Y+W6YCC5bqU5bGP5bmV55qE5Zu+54mH5pi+56S65aSn5bCPXG4gIGNvbnN0IGdldEFkanVzdFNpemUgPSAoVywgSCwgd2lkdGgsIGhlaWdodCkgPT4ge1xuICAgIGlmICh3aWR0aCA+IFcpIHtcbiAgICAgIGhlaWdodCA9IFcgLyB3aWR0aCAqIGhlaWdodFxuICAgICAgd2lkdGggPSBXXG4gICAgfVxuXG4gICAgaWYgKGhlaWdodCA+IEgpIHtcbiAgICAgIHdpZHRoID0gSCAvIGhlaWdodCAqIHdpZHRoXG4gICAgICBoZWlnaHQgPSBIXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgfVxuICB9XG4gIGNvbnN0IGNyb3BwZXJVdGlsID0ge1xuICAgIGdldENyb3BSZWN0LFxuICAgIGdldEFkanVzdFNpemUsXG4gICAgY29udmV4SHVsbCxcbiAgICBkcmF3SW1hZ2VXaXRoRGVncmVlXG4gIH1cblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBNeVBhZ2UgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG5cbiAgICBwcm9wcyA9IHtcbiAgICAgIHBhcmFtczp7XG4gICAgICAgIHR5cGU6T2JqZWN0LFxuICAgICAgICBkZWZhdWx0OntcbiAgICAgICAgICBzcmM6JycsXG4gICAgICAgICAgbW9kZTpcInJlY3RhbmdsZVwiLFxuICAgICAgICAgIHNpemVUeXBlOlwiY29tcHJlc3NlZFwiLFxuICAgICAgICB9LFxuICAgICAgICB0d29XYXk6IHRydWUsXG4gICAgICB9XG4gICAgfVxuICAgIGN1c3RvbURhdGEgPSB7fSAgLy8g6Ieq5a6a5LmJ5pWw5o2uXG5cbiAgICBjdXN0b21GdW5jdGlvbigpIHtcbiAgICB9ICAvLyDoh6rlrprkuYnmlrnms5VcblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICB0aGlzLmluaXQoVywgSClcblxuICAgIH0gIC8vIOWcqFBhZ2XlkoxDb21wb25lbnTlhbHnlKjnmoTnlJ/lkb3lkajmnJ/lh73mlbBcblxuICAgIG9uU2hvdygpIHtcbiAgICB9ICAvLyDlj6rlnKhQYWdl5Lit5a2Y5Zyo55qE6aG16Z2i55Sf5ZG95ZGo5pyf5Ye95pWwXG5cbiAgICBjb25maWcgPSB7fTsgIC8vIOWPquWcqFBhZ2Xlrp7kvovkuK3lrZjlnKjnmoTphY3nva7mlbDmja7vvIzlr7nlupTkuo7ljp/nlJ/nmoRwYWdlLmpzb27mlofku7ZcblxuICAgIGRhdGEgPSB7XG4gICAgICBjcm9wcGVyRGF0YTp7fSxcbiAgICAgIGNyb3BwZXJNb3ZhYmxlSXRlbXM6e30sXG4gICAgICBjcm9wcGVyQ2hhbmdhYmxlRGF0YTp7fVxuXG5cbiAgICB9OyAgLy8g6aG16Z2i5omA6ZyA5pWw5o2u5Z2H6ZyA5Zyo6L+Z6YeM5aOw5piO77yM5Y+v55So5LqO5qih5p2/5pWw5o2u57uR5a6aXG5cbiAgICBjb21wb25lbnRzID0ge307ICAvLyDlo7DmmI7pobXpnaLkuK3miYDlvJXnlKjnmoTnu4Tku7bvvIzmiJblo7DmmI7nu4Tku7bkuK3miYDlvJXnlKjnmoTlrZDnu4Tku7ZcblxuICAgIG1peGlucyA9IFtdOyAgLy8g5aOw5piO6aG16Z2i5omA5byV55So55qETWl4aW7lrp7kvotcblxuICAgIGNvbXB1dGVkID0ge307ICAvLyDlo7DmmI7orqHnrpflsZ7mgKfvvIjor6bop4HlkI7mlofku4vnu43vvIlcblxuICAgIHdhdGNoID0ge1xuICAgICAgcGFyYW1zKG5ld1ZhbCl7XG4gICAgICAgIG5ld1ZhbC5tb2RlPW5ld1ZhbC5tb2RlP25ld1ZhbC5tb2RlOidyZWN0YW5nbGUnO1xuICAgICAgICBuZXdWYWwuc2l6ZVR5cGU9bmV3VmFsLnNpemVUeXBlP25ld1ZhbC5zaXplVHlwZTonY29tcHJlc3NlZCc7XG4gICAgICAgIHRoaXMuc2hvd0Nyb3BwZXIobmV3VmFsKTtcbiAgICAgIH1cbiAgICB9OyAgLy8g5aOw5piO5pWw5o2ud2F0Y2hlcu+8iOivpuingeWQjuaWh+S7i+e7je+8iVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8vIG1vdmVhYmxlLXZpZXcgdG91Y2htb3ZlXG4gICAgICBtb3ZlRXZlbnQoa2V5LGUpe1xuICAgICAgICBsZXQgb3JpZ2luYWxTaXplID0gdGhpcy5jcm9wcGVyQ2hhbmdhYmxlRGF0YS5vcmlnaW5hbFNpemVcblxuICAgICAgICB0aGlzLnNldHVwTW92ZUl0ZW0oa2V5LCBlLmNoYW5nZWRUb3VjaGVzLCB7XG4gICAgICAgICAgcGF0aDogdGhpcy5jcm9wcGVyRGF0YS5pbWFnZUluZm8ucGF0aCxcbiAgICAgICAgICB3aWR0aDogb3JpZ2luYWxTaXplLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogb3JpZ2luYWxTaXplLmhlaWdodFxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgLy8gbW92ZWFibGUtdmlldyB0b3VjaGVuZO+8jGVuZOeahOaXtuWAmeiuvue9rm1vdmFibGUtdmlld+eahOS9jee9ru+8jOWmguaenOWcqG1vdmXpmLbmrrXorr7nva7kvY3nva7vvIzpgInkuK3kvJrkuI3mtYHnlYVcbiAgICAgIGVuZEV2ZW50KGtleSxlKXtcbiAgICAgICAgbGV0IGNyb3BwZXJEYXRhID0gdGhpcy5jcm9wcGVyRGF0YVxuICAgICAgICBsZXQgY3JvcHBlck1vdmFibGVJdGVtcyA9IHRoaXMuY3JvcHBlck1vdmFibGVJdGVtc1xuICAgICAgICBsZXQgY3JvcHBlckNoYW5nYWJsZURhdGEgPSB0aGlzLmNyb3BwZXJDaGFuZ2FibGVEYXRhXG4gICAgICAgIGxldCBvcmlnaW5hbFNpemUgPSBjcm9wcGVyQ2hhbmdhYmxlRGF0YS5vcmlnaW5hbFNpemVcblxuICAgICAgICB0aGlzLnNldHVwTW92ZUl0ZW0oa2V5LCBlLmNoYW5nZWRUb3VjaGVzLCB7XG4gICAgICAgICAgcGF0aDogdGhpcy5jcm9wcGVyRGF0YS5pbWFnZUluZm8ucGF0aCxcbiAgICAgICAgICB3aWR0aDogb3JpZ2luYWxTaXplLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogb3JpZ2luYWxTaXplLmhlaWdodFxuICAgICAgICB9LCAoY3JvcHBlck1vdmFibGVJdGVtcywgY2FuQ3JvcCkgPT4ge1xuICAgICAgICAgIGNyb3BwZXJDaGFuZ2FibGVEYXRhLmNhbkNyb3AgPSBjYW5Dcm9wXG4gICAgICAgICAgdGhpcy5jcm9wcGVyQ2hhbmdhYmxlRGF0YT1jcm9wcGVyQ2hhbmdhYmxlRGF0YTtcbiAgICAgICAgICB0aGlzLmNyb3BwZXJNb3ZhYmxlSXRlbXM9IGNyb3BwZXJNb3ZhYmxlSXRlbXM7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSlcbiAgICAgIH0sXG5cbiAgICAgIGdvYmFjaygpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcyk7XG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgZGVsdGE6IDNcbiAgICAgICAgfSlcbiAgICAgIH0sXG5cbiAgICAgIC8vIOmakOiXj2Nyb3BwZXJcbiAgICAgIGhpZGVDcm9wcGVyKCl7XG5cbiAgICAgICAgdGhpcy5jcm9wcGVyRGF0YS5oaWRkZW4gPSB0cnVlXG4gICAgICAgIHRoaXMuY3JvcHBlckRhdGEuY3JvcENhbGxiYWNrID0gbnVsbFxuXG4gICAgICAgIHRoaXMuY3JvcHBlckRhdGE9dGhpcy5kYXRhLmNyb3BwZXJEYXRhLFxuICAgICAgICAgIHRoaXMuY3JvcHBlck1vdmFibGVJdGVtcz0ge1xuICAgICAgICAgICAgdG9wbGVmdDoge1xuICAgICAgICAgICAgICB4OiAtMSxcbiAgICAgICAgICAgICAgeTogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b3ByaWdodDoge1xuICAgICAgICAgICAgICB4OiAtMSxcbiAgICAgICAgICAgICAgeTogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib3R0b21sZWZ0OiB7XG4gICAgICAgICAgICAgIHg6IC0xLFxuICAgICAgICAgICAgICB5OiAtMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvdHRvbXJpZ2h0OiB7XG4gICAgICAgICAgICAgIHg6IC0xLFxuICAgICAgICAgICAgICB5OiAtMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGhpcy5jcm9wcGVyQ2hhbmdhYmxlRGF0YT0ge1xuICAgICAgICAgICAgY2FuQ3JvcDogdHJ1ZSxcbiAgICAgICAgICAgIHJvdGF0ZURlZ3JlZTogMFxuICAgICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFyQ2FudmFzKHRoaXMuY3JvcHBlckRhdGEuaW1hZ2VJbmZvKVxuICAgICAgfSxcblxuICAgICAgLy8g5peL6L2s5Zu+54mHXG4gICAgICByb3RhdGVJbWFnZSgpe1xuICAgICAgICBsZXQgaW1hZ2VJbmZvID0gdGhpcy5kYXRhLmNyb3BwZXJEYXRhLmltYWdlSW5mb1xuICAgICAgICBsZXQgd2lkdGggPSBpbWFnZUluZm8ud2lkdGhcbiAgICAgICAgbGV0IGhlaWdodCA9IGltYWdlSW5mby5oZWlnaHRcbiAgICAgICAgbGV0IHJvdGF0ZURlZ3JlZSA9IHRoaXMuY3JvcHBlckNoYW5nYWJsZURhdGEucm90YXRlRGVncmVlXG5cbiAgICAgICAgcm90YXRlRGVncmVlID0gcm90YXRlRGVncmVlID09IDM2MCA/IDkwIDogcm90YXRlRGVncmVlICsgOTBcblxuICAgICAgICAvLyDliKTmlq3mmK/lkKbkuLrlnoLnm7TmlrnlkJFcbiAgICAgICAgbGV0IGlzVmVydGljYWwgPSByb3RhdGVEZWdyZWUgJSAxODAgPiAwXG4gICAgICAgIGxldCByb3RhdGVXaWR0aCA9IGlzVmVydGljYWwgPyBoZWlnaHQgOiB3aWR0aFxuICAgICAgICBsZXQgcm90YXRlSGVpZ2h0ID0gaXNWZXJ0aWNhbCA/IHdpZHRoIDogaGVpZ2h0XG5cbiAgICAgICAgbGV0IHNpemUgPSBjcm9wcGVyVXRpbC5nZXRBZGp1c3RTaXplKFcsIEgsIHJvdGF0ZVdpZHRoLCByb3RhdGVIZWlnaHQpXG5cbiAgICAgICAgLy8g6YCC5bqU5bGP5bmV55qE5L2N572uXG4gICAgICAgIGxldCBsZWZ0ID0gKFcgLSBzaXplLndpZHRoKSAvIDJcbiAgICAgICAgbGV0IHRvcCA9IChIIC0gc2l6ZS5oZWlnaHQpIC8gMlxuICAgICAgICBsZXQgY3JvcHBlckRhdGEgPSB0aGlzLmNyb3BwZXJEYXRhXG5cbiAgICAgICAgY3JvcHBlckRhdGEubGVmdCA9IGxlZnRcbiAgICAgICAgY3JvcHBlckRhdGEudG9wID0gdG9wXG5cbiAgICAgICAgbGV0IGNyb3BwZXJDaGFuZ2FibGVEYXRhID0gdGhpcy5jcm9wcGVyQ2hhbmdhYmxlRGF0YVxuICAgICAgICBjcm9wcGVyQ2hhbmdhYmxlRGF0YS5vcmlnaW5hbFNpemUgPSB7XG4gICAgICAgICAgd2lkdGg6IHJvdGF0ZVdpZHRoLFxuICAgICAgICAgIGhlaWdodDogcm90YXRlSGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgY3JvcHBlckNoYW5nYWJsZURhdGEuc2NhbGVTaXplID0ge1xuICAgICAgICAgIHdpZHRoOiBzaXplLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogc2l6ZS5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICBjcm9wcGVyQ2hhbmdhYmxlRGF0YS5yb3RhdGVEZWdyZWUgPSByb3RhdGVEZWdyZWVcblxuICAgICAgICB0aGlzLmNyb3BwZXJDaGFuZ2FibGVEYXRhPWNyb3BwZXJDaGFuZ2FibGVEYXRhO1xuICAgICAgICB0aGlzLmNyb3BwZXJEYXRhPSBjcm9wcGVyRGF0YTtcblxuICAgICAgICBsZXQgY3JvcHBlck1vdmFibGVJdGVtc0NvcHkgPSB0aGlzLmNyb3BwZXJNb3ZhYmxlSXRlbXNcbiAgICAgICAgbGV0IGNyb3BwZXJNb3ZhYmxlSXRlbXMgPSB7XG4gICAgICAgICAgdG9wbGVmdDoge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRvcHJpZ2h0OiB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm90dG9tbGVmdDoge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvdHRvbXJpZ2h0OiB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3JvcHBlck1vdmFibGVJdGVtcz0gY3JvcHBlck1vdmFibGVJdGVtcztcbiAgICAgICAgdmFyIHRoYXQ9dGhpcztcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhhdC5sb2FkSW1hZ2UoaW1hZ2VJbmZvLnBhdGgsIHJvdGF0ZVdpZHRoLCByb3RhdGVIZWlnaHQsIHRydWUpXG4gICAgICAgICAgLy8gdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAvLyAgICAgY3JvcHBlck1vdmFibGVJdGVtczogY3JvcHBlck1vdmFibGVJdGVtc0NvcHlcbiAgICAgICAgICAvLyB9KVxuICAgICAgICB9LCAxMDApXG5cbiAgICAgIH0sXG5cbiAgICAgIC8vIOWOn+WbvuaMiemSruiiq+eCueWHu1xuICAgICAgb3JpZ2luYWxDaGFuZ2UoKXtcbiAgICAgICAgbGV0IGltYWdlSW5mbyA9IHRoaXMuY3JvcHBlckRhdGEuaW1hZ2VJbmZvXG4gICAgICAgIGxldCBvcmlnaW5hbFNpemUgPSB0aGlzLmNyb3BwZXJDaGFuZ2FibGVEYXRhLm9yaWdpbmFsU2l6ZVxuICAgICAgICBsZXQgd2lkdGggPSBvcmlnaW5hbFNpemUud2lkdGhcbiAgICAgICAgbGV0IGhlaWdodCA9IG9yaWdpbmFsU2l6ZS5oZWlnaHRcbiAgICAgICAgbGV0IG9yaWdpbmFsID0gIXRoaXMuY3JvcHBlckRhdGEub3JpZ2luYWxcblxuICAgICAgICBsZXQgY29tcHJlc3NlZFNjYWxlID0gb3JpZ2luYWwgPyAxLjAgOiAwLjRcbiAgICAgICAgbGV0IHNpemUgPSBjcm9wcGVyVXRpbC5nZXRBZGp1c3RTaXplKFcsIEgsIHdpZHRoLCBoZWlnaHQpXG5cbiAgICAgICAgY29uc29sZS5sb2coXCJjaGFuZ2Ugb3JpZ2luYWw9XCIgKyBvcmlnaW5hbClcblxuICAgICAgICB0aGlzLmNyb3BwZXJEYXRhLm9yaWdpbmFsID0gb3JpZ2luYWxcbiAgICAgICAgdGhpcy5jcm9wcGVyRGF0YS5zY2FsZUluZm8gPSB7XG4gICAgICAgICAgeDogd2lkdGggKiBjb21wcmVzc2VkU2NhbGUgLyBzaXplLndpZHRoLFxuICAgICAgICAgIHk6IGhlaWdodCAqIGNvbXByZXNzZWRTY2FsZSAvIHNpemUuaGVpZ2h0XG4gICAgICAgIH1cblxuICAgICAgICAvLyDkuYvmiYDku6XopoHorr7nva5jcm9wcGVyTW92YWJsZUl0ZW1z77yM54S25ZCO5bu25pe25Zyo6K6+572u5LiA5qyh77yM5piv5Zug5Li65pS55Y+YY3JvcHBlckRhdGHlkI7vvIxtb3ZhYmxlLXZpZXfkvJrojqvlkI3lhbblppnnp7vliqjliLDlt6bkuIrop5JcbiAgICAgICAgbGV0IGNyb3BwZXJNb3ZhYmxlSXRlbXNDb3B5ID0gdGhpcy5jcm9wcGVyTW92YWJsZUl0ZW1zXG4gICAgICAgIGxldCBjcm9wcGVyTW92YWJsZUl0ZW1zID0ge1xuICAgICAgICAgIHRvcGxlZnQ6IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0b3ByaWdodDoge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvdHRvbWxlZnQ6IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBib3R0b21yaWdodDoge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyb3BwZXJEYXQ9dGhpcy5jcm9wcGVyRGF0YTtcbiAgICAgICAgdGhpcy5jcm9wcGVyTW92YWJsZUl0ZW1zPWNyb3BwZXJNb3ZhYmxlSXRlbXM7XG4gICAgICAgIHZhciB0aGF0PXRoaXM7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoYXQuY3JvcHBlck1vdmFibGVJdGVtcz1jcm9wcGVyTW92YWJsZUl0ZW1zQ29weTtcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICB9LCAxMDApXG5cbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgdGhpcy5kcmF3T3JpZ2luYWxJbWFnZSgpXG4gICAgICB9LFxuXG4gICAgICAvLyDmiKrlj5bpgInkuK3lm77niYfvvIzlpoLmnpzmnInlm57osIPvvIzliJnosIPnlKhcbiAgICAgIGNyb3BJbWFnZSgpe1xuICAgICAgICBsZXQgY3JvcHBlckRhdGEgPSB0aGlzLmNyb3BwZXJEYXRhXG4gICAgICAgIGxldCBtb2RlID0gY3JvcHBlckRhdGEubW9kZVxuICAgICAgICBsZXQgc2NhbGVJbmZvID0gY3JvcHBlckRhdGEuc2NhbGVJbmZvXG4gICAgICAgIGxldCB3aWR0aCA9IGNyb3BwZXJEYXRhLndpZHRoXG4gICAgICAgIGxldCBoZWlnaHQgPSBjcm9wcGVyRGF0YS5oZWlnaHRcblxuICAgICAgICBsZXQgY3JvcHBlck1vdmFibGVJdGVtcyA9IHRoaXMuY3JvcHBlck1vdmFibGVJdGVtc1xuXG4gICAgICAgIGlmIChtb2RlID09ICdyZWN0YW5nbGUnKSB7XG4gICAgICAgICAgbGV0IG1heFggPSAwLCBtYXhZID0gMFxuICAgICAgICAgIGZvciAobGV0IGtleSBpbiBjcm9wcGVyTW92YWJsZUl0ZW1zKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyb3BwZXJNb3ZhYmxlSXRlbXNba2V5XVxuICAgICAgICAgICAgbWF4WCA9IGl0ZW0ueCA+IG1heFggPyBpdGVtLnggOiBtYXhYXG4gICAgICAgICAgICBtYXhZID0gaXRlbS55ID4gbWF4WSA/IGl0ZW0ueSA6IG1heFlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgbWluWCA9IG1heFgsIG1pblkgPSBtYXhZXG4gICAgICAgICAgZm9yIChsZXQga2V5IGluIGNyb3BwZXJNb3ZhYmxlSXRlbXMpIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gY3JvcHBlck1vdmFibGVJdGVtc1trZXldXG4gICAgICAgICAgICBtaW5YID0gaXRlbS54IDwgbWluWCA/IGl0ZW0ueCA6IG1pblhcbiAgICAgICAgICAgIG1pblkgPSBpdGVtLnkgPCBtaW5ZID8gaXRlbS55IDogbWluWVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCB3ID0gbWF4WCAtIG1pblgsIGggPSBtYXhZIC0gbWluWVxuICAgICAgICAgIHcgKj0gc2NhbGVJbmZvLnhcbiAgICAgICAgICBoICo9IHNjYWxlSW5mby55XG5cbiAgICAgICAgICBsZXQgeCA9IG1pblggKiBzY2FsZUluZm8ueCwgeSA9IG1pblkgKiBzY2FsZUluZm8ueVxuXG4gICAgICAgICAgY29uc29sZS5sb2coJ2Nyb3AgcmVjdDogeD0nICsgeCArICcseT0nICsgeSArICcsdz0nICsgdyArICcsaD0nICsgaClcblxuICAgICAgICAgIGxldCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KFwib3JpZ2luYWxDYW52YXNcIilcblxuICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5q2j5Zyo5oiq5Y+WLi4uJyxcbiAgICAgICAgICB9KVxuICAgICAgICAgIHd4LmNhbnZhc1RvVGVtcEZpbGVQYXRoKHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgICAgICBoZWlnaHQ6IGgsXG4gICAgICAgICAgICBkZXN0V2lkdGg6IHcsXG4gICAgICAgICAgICBkZXN0SGVpZ2h0OiBoLFxuICAgICAgICAgICAgY2FudmFzSWQ6ICdvcmlnaW5hbENhbnZhcycsXG4gICAgICAgICAgICBzdWNjZXNzOiAgKHJlcykgPT57XG4gICAgICAgICAgICAgIGxldCB0ZW1wRmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoXG4gICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgdGhpcy5jcm9wcGVyRGF0YS5oaWRkZW49dHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgdGhpcy4kZW1pdChcIndlcHlDcm9wcGVyRmluc2hcIix0ZW1wRmlsZVBhdGgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWwocmVzKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmFpbCByZXM6XCIpXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGxldCByZXMgPSBbWzAsIDBdLCBbMCwgMF0sIFswLCAwXSwgWzAsIDBdXVxuICAgICAgICAgIGxldCBwb2ludHMgPSBbXVxuICAgICAgICAgIGZvciAobGV0IGtleSBpbiBjcm9wcGVyTW92YWJsZUl0ZW1zKSB7XG4gICAgICAgICAgICBsZXQgeCA9IE1hdGguY2VpbChjcm9wcGVyTW92YWJsZUl0ZW1zW2tleV0ueCAqIHNjYWxlSW5mby54KVxuICAgICAgICAgICAgbGV0IHkgPSBNYXRoLmNlaWwoY3JvcHBlck1vdmFibGVJdGVtc1trZXldLnkgKiBzY2FsZUluZm8ueSlcblxuXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwXG4gICAgICAgICAgICBpZiAoa2V5ID09ICd0b3BsZWZ0Jykge1xuICAgICAgICAgICAgICBpbmRleCA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PSAnYm90dG9tbGVmdCcpIHtcbiAgICAgICAgICAgICAgaW5kZXggPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXkgPT0gJ2JvdHRvbXJpZ2h0Jykge1xuICAgICAgICAgICAgICBpbmRleCA9IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGtleSA9PSAndG9wcmlnaHQnKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gM1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzW2luZGV4XSA9IFt4LCB5XVxuXG4gICAgICAgICAgICBwb2ludHMucHVzaCh7IHgsIHkgfSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjcm9wcGVyVXRpbC5jb252ZXhIdWxsKHBvaW50cywgcG9pbnRzLmxlbmd0aClcbiAgICAgICAgICB0aGlzLmNyb3BwZXJEYXRhLmhpZGRlbj10cnVlO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgdGhpcy4kZW1pdChcIndlcHlDcm9wcGVyRmluc2hcIixyZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTsgIC8vIOWjsOaYjumhtemdond4bWzkuK3moIfnrb7nmoTkuovku7blpITnkIblh73mlbDjgILms6jmhI/vvIzmraTlpITlj6rnlKjkuo7lo7DmmI7pobXpnaJ3eG1s5Lit5qCH562+55qEYmluZOOAgWNhdGNo5LqL5Lu277yM6Ieq5a6a5LmJ5pa55rOV6ZyA5Lul6Ieq5a6a5LmJ5pa55rOV55qE5pa55byP5aOw5piOXG5cbiAgICBldmVudHMgPSB7XG5cbiAgICB9OyAgLy8g5aOw5piO57uE5Lu25LmL6Ze055qE5LqL5Lu25aSE55CG5Ye95pWwXG5cblxuXG4gICAgaW5pdChXLCBIKSB7XG4gICAgICB0aGlzLmNyb3BwZXJEYXRhPXtcbiAgICAgICAgaGlkZGVuOiB0cnVlLFxuICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgIHdpZHRoOiBXLFxuICAgICAgICAgIGhlaWdodDogSCxcbiAgICAgICAgICBpdGVtTGVuZ3RoOiA1MCxcbiAgICAgICAgICBpbWFnZUluZm86IHtcbiAgICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIHNjYWxlSW5mbzoge1xuICAgICAgICAgIHg6IDEsXG4gICAgICAgICAgICB5OiAxXG4gICAgICAgIH0sXG4gICAgICAgIGNyb3BDYWxsYmFjazogbnVsbCxcbiAgICAgICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sICAgIC8vJ29yaWdpbmFsJyhkZWZhdWx0KSB8ICdjb21wcmVzc2VkJ1xuICAgICAgICAgIG9yaWdpbmFsOiBmYWxzZSwgIC8vIOm7mOiupOWOi+e8qe+8jOWOi+e8qeavlOS+i+S4uuaIquWbvueahDAuNFxuICAgICAgICAgIG1vZGU6ICdxdWFkcmFuZ2xlJywgLy/pu5jorqTnn6nlvaJcbiAgICAgIH1cbiAgICAgIHRoaXMuY3JvcHBlck1vdmFibGVJdGVtcz17XG4gICAgICAgIHRvcGxlZnQ6IHtcbiAgICAgICAgICB4OiA1MCxcbiAgICAgICAgICAgIHk6IDUwXG4gICAgICAgIH0sXG4gICAgICAgIHRvcHJpZ2h0OiB7XG4gICAgICAgICAgeDogVyAtIDUwLFxuICAgICAgICAgICAgeTogNTBcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tbGVmdDoge1xuICAgICAgICAgIHg6IDUwLFxuICAgICAgICAgICAgeTogSCAtIDUwXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbXJpZ2h0OiB7XG4gICAgICAgICAgeDogVyAtIDUwLFxuICAgICAgICAgICAgeTogSCAtIDUwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuY3JvcHBlckNoYW5nYWJsZURhdGE9e1xuICAgICAgICBjYW5Dcm9wOiB0cnVlLFxuICAgICAgICAgIHJvdGF0ZURlZ3JlZTogMCxcbiAgICAgICAgICBvcmlnaW5hbFNpemU6IHtcbiAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICB9LFxuICAgICAgICBzY2FsZVNpemU6IHtcbiAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOaYvuekumNyb3BwZXLvvIzlpoLmnpzmnInlm77niYfliJnovb3lhaVcbiAgICBzaG93Q3JvcHBlcihvcHRpb25zKXtcbiAgICAgIGxldCBzcmMgPSBvcHRpb25zLnNyY1xuICAgICAgbGV0IGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFja1xuICAgICAgbGV0IHNpemVUeXBlID0gb3B0aW9ucy5zaXplVHlwZVxuICAgICAgbGV0IG1vZGUgPSBvcHRpb25zLm1vZGVcblxuICAgICAgbGV0IGZpbHRlclR5cGUgPSBbXVxuICAgICAgaWYgKHNpemVUeXBlLmluZGV4T2YoJ29yaWdpbmFsJykgPiAtMSkge1xuICAgICAgICBmaWx0ZXJUeXBlLnB1c2goJ29yaWdpbmFsJylcbiAgICAgIH1cbiAgICAgIGlmIChzaXplVHlwZS5pbmRleE9mKCdjb21wcmVzc2VkJykgPiAtMSkge1xuICAgICAgICBmaWx0ZXJUeXBlLnB1c2goJ2NvbXByZXNzZWQnKVxuICAgICAgfVxuICAgICAgaWYgKGZpbHRlclR5cGUubGVuZ3RoID09IDEgJiYgZmlsdGVyVHlwZS5pbmRleE9mKCdvcmlnaW5hbCcpID4gLTEpIHtcbiAgICAgICAgdGhpcy5jcm9wcGVyRGF0YS5vcmlnaW5hbCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgdGhpcy5jcm9wcGVyRGF0YS5tb2RlID0gbW9kZVxuICAgICAgfVxuICAgICAgdGhpcy5jcm9wcGVyRGF0YS5oaWRkZW4gPSBmYWxzZVxuICAgICAgdGhpcy5jcm9wcGVyRGF0YS5jcm9wQ2FsbGJhY2sgPSBjYWxsYmFja1xuICAgICAgdGhpcy5jcm9wcGVyRGF0YS5zaXplVHlwZSA9IGZpbHRlclR5cGVcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG5cbiAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgd3guZ2V0SW1hZ2VJbmZvKHtcbiAgICAgICAgICBzcmM6IHNyYyxcbiAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PntcbiAgICAgICAgICAgIHZhciB3ID0gcmVzLndpZHRoLCBoID0gcmVzLmhlaWdodFxuXG4gICAgICAgICAgICB0aGlzLmxvYWRJbWFnZShzcmMsIHcsIGgsIGZhbHNlKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cblxuXG5cblxuXG5cbiAgICAvLyDmtYvor5VcblxuXG4gICAgLy8g5qC55o2u5Zu+54mH5aSn5bCP6K6+572uY2FudmFz5aSn5bCP77yM5bm257uY5Yi25Zu+54mHXG4gICAgbG9hZEltYWdlKHNyYywgd2lkdGgsIGhlaWdodCwgaXNSb3RhdGUpe1xuICAgICAgbGV0IHNpemUgPSBjcm9wcGVyVXRpbC5nZXRBZGp1c3RTaXplKFcsIEgsIHdpZHRoLCBoZWlnaHQpXG5cbiAgICAgIC8vIOmAguW6lOWxj+W5leeahOS9jee9rlxuICAgICAgbGV0IGxlZnQgPSAoVyAtIHNpemUud2lkdGgpIC8gMlxuICAgICAgbGV0IHRvcCA9IChIIC0gc2l6ZS5oZWlnaHQpIC8gMlxuXG4gICAgICAvLyBzZXQgZGF0YVxuICAgICAgbGV0IHVwZGF0ZURhdGEgPSB7fVxuICAgICAgbGV0IGNyb3BwZXJEYXRhID0gdGhpcy5jcm9wcGVyRGF0YVxuXG4gICAgICBpZiAoIWlzUm90YXRlKSB7XG4gICAgICAgIGNyb3BwZXJEYXRhLmltYWdlSW5mbyA9IHtcbiAgICAgICAgICBwYXRoOiBzcmMsXG4gICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNyb3BwZXJEYXRhLmxlZnQgPSBsZWZ0XG4gICAgICBjcm9wcGVyRGF0YS50b3AgPSB0b3BcbiAgICAgIGNyb3BwZXJEYXRhLndpZHRoID0gc2l6ZS53aWR0aFxuICAgICAgY3JvcHBlckRhdGEuaGVpZ2h0ID0gc2l6ZS5oZWlnaHRcblxuICAgICAgbGV0IGNvbXByZXNzZWRTY2FsZSA9IHRoaXMuY3JvcHBlckRhdGEub3JpZ2luYWwgPyAxLjAgOiAwLjRcbiAgICAgIC8vIGxldCBzY2FsZVNpemUgPSBjcm9wcGVyVXRpbC5nZXRBZGp1c3RTaXplKFcsIEgsIHdpZHRoLCBoZWlnaHQpXG5cbiAgICAgIGNyb3BwZXJEYXRhLnNjYWxlSW5mbyA9IHtcbiAgICAgICAgeDogd2lkdGggKiBjb21wcmVzc2VkU2NhbGUgLyBzaXplLndpZHRoLFxuICAgICAgICB5OiBoZWlnaHQgKiBjb21wcmVzc2VkU2NhbGUgLyBzaXplLmhlaWdodFxuICAgICAgfVxuXG4gICAgICB1cGRhdGVEYXRhLmNyb3BwZXJEYXRhID0gY3JvcHBlckRhdGFcblxuICAgICAgdXBkYXRlRGF0YS5jcm9wcGVyTW92YWJsZUl0ZW1zID0ge1xuICAgICAgICB0b3BsZWZ0OiB7XG4gICAgICAgICAgeDogNTAsXG4gICAgICAgICAgeTogNTBcbiAgICAgICAgfSxcbiAgICAgICAgdG9wcmlnaHQ6IHtcbiAgICAgICAgICB4OiBzaXplLndpZHRoIC0gNTAsXG4gICAgICAgICAgeTogNTBcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tbGVmdDoge1xuICAgICAgICAgIHg6IDUwLFxuICAgICAgICAgIHk6IHNpemUuaGVpZ2h0IC0gNTBcbiAgICAgICAgfSxcbiAgICAgICAgYm90dG9tcmlnaHQ6IHtcbiAgICAgICAgICB4OiBzaXplLndpZHRoIC0gNTAsXG4gICAgICAgICAgeTogc2l6ZS5oZWlnaHQgLSA1MFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjcm9wcGVyQ2hhbmdhYmxlRGF0YSA9IHRoaXMuY3JvcHBlckNoYW5nYWJsZURhdGFcbiAgICAgIGNyb3BwZXJDaGFuZ2FibGVEYXRhLm9yaWdpbmFsU2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgfVxuICAgICAgY3JvcHBlckNoYW5nYWJsZURhdGEuc2NhbGVTaXplID0ge1xuICAgICAgICB3aWR0aDogc2l6ZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBzaXplLmhlaWdodFxuICAgICAgfVxuXG4gICAgICB1cGRhdGVEYXRhLmNyb3BwZXJDaGFuZ2FibGVEYXRhID0gY3JvcHBlckNoYW5nYWJsZURhdGFcblxuICAgICAgdGhpcy5jcm9wcGVyRGF0YT11cGRhdGVEYXRhLmNyb3BwZXJEYXRhO1xuICAgICAgdGhpcy5jcm9wcGVyTW92YWJsZUl0ZW1zPXVwZGF0ZURhdGEuY3JvcHBlck1vdmFibGVJdGVtcztcblxuICAgICAgLy8gY29uc29sZS5sb2coXCJsb2FkSW1hZ2Ugc2l6ZTpcIiArIHdpZHRoICsgXCIqXCIgKyBoZWlnaHQpXG4gICAgICB0aGlzLmRyYXdJbWFnZSh7XG4gICAgICAgIHBhdGg6IHRoaXMuY3JvcHBlckRhdGEuaW1hZ2VJbmZvLnBhdGgsXG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgIH0pXG4gICAgICAvLyB0aGF0LmRyYXdJbWFnZSh0aGF0LmRhdGEuY3JvcHBlckRhdGEuaW1hZ2VJbmZvKVxuICAgICAgdGhpcy5kcmF3TGluZXModGhpcy5jcm9wcGVyTW92YWJsZUl0ZW1zLCB0aGlzLmNyb3BwZXJEYXRhLmltYWdlSW5mbylcbiAgICB9XG5cbiAgICAvLyDmuIXnqbpjYW52YXPkuIrnmoTmlbDmja5cbiAgICBjbGVhckNhbnZhcyhpbWFnZUluZm8pe1xuICAgICAgbGV0IGNyb3BwZXJEYXRhID0gdGhpcy5jcm9wcGVyRGF0YVxuICAgICAgbGV0IHNpemUgPSBjcm9wcGVyVXRpbC5nZXRBZGp1c3RTaXplKFcsIEgsIGltYWdlSW5mby53aWR0aCwgaW1hZ2VJbmZvLmhlaWdodClcblxuICAgICAgaWYgKGltYWdlSW5mby5wYXRoICE9ICcnKSB7XG4gICAgICAgIGxldCBjb21wcmVzc2VkU2NhbGUgPSB0aGlzLmNyb3BwZXJEYXRhLm9yaWdpbmFsID8gMS4wIDogMC40XG5cbiAgICAgICAgLy/muIXnqbrljp/lm75cbiAgICAgICAgbGV0IGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoXCJvcmlnaW5hbENhbnZhc1wiKVxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGltYWdlSW5mby53aWR0aCAqIGNvbXByZXNzZWRTY2FsZSwgaW1hZ2VJbmZvLmhlaWdodCAqIGNvbXByZXNzZWRTY2FsZSlcbiAgICAgICAgY3R4LmRyYXcoKVxuXG4gICAgICAgIC8v5riF56m66YCJ5oup5Yy65Zu+54mHXG4gICAgICAgIGxldCBjYW52YXMgPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KFwiY2FudmFzXCIpXG4gICAgICAgIGNhbnZhcy5jbGVhclJlY3QoMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpXG4gICAgICAgIGNhbnZhcy5kcmF3KClcblxuICAgICAgICAvLyDmuIXnqbrnmb3nur/moYZcbiAgICAgICAgbGV0IG1vdmVDYW52YXMgPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KFwibW92ZUNhbnZhc1wiKVxuICAgICAgICBtb3ZlQ2FudmFzLmNsZWFyUmVjdCgwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodClcbiAgICAgICAgbW92ZUNhbnZhcy5kcmF3KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL+e7mOWItuWbvueJh1xuICAgIGRyYXdJbWFnZShpbWFnZUluZm8pe1xuICAgICAgbGV0IGNyb3BwZXJEYXRhID0gdGhpcy5jcm9wcGVyRGF0YVxuICAgICAgbGV0IHNpemUgPSBjcm9wcGVyVXRpbC5nZXRBZGp1c3RTaXplKFcsIEgsIGltYWdlSW5mby53aWR0aCwgaW1hZ2VJbmZvLmhlaWdodClcblxuICAgICAgaWYgKGltYWdlSW5mby5wYXRoICE9ICcnKSB7XG4gICAgICAgIGxldCBwYXRoID0gaW1hZ2VJbmZvLnBhdGhcbiAgICAgICAgbGV0IGNvbXByZXNzZWRTY2FsZSA9IHRoaXMuY3JvcHBlckRhdGEub3JpZ2luYWwgPyAxLjAgOiAwLjRcbiAgICAgICAgbGV0IHJvdGF0ZURlZ3JlZSA9IHRoaXMuY3JvcHBlckNoYW5nYWJsZURhdGEucm90YXRlRGVncmVlXG5cbiAgICAgICAgLy/nu5jliLbljp/lm75cbiAgICAgICAgY3JvcHBlclV0aWwuZHJhd0ltYWdlV2l0aERlZ3JlZShcbiAgICAgICAgICBcIm9yaWdpbmFsQ2FudmFzXCIsXG4gICAgICAgICAgcGF0aCxcbiAgICAgICAgICBpbWFnZUluZm8ud2lkdGggKiBjb21wcmVzc2VkU2NhbGUsXG4gICAgICAgICAgaW1hZ2VJbmZvLmhlaWdodCAqIGNvbXByZXNzZWRTY2FsZSxcbiAgICAgICAgICByb3RhdGVEZWdyZWVcbiAgICAgICAgKVxuICAgICAgICAvLyBsZXQgb3JpZ2luYWxDYW52YXMgPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KFwib3JpZ2luYWxDYW52YXNcIilcbiAgICAgICAgLy8gb3JpZ2luYWxDYW52YXMuZHJhd0ltYWdlKHBhdGgsIDAsIDAsIGltYWdlSW5mby53aWR0aCAqIGNvbXByZXNzZWRTY2FsZSwgaW1hZ2VJbmZvLmhlaWdodCAqIGNvbXByZXNzZWRTY2FsZSlcbiAgICAgICAgLy8gb3JpZ2luYWxDYW52YXMuZHJhdygpXG5cbiAgICAgICAgLy/nu5jliLbpgInmi6nljLrlm77niYdcbiAgICAgICAgY3JvcHBlclV0aWwuZHJhd0ltYWdlV2l0aERlZ3JlZShcImNhbnZhc1wiLCBwYXRoLCBzaXplLndpZHRoLCBzaXplLmhlaWdodCwgcm90YXRlRGVncmVlKVxuICAgICAgICAvLyBsZXQgY2FudmFzID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dChcImNhbnZhc1wiKVxuICAgICAgICAvLyBjYW52YXMuZHJhd0ltYWdlKHBhdGgsIDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KVxuICAgICAgICAvLyBjYW52YXMuZHJhdygpXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZHJhdz1cIiArIHBhdGgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8g5Y2V54us57uY5Yi25Y6f5Zu+77yM5b2T5YiH5o2i5Y6f5Zu+5LiO6Z2e5Y6f5Zu+5pe25L2/55SoXG4gICAgZHJhd09yaWdpbmFsSW1hZ2UoKXtcbiAgICAgIGxldCBjcm9wcGVyRGF0YSA9IHRoaXMuY3JvcHBlckRhdGFcbiAgICAgIGxldCBpbWFnZUluZm8gPSBjcm9wcGVyRGF0YS5pbWFnZUluZm9cbiAgICAgIGxldCBvcmlnaW5hbFNpemUgPSB0aGlzLmNyb3BwZXJDaGFuZ2FibGVEYXRhLm9yaWdpbmFsU2l6ZVxuXG4gICAgICBpZiAoaW1hZ2VJbmZvLnBhdGggIT0gJycpIHtcbiAgICAgICAgbGV0IHBhdGggPSBpbWFnZUluZm8ucGF0aFxuICAgICAgICBsZXQgY29tcHJlc3NlZFNjYWxlID0gdGhpcy5jcm9wcGVyRGF0YS5vcmlnaW5hbCA/IDEuMCA6IDAuNFxuICAgICAgICBsZXQgcm90YXRlRGVncmVlID0gdGhpcy5jcm9wcGVyQ2hhbmdhYmxlRGF0YS5yb3RhdGVEZWdyZWVcblxuICAgICAgICAvL+e7mOWItuWOn+WbvlxuICAgICAgICBjcm9wcGVyVXRpbC5kcmF3SW1hZ2VXaXRoRGVncmVlKFxuICAgICAgICAgIFwib3JpZ2luYWxDYW52YXNcIixcbiAgICAgICAgICBwYXRoLFxuICAgICAgICAgIG9yaWdpbmFsU2l6ZS53aWR0aCAqIGNvbXByZXNzZWRTY2FsZSxcbiAgICAgICAgICBvcmlnaW5hbFNpemUuaGVpZ2h0ICogY29tcHJlc3NlZFNjYWxlLFxuICAgICAgICAgIHJvdGF0ZURlZ3JlZVxuICAgICAgICApXG4gICAgICAgIC8vIGxldCBvcmlnaW5hbENhbnZhcyA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoXCJvcmlnaW5hbENhbnZhc1wiKVxuICAgICAgICAvLyBvcmlnaW5hbENhbnZhcy5kcmF3SW1hZ2UocGF0aCwgMCwgMCwgaW1hZ2VJbmZvLndpZHRoICogY29tcHJlc3NlZFNjYWxlLCBpbWFnZUluZm8uaGVpZ2h0ICogY29tcHJlc3NlZFNjYWxlKVxuICAgICAgICAvLyBvcmlnaW5hbENhbnZhcy5kcmF3KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL+e7mOWItumAieahhlxuICAgIGRyYXdMaW5lcyhjcm9wcGVyTW92YWJsZUl0ZW1zLCBpbWFnZUluZm8sIGNhbGxiYWNrKXtcbiAgICAgIGxldCBjcm9wcGVyRGF0YSA9IHRoaXMuY3JvcHBlckRhdGFcbiAgICAgIGxldCBtb2RlID0gY3JvcHBlckRhdGEubW9kZVxuICAgICAgbGV0IHNpemUgPSBjcm9wcGVyVXRpbC5nZXRBZGp1c3RTaXplKFcsIEgsIGltYWdlSW5mby53aWR0aCwgaW1hZ2VJbmZvLmhlaWdodClcblxuICAgICAgbGV0IGNvbnZleERvdHMgPSBbXVxuICAgICAgbGV0IG9yZGVyZWREb3RzID0gW11cbiAgICAgIG9yZGVyZWREb3RzLnB1c2goY3JvcHBlck1vdmFibGVJdGVtc1sndG9wbGVmdCddKVxuICAgICAgb3JkZXJlZERvdHMucHVzaChjcm9wcGVyTW92YWJsZUl0ZW1zWyd0b3ByaWdodCddKVxuICAgICAgb3JkZXJlZERvdHMucHVzaChjcm9wcGVyTW92YWJsZUl0ZW1zWydib3R0b21yaWdodCddKVxuICAgICAgb3JkZXJlZERvdHMucHVzaChjcm9wcGVyTW92YWJsZUl0ZW1zWydib3R0b21sZWZ0J10pXG5cbiAgICAgIC8vIOiOt+WPluWHuOi+ueW9oueahOeCuVxuICAgICAgY29udmV4RG90cyA9IGNyb3BwZXJVdGlsLmNvbnZleEh1bGwob3JkZXJlZERvdHMsIG9yZGVyZWREb3RzLmxlbmd0aClcblxuICAgICAgLy8g5Zub5Liq54K557uE5oiQ55qE5Zub6L655b2i5piv5LiN5piv5Ye45Zub6L655b2iXG4gICAgICBsZXQgY2FuQ3JvcCA9IGNvbnZleERvdHMubGVuZ3RoID09IDRcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhjYW5Dcm9wKVxuICAgICAgfVxuXG4gICAgICBsZXQgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dChcIm1vdmVDYW52YXNcIilcblxuICAgICAgLy/nu5jliLbpq5jkuq7pgInkuK3ljLrln59cbiAgICAgIGxldCByZWN0ID0gY3JvcHBlclV0aWwuZ2V0Q3JvcFJlY3QoY29udmV4RG90cylcblxuICAgICAgaWYgKG1vZGUgPT0gJ3JlY3RhbmdsZScpIHtcbiAgICAgICAgLy8g57uY5Yi25Y2K6YCP5piO6YGu572pXG4gICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJ3JnYmEoMCwwLDAsMC41KScpXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodClcblxuICAgICAgICAvLyDmuIXpmaTpgInkuK3ljLrln5/nmoTljYrpgI/mmI7pga7nvanvvIzkvb/pgInkuK3ljLrln5/pq5jkuq5cbiAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgncmdiYSgwLDAsMCwwKScpXG4gICAgICAgIGN0eC5jbGVhclJlY3QocmVjdC54LCByZWN0LnksIHJlY3QudywgcmVjdC5oKVxuXG4gICAgICAgIC8v57uY5Yi26YCJ5Lit6L655qGGXG4gICAgICAgIGN0eC5zZXRTdHJva2VTdHlsZSgnd2hpdGUnKVxuICAgICAgICBjdHguc2V0TGluZVdpZHRoKDIpXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKVxuICAgICAgICBjdHgubW92ZVRvKHJlY3QueCwgcmVjdC55KVxuICAgICAgICBjdHgubGluZVRvKHJlY3QueCArIHJlY3QudywgcmVjdC55KVxuICAgICAgICBjdHgubGluZVRvKHJlY3QueCArIHJlY3QudywgcmVjdC55ICsgcmVjdC5oKVxuICAgICAgICBjdHgubGluZVRvKHJlY3QueCwgcmVjdC55ICsgcmVjdC5oKVxuICAgICAgICBjdHgubGluZVRvKHJlY3QueCwgcmVjdC55KVxuXG4gICAgICAgIGN0eC5zdHJva2UoKVxuICAgICAgICBjdHguY2xvc2VQYXRoKClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvL+e7mOWItumAieS4rei+ueahhlxuICAgICAgICAvLyDlpoLmnpzlm5vkuKrngrnnu4TmiJDnmoTlm5vovrnlvaLkuI3mmK/lh7jlm5vovrnlvaLvvIzliJnmmL7npLrnuqLoibLvvIzooajnpLrkuI3lj6/lj5ZcbiAgICAgICAgbGV0IGNvbG9yID0gY2FuQ3JvcCA/ICd3aGl0ZScgOiAncmVkJ1xuXG4gICAgICAgIGN0eC5zZXRTdHJva2VTdHlsZShjb2xvcilcbiAgICAgICAgY3R4LnNldExpbmVXaWR0aCgyKVxuICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNvbnZleERvdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBsZXQgZG90ID0gY29udmV4RG90c1tpXVxuICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oZG90LngsIGRvdC55KVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oZG90LngsIGRvdC55KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgZG90ID0gY29udmV4RG90c1swXVxuICAgICAgICBjdHgubGluZVRvKGRvdC54LCBkb3QueSlcblxuICAgICAgICBjdHguc3Ryb2tlKClcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgICB9XG5cbiAgICAgIC8v57uY5Yi25Zub5Liq6KeSXG4gICAgICBsZXQgY29ybmVyVHlwZSA9IG1vZGUgPT0gJ3JlY3RhbmdsZScgPyAncmVjdCcgOiAnY2lyY2xlJ1xuICAgICAgY3R4LnNldEZpbGxTdHlsZSgnd2hpdGUnKVxuICAgICAgY3R4LnNldFN0cm9rZVN0eWxlKCd3aGl0ZScpXG5cbiAgICAgIC8vIOe7mOWItuS4jeWQjOagt+W8j+eahOinklxuICAgICAgaWYgKGNvcm5lclR5cGUgPT0gJ2NpcmNsZScpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG9yZGVyZWREb3RzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgbGV0IGRvdCA9IG9yZGVyZWREb3RzW2ldXG5cbiAgICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgICBjdHguYXJjKGRvdC54LCBkb3QueSwgMTAsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKVxuICAgICAgICAgIGN0eC5maWxsKClcbiAgICAgICAgICBjdHguY2xvc2VQYXRoKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY29ybmVyVHlwZSA9PSAncmVjdCcpIHtcbiAgICAgICAgbGV0IGxlbiA9IDIwLCB3ID0gMy4wLCBvZmZzZXQgPSB3IC8gMi4wXG5cbiAgICAgICAgY3R4LnNldExpbmVXaWR0aCh3KVxuICAgICAgICBjdHguYmVnaW5QYXRoKClcblxuICAgICAgICBjdHgubW92ZVRvKHJlY3QueCAtIG9mZnNldCwgcmVjdC55IC0gb2Zmc2V0ICsgbGVuKVxuICAgICAgICBjdHgubGluZVRvKHJlY3QueCAtIG9mZnNldCwgcmVjdC55IC0gb2Zmc2V0KVxuICAgICAgICBjdHgubGluZVRvKHJlY3QueCAtIG9mZnNldCArIGxlbiwgcmVjdC55IC0gb2Zmc2V0KVxuXG4gICAgICAgIGN0eC5tb3ZlVG8ocmVjdC54ICsgb2Zmc2V0ICsgcmVjdC53IC0gbGVuLCByZWN0LnkgLSBvZmZzZXQpXG4gICAgICAgIGN0eC5saW5lVG8ocmVjdC54ICsgb2Zmc2V0ICsgcmVjdC53LCByZWN0LnkgLSBvZmZzZXQpXG4gICAgICAgIGN0eC5saW5lVG8ocmVjdC54ICsgb2Zmc2V0ICsgcmVjdC53LCByZWN0LnkgLSBvZmZzZXQgKyBsZW4pXG5cbiAgICAgICAgY3R4Lm1vdmVUbyhyZWN0LnggKyBvZmZzZXQgKyByZWN0LncsIHJlY3QueSArIG9mZnNldCArIHJlY3QuaCAtIGxlbilcbiAgICAgICAgY3R4LmxpbmVUbyhyZWN0LnggKyBvZmZzZXQgKyByZWN0LncsIHJlY3QueSArIG9mZnNldCArIHJlY3QuaClcbiAgICAgICAgY3R4LmxpbmVUbyhyZWN0LnggKyBvZmZzZXQgKyByZWN0LncgLSBsZW4sIHJlY3QueSArIG9mZnNldCArIHJlY3QuaClcblxuICAgICAgICBjdHgubW92ZVRvKHJlY3QueCAtIG9mZnNldCwgcmVjdC55ICsgb2Zmc2V0ICsgcmVjdC5oIC0gbGVuKVxuICAgICAgICBjdHgubGluZVRvKHJlY3QueCAtIG9mZnNldCwgcmVjdC55ICsgb2Zmc2V0ICsgcmVjdC5oKVxuICAgICAgICBjdHgubGluZVRvKHJlY3QueCAtIG9mZnNldCArIGxlbiwgcmVjdC55ICsgb2Zmc2V0ICsgcmVjdC5oKVxuXG4gICAgICAgIGN0eC5zdHJva2UoKVxuXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgICAgfVxuXG4gICAgICBjdHguZHJhdygpXG4gICAgfVxuXG4gICAgLy8gbW92ZSBldmVudHNcbiAgICBzZXR1cE1vdmVJdGVtKGtleSwgY2hhbmdlZFRvdWNoZXMsIGltYWdlSW5mbywgY2FsbGJhY2spe1xuICAgICAgbGV0IGNyb3BwZXJEYXRhID0gdGhpcy5jcm9wcGVyRGF0YVxuICAgICAgbGV0IGNyb3BwZXJNb3ZhYmxlSXRlbXMgPSB0aGlzLmNyb3BwZXJNb3ZhYmxlSXRlbXNcbiAgICAgIGxldCBsZWZ0ID0gY3JvcHBlckRhdGEubGVmdFxuICAgICAgbGV0IHRvcCA9IGNyb3BwZXJEYXRhLnRvcFxuICAgICAgbGV0IG1vZGUgPSBjcm9wcGVyRGF0YS5tb2RlXG4gICAgICBsZXQgc2l6ZSA9IGNyb3BwZXJVdGlsLmdldEFkanVzdFNpemUoVywgSCwgaW1hZ2VJbmZvLndpZHRoLCBpbWFnZUluZm8uaGVpZ2h0KVxuXG4gICAgICBpZiAoY2hhbmdlZFRvdWNoZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgbGV0IHRvdWNoID0gY2hhbmdlZFRvdWNoZXNbMF1cbiAgICAgICAgbGV0IHggPSB0b3VjaC5jbGllbnRYXG4gICAgICAgIGxldCB5ID0gdG91Y2guY2xpZW50WVxuXG4gICAgICAgIC8vIOebuOWvueeUu+W4g+eahOeCuVxuICAgICAgICB4ID0geCAtIGxlZnRcbiAgICAgICAgeSA9IHkgLSB0b3BcblxuICAgICAgICBjcm9wcGVyTW92YWJsZUl0ZW1zW2tleV0ueCA9IHhcbiAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1trZXldLnkgPSB5XG5cbiAgICAgICAgLy8g6L6555WM5qOA5rWL77yM5L2/5oiq5Zu+5LiN6LaF5Ye65oiq5Zu+5Yy65Z+fXG4gICAgICAgIHggPSB4IDwgMCA/IDAgOiAoeCA+IHNpemUud2lkdGggPyBzaXplLndpZHRoIDogeClcbiAgICAgICAgeSA9IHkgPCAwID8gMCA6ICh5ID4gc2l6ZS5oZWlnaHQgPyBzaXplLmhlaWdodCA6IHkpXG4gICAgICAgIGNyb3BwZXJNb3ZhYmxlSXRlbXNba2V5XS54ID0geFxuICAgICAgICBjcm9wcGVyTW92YWJsZUl0ZW1zW2tleV0ueSA9IHlcblxuICAgICAgICAvLyDlpoLmnpzmmK/lnKjnn6nlvaLmqKHlvI/kuItcbiAgICAgICAgaWYgKG1vZGUgPT0gJ3JlY3RhbmdsZScpIHtcbiAgICAgICAgICAvLyDlkIzml7borr7nva7nm7jov57kuKTkuKrngrnnmoTkvY3nva7vvIzmmK/nm7jpgrvnmoTkuKTkuKrngrnot5/pmo/nnYDnp7vliqjngrnliqjvvIzkv53or4HpgInmoYbkuLrnn6nlvaJcbiAgICAgICAgICBpZiAoa2V5ID09ICd0b3BsZWZ0Jykge1xuICAgICAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1snYm90dG9tbGVmdCddLnggPSB4XG4gICAgICAgICAgICBjcm9wcGVyTW92YWJsZUl0ZW1zWyd0b3ByaWdodCddLnkgPSB5XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGtleSA9PSAndG9wcmlnaHQnKSB7XG4gICAgICAgICAgICBjcm9wcGVyTW92YWJsZUl0ZW1zWydib3R0b21yaWdodCddLnggPSB4XG4gICAgICAgICAgICBjcm9wcGVyTW92YWJsZUl0ZW1zWyd0b3BsZWZ0J10ueSA9IHlcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoa2V5ID09ICdib3R0b21sZWZ0Jykge1xuICAgICAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1sndG9wbGVmdCddLnggPSB4XG4gICAgICAgICAgICBjcm9wcGVyTW92YWJsZUl0ZW1zWydib3R0b21yaWdodCddLnkgPSB5XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGtleSA9PSAnYm90dG9tcmlnaHQnKSB7XG4gICAgICAgICAgICBjcm9wcGVyTW92YWJsZUl0ZW1zWyd0b3ByaWdodCddLnggPSB4XG4gICAgICAgICAgICBjcm9wcGVyTW92YWJsZUl0ZW1zWydib3R0b21sZWZ0J10ueSA9IHlcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYXdMaW5lcyhjcm9wcGVyTW92YWJsZUl0ZW1zLCBpbWFnZUluZm8sIGZ1bmN0aW9uIChjYW5Dcm9wKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhjcm9wcGVyTW92YWJsZUl0ZW1zLCBjYW5Dcm9wKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cblxuXG5cbiAgfVxuIl19