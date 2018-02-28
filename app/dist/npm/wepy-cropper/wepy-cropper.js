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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlcHktY3JvcHBlci5qcyJdLCJuYW1lcyI6WyJkZXZpY2UiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwiVyIsIndpbmRvd1dpZHRoIiwiSCIsIndpbmRvd0hlaWdodCIsImdldENyb3BSZWN0IiwiY3JvcHBlck1vdmFibGVJdGVtcyIsIm1heFgiLCJtYXhZIiwia2V5IiwiaXRlbSIsIngiLCJ5IiwibWluWCIsIm1pblkiLCJ3IiwiaCIsIm9yaWVudGF0aW9uIiwicCIsInEiLCJyIiwidmFsIiwiY29udmV4SHVsbCIsInBvaW50cyIsIm4iLCJodWxsIiwibCIsImkiLCJwdXNoIiwiZHJhd0ltYWdlV2l0aERlZ3JlZSIsImNhbnZhc0lkIiwicGF0aCIsIndpZHRoIiwiaGVpZ2h0IiwiZGVncmVlIiwiY3R4IiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsImlzVmVydGljYWwiLCJkcmF3V2lkdGgiLCJkcmF3SGVpZ2h0IiwiY2VudGVyWCIsImNuZXRlclkiLCJkcmF3Q2VudGVyWCIsImRyYXdDbmV0ZXJZIiwiZCIsIk1hdGgiLCJhYnMiLCJ0cmFuc2xhdGUiLCJyb3RhdGUiLCJQSSIsImRyYXdJbWFnZSIsImRyYXciLCJlIiwiY29uc29sZSIsImxvZyIsImdldEFkanVzdFNpemUiLCJjcm9wcGVyVXRpbCIsIk15UGFnZSIsInByb3BzIiwicGFyYW1zIiwidHlwZSIsIk9iamVjdCIsImRlZmF1bHQiLCJzcmMiLCJtb2RlIiwic2l6ZVR5cGUiLCJ0d29XYXkiLCJjdXN0b21EYXRhIiwiY29uZmlnIiwiZGF0YSIsImNyb3BwZXJEYXRhIiwiY3JvcHBlckNoYW5nYWJsZURhdGEiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiY29tcHV0ZWQiLCJ3YXRjaCIsIm5ld1ZhbCIsInNob3dDcm9wcGVyIiwibWV0aG9kcyIsIm1vdmVFdmVudCIsIm9yaWdpbmFsU2l6ZSIsInNldHVwTW92ZUl0ZW0iLCJjaGFuZ2VkVG91Y2hlcyIsImltYWdlSW5mbyIsImVuZEV2ZW50IiwiY2FuQ3JvcCIsIiRhcHBseSIsImhpZGVDcm9wcGVyIiwiaGlkZGVuIiwiY3JvcENhbGxiYWNrIiwidG9wbGVmdCIsInRvcHJpZ2h0IiwiYm90dG9tbGVmdCIsImJvdHRvbXJpZ2h0Iiwicm90YXRlRGVncmVlIiwiY2xlYXJDYW52YXMiLCJyb3RhdGVJbWFnZSIsInJvdGF0ZVdpZHRoIiwicm90YXRlSGVpZ2h0Iiwic2l6ZSIsImxlZnQiLCJ0b3AiLCJzY2FsZVNpemUiLCJjcm9wcGVyTW92YWJsZUl0ZW1zQ29weSIsInRoYXQiLCJzZXRUaW1lb3V0IiwibG9hZEltYWdlIiwib3JpZ2luYWxDaGFuZ2UiLCJvcmlnaW5hbCIsImNvbXByZXNzZWRTY2FsZSIsInNjYWxlSW5mbyIsImNyb3BwZXJEYXQiLCJkcmF3T3JpZ2luYWxJbWFnZSIsImNyb3BJbWFnZSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJjYW52YXNUb1RlbXBGaWxlUGF0aCIsImRlc3RXaWR0aCIsImRlc3RIZWlnaHQiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVQYXRoIiwiaGlkZUxvYWRpbmciLCIkZW1pdCIsImZhaWwiLCJjZWlsIiwiaW5kZXgiLCJsZW5ndGgiLCJldmVudHMiLCJvcHRpb25zIiwiaW5pdCIsIml0ZW1MZW5ndGgiLCJjYWxsYmFjayIsImZpbHRlclR5cGUiLCJpbmRleE9mIiwiZ2V0SW1hZ2VJbmZvIiwiaXNSb3RhdGUiLCJ1cGRhdGVEYXRhIiwiZHJhd0xpbmVzIiwiY2xlYXJSZWN0IiwiY2FudmFzIiwibW92ZUNhbnZhcyIsImNvbnZleERvdHMiLCJvcmRlcmVkRG90cyIsInJlY3QiLCJzZXRGaWxsU3R5bGUiLCJmaWxsUmVjdCIsInNldFN0cm9rZVN0eWxlIiwic2V0TGluZVdpZHRoIiwiYmVnaW5QYXRoIiwibW92ZVRvIiwibGluZVRvIiwic3Ryb2tlIiwiY2xvc2VQYXRoIiwiY29sb3IiLCJsZW4iLCJkb3QiLCJjb3JuZXJUeXBlIiwiYXJjIiwiZmlsbCIsIm9mZnNldCIsInRvdWNoIiwiY2xpZW50WCIsImNsaWVudFkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxTQUFTQyxHQUFHQyxpQkFBSCxFQUFmO0FBQ0EsSUFBTUMsSUFBSUgsT0FBT0ksV0FBakI7QUFDQSxJQUFNQyxJQUFJTCxPQUFPTSxZQUFQLEdBQXNCLEVBQWhDO0FBQ0E7QUFDQSxJQUFNQyxjQUFjLFNBQWRBLFdBQWMsQ0FBQ0MsbUJBQUQsRUFBeUI7QUFDM0MsTUFBSUMsT0FBTyxDQUFYO0FBQUEsTUFBY0MsT0FBTyxDQUFyQjtBQUNBLE9BQUssSUFBSUMsR0FBVCxJQUFnQkgsbUJBQWhCLEVBQXFDO0FBQ25DLFFBQUlJLE9BQU9KLG9CQUFvQkcsR0FBcEIsQ0FBWDtBQUNBRixXQUFPRyxLQUFLQyxDQUFMLEdBQVNKLElBQVQsR0FBZ0JHLEtBQUtDLENBQXJCLEdBQXlCSixJQUFoQztBQUNBQyxXQUFPRSxLQUFLRSxDQUFMLEdBQVNKLElBQVQsR0FBZ0JFLEtBQUtFLENBQXJCLEdBQXlCSixJQUFoQztBQUNEOztBQUVELE1BQUlLLE9BQU9OLElBQVg7QUFBQSxNQUFpQk8sT0FBT04sSUFBeEI7QUFDQSxPQUFLLElBQUlDLElBQVQsSUFBZ0JILG1CQUFoQixFQUFxQztBQUNuQyxRQUFJSSxRQUFPSixvQkFBb0JHLElBQXBCLENBQVg7QUFDQUksV0FBT0gsTUFBS0MsQ0FBTCxHQUFTRSxJQUFULEdBQWdCSCxNQUFLQyxDQUFyQixHQUF5QkUsSUFBaEM7QUFDQUMsV0FBT0osTUFBS0UsQ0FBTCxHQUFTRSxJQUFULEdBQWdCSixNQUFLRSxDQUFyQixHQUF5QkUsSUFBaEM7QUFDRDs7QUFFRCxTQUFPO0FBQ0xILE9BQUdFLElBREU7QUFFTEQsT0FBR0UsSUFGRTtBQUdMQyxPQUFHUixPQUFPTSxJQUhMO0FBSUxHLE9BQUdSLE9BQU9NO0FBSkwsR0FBUDtBQU1ELENBckJEO0FBc0JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTRyxXQUFULENBQXFCQyxDQUFyQixFQUF3QkMsQ0FBeEIsRUFBMkJDLENBQTNCLEVBQThCO0FBQzVCLE1BQUlDLE1BQU0sQ0FBQ0YsRUFBRVAsQ0FBRixHQUFNTSxFQUFFTixDQUFULEtBQWVRLEVBQUVULENBQUYsR0FBTVEsRUFBRVIsQ0FBdkIsSUFBNEIsQ0FBQ1EsRUFBRVIsQ0FBRixHQUFNTyxFQUFFUCxDQUFULEtBQWVTLEVBQUVSLENBQUYsR0FBTU8sRUFBRVAsQ0FBdkIsQ0FBdEM7O0FBRUEsTUFBSVMsT0FBTyxDQUFYLEVBQWMsT0FBTyxDQUFQLENBSGMsQ0FHSDtBQUN6QixTQUFRQSxNQUFNLENBQVAsR0FBWSxDQUFaLEdBQWdCLENBQXZCLENBSjRCLENBSUY7QUFDM0I7O0FBRUQsU0FBU0MsVUFBVCxDQUFvQkMsTUFBcEIsRUFBNEJDLENBQTVCLEVBQStCO0FBQzdCO0FBQ0EsTUFBSUEsSUFBSSxDQUFSLEVBQVc7O0FBRVg7QUFDQSxNQUFJQyxPQUFPLEVBQVg7O0FBRUE7QUFDQSxNQUFJQyxJQUFJLENBQVI7QUFDQSxPQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsQ0FBcEIsRUFBdUJHLEdBQXZCLEVBQTRCO0FBQzFCLFFBQUlKLE9BQU9JLENBQVAsRUFBVWhCLENBQVYsR0FBY1ksT0FBT0csQ0FBUCxFQUFVZixDQUE1QixFQUErQjtBQUM3QmUsVUFBSUMsQ0FBSjtBQUNEO0FBQ0Y7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUlULElBQUlRLENBQVI7QUFBQSxNQUFXUCxDQUFYO0FBQ0EsS0FBRztBQUNEO0FBQ0E7QUFDQTtBQUNBTSxTQUFLRyxJQUFMLENBQVVMLE9BQU9MLENBQVAsQ0FBVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxRQUFJLENBQUNELElBQUksQ0FBTCxJQUFVTSxDQUFkOztBQUVBLFNBQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxDQUFwQixFQUF1QkcsR0FBdkIsRUFBNEI7QUFDMUI7QUFDQTtBQUNBLFVBQUlWLFlBQVlNLE9BQU9MLENBQVAsQ0FBWixFQUF1QkssT0FBT0ksQ0FBUCxDQUF2QixFQUFrQ0osT0FBT0osQ0FBUCxDQUFsQyxLQUFnRCxDQUFwRCxFQUNFQSxJQUFJUSxDQUFKO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0FULFFBQUlDLENBQUo7QUFFRCxHQTNCRCxRQTJCU0QsS0FBS1EsQ0EzQmQsRUFuQjZCLENBOENWO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFPRCxJQUFQO0FBQ0Q7O0FBRUQsU0FBU0ksbUJBQVQsQ0FBNkJDLFFBQTdCLEVBQXVDQyxJQUF2QyxFQUE2Q0MsS0FBN0MsRUFBb0RDLE1BQXBELEVBQTREQyxNQUE1RCxFQUFvRTtBQUNsRSxNQUFJQyxNQUFNcEMsR0FBR3FDLG1CQUFILENBQXVCTixRQUF2QixDQUFWOztBQUVBLE1BQUlPLGFBQWFILFNBQVMsR0FBVCxHQUFlLENBQWhDOztBQUVBLE1BQUlJLFlBQVlELGFBQWFKLE1BQWIsR0FBc0JELEtBQXRDO0FBQ0EsTUFBSU8sYUFBYUYsYUFBYUwsS0FBYixHQUFxQkMsTUFBdEM7O0FBRUEsTUFBSU8sVUFBVVIsUUFBUSxDQUF0QjtBQUNBLE1BQUlTLFVBQVVSLFNBQVMsQ0FBdkI7O0FBRUEsTUFBSVMsY0FBY0osWUFBWSxDQUE5QjtBQUNBLE1BQUlLLGNBQWNKLGFBQWEsQ0FBL0I7O0FBRUEsTUFBSUssSUFBSUMsS0FBS0MsR0FBTCxDQUFTZCxRQUFNQyxNQUFmLElBQXVCLENBQS9COztBQUVBO0FBQ0E7QUFDQTs7QUFFQUUsTUFBSVksU0FBSixDQUFjUCxPQUFkLEVBQXVCQyxPQUF2QjtBQUNBTixNQUFJYSxNQUFKLENBQVdkLFNBQVNXLEtBQUtJLEVBQWQsR0FBbUIsR0FBOUI7QUFDQWQsTUFBSVksU0FBSixDQUFjLENBQUNQLE9BQWYsRUFBd0IsQ0FBQ0MsT0FBekI7O0FBRUE7QUFDQSxNQUFJSixVQUFKLEVBQWdCO0FBQ2QsUUFBSUUsYUFBYUQsU0FBakIsRUFBNEI7QUFDMUJILFVBQUllLFNBQUosQ0FBY25CLElBQWQsRUFBb0JhLENBQXBCLEVBQXVCLENBQUNBLENBQXhCLEVBQTJCTixTQUEzQixFQUFzQ0MsVUFBdEM7QUFDRCxLQUZELE1BR0s7QUFDSEosVUFBSWUsU0FBSixDQUFjbkIsSUFBZCxFQUFvQixDQUFDYSxDQUFyQixFQUF3QkEsQ0FBeEIsRUFBMkJOLFNBQTNCLEVBQXNDQyxVQUF0QztBQUNEO0FBQ0YsR0FQRCxNQVFLO0FBQ0hKLFFBQUllLFNBQUosQ0FBY25CLElBQWQsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEJPLFNBQTFCLEVBQXFDQyxVQUFyQztBQUNEOztBQUVESixNQUFJZ0IsSUFBSixDQUFTLEtBQVQsRUFBZ0IsVUFBVUMsQ0FBVixFQUFhO0FBQzNCQyxZQUFRQyxHQUFSLENBQVksZUFBWjtBQUNELEdBRkQ7QUFHRDs7QUFFRDtBQUNBLElBQU1DLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ3RELENBQUQsRUFBSUUsQ0FBSixFQUFPNkIsS0FBUCxFQUFjQyxNQUFkLEVBQXlCO0FBQzdDLE1BQUlELFFBQVEvQixDQUFaLEVBQWU7QUFDYmdDLGFBQVNoQyxJQUFJK0IsS0FBSixHQUFZQyxNQUFyQjtBQUNBRCxZQUFRL0IsQ0FBUjtBQUNEOztBQUVELE1BQUlnQyxTQUFTOUIsQ0FBYixFQUFnQjtBQUNkNkIsWUFBUTdCLElBQUk4QixNQUFKLEdBQWFELEtBQXJCO0FBQ0FDLGFBQVM5QixDQUFUO0FBQ0Q7O0FBRUQsU0FBTztBQUNMNkIsV0FBT0EsS0FERjtBQUVMQyxZQUFRQTtBQUZILEdBQVA7QUFJRCxDQWZEO0FBZ0JBLElBQU11QixjQUFjO0FBQ2xCbkQsMEJBRGtCO0FBRWxCa0QsOEJBRmtCO0FBR2xCakMsd0JBSGtCO0FBSWxCTztBQUprQixDQUFwQjs7SUFPcUI0QixNOzs7Ozs7Ozs7Ozs7OztzTEFFbkJDLEssR0FBUTtBQUNOQyxjQUFPO0FBQ0xDLGNBQUtDLE1BREE7QUFFTEMsaUJBQVE7QUFDTkMsZUFBSSxFQURFO0FBRU5DLGdCQUFLLFdBRkM7QUFHTkMsb0JBQVM7QUFISCxTQUZIO0FBT0xDLGdCQUFRO0FBUEg7QUFERCxLLFFBV1JDLFUsR0FBYSxFLFFBYWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxtQkFBWSxFQURQO0FBRUxoRSwyQkFBb0IsRUFGZjtBQUdMaUUsNEJBQXFCOztBQUhoQixLLFFBUVBDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLFEsR0FBVyxFLFFBRVhDLEssR0FBUTtBQUNOaEIsWUFETSxrQkFDQ2lCLE1BREQsRUFDUTtBQUNaQSxlQUFPWixJQUFQLEdBQVlZLE9BQU9aLElBQVAsR0FBWVksT0FBT1osSUFBbkIsR0FBd0IsV0FBcEM7QUFDQVksZUFBT1gsUUFBUCxHQUFnQlcsT0FBT1gsUUFBUCxHQUFnQlcsT0FBT1gsUUFBdkIsR0FBZ0MsWUFBaEQ7QUFDQSxhQUFLWSxXQUFMLENBQWlCRCxNQUFqQjtBQUNEO0FBTEssSyxRQVFSRSxPLEdBQVU7QUFDUjtBQUNBQyxlQUZRLHFCQUVFdEUsR0FGRixFQUVNMkMsQ0FGTixFQUVRO0FBQ2QsWUFBSTRCLGVBQWUsS0FBS1Qsb0JBQUwsQ0FBMEJTLFlBQTdDOztBQUVBLGFBQUtDLGFBQUwsQ0FBbUJ4RSxHQUFuQixFQUF3QjJDLEVBQUU4QixjQUExQixFQUEwQztBQUN4Q25ELGdCQUFNLEtBQUt1QyxXQUFMLENBQWlCYSxTQUFqQixDQUEyQnBELElBRE87QUFFeENDLGlCQUFPZ0QsYUFBYWhELEtBRm9CO0FBR3hDQyxrQkFBUStDLGFBQWEvQztBQUhtQixTQUExQztBQUtELE9BVk87OztBQVlSO0FBQ0FtRCxjQWJRLG9CQWFDM0UsR0FiRCxFQWFLMkMsQ0FiTCxFQWFPO0FBQUE7O0FBQ2IsWUFBSWtCLGNBQWMsS0FBS0EsV0FBdkI7QUFDQSxZQUFJaEUsc0JBQXNCLEtBQUtBLG1CQUEvQjtBQUNBLFlBQUlpRSx1QkFBdUIsS0FBS0Esb0JBQWhDO0FBQ0EsWUFBSVMsZUFBZVQscUJBQXFCUyxZQUF4Qzs7QUFFQSxhQUFLQyxhQUFMLENBQW1CeEUsR0FBbkIsRUFBd0IyQyxFQUFFOEIsY0FBMUIsRUFBMEM7QUFDeENuRCxnQkFBTSxLQUFLdUMsV0FBTCxDQUFpQmEsU0FBakIsQ0FBMkJwRCxJQURPO0FBRXhDQyxpQkFBT2dELGFBQWFoRCxLQUZvQjtBQUd4Q0Msa0JBQVErQyxhQUFhL0M7QUFIbUIsU0FBMUMsRUFJRyxVQUFDM0IsbUJBQUQsRUFBc0IrRSxPQUF0QixFQUFrQztBQUNuQ2QsK0JBQXFCYyxPQUFyQixHQUErQkEsT0FBL0I7QUFDQSxpQkFBS2Qsb0JBQUwsR0FBMEJBLG9CQUExQjtBQUNBLGlCQUFLakUsbUJBQUwsR0FBMEJBLG1CQUExQjtBQUNBLGlCQUFLZ0YsTUFBTDtBQUNELFNBVEQ7QUFVRCxPQTdCTzs7O0FBK0JSO0FBQ0FDLGlCQWhDUSx5QkFnQ0s7O0FBRVgsYUFBS2pCLFdBQUwsQ0FBaUJrQixNQUFqQixHQUEwQixJQUExQjtBQUNBLGFBQUtsQixXQUFMLENBQWlCbUIsWUFBakIsR0FBZ0MsSUFBaEM7O0FBRUEsYUFBS25CLFdBQUwsR0FBaUIsS0FBS0QsSUFBTCxDQUFVQyxXQUEzQixFQUNFLEtBQUtoRSxtQkFBTCxHQUEwQjtBQUN4Qm9GLG1CQUFTO0FBQ1AvRSxlQUFHLENBQUMsQ0FERztBQUVQQyxlQUFHLENBQUM7QUFGRyxXQURlO0FBS3hCK0Usb0JBQVU7QUFDUmhGLGVBQUcsQ0FBQyxDQURJO0FBRVJDLGVBQUcsQ0FBQztBQUZJLFdBTGM7QUFTeEJnRixzQkFBWTtBQUNWakYsZUFBRyxDQUFDLENBRE07QUFFVkMsZUFBRyxDQUFDO0FBRk0sV0FUWTtBQWF4QmlGLHVCQUFhO0FBQ1hsRixlQUFHLENBQUMsQ0FETztBQUVYQyxlQUFHLENBQUM7QUFGTztBQWJXLFNBRDVCLEVBbUJFLEtBQUsyRCxvQkFBTCxHQUEyQjtBQUN6QmMsbUJBQVMsSUFEZ0I7QUFFekJTLHdCQUFjO0FBRlcsU0FuQjdCOztBQXdCQSxhQUFLQyxXQUFMLENBQWlCLEtBQUt6QixXQUFMLENBQWlCYSxTQUFsQztBQUNELE9BOURPOzs7QUFnRVI7QUFDQWEsaUJBakVRLHlCQWlFSztBQUNYLFlBQUliLFlBQVksS0FBS2QsSUFBTCxDQUFVQyxXQUFWLENBQXNCYSxTQUF0QztBQUNBLFlBQUluRCxRQUFRbUQsVUFBVW5ELEtBQXRCO0FBQ0EsWUFBSUMsU0FBU2tELFVBQVVsRCxNQUF2QjtBQUNBLFlBQUk2RCxlQUFlLEtBQUt2QixvQkFBTCxDQUEwQnVCLFlBQTdDOztBQUVBQSx1QkFBZUEsZ0JBQWdCLEdBQWhCLEdBQXNCLEVBQXRCLEdBQTJCQSxlQUFlLEVBQXpEOztBQUVBO0FBQ0EsWUFBSXpELGFBQWF5RCxlQUFlLEdBQWYsR0FBcUIsQ0FBdEM7QUFDQSxZQUFJRyxjQUFjNUQsYUFBYUosTUFBYixHQUFzQkQsS0FBeEM7QUFDQSxZQUFJa0UsZUFBZTdELGFBQWFMLEtBQWIsR0FBcUJDLE1BQXhDOztBQUVBLFlBQUlrRSxPQUFPM0MsWUFBWUQsYUFBWixDQUEwQnRELENBQTFCLEVBQTZCRSxDQUE3QixFQUFnQzhGLFdBQWhDLEVBQTZDQyxZQUE3QyxDQUFYOztBQUVBO0FBQ0EsWUFBSUUsT0FBTyxDQUFDbkcsSUFBSWtHLEtBQUtuRSxLQUFWLElBQW1CLENBQTlCO0FBQ0EsWUFBSXFFLE1BQU0sQ0FBQ2xHLElBQUlnRyxLQUFLbEUsTUFBVixJQUFvQixDQUE5QjtBQUNBLFlBQUlxQyxjQUFjLEtBQUtBLFdBQXZCOztBQUVBQSxvQkFBWThCLElBQVosR0FBbUJBLElBQW5CO0FBQ0E5QixvQkFBWStCLEdBQVosR0FBa0JBLEdBQWxCOztBQUVBLFlBQUk5Qix1QkFBdUIsS0FBS0Esb0JBQWhDO0FBQ0FBLDZCQUFxQlMsWUFBckIsR0FBb0M7QUFDbENoRCxpQkFBT2lFLFdBRDJCO0FBRWxDaEUsa0JBQVFpRTtBQUYwQixTQUFwQztBQUlBM0IsNkJBQXFCK0IsU0FBckIsR0FBaUM7QUFDL0J0RSxpQkFBT21FLEtBQUtuRSxLQURtQjtBQUUvQkMsa0JBQVFrRSxLQUFLbEU7QUFGa0IsU0FBakM7QUFJQXNDLDZCQUFxQnVCLFlBQXJCLEdBQW9DQSxZQUFwQzs7QUFFQSxhQUFLdkIsb0JBQUwsR0FBMEJBLG9CQUExQjtBQUNBLGFBQUtELFdBQUwsR0FBa0JBLFdBQWxCOztBQUVBLFlBQUlpQywwQkFBMEIsS0FBS2pHLG1CQUFuQztBQUNBLFlBQUlBLHNCQUFzQjtBQUN4Qm9GLG1CQUFTO0FBQ1AvRSxlQUFHLENBREk7QUFFUEMsZUFBRztBQUZJLFdBRGU7QUFLeEIrRSxvQkFBVTtBQUNSaEYsZUFBRyxDQURLO0FBRVJDLGVBQUc7QUFGSyxXQUxjO0FBU3hCZ0Ysc0JBQVk7QUFDVmpGLGVBQUcsQ0FETztBQUVWQyxlQUFHO0FBRk8sV0FUWTtBQWF4QmlGLHVCQUFhO0FBQ1hsRixlQUFHLENBRFE7QUFFWEMsZUFBRztBQUZRO0FBYlcsU0FBMUI7O0FBbUJBLGFBQUtOLG1CQUFMLEdBQTBCQSxtQkFBMUI7QUFDQSxZQUFJa0csT0FBSyxJQUFUO0FBQ0FDLG1CQUFXLFlBQU07QUFDZkQsZUFBS0UsU0FBTCxDQUFldkIsVUFBVXBELElBQXpCLEVBQStCa0UsV0FBL0IsRUFBNENDLFlBQTVDLEVBQTBELElBQTFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsU0FMRCxFQUtHLEdBTEg7QUFPRCxPQW5JTzs7O0FBcUlSO0FBQ0FTLG9CQXRJUSw0QkFzSVE7QUFDZCxZQUFJeEIsWUFBWSxLQUFLYixXQUFMLENBQWlCYSxTQUFqQztBQUNBLFlBQUlILGVBQWUsS0FBS1Qsb0JBQUwsQ0FBMEJTLFlBQTdDO0FBQ0EsWUFBSWhELFFBQVFnRCxhQUFhaEQsS0FBekI7QUFDQSxZQUFJQyxTQUFTK0MsYUFBYS9DLE1BQTFCO0FBQ0EsWUFBSTJFLFdBQVcsQ0FBQyxLQUFLdEMsV0FBTCxDQUFpQnNDLFFBQWpDOztBQUVBLFlBQUlDLGtCQUFrQkQsV0FBVyxHQUFYLEdBQWlCLEdBQXZDO0FBQ0EsWUFBSVQsT0FBTzNDLFlBQVlELGFBQVosQ0FBMEJ0RCxDQUExQixFQUE2QkUsQ0FBN0IsRUFBZ0M2QixLQUFoQyxFQUF1Q0MsTUFBdkMsQ0FBWDs7QUFFQW9CLGdCQUFRQyxHQUFSLENBQVkscUJBQXFCc0QsUUFBakM7O0FBRUEsYUFBS3RDLFdBQUwsQ0FBaUJzQyxRQUFqQixHQUE0QkEsUUFBNUI7QUFDQSxhQUFLdEMsV0FBTCxDQUFpQndDLFNBQWpCLEdBQTZCO0FBQzNCbkcsYUFBR3FCLFFBQVE2RSxlQUFSLEdBQTBCVixLQUFLbkUsS0FEUDtBQUUzQnBCLGFBQUdxQixTQUFTNEUsZUFBVCxHQUEyQlYsS0FBS2xFOztBQUdyQztBQUw2QixTQUE3QixDQU1BLElBQUlzRSwwQkFBMEIsS0FBS2pHLG1CQUFuQztBQUNBLFlBQUlBLHNCQUFzQjtBQUN4Qm9GLG1CQUFTO0FBQ1AvRSxlQUFHLENBREk7QUFFUEMsZUFBRztBQUZJLFdBRGU7QUFLeEIrRSxvQkFBVTtBQUNSaEYsZUFBRyxDQURLO0FBRVJDLGVBQUc7QUFGSyxXQUxjO0FBU3hCZ0Ysc0JBQVk7QUFDVmpGLGVBQUcsQ0FETztBQUVWQyxlQUFHO0FBRk8sV0FUWTtBQWF4QmlGLHVCQUFhO0FBQ1hsRixlQUFHLENBRFE7QUFFWEMsZUFBRztBQUZRO0FBYlcsU0FBMUI7O0FBbUJBLGFBQUttRyxVQUFMLEdBQWdCLEtBQUt6QyxXQUFyQjtBQUNBLGFBQUtoRSxtQkFBTCxHQUF5QkEsbUJBQXpCO0FBQ0EsWUFBSWtHLE9BQUssSUFBVDtBQUNBQyxtQkFBVyxZQUFNO0FBQ2ZELGVBQUtsRyxtQkFBTCxHQUF5QmlHLHVCQUF6QjtBQUNBQyxlQUFLbEIsTUFBTDtBQUNELFNBSEQsRUFHRyxHQUhIOztBQUtBLGFBQUtBLE1BQUw7QUFDQSxhQUFLMEIsaUJBQUw7QUFDRCxPQXZMTzs7O0FBeUxSO0FBQ0FDLGVBMUxRLHVCQTBMRztBQUFBOztBQUNULFlBQUkzQyxjQUFjLEtBQUtBLFdBQXZCO0FBQ0EsWUFBSU4sT0FBT00sWUFBWU4sSUFBdkI7QUFDQSxZQUFJOEMsWUFBWXhDLFlBQVl3QyxTQUE1QjtBQUNBLFlBQUk5RSxRQUFRc0MsWUFBWXRDLEtBQXhCO0FBQ0EsWUFBSUMsU0FBU3FDLFlBQVlyQyxNQUF6Qjs7QUFFQSxZQUFJM0Isc0JBQXNCLEtBQUtBLG1CQUEvQjs7QUFFQSxZQUFJMEQsUUFBUSxXQUFaLEVBQXlCO0FBQ3ZCLGNBQUl6RCxPQUFPLENBQVg7QUFBQSxjQUFjQyxPQUFPLENBQXJCO0FBQ0EsZUFBSyxJQUFJQyxHQUFULElBQWdCSCxtQkFBaEIsRUFBcUM7QUFDbkMsZ0JBQUlJLE9BQU9KLG9CQUFvQkcsR0FBcEIsQ0FBWDtBQUNBRixtQkFBT0csS0FBS0MsQ0FBTCxHQUFTSixJQUFULEdBQWdCRyxLQUFLQyxDQUFyQixHQUF5QkosSUFBaEM7QUFDQUMsbUJBQU9FLEtBQUtFLENBQUwsR0FBU0osSUFBVCxHQUFnQkUsS0FBS0UsQ0FBckIsR0FBeUJKLElBQWhDO0FBQ0Q7O0FBRUQsY0FBSUssT0FBT04sSUFBWDtBQUFBLGNBQWlCTyxPQUFPTixJQUF4QjtBQUNBLGVBQUssSUFBSUMsS0FBVCxJQUFnQkgsbUJBQWhCLEVBQXFDO0FBQ25DLGdCQUFJSSxTQUFPSixvQkFBb0JHLEtBQXBCLENBQVg7QUFDQUksbUJBQU9ILE9BQUtDLENBQUwsR0FBU0UsSUFBVCxHQUFnQkgsT0FBS0MsQ0FBckIsR0FBeUJFLElBQWhDO0FBQ0FDLG1CQUFPSixPQUFLRSxDQUFMLEdBQVNFLElBQVQsR0FBZ0JKLE9BQUtFLENBQXJCLEdBQXlCRSxJQUFoQztBQUNEOztBQUVELGNBQUlDLElBQUlSLE9BQU9NLElBQWY7QUFBQSxjQUFxQkcsSUFBSVIsT0FBT00sSUFBaEM7QUFDQUMsZUFBSytGLFVBQVVuRyxDQUFmO0FBQ0FLLGVBQUs4RixVQUFVbEcsQ0FBZjs7QUFFQSxjQUFJRCxJQUFJRSxPQUFPaUcsVUFBVW5HLENBQXpCO0FBQUEsY0FBNEJDLElBQUlFLE9BQU9nRyxVQUFVbEcsQ0FBakQ7O0FBRUF5QyxrQkFBUUMsR0FBUixDQUFZLGtCQUFrQjNDLENBQWxCLEdBQXNCLEtBQXRCLEdBQThCQyxDQUE5QixHQUFrQyxLQUFsQyxHQUEwQ0csQ0FBMUMsR0FBOEMsS0FBOUMsR0FBc0RDLENBQWxFOztBQUVBLGNBQUltQixNQUFNcEMsR0FBR3FDLG1CQUFILENBQXVCLGdCQUF2QixDQUFWOztBQUVBckMsYUFBR21ILFdBQUgsQ0FBZTtBQUNiQyxtQkFBTztBQURNLFdBQWY7QUFHQXBILGFBQUdxSCxvQkFBSCxDQUF3QjtBQUN0QnpHLGVBQUdBLENBRG1CO0FBRXRCQyxlQUFHQSxDQUZtQjtBQUd0Qm9CLG1CQUFPakIsQ0FIZTtBQUl0QmtCLG9CQUFRakIsQ0FKYztBQUt0QnFHLHVCQUFXdEcsQ0FMVztBQU10QnVHLHdCQUFZdEcsQ0FOVTtBQU90QmMsc0JBQVUsZ0JBUFk7QUFRdEJ5RixxQkFBVSxpQkFBQ0MsR0FBRCxFQUFRO0FBQ2hCLGtCQUFJQyxlQUFlRCxJQUFJQyxZQUF2QjtBQUNBMUgsaUJBQUcySCxXQUFIO0FBQ0EscUJBQUtwRCxXQUFMLENBQWlCa0IsTUFBakIsR0FBd0IsSUFBeEI7QUFDQSxxQkFBS0YsTUFBTDtBQUNBLHFCQUFLcUMsS0FBTCxDQUFXLGtCQUFYLEVBQThCRixZQUE5QjtBQUNELGFBZHFCO0FBZXRCRyxnQkFmc0IsZ0JBZWpCSixHQWZpQixFQWVaO0FBQ1JuRSxzQkFBUUMsR0FBUixDQUFZLFdBQVo7QUFDQUQsc0JBQVFDLEdBQVIsQ0FBWWtFLEdBQVo7QUFDRDtBQWxCcUIsV0FBeEI7QUFvQkQsU0FoREQsTUFpREs7QUFDSCxjQUFJQSxNQUFNLENBQUMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFELEVBQVMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUFULEVBQWlCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBakIsRUFBeUIsQ0FBQyxDQUFELEVBQUksQ0FBSixDQUF6QixDQUFWO0FBQ0EsY0FBSWpHLFNBQVMsRUFBYjtBQUNBLGVBQUssSUFBSWQsS0FBVCxJQUFnQkgsbUJBQWhCLEVBQXFDO0FBQ25DLGdCQUFJSyxLQUFJa0MsS0FBS2dGLElBQUwsQ0FBVXZILG9CQUFvQkcsS0FBcEIsRUFBeUJFLENBQXpCLEdBQTZCbUcsVUFBVW5HLENBQWpELENBQVI7QUFDQSxnQkFBSUMsS0FBSWlDLEtBQUtnRixJQUFMLENBQVV2SCxvQkFBb0JHLEtBQXBCLEVBQXlCRyxDQUF6QixHQUE2QmtHLFVBQVVsRyxDQUFqRCxDQUFSOztBQUdBLGdCQUFJa0gsUUFBUSxDQUFaO0FBQ0EsZ0JBQUlySCxTQUFPLFNBQVgsRUFBc0I7QUFDcEJxSCxzQkFBUSxDQUFSO0FBQ0QsYUFGRCxNQUdLLElBQUlySCxTQUFPLFlBQVgsRUFBeUI7QUFDNUJxSCxzQkFBUSxDQUFSO0FBQ0QsYUFGSSxNQUdBLElBQUlySCxTQUFPLGFBQVgsRUFBMEI7QUFDN0JxSCxzQkFBUSxDQUFSO0FBQ0QsYUFGSSxNQUdBLElBQUlySCxTQUFPLFVBQVgsRUFBdUI7QUFDMUJxSCxzQkFBUSxDQUFSO0FBQ0Q7QUFDRE4sZ0JBQUlNLEtBQUosSUFBYSxDQUFDbkgsRUFBRCxFQUFJQyxFQUFKLENBQWI7O0FBRUFXLG1CQUFPSyxJQUFQLENBQVksRUFBRWpCLEtBQUYsRUFBS0MsS0FBTCxFQUFaO0FBQ0Q7O0FBRUQ0QyxzQkFBWWxDLFVBQVosQ0FBdUJDLE1BQXZCLEVBQStCQSxPQUFPd0csTUFBdEM7QUFDQSxlQUFLekQsV0FBTCxDQUFpQmtCLE1BQWpCLEdBQXdCLElBQXhCO0FBQ0EsZUFBS0YsTUFBTDtBQUNBLGVBQUtxQyxLQUFMLENBQVcsa0JBQVgsRUFBOEJILEdBQTlCO0FBQ0Q7QUFDRjtBQW5STyxLLFFBc1JWUSxNLEdBQVMsRTs7Ozs7QUEzVFE7O3FDQUVBLENBQ2hCLEMsQ0FBRTs7OzsyQkFFSUMsTyxFQUFTO0FBQ2QsV0FBS0MsSUFBTCxDQUFVakksQ0FBVixFQUFhRSxDQUFiO0FBRUQsSyxDQUFFOzs7OzZCQUVNLENBQ1IsQyxDQUFFOztBQUVXOztBQVFWOztBQUVjOztBQUVKOztBQUVFOztBQVFaOztBQXNSQTs7OztBQUlBOzs7eUJBSUNGLEMsRUFBR0UsQyxFQUFHO0FBQ1QsV0FBS21FLFdBQUwsR0FBaUI7QUFDZmtCLGdCQUFRLElBRE87QUFFYlksY0FBTSxDQUZPO0FBR2JDLGFBQUssQ0FIUTtBQUlickUsZUFBTy9CLENBSk07QUFLYmdDLGdCQUFROUIsQ0FMSztBQU1iZ0ksb0JBQVksRUFOQztBQU9iaEQsbUJBQVc7QUFDWHBELGdCQUFNLEVBREs7QUFFVEMsaUJBQU8sQ0FGRTtBQUdUQyxrQkFBUTtBQUhDLFNBUEU7QUFZZjZFLG1CQUFXO0FBQ1RuRyxhQUFHLENBRE07QUFFUEMsYUFBRztBQUZJLFNBWkk7QUFnQmY2RSxzQkFBYyxJQWhCQztBQWlCYnhCLGtCQUFVLENBQUMsVUFBRCxFQUFhLFlBQWIsQ0FqQkcsRUFpQjRCO0FBQ3pDMkMsa0JBQVUsS0FsQkcsRUFrQks7QUFDbEI1QyxjQUFNLFlBbkJPLENBbUJPO0FBbkJQLE9BQWpCO0FBcUJBLFdBQUsxRCxtQkFBTCxHQUF5QjtBQUN2Qm9GLGlCQUFTO0FBQ1AvRSxhQUFHLEVBREk7QUFFTEMsYUFBRztBQUZFLFNBRGM7QUFLdkIrRSxrQkFBVTtBQUNSaEYsYUFBR1YsSUFBSSxFQURDO0FBRU5XLGFBQUc7QUFGRyxTQUxhO0FBU3ZCZ0Ysb0JBQVk7QUFDVmpGLGFBQUcsRUFETztBQUVSQyxhQUFHVCxJQUFJO0FBRkMsU0FUVztBQWF2QjBGLHFCQUFhO0FBQ1hsRixhQUFHVixJQUFJLEVBREk7QUFFVFcsYUFBR1QsSUFBSTtBQUZFO0FBYlUsT0FBekI7QUFrQkEsV0FBS29FLG9CQUFMLEdBQTBCO0FBQ3hCYyxpQkFBUyxJQURlO0FBRXRCUyxzQkFBYyxDQUZRO0FBR3RCZCxzQkFBYztBQUNkaEQsaUJBQU8sQ0FETztBQUVaQyxrQkFBUTtBQUZJLFNBSFE7QUFPeEJxRSxtQkFBVztBQUNUdEUsaUJBQU8sQ0FERTtBQUVUQyxrQkFBUTtBQUZDO0FBUGEsT0FBMUI7QUFZRDs7QUFFRDs7OztnQ0FDWWdHLE8sRUFBUTtBQUFBOztBQUNsQixVQUFJbEUsTUFBTWtFLFFBQVFsRSxHQUFsQjtBQUNBLFVBQUlxRSxXQUFXSCxRQUFRRyxRQUF2QjtBQUNBLFVBQUluRSxXQUFXZ0UsUUFBUWhFLFFBQXZCO0FBQ0EsVUFBSUQsT0FBT2lFLFFBQVFqRSxJQUFuQjs7QUFFQSxVQUFJcUUsYUFBYSxFQUFqQjtBQUNBLFVBQUlwRSxTQUFTcUUsT0FBVCxDQUFpQixVQUFqQixJQUErQixDQUFDLENBQXBDLEVBQXVDO0FBQ3JDRCxtQkFBV3pHLElBQVgsQ0FBZ0IsVUFBaEI7QUFDRDtBQUNELFVBQUlxQyxTQUFTcUUsT0FBVCxDQUFpQixZQUFqQixJQUFpQyxDQUFDLENBQXRDLEVBQXlDO0FBQ3ZDRCxtQkFBV3pHLElBQVgsQ0FBZ0IsWUFBaEI7QUFDRDtBQUNELFVBQUl5RyxXQUFXTixNQUFYLElBQXFCLENBQXJCLElBQTBCTSxXQUFXQyxPQUFYLENBQW1CLFVBQW5CLElBQWlDLENBQUMsQ0FBaEUsRUFBbUU7QUFDakUsYUFBS2hFLFdBQUwsQ0FBaUJzQyxRQUFqQixHQUE0QixJQUE1QjtBQUNEOztBQUVELFVBQUk1QyxJQUFKLEVBQVU7QUFDUixhQUFLTSxXQUFMLENBQWlCTixJQUFqQixHQUF3QkEsSUFBeEI7QUFDRDtBQUNELFdBQUtNLFdBQUwsQ0FBaUJrQixNQUFqQixHQUEwQixLQUExQjtBQUNBLFdBQUtsQixXQUFMLENBQWlCbUIsWUFBakIsR0FBZ0MyQyxRQUFoQztBQUNBLFdBQUs5RCxXQUFMLENBQWlCTCxRQUFqQixHQUE0Qm9FLFVBQTVCO0FBQ0EsV0FBSy9DLE1BQUw7O0FBRUEsVUFBSXZCLEdBQUosRUFBUztBQUNQaEUsV0FBR3dJLFlBQUgsQ0FBZ0I7QUFDZHhFLGVBQUtBLEdBRFM7QUFFZHdELG1CQUFTLGlCQUFDQyxHQUFELEVBQVE7QUFDZixnQkFBSXpHLElBQUl5RyxJQUFJeEYsS0FBWjtBQUFBLGdCQUFtQmhCLElBQUl3RyxJQUFJdkYsTUFBM0I7O0FBRUEsbUJBQUt5RSxTQUFMLENBQWUzQyxHQUFmLEVBQW9CaEQsQ0FBcEIsRUFBdUJDLENBQXZCLEVBQTBCLEtBQTFCO0FBQ0Q7QUFOYSxTQUFoQjtBQVFEO0FBQ0Y7O0FBUUQ7OztBQUdBOzs7OzhCQUNVK0MsRyxFQUFLL0IsSyxFQUFPQyxNLEVBQVF1RyxRLEVBQVM7QUFDckMsVUFBSXJDLE9BQU8zQyxZQUFZRCxhQUFaLENBQTBCdEQsQ0FBMUIsRUFBNkJFLENBQTdCLEVBQWdDNkIsS0FBaEMsRUFBdUNDLE1BQXZDLENBQVg7O0FBRUE7QUFDQSxVQUFJbUUsT0FBTyxDQUFDbkcsSUFBSWtHLEtBQUtuRSxLQUFWLElBQW1CLENBQTlCO0FBQ0EsVUFBSXFFLE1BQU0sQ0FBQ2xHLElBQUlnRyxLQUFLbEUsTUFBVixJQUFvQixDQUE5Qjs7QUFFQTtBQUNBLFVBQUl3RyxhQUFhLEVBQWpCO0FBQ0EsVUFBSW5FLGNBQWMsS0FBS0EsV0FBdkI7O0FBRUEsVUFBSSxDQUFDa0UsUUFBTCxFQUFlO0FBQ2JsRSxvQkFBWWEsU0FBWixHQUF3QjtBQUN0QnBELGdCQUFNZ0MsR0FEZ0I7QUFFdEIvQixpQkFBT0EsS0FGZTtBQUd0QkMsa0JBQVFBO0FBSGMsU0FBeEI7QUFLRDtBQUNEcUMsa0JBQVk4QixJQUFaLEdBQW1CQSxJQUFuQjtBQUNBOUIsa0JBQVkrQixHQUFaLEdBQWtCQSxHQUFsQjtBQUNBL0Isa0JBQVl0QyxLQUFaLEdBQW9CbUUsS0FBS25FLEtBQXpCO0FBQ0FzQyxrQkFBWXJDLE1BQVosR0FBcUJrRSxLQUFLbEUsTUFBMUI7O0FBRUEsVUFBSTRFLGtCQUFrQixLQUFLdkMsV0FBTCxDQUFpQnNDLFFBQWpCLEdBQTRCLEdBQTVCLEdBQWtDLEdBQXhEO0FBQ0E7O0FBRUF0QyxrQkFBWXdDLFNBQVosR0FBd0I7QUFDdEJuRyxXQUFHcUIsUUFBUTZFLGVBQVIsR0FBMEJWLEtBQUtuRSxLQURaO0FBRXRCcEIsV0FBR3FCLFNBQVM0RSxlQUFULEdBQTJCVixLQUFLbEU7QUFGYixPQUF4Qjs7QUFLQXdHLGlCQUFXbkUsV0FBWCxHQUF5QkEsV0FBekI7O0FBRUFtRSxpQkFBV25JLG1CQUFYLEdBQWlDO0FBQy9Cb0YsaUJBQVM7QUFDUC9FLGFBQUcsRUFESTtBQUVQQyxhQUFHO0FBRkksU0FEc0I7QUFLL0IrRSxrQkFBVTtBQUNSaEYsYUFBR3dGLEtBQUtuRSxLQUFMLEdBQWEsRUFEUjtBQUVScEIsYUFBRztBQUZLLFNBTHFCO0FBUy9CZ0Ysb0JBQVk7QUFDVmpGLGFBQUcsRUFETztBQUVWQyxhQUFHdUYsS0FBS2xFLE1BQUwsR0FBYztBQUZQLFNBVG1CO0FBYS9CNEQscUJBQWE7QUFDWGxGLGFBQUd3RixLQUFLbkUsS0FBTCxHQUFhLEVBREw7QUFFWHBCLGFBQUd1RixLQUFLbEUsTUFBTCxHQUFjO0FBRk47QUFia0IsT0FBakM7O0FBbUJBLFVBQUlzQyx1QkFBdUIsS0FBS0Esb0JBQWhDO0FBQ0FBLDJCQUFxQlMsWUFBckIsR0FBb0M7QUFDbENoRCxlQUFPQSxLQUQyQjtBQUVsQ0MsZ0JBQVFBO0FBRjBCLE9BQXBDO0FBSUFzQywyQkFBcUIrQixTQUFyQixHQUFpQztBQUMvQnRFLGVBQU9tRSxLQUFLbkUsS0FEbUI7QUFFL0JDLGdCQUFRa0UsS0FBS2xFO0FBRmtCLE9BQWpDOztBQUtBd0csaUJBQVdsRSxvQkFBWCxHQUFrQ0Esb0JBQWxDOztBQUVBLFdBQUtELFdBQUwsR0FBaUJtRSxXQUFXbkUsV0FBNUI7QUFDQSxXQUFLaEUsbUJBQUwsR0FBeUJtSSxXQUFXbkksbUJBQXBDOztBQUVBO0FBQ0EsV0FBSzRDLFNBQUwsQ0FBZTtBQUNibkIsY0FBTSxLQUFLdUMsV0FBTCxDQUFpQmEsU0FBakIsQ0FBMkJwRCxJQURwQjtBQUViQyxlQUFPQSxLQUZNO0FBR2JDLGdCQUFRQTtBQUhLLE9BQWY7QUFLQTtBQUNBLFdBQUt5RyxTQUFMLENBQWUsS0FBS3BJLG1CQUFwQixFQUF5QyxLQUFLZ0UsV0FBTCxDQUFpQmEsU0FBMUQ7QUFDRDs7QUFFRDs7OztnQ0FDWUEsUyxFQUFVO0FBQ3BCLFVBQUliLGNBQWMsS0FBS0EsV0FBdkI7QUFDQSxVQUFJNkIsT0FBTzNDLFlBQVlELGFBQVosQ0FBMEJ0RCxDQUExQixFQUE2QkUsQ0FBN0IsRUFBZ0NnRixVQUFVbkQsS0FBMUMsRUFBaURtRCxVQUFVbEQsTUFBM0QsQ0FBWDs7QUFFQSxVQUFJa0QsVUFBVXBELElBQVYsSUFBa0IsRUFBdEIsRUFBMEI7QUFDeEIsWUFBSThFLGtCQUFrQixLQUFLdkMsV0FBTCxDQUFpQnNDLFFBQWpCLEdBQTRCLEdBQTVCLEdBQWtDLEdBQXhEOztBQUVBO0FBQ0EsWUFBSXpFLE1BQU1wQyxHQUFHcUMsbUJBQUgsQ0FBdUIsZ0JBQXZCLENBQVY7QUFDQUQsWUFBSXdHLFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CeEQsVUFBVW5ELEtBQVYsR0FBa0I2RSxlQUF0QyxFQUF1RDFCLFVBQVVsRCxNQUFWLEdBQW1CNEUsZUFBMUU7QUFDQTFFLFlBQUlnQixJQUFKOztBQUVBO0FBQ0EsWUFBSXlGLFNBQVM3SSxHQUFHcUMsbUJBQUgsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBd0csZUFBT0QsU0FBUCxDQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QnhDLEtBQUtuRSxLQUE1QixFQUFtQ21FLEtBQUtsRSxNQUF4QztBQUNBMkcsZUFBT3pGLElBQVA7O0FBRUE7QUFDQSxZQUFJMEYsYUFBYTlJLEdBQUdxQyxtQkFBSCxDQUF1QixZQUF2QixDQUFqQjtBQUNBeUcsbUJBQVdGLFNBQVgsQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkJ4QyxLQUFLbkUsS0FBaEMsRUFBdUNtRSxLQUFLbEUsTUFBNUM7QUFDQTRHLG1CQUFXMUYsSUFBWDtBQUNEO0FBQ0Y7O0FBRUQ7Ozs7OEJBQ1VnQyxTLEVBQVU7QUFDbEIsVUFBSWIsY0FBYyxLQUFLQSxXQUF2QjtBQUNBLFVBQUk2QixPQUFPM0MsWUFBWUQsYUFBWixDQUEwQnRELENBQTFCLEVBQTZCRSxDQUE3QixFQUFnQ2dGLFVBQVVuRCxLQUExQyxFQUFpRG1ELFVBQVVsRCxNQUEzRCxDQUFYOztBQUVBLFVBQUlrRCxVQUFVcEQsSUFBVixJQUFrQixFQUF0QixFQUEwQjtBQUN4QixZQUFJQSxPQUFPb0QsVUFBVXBELElBQXJCO0FBQ0EsWUFBSThFLGtCQUFrQixLQUFLdkMsV0FBTCxDQUFpQnNDLFFBQWpCLEdBQTRCLEdBQTVCLEdBQWtDLEdBQXhEO0FBQ0EsWUFBSWQsZUFBZSxLQUFLdkIsb0JBQUwsQ0FBMEJ1QixZQUE3Qzs7QUFFQTtBQUNBdEMsb0JBQVkzQixtQkFBWixDQUNFLGdCQURGLEVBRUVFLElBRkYsRUFHRW9ELFVBQVVuRCxLQUFWLEdBQWtCNkUsZUFIcEIsRUFJRTFCLFVBQVVsRCxNQUFWLEdBQW1CNEUsZUFKckIsRUFLRWYsWUFMRjtBQU9BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBdEMsb0JBQVkzQixtQkFBWixDQUFnQyxRQUFoQyxFQUEwQ0UsSUFBMUMsRUFBZ0RvRSxLQUFLbkUsS0FBckQsRUFBNERtRSxLQUFLbEUsTUFBakUsRUFBeUU2RCxZQUF6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUtSLE1BQUw7QUFDQWpDLGdCQUFRQyxHQUFSLENBQVksVUFBVXZCLElBQXRCO0FBQ0Q7QUFDRjs7QUFFRDs7Ozt3Q0FDbUI7QUFDakIsVUFBSXVDLGNBQWMsS0FBS0EsV0FBdkI7QUFDQSxVQUFJYSxZQUFZYixZQUFZYSxTQUE1QjtBQUNBLFVBQUlILGVBQWUsS0FBS1Qsb0JBQUwsQ0FBMEJTLFlBQTdDOztBQUVBLFVBQUlHLFVBQVVwRCxJQUFWLElBQWtCLEVBQXRCLEVBQTBCO0FBQ3hCLFlBQUlBLE9BQU9vRCxVQUFVcEQsSUFBckI7QUFDQSxZQUFJOEUsa0JBQWtCLEtBQUt2QyxXQUFMLENBQWlCc0MsUUFBakIsR0FBNEIsR0FBNUIsR0FBa0MsR0FBeEQ7QUFDQSxZQUFJZCxlQUFlLEtBQUt2QixvQkFBTCxDQUEwQnVCLFlBQTdDOztBQUVBO0FBQ0F0QyxvQkFBWTNCLG1CQUFaLENBQ0UsZ0JBREYsRUFFRUUsSUFGRixFQUdFaUQsYUFBYWhELEtBQWIsR0FBcUI2RSxlQUh2QixFQUlFN0IsYUFBYS9DLE1BQWIsR0FBc0I0RSxlQUp4QixFQUtFZixZQUxGO0FBT0E7QUFDQTtBQUNBO0FBQ0Q7QUFDRjs7QUFFRDs7Ozs4QkFDVXhGLG1CLEVBQXFCNkUsUyxFQUFXaUQsUSxFQUFTO0FBQ2pELFVBQUk5RCxjQUFjLEtBQUtBLFdBQXZCO0FBQ0EsVUFBSU4sT0FBT00sWUFBWU4sSUFBdkI7QUFDQSxVQUFJbUMsT0FBTzNDLFlBQVlELGFBQVosQ0FBMEJ0RCxDQUExQixFQUE2QkUsQ0FBN0IsRUFBZ0NnRixVQUFVbkQsS0FBMUMsRUFBaURtRCxVQUFVbEQsTUFBM0QsQ0FBWDs7QUFFQSxVQUFJNkcsYUFBYSxFQUFqQjtBQUNBLFVBQUlDLGNBQWMsRUFBbEI7QUFDQUEsa0JBQVluSCxJQUFaLENBQWlCdEIsb0JBQW9CLFNBQXBCLENBQWpCO0FBQ0F5SSxrQkFBWW5ILElBQVosQ0FBaUJ0QixvQkFBb0IsVUFBcEIsQ0FBakI7QUFDQXlJLGtCQUFZbkgsSUFBWixDQUFpQnRCLG9CQUFvQixhQUFwQixDQUFqQjtBQUNBeUksa0JBQVluSCxJQUFaLENBQWlCdEIsb0JBQW9CLFlBQXBCLENBQWpCOztBQUVBO0FBQ0F3SSxtQkFBYXRGLFlBQVlsQyxVQUFaLENBQXVCeUgsV0FBdkIsRUFBb0NBLFlBQVloQixNQUFoRCxDQUFiOztBQUVBO0FBQ0EsVUFBSTFDLFVBQVV5RCxXQUFXZixNQUFYLElBQXFCLENBQW5DO0FBQ0EsVUFBSUssUUFBSixFQUFjO0FBQ1pBLGlCQUFTL0MsT0FBVDtBQUNEOztBQUVELFVBQUlsRCxNQUFNcEMsR0FBR3FDLG1CQUFILENBQXVCLFlBQXZCLENBQVY7O0FBRUE7QUFDQSxVQUFJNEcsT0FBT3hGLFlBQVluRCxXQUFaLENBQXdCeUksVUFBeEIsQ0FBWDs7QUFFQSxVQUFJOUUsUUFBUSxXQUFaLEVBQXlCO0FBQ3ZCO0FBQ0E3QixZQUFJOEcsWUFBSixDQUFpQixpQkFBakI7QUFDQTlHLFlBQUkrRyxRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQi9DLEtBQUtuRSxLQUF4QixFQUErQm1FLEtBQUtsRSxNQUFwQzs7QUFFQTtBQUNBRSxZQUFJOEcsWUFBSixDQUFpQixlQUFqQjtBQUNBOUcsWUFBSXdHLFNBQUosQ0FBY0ssS0FBS3JJLENBQW5CLEVBQXNCcUksS0FBS3BJLENBQTNCLEVBQThCb0ksS0FBS2pJLENBQW5DLEVBQXNDaUksS0FBS2hJLENBQTNDOztBQUVBO0FBQ0FtQixZQUFJZ0gsY0FBSixDQUFtQixPQUFuQjtBQUNBaEgsWUFBSWlILFlBQUosQ0FBaUIsQ0FBakI7QUFDQWpILFlBQUlrSCxTQUFKO0FBQ0FsSCxZQUFJbUgsTUFBSixDQUFXTixLQUFLckksQ0FBaEIsRUFBbUJxSSxLQUFLcEksQ0FBeEI7QUFDQXVCLFlBQUlvSCxNQUFKLENBQVdQLEtBQUtySSxDQUFMLEdBQVNxSSxLQUFLakksQ0FBekIsRUFBNEJpSSxLQUFLcEksQ0FBakM7QUFDQXVCLFlBQUlvSCxNQUFKLENBQVdQLEtBQUtySSxDQUFMLEdBQVNxSSxLQUFLakksQ0FBekIsRUFBNEJpSSxLQUFLcEksQ0FBTCxHQUFTb0ksS0FBS2hJLENBQTFDO0FBQ0FtQixZQUFJb0gsTUFBSixDQUFXUCxLQUFLckksQ0FBaEIsRUFBbUJxSSxLQUFLcEksQ0FBTCxHQUFTb0ksS0FBS2hJLENBQWpDO0FBQ0FtQixZQUFJb0gsTUFBSixDQUFXUCxLQUFLckksQ0FBaEIsRUFBbUJxSSxLQUFLcEksQ0FBeEI7O0FBRUF1QixZQUFJcUgsTUFBSjtBQUNBckgsWUFBSXNILFNBQUo7QUFDRCxPQXJCRCxNQXNCSztBQUNIO0FBQ0E7QUFDQSxZQUFJQyxRQUFRckUsVUFBVSxPQUFWLEdBQW9CLEtBQWhDOztBQUVBbEQsWUFBSWdILGNBQUosQ0FBbUJPLEtBQW5CO0FBQ0F2SCxZQUFJaUgsWUFBSixDQUFpQixDQUFqQjtBQUNBakgsWUFBSWtILFNBQUo7QUFDQSxhQUFLLElBQUkxSCxJQUFJLENBQVIsRUFBV2dJLE1BQU1iLFdBQVdmLE1BQWpDLEVBQXlDcEcsSUFBSWdJLEdBQTdDLEVBQWtEaEksR0FBbEQsRUFBdUQ7QUFDckQsY0FBSWlJLE9BQU1kLFdBQVduSCxDQUFYLENBQVY7QUFDQSxjQUFJQSxLQUFLLENBQVQsRUFBWTtBQUNWUSxnQkFBSW1ILE1BQUosQ0FBV00sS0FBSWpKLENBQWYsRUFBa0JpSixLQUFJaEosQ0FBdEI7QUFDRCxXQUZELE1BR0s7QUFDSHVCLGdCQUFJb0gsTUFBSixDQUFXSyxLQUFJakosQ0FBZixFQUFrQmlKLEtBQUloSixDQUF0QjtBQUNEO0FBQ0Y7QUFDRCxZQUFJZ0osTUFBTWQsV0FBVyxDQUFYLENBQVY7QUFDQTNHLFlBQUlvSCxNQUFKLENBQVdLLElBQUlqSixDQUFmLEVBQWtCaUosSUFBSWhKLENBQXRCOztBQUVBdUIsWUFBSXFILE1BQUo7QUFDQXJILFlBQUlzSCxTQUFKO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJSSxhQUFhN0YsUUFBUSxXQUFSLEdBQXNCLE1BQXRCLEdBQStCLFFBQWhEO0FBQ0E3QixVQUFJOEcsWUFBSixDQUFpQixPQUFqQjtBQUNBOUcsVUFBSWdILGNBQUosQ0FBbUIsT0FBbkI7O0FBRUE7QUFDQSxVQUFJVSxjQUFjLFFBQWxCLEVBQTRCO0FBQzFCLGFBQUssSUFBSWxJLEtBQUksQ0FBUixFQUFXZ0ksUUFBTVosWUFBWWhCLE1BQWxDLEVBQTBDcEcsS0FBSWdJLEtBQTlDLEVBQW1EaEksSUFBbkQsRUFBd0Q7QUFDdEQsY0FBSWlJLFFBQU1iLFlBQVlwSCxFQUFaLENBQVY7O0FBRUFRLGNBQUlrSCxTQUFKO0FBQ0FsSCxjQUFJMkgsR0FBSixDQUFRRixNQUFJakosQ0FBWixFQUFlaUosTUFBSWhKLENBQW5CLEVBQXNCLEVBQXRCLEVBQTBCLENBQTFCLEVBQTZCLElBQUlpQyxLQUFLSSxFQUF0QyxFQUEwQyxJQUExQztBQUNBZCxjQUFJNEgsSUFBSjtBQUNBNUgsY0FBSXNILFNBQUo7QUFDRDtBQUNGLE9BVEQsTUFVSyxJQUFJSSxjQUFjLE1BQWxCLEVBQTBCO0FBQzdCLFlBQUlGLFFBQU0sRUFBVjtBQUFBLFlBQWM1SSxJQUFJLEdBQWxCO0FBQUEsWUFBdUJpSixTQUFTakosSUFBSSxHQUFwQzs7QUFFQW9CLFlBQUlpSCxZQUFKLENBQWlCckksQ0FBakI7QUFDQW9CLFlBQUlrSCxTQUFKOztBQUVBbEgsWUFBSW1ILE1BQUosQ0FBV04sS0FBS3JJLENBQUwsR0FBU3FKLE1BQXBCLEVBQTRCaEIsS0FBS3BJLENBQUwsR0FBU29KLE1BQVQsR0FBa0JMLEtBQTlDO0FBQ0F4SCxZQUFJb0gsTUFBSixDQUFXUCxLQUFLckksQ0FBTCxHQUFTcUosTUFBcEIsRUFBNEJoQixLQUFLcEksQ0FBTCxHQUFTb0osTUFBckM7QUFDQTdILFlBQUlvSCxNQUFKLENBQVdQLEtBQUtySSxDQUFMLEdBQVNxSixNQUFULEdBQWtCTCxLQUE3QixFQUFrQ1gsS0FBS3BJLENBQUwsR0FBU29KLE1BQTNDOztBQUVBN0gsWUFBSW1ILE1BQUosQ0FBV04sS0FBS3JJLENBQUwsR0FBU3FKLE1BQVQsR0FBa0JoQixLQUFLakksQ0FBdkIsR0FBMkI0SSxLQUF0QyxFQUEyQ1gsS0FBS3BJLENBQUwsR0FBU29KLE1BQXBEO0FBQ0E3SCxZQUFJb0gsTUFBSixDQUFXUCxLQUFLckksQ0FBTCxHQUFTcUosTUFBVCxHQUFrQmhCLEtBQUtqSSxDQUFsQyxFQUFxQ2lJLEtBQUtwSSxDQUFMLEdBQVNvSixNQUE5QztBQUNBN0gsWUFBSW9ILE1BQUosQ0FBV1AsS0FBS3JJLENBQUwsR0FBU3FKLE1BQVQsR0FBa0JoQixLQUFLakksQ0FBbEMsRUFBcUNpSSxLQUFLcEksQ0FBTCxHQUFTb0osTUFBVCxHQUFrQkwsS0FBdkQ7O0FBRUF4SCxZQUFJbUgsTUFBSixDQUFXTixLQUFLckksQ0FBTCxHQUFTcUosTUFBVCxHQUFrQmhCLEtBQUtqSSxDQUFsQyxFQUFxQ2lJLEtBQUtwSSxDQUFMLEdBQVNvSixNQUFULEdBQWtCaEIsS0FBS2hJLENBQXZCLEdBQTJCMkksS0FBaEU7QUFDQXhILFlBQUlvSCxNQUFKLENBQVdQLEtBQUtySSxDQUFMLEdBQVNxSixNQUFULEdBQWtCaEIsS0FBS2pJLENBQWxDLEVBQXFDaUksS0FBS3BJLENBQUwsR0FBU29KLE1BQVQsR0FBa0JoQixLQUFLaEksQ0FBNUQ7QUFDQW1CLFlBQUlvSCxNQUFKLENBQVdQLEtBQUtySSxDQUFMLEdBQVNxSixNQUFULEdBQWtCaEIsS0FBS2pJLENBQXZCLEdBQTJCNEksS0FBdEMsRUFBMkNYLEtBQUtwSSxDQUFMLEdBQVNvSixNQUFULEdBQWtCaEIsS0FBS2hJLENBQWxFOztBQUVBbUIsWUFBSW1ILE1BQUosQ0FBV04sS0FBS3JJLENBQUwsR0FBU3FKLE1BQXBCLEVBQTRCaEIsS0FBS3BJLENBQUwsR0FBU29KLE1BQVQsR0FBa0JoQixLQUFLaEksQ0FBdkIsR0FBMkIySSxLQUF2RDtBQUNBeEgsWUFBSW9ILE1BQUosQ0FBV1AsS0FBS3JJLENBQUwsR0FBU3FKLE1BQXBCLEVBQTRCaEIsS0FBS3BJLENBQUwsR0FBU29KLE1BQVQsR0FBa0JoQixLQUFLaEksQ0FBbkQ7QUFDQW1CLFlBQUlvSCxNQUFKLENBQVdQLEtBQUtySSxDQUFMLEdBQVNxSixNQUFULEdBQWtCTCxLQUE3QixFQUFrQ1gsS0FBS3BJLENBQUwsR0FBU29KLE1BQVQsR0FBa0JoQixLQUFLaEksQ0FBekQ7O0FBRUFtQixZQUFJcUgsTUFBSjs7QUFFQXJILFlBQUlzSCxTQUFKO0FBQ0Q7O0FBRUR0SCxVQUFJZ0IsSUFBSjtBQUNEOztBQUVEOzs7O2tDQUNjMUMsRyxFQUFLeUUsYyxFQUFnQkMsUyxFQUFXaUQsUSxFQUFTO0FBQ3JELFVBQUk5RCxjQUFjLEtBQUtBLFdBQXZCO0FBQ0EsVUFBSWhFLHNCQUFzQixLQUFLQSxtQkFBL0I7QUFDQSxVQUFJOEYsT0FBTzlCLFlBQVk4QixJQUF2QjtBQUNBLFVBQUlDLE1BQU0vQixZQUFZK0IsR0FBdEI7QUFDQSxVQUFJckMsT0FBT00sWUFBWU4sSUFBdkI7QUFDQSxVQUFJbUMsT0FBTzNDLFlBQVlELGFBQVosQ0FBMEJ0RCxDQUExQixFQUE2QkUsQ0FBN0IsRUFBZ0NnRixVQUFVbkQsS0FBMUMsRUFBaURtRCxVQUFVbEQsTUFBM0QsQ0FBWDs7QUFFQSxVQUFJaUQsZUFBZTZDLE1BQWYsSUFBeUIsQ0FBN0IsRUFBZ0M7QUFDOUIsWUFBSWtDLFFBQVEvRSxlQUFlLENBQWYsQ0FBWjtBQUNBLFlBQUl2RSxJQUFJc0osTUFBTUMsT0FBZDtBQUNBLFlBQUl0SixJQUFJcUosTUFBTUUsT0FBZDs7QUFFQTtBQUNBeEosWUFBSUEsSUFBSXlGLElBQVI7QUFDQXhGLFlBQUlBLElBQUl5RixHQUFSOztBQUVBL0YsNEJBQW9CRyxHQUFwQixFQUF5QkUsQ0FBekIsR0FBNkJBLENBQTdCO0FBQ0FMLDRCQUFvQkcsR0FBcEIsRUFBeUJHLENBQXpCLEdBQTZCQSxDQUE3Qjs7QUFFQTtBQUNBRCxZQUFJQSxJQUFJLENBQUosR0FBUSxDQUFSLEdBQWFBLElBQUl3RixLQUFLbkUsS0FBVCxHQUFpQm1FLEtBQUtuRSxLQUF0QixHQUE4QnJCLENBQS9DO0FBQ0FDLFlBQUlBLElBQUksQ0FBSixHQUFRLENBQVIsR0FBYUEsSUFBSXVGLEtBQUtsRSxNQUFULEdBQWtCa0UsS0FBS2xFLE1BQXZCLEdBQWdDckIsQ0FBakQ7QUFDQU4sNEJBQW9CRyxHQUFwQixFQUF5QkUsQ0FBekIsR0FBNkJBLENBQTdCO0FBQ0FMLDRCQUFvQkcsR0FBcEIsRUFBeUJHLENBQXpCLEdBQTZCQSxDQUE3Qjs7QUFFQTtBQUNBLFlBQUlvRCxRQUFRLFdBQVosRUFBeUI7QUFDdkI7QUFDQSxjQUFJdkQsT0FBTyxTQUFYLEVBQXNCO0FBQ3BCSCxnQ0FBb0IsWUFBcEIsRUFBa0NLLENBQWxDLEdBQXNDQSxDQUF0QztBQUNBTCxnQ0FBb0IsVUFBcEIsRUFBZ0NNLENBQWhDLEdBQW9DQSxDQUFwQztBQUNELFdBSEQsTUFJSyxJQUFJSCxPQUFPLFVBQVgsRUFBdUI7QUFDMUJILGdDQUFvQixhQUFwQixFQUFtQ0ssQ0FBbkMsR0FBdUNBLENBQXZDO0FBQ0FMLGdDQUFvQixTQUFwQixFQUErQk0sQ0FBL0IsR0FBbUNBLENBQW5DO0FBQ0QsV0FISSxNQUlBLElBQUlILE9BQU8sWUFBWCxFQUF5QjtBQUM1QkgsZ0NBQW9CLFNBQXBCLEVBQStCSyxDQUEvQixHQUFtQ0EsQ0FBbkM7QUFDQUwsZ0NBQW9CLGFBQXBCLEVBQW1DTSxDQUFuQyxHQUF1Q0EsQ0FBdkM7QUFDRCxXQUhJLE1BSUEsSUFBSUgsT0FBTyxhQUFYLEVBQTBCO0FBQzdCSCxnQ0FBb0IsVUFBcEIsRUFBZ0NLLENBQWhDLEdBQW9DQSxDQUFwQztBQUNBTCxnQ0FBb0IsWUFBcEIsRUFBa0NNLENBQWxDLEdBQXNDQSxDQUF0QztBQUNEO0FBQ0Y7O0FBRUQsYUFBSzhILFNBQUwsQ0FBZXBJLG1CQUFmLEVBQW9DNkUsU0FBcEMsRUFBK0MsVUFBVUUsT0FBVixFQUFtQjtBQUNoRSxjQUFJK0MsUUFBSixFQUFjO0FBQ1pBLHFCQUFTOUgsbUJBQVQsRUFBOEIrRSxPQUE5QjtBQUNEO0FBQ0YsU0FKRDtBQUtEO0FBQ0Y7Ozs7RUFod0JpQyxlQUFLK0UsUzs7a0JBQXBCM0csTSIsImZpbGUiOiJ3ZXB5LWNyb3BwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgY29uc3QgZGV2aWNlID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgY29uc3QgVyA9IGRldmljZS53aW5kb3dXaWR0aDtcbiAgY29uc3QgSCA9IGRldmljZS53aW5kb3dIZWlnaHQgLSA1MDtcbiAgLy8g6I635Y+W6YCJ5Lit5Yy65Z+f55qEKHgsIHksIHcsIGgpXG4gIGNvbnN0IGdldENyb3BSZWN0ID0gKGNyb3BwZXJNb3ZhYmxlSXRlbXMpID0+IHtcbiAgICBsZXQgbWF4WCA9IDAsIG1heFkgPSAwXG4gICAgZm9yIChsZXQga2V5IGluIGNyb3BwZXJNb3ZhYmxlSXRlbXMpIHtcbiAgICAgIGxldCBpdGVtID0gY3JvcHBlck1vdmFibGVJdGVtc1trZXldXG4gICAgICBtYXhYID0gaXRlbS54ID4gbWF4WCA/IGl0ZW0ueCA6IG1heFhcbiAgICAgIG1heFkgPSBpdGVtLnkgPiBtYXhZID8gaXRlbS55IDogbWF4WVxuICAgIH1cblxuICAgIGxldCBtaW5YID0gbWF4WCwgbWluWSA9IG1heFlcbiAgICBmb3IgKGxldCBrZXkgaW4gY3JvcHBlck1vdmFibGVJdGVtcykge1xuICAgICAgbGV0IGl0ZW0gPSBjcm9wcGVyTW92YWJsZUl0ZW1zW2tleV1cbiAgICAgIG1pblggPSBpdGVtLnggPCBtaW5YID8gaXRlbS54IDogbWluWFxuICAgICAgbWluWSA9IGl0ZW0ueSA8IG1pblkgPyBpdGVtLnkgOiBtaW5ZXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IG1pblgsXG4gICAgICB5OiBtaW5ZLFxuICAgICAgdzogbWF4WCAtIG1pblgsXG4gICAgICBoOiBtYXhZIC0gbWluWVxuICAgIH1cbiAgfVxuICAvLyBodHRwOi8vd3d3LmdlZWtzZm9yZ2Vla3Mub3JnL2NvbnZleC1odWxsLXNldC0xLWphcnZpc3MtYWxnb3JpdGhtLW9yLXdyYXBwaW5nL1xuXG4gIC8vIFRvIGZpbmQgb3JpZW50YXRpb24gb2Ygb3JkZXJlZCB0cmlwbGV0IChwLCBxLCByKS5cbiAgLy8gVGhlIGZ1bmN0aW9uIHJldHVybnMgZm9sbG93aW5nIHZhbHVlc1xuICAvLyAwIC0tPiBwLCBxIGFuZCByIGFyZSBjb2xpbmVhclxuICAvLyAxIC0tPiBDbG9ja3dpc2VcbiAgLy8gMiAtLT4gQ291bnRlcmNsb2Nrd2lzZVxuICBmdW5jdGlvbiBvcmllbnRhdGlvbihwLCBxLCByKSB7XG4gICAgdmFyIHZhbCA9IChxLnkgLSBwLnkpICogKHIueCAtIHEueCkgLSAocS54IC0gcC54KSAqIChyLnkgLSBxLnkpO1xuXG4gICAgaWYgKHZhbCA9PSAwKSByZXR1cm4gMDsgIC8vIGNvbGxpbmVhclxuICAgIHJldHVybiAodmFsID4gMCkgPyAxIDogMjsgLy8gY2xvY2sgb3IgY291bnRlcmNsb2NrIHdpc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZleEh1bGwocG9pbnRzLCBuKSB7XG4gICAgLy8gVGhlcmUgbXVzdCBiZSBhdCBsZWFzdCAzIHBvaW50c1xuICAgIGlmIChuIDwgMykgcmV0dXJuO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBSZXN1bHRcbiAgICB2YXIgaHVsbCA9IFtdO1xuXG4gICAgLy8gRmluZCB0aGUgbGVmdG1vc3QgcG9pbnRcbiAgICB2YXIgbCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgIGlmIChwb2ludHNbaV0ueCA8IHBvaW50c1tsXS54KSB7XG4gICAgICAgIGwgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBTdGFydCBmcm9tIGxlZnRtb3N0IHBvaW50LCBrZWVwIG1vdmluZ1xuICAgIC8vIGNvdW50ZXJjbG9ja3dpc2UgdW50aWwgcmVhY2ggdGhlIHN0YXJ0IHBvaW50XG4gICAgLy8gYWdhaW4uIFRoaXMgbG9vcCBydW5zIE8oaCkgdGltZXMgd2hlcmUgaCBpc1xuICAgIC8vIG51bWJlciBvZiBwb2ludHMgaW4gcmVzdWx0IG9yIG91dHB1dC5cbiAgICB2YXIgcCA9IGwsIHE7XG4gICAgZG8ge1xuICAgICAgLy8gQWRkIGN1cnJlbnQgcG9pbnQgdG8gcmVzdWx0XG4gICAgICAvLyBQcmV2ZW50IGR1cGxpY2F0ZXMgb2JqZWN0XG4gICAgICAvLyBpZiAoaHVsbC5maW5kSW5kZXgoaSA9PiBpLnggPT0gcG9pbnRzW3BdLnggJiYgaS55ID09IHBvaW50c1twXS55KT09LTEpe1xuICAgICAgaHVsbC5wdXNoKHBvaW50c1twXSk7XG4gICAgICAvLyB9XG5cbiAgICAgIC8vIFNlYXJjaCBmb3IgYSBwb2ludCAncScgc3VjaCB0aGF0XG4gICAgICAvLyBvcmllbnRhdGlvbihwLCB4LCBxKSBpcyBjb3VudGVyY2xvY2t3aXNlXG4gICAgICAvLyBmb3IgYWxsIHBvaW50cyAneCcuIFRoZSBpZGVhIGlzIHRvIGtlZXBcbiAgICAgIC8vIHRyYWNrIG9mIGxhc3QgdmlzaXRlZCBtb3N0IGNvdW50ZXJjbG9jay1cbiAgICAgIC8vIHdpc2UgcG9pbnQgaW4gcS4gSWYgYW55IHBvaW50ICdpJyBpcyBtb3JlXG4gICAgICAvLyBjb3VudGVyY2xvY2std2lzZSB0aGFuIHEsIHRoZW4gdXBkYXRlIHEuXG4gICAgICBxID0gKHAgKyAxKSAlIG47XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIC8vIElmIGkgaXMgbW9yZSBjb3VudGVyY2xvY2t3aXNlIHRoYW5cbiAgICAgICAgLy8gY3VycmVudCBxLCB0aGVuIHVwZGF0ZSBxXG4gICAgICAgIGlmIChvcmllbnRhdGlvbihwb2ludHNbcF0sIHBvaW50c1tpXSwgcG9pbnRzW3FdKSA9PSAyKVxuICAgICAgICAgIHEgPSBpO1xuICAgICAgfVxuXG4gICAgICAvLyBOb3cgcSBpcyB0aGUgbW9zdCBjb3VudGVyY2xvY2t3aXNlIHdpdGhcbiAgICAgIC8vIHJlc3BlY3QgdG8gcC4gU2V0IHAgYXMgcSBmb3IgbmV4dCBpdGVyYXRpb24sXG4gICAgICAvLyBzbyB0aGF0IHEgaXMgYWRkZWQgdG8gcmVzdWx0ICdodWxsJ1xuICAgICAgcCA9IHE7XG5cbiAgICB9IHdoaWxlIChwICE9IGwpOyAgLy8gV2hpbGUgd2UgZG9uJ3QgY29tZSB0byBmaXJzdFxuICAgIC8vIHBvaW50XG5cbiAgICAvLyBQcmludCBSZXN1bHRcbiAgICAvLyBmb3IgKHZhciBpIGluIGh1bGwpIHtcbiAgICAvLyAgICAgdmFyIHRlbXAgPSBodWxsW2ldXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiKFwiICsgdGVtcC54ICsgXCIsIFwiICsgdGVtcC55ICsgXCIpXCIpO1xuICAgIC8vIH1cbiAgICByZXR1cm4gaHVsbFxuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0ltYWdlV2l0aERlZ3JlZShjYW52YXNJZCwgcGF0aCwgd2lkdGgsIGhlaWdodCwgZGVncmVlKSB7XG4gICAgbGV0IGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoY2FudmFzSWQpXG5cbiAgICBsZXQgaXNWZXJ0aWNhbCA9IGRlZ3JlZSAlIDE4MCA+IDBcblxuICAgIGxldCBkcmF3V2lkdGggPSBpc1ZlcnRpY2FsID8gaGVpZ2h0IDogd2lkdGhcbiAgICBsZXQgZHJhd0hlaWdodCA9IGlzVmVydGljYWwgPyB3aWR0aCA6IGhlaWdodFxuXG4gICAgbGV0IGNlbnRlclggPSB3aWR0aCAvIDJcbiAgICBsZXQgY25ldGVyWSA9IGhlaWdodCAvIDJcblxuICAgIGxldCBkcmF3Q2VudGVyWCA9IGRyYXdXaWR0aCAvIDJcbiAgICBsZXQgZHJhd0NuZXRlclkgPSBkcmF3SGVpZ2h0IC8gMlxuXG4gICAgbGV0IGQgPSBNYXRoLmFicyh3aWR0aC1oZWlnaHQpLzJcblxuICAgIC8vIGN0eC50cmFuc2xhdGUoZHJhd0NlbnRlclgsIGRyYXdDbmV0ZXJZKVxuICAgIC8vIGN0eC5yb3RhdGUoZGVncmVlICogTWF0aC5QSSAvIDE4MClcbiAgICAvLyBjdHgudHJhbnNsYXRlKC1kcmF3Q2VudGVyWCwgLWRyYXdDbmV0ZXJZKVxuXG4gICAgY3R4LnRyYW5zbGF0ZShjZW50ZXJYLCBjbmV0ZXJZKVxuICAgIGN0eC5yb3RhdGUoZGVncmVlICogTWF0aC5QSSAvIDE4MClcbiAgICBjdHgudHJhbnNsYXRlKC1jZW50ZXJYLCAtY25ldGVyWSlcblxuICAgIC8vIGN0eC50cmFuc2xhdGUoLWQsIGQpXG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIGlmIChkcmF3SGVpZ2h0ID4gZHJhd1dpZHRoKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UocGF0aCwgZCwgLWQsIGRyYXdXaWR0aCwgZHJhd0hlaWdodClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHBhdGgsIC1kLCBkLCBkcmF3V2lkdGgsIGRyYXdIZWlnaHQpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY3R4LmRyYXdJbWFnZShwYXRoLCAwLCAwLCBkcmF3V2lkdGgsIGRyYXdIZWlnaHQpXG4gICAgfVxuXG4gICAgY3R4LmRyYXcoZmFsc2UsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnZHJhdyBjYWxsYmFjaycpXG4gICAgfSlcbiAgfVxuXG4gIC8vIOiOt+WPlumAguW6lOWxj+W5leeahOWbvueJh+aYvuekuuWkp+Wwj1xuICBjb25zdCBnZXRBZGp1c3RTaXplID0gKFcsIEgsIHdpZHRoLCBoZWlnaHQpID0+IHtcbiAgICBpZiAod2lkdGggPiBXKSB7XG4gICAgICBoZWlnaHQgPSBXIC8gd2lkdGggKiBoZWlnaHRcbiAgICAgIHdpZHRoID0gV1xuICAgIH1cblxuICAgIGlmIChoZWlnaHQgPiBIKSB7XG4gICAgICB3aWR0aCA9IEggLyBoZWlnaHQgKiB3aWR0aFxuICAgICAgaGVpZ2h0ID0gSFxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICBoZWlnaHQ6IGhlaWdodFxuICAgIH1cbiAgfVxuICBjb25zdCBjcm9wcGVyVXRpbCA9IHtcbiAgICBnZXRDcm9wUmVjdCxcbiAgICBnZXRBZGp1c3RTaXplLFxuICAgIGNvbnZleEh1bGwsXG4gICAgZHJhd0ltYWdlV2l0aERlZ3JlZVxuICB9XG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlQYWdlIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuXG4gICAgcHJvcHMgPSB7XG4gICAgICBwYXJhbXM6e1xuICAgICAgICB0eXBlOk9iamVjdCxcbiAgICAgICAgZGVmYXVsdDp7XG4gICAgICAgICAgc3JjOicnLFxuICAgICAgICAgIG1vZGU6XCJyZWN0YW5nbGVcIixcbiAgICAgICAgICBzaXplVHlwZTpcImNvbXByZXNzZWRcIixcbiAgICAgICAgfSxcbiAgICAgICAgdHdvV2F5OiB0cnVlLFxuICAgICAgfVxuICAgIH1cbiAgICBjdXN0b21EYXRhID0ge30gIC8vIOiHquWumuS5ieaVsOaNrlxuXG4gICAgY3VzdG9tRnVuY3Rpb24oKSB7XG4gICAgfSAgLy8g6Ieq5a6a5LmJ5pa55rOVXG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgdGhpcy5pbml0KFcsIEgpXG5cbiAgICB9ICAvLyDlnKhQYWdl5ZKMQ29tcG9uZW505YWx55So55qE55Sf5ZG95ZGo5pyf5Ye95pWwXG5cbiAgICBvblNob3coKSB7XG4gICAgfSAgLy8g5Y+q5ZyoUGFnZeS4reWtmOWcqOeahOmhtemdoueUn+WRveWRqOacn+WHveaVsFxuXG4gICAgY29uZmlnID0ge307ICAvLyDlj6rlnKhQYWdl5a6e5L6L5Lit5a2Y5Zyo55qE6YWN572u5pWw5o2u77yM5a+55bqU5LqO5Y6f55Sf55qEcGFnZS5qc29u5paH5Lu2XG5cbiAgICBkYXRhID0ge1xuICAgICAgY3JvcHBlckRhdGE6e30sXG4gICAgICBjcm9wcGVyTW92YWJsZUl0ZW1zOnt9LFxuICAgICAgY3JvcHBlckNoYW5nYWJsZURhdGE6e31cblxuXG4gICAgfTsgIC8vIOmhtemdouaJgOmcgOaVsOaNruWdh+mcgOWcqOi/memHjOWjsOaYju+8jOWPr+eUqOS6juaooeadv+aVsOaNrue7keWumlxuXG4gICAgY29tcG9uZW50cyA9IHt9OyAgLy8g5aOw5piO6aG16Z2i5Lit5omA5byV55So55qE57uE5Lu277yM5oiW5aOw5piO57uE5Lu25Lit5omA5byV55So55qE5a2Q57uE5Lu2XG5cbiAgICBtaXhpbnMgPSBbXTsgIC8vIOWjsOaYjumhtemdouaJgOW8leeUqOeahE1peGlu5a6e5L6LXG5cbiAgICBjb21wdXRlZCA9IHt9OyAgLy8g5aOw5piO6K6h566X5bGe5oCn77yI6K+m6KeB5ZCO5paH5LuL57uN77yJXG5cbiAgICB3YXRjaCA9IHtcbiAgICAgIHBhcmFtcyhuZXdWYWwpe1xuICAgICAgICBuZXdWYWwubW9kZT1uZXdWYWwubW9kZT9uZXdWYWwubW9kZToncmVjdGFuZ2xlJztcbiAgICAgICAgbmV3VmFsLnNpemVUeXBlPW5ld1ZhbC5zaXplVHlwZT9uZXdWYWwuc2l6ZVR5cGU6J2NvbXByZXNzZWQnO1xuICAgICAgICB0aGlzLnNob3dDcm9wcGVyKG5ld1ZhbCk7XG4gICAgICB9XG4gICAgfTsgIC8vIOWjsOaYjuaVsOaNrndhdGNoZXLvvIjor6bop4HlkI7mlofku4vnu43vvIlcblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAvLyBtb3ZlYWJsZS12aWV3IHRvdWNobW92ZVxuICAgICAgbW92ZUV2ZW50KGtleSxlKXtcbiAgICAgICAgbGV0IG9yaWdpbmFsU2l6ZSA9IHRoaXMuY3JvcHBlckNoYW5nYWJsZURhdGEub3JpZ2luYWxTaXplXG5cbiAgICAgICAgdGhpcy5zZXR1cE1vdmVJdGVtKGtleSwgZS5jaGFuZ2VkVG91Y2hlcywge1xuICAgICAgICAgIHBhdGg6IHRoaXMuY3JvcHBlckRhdGEuaW1hZ2VJbmZvLnBhdGgsXG4gICAgICAgICAgd2lkdGg6IG9yaWdpbmFsU2l6ZS53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IG9yaWdpbmFsU2l6ZS5oZWlnaHRcbiAgICAgICAgfSlcbiAgICAgIH0sXG5cbiAgICAgIC8vIG1vdmVhYmxlLXZpZXcgdG91Y2hlbmTvvIxlbmTnmoTml7blgJnorr7nva5tb3ZhYmxlLXZpZXfnmoTkvY3nva7vvIzlpoLmnpzlnKhtb3Zl6Zi25q616K6+572u5L2N572u77yM6YCJ5Lit5Lya5LiN5rWB55WFXG4gICAgICBlbmRFdmVudChrZXksZSl7XG4gICAgICAgIGxldCBjcm9wcGVyRGF0YSA9IHRoaXMuY3JvcHBlckRhdGFcbiAgICAgICAgbGV0IGNyb3BwZXJNb3ZhYmxlSXRlbXMgPSB0aGlzLmNyb3BwZXJNb3ZhYmxlSXRlbXNcbiAgICAgICAgbGV0IGNyb3BwZXJDaGFuZ2FibGVEYXRhID0gdGhpcy5jcm9wcGVyQ2hhbmdhYmxlRGF0YVxuICAgICAgICBsZXQgb3JpZ2luYWxTaXplID0gY3JvcHBlckNoYW5nYWJsZURhdGEub3JpZ2luYWxTaXplXG5cbiAgICAgICAgdGhpcy5zZXR1cE1vdmVJdGVtKGtleSwgZS5jaGFuZ2VkVG91Y2hlcywge1xuICAgICAgICAgIHBhdGg6IHRoaXMuY3JvcHBlckRhdGEuaW1hZ2VJbmZvLnBhdGgsXG4gICAgICAgICAgd2lkdGg6IG9yaWdpbmFsU2l6ZS53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IG9yaWdpbmFsU2l6ZS5oZWlnaHRcbiAgICAgICAgfSwgKGNyb3BwZXJNb3ZhYmxlSXRlbXMsIGNhbkNyb3ApID0+IHtcbiAgICAgICAgICBjcm9wcGVyQ2hhbmdhYmxlRGF0YS5jYW5Dcm9wID0gY2FuQ3JvcFxuICAgICAgICAgIHRoaXMuY3JvcHBlckNoYW5nYWJsZURhdGE9Y3JvcHBlckNoYW5nYWJsZURhdGE7XG4gICAgICAgICAgdGhpcy5jcm9wcGVyTW92YWJsZUl0ZW1zPSBjcm9wcGVyTW92YWJsZUl0ZW1zO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pXG4gICAgICB9LFxuXG4gICAgICAvLyDpmpDol49jcm9wcGVyXG4gICAgICBoaWRlQ3JvcHBlcigpe1xuXG4gICAgICAgIHRoaXMuY3JvcHBlckRhdGEuaGlkZGVuID0gdHJ1ZVxuICAgICAgICB0aGlzLmNyb3BwZXJEYXRhLmNyb3BDYWxsYmFjayA9IG51bGxcblxuICAgICAgICB0aGlzLmNyb3BwZXJEYXRhPXRoaXMuZGF0YS5jcm9wcGVyRGF0YSxcbiAgICAgICAgICB0aGlzLmNyb3BwZXJNb3ZhYmxlSXRlbXM9IHtcbiAgICAgICAgICAgIHRvcGxlZnQ6IHtcbiAgICAgICAgICAgICAgeDogLTEsXG4gICAgICAgICAgICAgIHk6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9wcmlnaHQ6IHtcbiAgICAgICAgICAgICAgeDogLTEsXG4gICAgICAgICAgICAgIHk6IC0xXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm90dG9tbGVmdDoge1xuICAgICAgICAgICAgICB4OiAtMSxcbiAgICAgICAgICAgICAgeTogLTFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib3R0b21yaWdodDoge1xuICAgICAgICAgICAgICB4OiAtMSxcbiAgICAgICAgICAgICAgeTogLTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHRoaXMuY3JvcHBlckNoYW5nYWJsZURhdGE9IHtcbiAgICAgICAgICAgIGNhbkNyb3A6IHRydWUsXG4gICAgICAgICAgICByb3RhdGVEZWdyZWU6IDBcbiAgICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGVhckNhbnZhcyh0aGlzLmNyb3BwZXJEYXRhLmltYWdlSW5mbylcbiAgICAgIH0sXG5cbiAgICAgIC8vIOaXi+i9rOWbvueJh1xuICAgICAgcm90YXRlSW1hZ2UoKXtcbiAgICAgICAgbGV0IGltYWdlSW5mbyA9IHRoaXMuZGF0YS5jcm9wcGVyRGF0YS5pbWFnZUluZm9cbiAgICAgICAgbGV0IHdpZHRoID0gaW1hZ2VJbmZvLndpZHRoXG4gICAgICAgIGxldCBoZWlnaHQgPSBpbWFnZUluZm8uaGVpZ2h0XG4gICAgICAgIGxldCByb3RhdGVEZWdyZWUgPSB0aGlzLmNyb3BwZXJDaGFuZ2FibGVEYXRhLnJvdGF0ZURlZ3JlZVxuXG4gICAgICAgIHJvdGF0ZURlZ3JlZSA9IHJvdGF0ZURlZ3JlZSA9PSAzNjAgPyA5MCA6IHJvdGF0ZURlZ3JlZSArIDkwXG5cbiAgICAgICAgLy8g5Yik5pat5piv5ZCm5Li65Z6C55u05pa55ZCRXG4gICAgICAgIGxldCBpc1ZlcnRpY2FsID0gcm90YXRlRGVncmVlICUgMTgwID4gMFxuICAgICAgICBsZXQgcm90YXRlV2lkdGggPSBpc1ZlcnRpY2FsID8gaGVpZ2h0IDogd2lkdGhcbiAgICAgICAgbGV0IHJvdGF0ZUhlaWdodCA9IGlzVmVydGljYWwgPyB3aWR0aCA6IGhlaWdodFxuXG4gICAgICAgIGxldCBzaXplID0gY3JvcHBlclV0aWwuZ2V0QWRqdXN0U2l6ZShXLCBILCByb3RhdGVXaWR0aCwgcm90YXRlSGVpZ2h0KVxuXG4gICAgICAgIC8vIOmAguW6lOWxj+W5leeahOS9jee9rlxuICAgICAgICBsZXQgbGVmdCA9IChXIC0gc2l6ZS53aWR0aCkgLyAyXG4gICAgICAgIGxldCB0b3AgPSAoSCAtIHNpemUuaGVpZ2h0KSAvIDJcbiAgICAgICAgbGV0IGNyb3BwZXJEYXRhID0gdGhpcy5jcm9wcGVyRGF0YVxuXG4gICAgICAgIGNyb3BwZXJEYXRhLmxlZnQgPSBsZWZ0XG4gICAgICAgIGNyb3BwZXJEYXRhLnRvcCA9IHRvcFxuXG4gICAgICAgIGxldCBjcm9wcGVyQ2hhbmdhYmxlRGF0YSA9IHRoaXMuY3JvcHBlckNoYW5nYWJsZURhdGFcbiAgICAgICAgY3JvcHBlckNoYW5nYWJsZURhdGEub3JpZ2luYWxTaXplID0ge1xuICAgICAgICAgIHdpZHRoOiByb3RhdGVXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHJvdGF0ZUhlaWdodFxuICAgICAgICB9XG4gICAgICAgIGNyb3BwZXJDaGFuZ2FibGVEYXRhLnNjYWxlU2l6ZSA9IHtcbiAgICAgICAgICB3aWR0aDogc2l6ZS53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHNpemUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgY3JvcHBlckNoYW5nYWJsZURhdGEucm90YXRlRGVncmVlID0gcm90YXRlRGVncmVlXG5cbiAgICAgICAgdGhpcy5jcm9wcGVyQ2hhbmdhYmxlRGF0YT1jcm9wcGVyQ2hhbmdhYmxlRGF0YTtcbiAgICAgICAgdGhpcy5jcm9wcGVyRGF0YT0gY3JvcHBlckRhdGE7XG5cbiAgICAgICAgbGV0IGNyb3BwZXJNb3ZhYmxlSXRlbXNDb3B5ID0gdGhpcy5jcm9wcGVyTW92YWJsZUl0ZW1zXG4gICAgICAgIGxldCBjcm9wcGVyTW92YWJsZUl0ZW1zID0ge1xuICAgICAgICAgIHRvcGxlZnQ6IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0b3ByaWdodDoge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvdHRvbWxlZnQ6IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBib3R0b21yaWdodDoge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyb3BwZXJNb3ZhYmxlSXRlbXM9IGNyb3BwZXJNb3ZhYmxlSXRlbXM7XG4gICAgICAgIHZhciB0aGF0PXRoaXM7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoYXQubG9hZEltYWdlKGltYWdlSW5mby5wYXRoLCByb3RhdGVXaWR0aCwgcm90YXRlSGVpZ2h0LCB0cnVlKVxuICAgICAgICAgIC8vIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgLy8gICAgIGNyb3BwZXJNb3ZhYmxlSXRlbXM6IGNyb3BwZXJNb3ZhYmxlSXRlbXNDb3B5XG4gICAgICAgICAgLy8gfSlcbiAgICAgICAgfSwgMTAwKVxuXG4gICAgICB9LFxuXG4gICAgICAvLyDljp/lm77mjInpkq7ooqvngrnlh7tcbiAgICAgIG9yaWdpbmFsQ2hhbmdlKCl7XG4gICAgICAgIGxldCBpbWFnZUluZm8gPSB0aGlzLmNyb3BwZXJEYXRhLmltYWdlSW5mb1xuICAgICAgICBsZXQgb3JpZ2luYWxTaXplID0gdGhpcy5jcm9wcGVyQ2hhbmdhYmxlRGF0YS5vcmlnaW5hbFNpemVcbiAgICAgICAgbGV0IHdpZHRoID0gb3JpZ2luYWxTaXplLndpZHRoXG4gICAgICAgIGxldCBoZWlnaHQgPSBvcmlnaW5hbFNpemUuaGVpZ2h0XG4gICAgICAgIGxldCBvcmlnaW5hbCA9ICF0aGlzLmNyb3BwZXJEYXRhLm9yaWdpbmFsXG5cbiAgICAgICAgbGV0IGNvbXByZXNzZWRTY2FsZSA9IG9yaWdpbmFsID8gMS4wIDogMC40XG4gICAgICAgIGxldCBzaXplID0gY3JvcHBlclV0aWwuZ2V0QWRqdXN0U2l6ZShXLCBILCB3aWR0aCwgaGVpZ2h0KVxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2hhbmdlIG9yaWdpbmFsPVwiICsgb3JpZ2luYWwpXG5cbiAgICAgICAgdGhpcy5jcm9wcGVyRGF0YS5vcmlnaW5hbCA9IG9yaWdpbmFsXG4gICAgICAgIHRoaXMuY3JvcHBlckRhdGEuc2NhbGVJbmZvID0ge1xuICAgICAgICAgIHg6IHdpZHRoICogY29tcHJlc3NlZFNjYWxlIC8gc2l6ZS53aWR0aCxcbiAgICAgICAgICB5OiBoZWlnaHQgKiBjb21wcmVzc2VkU2NhbGUgLyBzaXplLmhlaWdodFxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5LmL5omA5Lul6KaB6K6+572uY3JvcHBlck1vdmFibGVJdGVtc++8jOeEtuWQjuW7tuaXtuWcqOiuvue9ruS4gOasoe+8jOaYr+WboOS4uuaUueWPmGNyb3BwZXJEYXRh5ZCO77yMbW92YWJsZS12aWV35Lya6I6r5ZCN5YW25aaZ56e75Yqo5Yiw5bem5LiK6KeSXG4gICAgICAgIGxldCBjcm9wcGVyTW92YWJsZUl0ZW1zQ29weSA9IHRoaXMuY3JvcHBlck1vdmFibGVJdGVtc1xuICAgICAgICBsZXQgY3JvcHBlck1vdmFibGVJdGVtcyA9IHtcbiAgICAgICAgICB0b3BsZWZ0OiB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdG9wcmlnaHQ6IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBib3R0b21sZWZ0OiB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYm90dG9tcmlnaHQ6IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcm9wcGVyRGF0PXRoaXMuY3JvcHBlckRhdGE7XG4gICAgICAgIHRoaXMuY3JvcHBlck1vdmFibGVJdGVtcz1jcm9wcGVyTW92YWJsZUl0ZW1zO1xuICAgICAgICB2YXIgdGhhdD10aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGF0LmNyb3BwZXJNb3ZhYmxlSXRlbXM9Y3JvcHBlck1vdmFibGVJdGVtc0NvcHk7XG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgfSwgMTAwKVxuXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIHRoaXMuZHJhd09yaWdpbmFsSW1hZ2UoKVxuICAgICAgfSxcblxuICAgICAgLy8g5oiq5Y+W6YCJ5Lit5Zu+54mH77yM5aaC5p6c5pyJ5Zue6LCD77yM5YiZ6LCD55SoXG4gICAgICBjcm9wSW1hZ2UoKXtcbiAgICAgICAgbGV0IGNyb3BwZXJEYXRhID0gdGhpcy5jcm9wcGVyRGF0YVxuICAgICAgICBsZXQgbW9kZSA9IGNyb3BwZXJEYXRhLm1vZGVcbiAgICAgICAgbGV0IHNjYWxlSW5mbyA9IGNyb3BwZXJEYXRhLnNjYWxlSW5mb1xuICAgICAgICBsZXQgd2lkdGggPSBjcm9wcGVyRGF0YS53aWR0aFxuICAgICAgICBsZXQgaGVpZ2h0ID0gY3JvcHBlckRhdGEuaGVpZ2h0XG5cbiAgICAgICAgbGV0IGNyb3BwZXJNb3ZhYmxlSXRlbXMgPSB0aGlzLmNyb3BwZXJNb3ZhYmxlSXRlbXNcblxuICAgICAgICBpZiAobW9kZSA9PSAncmVjdGFuZ2xlJykge1xuICAgICAgICAgIGxldCBtYXhYID0gMCwgbWF4WSA9IDBcbiAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gY3JvcHBlck1vdmFibGVJdGVtcykge1xuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjcm9wcGVyTW92YWJsZUl0ZW1zW2tleV1cbiAgICAgICAgICAgIG1heFggPSBpdGVtLnggPiBtYXhYID8gaXRlbS54IDogbWF4WFxuICAgICAgICAgICAgbWF4WSA9IGl0ZW0ueSA+IG1heFkgPyBpdGVtLnkgOiBtYXhZXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IG1pblggPSBtYXhYLCBtaW5ZID0gbWF4WVxuICAgICAgICAgIGZvciAobGV0IGtleSBpbiBjcm9wcGVyTW92YWJsZUl0ZW1zKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNyb3BwZXJNb3ZhYmxlSXRlbXNba2V5XVxuICAgICAgICAgICAgbWluWCA9IGl0ZW0ueCA8IG1pblggPyBpdGVtLnggOiBtaW5YXG4gICAgICAgICAgICBtaW5ZID0gaXRlbS55IDwgbWluWSA/IGl0ZW0ueSA6IG1pbllcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgdyA9IG1heFggLSBtaW5YLCBoID0gbWF4WSAtIG1pbllcbiAgICAgICAgICB3ICo9IHNjYWxlSW5mby54XG4gICAgICAgICAgaCAqPSBzY2FsZUluZm8ueVxuXG4gICAgICAgICAgbGV0IHggPSBtaW5YICogc2NhbGVJbmZvLngsIHkgPSBtaW5ZICogc2NhbGVJbmZvLnlcblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdjcm9wIHJlY3Q6IHg9JyArIHggKyAnLHk9JyArIHkgKyAnLHc9JyArIHcgKyAnLGg9JyArIGgpXG5cbiAgICAgICAgICBsZXQgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dChcIm9yaWdpbmFsQ2FudmFzXCIpXG5cbiAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICB0aXRsZTogJ+ato+WcqOaIquWPli4uLicsXG4gICAgICAgICAgfSlcbiAgICAgICAgICB3eC5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoLFxuICAgICAgICAgICAgZGVzdFdpZHRoOiB3LFxuICAgICAgICAgICAgZGVzdEhlaWdodDogaCxcbiAgICAgICAgICAgIGNhbnZhc0lkOiAnb3JpZ2luYWxDYW52YXMnLFxuICAgICAgICAgICAgc3VjY2VzczogIChyZXMpID0+e1xuICAgICAgICAgICAgICBsZXQgdGVtcEZpbGVQYXRoID0gcmVzLnRlbXBGaWxlUGF0aFxuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgICAgICAgIHRoaXMuY3JvcHBlckRhdGEuaGlkZGVuPXRydWU7XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICAgIHRoaXMuJGVtaXQoXCJ3ZXB5Q3JvcHBlckZpbnNoXCIsdGVtcEZpbGVQYXRoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsKHJlcykge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhaWwgcmVzOlwiKVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBsZXQgcmVzID0gW1swLCAwXSwgWzAsIDBdLCBbMCwgMF0sIFswLCAwXV1cbiAgICAgICAgICBsZXQgcG9pbnRzID0gW11cbiAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gY3JvcHBlck1vdmFibGVJdGVtcykge1xuICAgICAgICAgICAgbGV0IHggPSBNYXRoLmNlaWwoY3JvcHBlck1vdmFibGVJdGVtc1trZXldLnggKiBzY2FsZUluZm8ueClcbiAgICAgICAgICAgIGxldCB5ID0gTWF0aC5jZWlsKGNyb3BwZXJNb3ZhYmxlSXRlbXNba2V5XS55ICogc2NhbGVJbmZvLnkpXG5cblxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMFxuICAgICAgICAgICAgaWYgKGtleSA9PSAndG9wbGVmdCcpIHtcbiAgICAgICAgICAgICAgaW5kZXggPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXkgPT0gJ2JvdHRvbWxlZnQnKSB7XG4gICAgICAgICAgICAgIGluZGV4ID0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09ICdib3R0b21yaWdodCcpIHtcbiAgICAgICAgICAgICAgaW5kZXggPSAyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXkgPT0gJ3RvcHJpZ2h0Jykge1xuICAgICAgICAgICAgICBpbmRleCA9IDNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc1tpbmRleF0gPSBbeCwgeV1cblxuICAgICAgICAgICAgcG9pbnRzLnB1c2goeyB4LCB5IH0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3JvcHBlclV0aWwuY29udmV4SHVsbChwb2ludHMsIHBvaW50cy5sZW5ndGgpXG4gICAgICAgICAgdGhpcy5jcm9wcGVyRGF0YS5oaWRkZW49dHJ1ZTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIHRoaXMuJGVtaXQoXCJ3ZXB5Q3JvcHBlckZpbnNoXCIscmVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07ICAvLyDlo7DmmI7pobXpnaJ3eG1s5Lit5qCH562+55qE5LqL5Lu25aSE55CG5Ye95pWw44CC5rOo5oSP77yM5q2k5aSE5Y+q55So5LqO5aOw5piO6aG16Z2id3htbOS4reagh+etvueahGJpbmTjgIFjYXRjaOS6i+S7tu+8jOiHquWumuS5ieaWueazlemcgOS7peiHquWumuS5ieaWueazleeahOaWueW8j+WjsOaYjlxuXG4gICAgZXZlbnRzID0ge1xuXG4gICAgfTsgIC8vIOWjsOaYjue7hOS7tuS5i+mXtOeahOS6i+S7tuWkhOeQhuWHveaVsFxuXG5cblxuICAgIGluaXQoVywgSCkge1xuICAgICAgdGhpcy5jcm9wcGVyRGF0YT17XG4gICAgICAgIGhpZGRlbjogdHJ1ZSxcbiAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICB3aWR0aDogVyxcbiAgICAgICAgICBoZWlnaHQ6IEgsXG4gICAgICAgICAgaXRlbUxlbmd0aDogNTAsXG4gICAgICAgICAgaW1hZ2VJbmZvOiB7XG4gICAgICAgICAgcGF0aDogJycsXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICB9LFxuICAgICAgICBzY2FsZUluZm86IHtcbiAgICAgICAgICB4OiAxLFxuICAgICAgICAgICAgeTogMVxuICAgICAgICB9LFxuICAgICAgICBjcm9wQ2FsbGJhY2s6IG51bGwsXG4gICAgICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnLCAnY29tcHJlc3NlZCddLCAgICAvLydvcmlnaW5hbCcoZGVmYXVsdCkgfCAnY29tcHJlc3NlZCdcbiAgICAgICAgICBvcmlnaW5hbDogZmFsc2UsICAvLyDpu5jorqTljovnvKnvvIzljovnvKnmr5TkvovkuLrmiKrlm77nmoQwLjRcbiAgICAgICAgICBtb2RlOiAncXVhZHJhbmdsZScsIC8v6buY6K6k55+p5b2iXG4gICAgICB9XG4gICAgICB0aGlzLmNyb3BwZXJNb3ZhYmxlSXRlbXM9e1xuICAgICAgICB0b3BsZWZ0OiB7XG4gICAgICAgICAgeDogNTAsXG4gICAgICAgICAgICB5OiA1MFxuICAgICAgICB9LFxuICAgICAgICB0b3ByaWdodDoge1xuICAgICAgICAgIHg6IFcgLSA1MCxcbiAgICAgICAgICAgIHk6IDUwXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbWxlZnQ6IHtcbiAgICAgICAgICB4OiA1MCxcbiAgICAgICAgICAgIHk6IEggLSA1MFxuICAgICAgICB9LFxuICAgICAgICBib3R0b21yaWdodDoge1xuICAgICAgICAgIHg6IFcgLSA1MCxcbiAgICAgICAgICAgIHk6IEggLSA1MFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmNyb3BwZXJDaGFuZ2FibGVEYXRhPXtcbiAgICAgICAgY2FuQ3JvcDogdHJ1ZSxcbiAgICAgICAgICByb3RhdGVEZWdyZWU6IDAsXG4gICAgICAgICAgb3JpZ2luYWxTaXplOiB7XG4gICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAgc2NhbGVTaXplOiB7XG4gICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgaGVpZ2h0OiAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDmmL7npLpjcm9wcGVy77yM5aaC5p6c5pyJ5Zu+54mH5YiZ6L295YWlXG4gICAgc2hvd0Nyb3BwZXIob3B0aW9ucyl7XG4gICAgICBsZXQgc3JjID0gb3B0aW9ucy5zcmNcbiAgICAgIGxldCBjYWxsYmFjayA9IG9wdGlvbnMuY2FsbGJhY2tcbiAgICAgIGxldCBzaXplVHlwZSA9IG9wdGlvbnMuc2l6ZVR5cGVcbiAgICAgIGxldCBtb2RlID0gb3B0aW9ucy5tb2RlXG5cbiAgICAgIGxldCBmaWx0ZXJUeXBlID0gW11cbiAgICAgIGlmIChzaXplVHlwZS5pbmRleE9mKCdvcmlnaW5hbCcpID4gLTEpIHtcbiAgICAgICAgZmlsdGVyVHlwZS5wdXNoKCdvcmlnaW5hbCcpXG4gICAgICB9XG4gICAgICBpZiAoc2l6ZVR5cGUuaW5kZXhPZignY29tcHJlc3NlZCcpID4gLTEpIHtcbiAgICAgICAgZmlsdGVyVHlwZS5wdXNoKCdjb21wcmVzc2VkJylcbiAgICAgIH1cbiAgICAgIGlmIChmaWx0ZXJUeXBlLmxlbmd0aCA9PSAxICYmIGZpbHRlclR5cGUuaW5kZXhPZignb3JpZ2luYWwnKSA+IC0xKSB7XG4gICAgICAgIHRoaXMuY3JvcHBlckRhdGEub3JpZ2luYWwgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgIHRoaXMuY3JvcHBlckRhdGEubW9kZSA9IG1vZGVcbiAgICAgIH1cbiAgICAgIHRoaXMuY3JvcHBlckRhdGEuaGlkZGVuID0gZmFsc2VcbiAgICAgIHRoaXMuY3JvcHBlckRhdGEuY3JvcENhbGxiYWNrID0gY2FsbGJhY2tcbiAgICAgIHRoaXMuY3JvcHBlckRhdGEuc2l6ZVR5cGUgPSBmaWx0ZXJUeXBlXG4gICAgICB0aGlzLiRhcHBseSgpO1xuXG4gICAgICBpZiAoc3JjKSB7XG4gICAgICAgIHd4LmdldEltYWdlSW5mbyh7XG4gICAgICAgICAgc3JjOiBzcmMsXG4gICAgICAgICAgc3VjY2VzczogKHJlcykgPT57XG4gICAgICAgICAgICB2YXIgdyA9IHJlcy53aWR0aCwgaCA9IHJlcy5oZWlnaHRcblxuICAgICAgICAgICAgdGhpcy5sb2FkSW1hZ2Uoc3JjLCB3LCBoLCBmYWxzZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG5cblxuXG5cblxuXG4gICAgLy8g5rWL6K+VXG5cblxuICAgIC8vIOagueaNruWbvueJh+Wkp+Wwj+iuvue9rmNhbnZhc+Wkp+Wwj++8jOW5tue7mOWItuWbvueJh1xuICAgIGxvYWRJbWFnZShzcmMsIHdpZHRoLCBoZWlnaHQsIGlzUm90YXRlKXtcbiAgICAgIGxldCBzaXplID0gY3JvcHBlclV0aWwuZ2V0QWRqdXN0U2l6ZShXLCBILCB3aWR0aCwgaGVpZ2h0KVxuXG4gICAgICAvLyDpgILlupTlsY/luZXnmoTkvY3nva5cbiAgICAgIGxldCBsZWZ0ID0gKFcgLSBzaXplLndpZHRoKSAvIDJcbiAgICAgIGxldCB0b3AgPSAoSCAtIHNpemUuaGVpZ2h0KSAvIDJcblxuICAgICAgLy8gc2V0IGRhdGFcbiAgICAgIGxldCB1cGRhdGVEYXRhID0ge31cbiAgICAgIGxldCBjcm9wcGVyRGF0YSA9IHRoaXMuY3JvcHBlckRhdGFcblxuICAgICAgaWYgKCFpc1JvdGF0ZSkge1xuICAgICAgICBjcm9wcGVyRGF0YS5pbWFnZUluZm8gPSB7XG4gICAgICAgICAgcGF0aDogc3JjLFxuICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjcm9wcGVyRGF0YS5sZWZ0ID0gbGVmdFxuICAgICAgY3JvcHBlckRhdGEudG9wID0gdG9wXG4gICAgICBjcm9wcGVyRGF0YS53aWR0aCA9IHNpemUud2lkdGhcbiAgICAgIGNyb3BwZXJEYXRhLmhlaWdodCA9IHNpemUuaGVpZ2h0XG5cbiAgICAgIGxldCBjb21wcmVzc2VkU2NhbGUgPSB0aGlzLmNyb3BwZXJEYXRhLm9yaWdpbmFsID8gMS4wIDogMC40XG4gICAgICAvLyBsZXQgc2NhbGVTaXplID0gY3JvcHBlclV0aWwuZ2V0QWRqdXN0U2l6ZShXLCBILCB3aWR0aCwgaGVpZ2h0KVxuXG4gICAgICBjcm9wcGVyRGF0YS5zY2FsZUluZm8gPSB7XG4gICAgICAgIHg6IHdpZHRoICogY29tcHJlc3NlZFNjYWxlIC8gc2l6ZS53aWR0aCxcbiAgICAgICAgeTogaGVpZ2h0ICogY29tcHJlc3NlZFNjYWxlIC8gc2l6ZS5oZWlnaHRcbiAgICAgIH1cblxuICAgICAgdXBkYXRlRGF0YS5jcm9wcGVyRGF0YSA9IGNyb3BwZXJEYXRhXG5cbiAgICAgIHVwZGF0ZURhdGEuY3JvcHBlck1vdmFibGVJdGVtcyA9IHtcbiAgICAgICAgdG9wbGVmdDoge1xuICAgICAgICAgIHg6IDUwLFxuICAgICAgICAgIHk6IDUwXG4gICAgICAgIH0sXG4gICAgICAgIHRvcHJpZ2h0OiB7XG4gICAgICAgICAgeDogc2l6ZS53aWR0aCAtIDUwLFxuICAgICAgICAgIHk6IDUwXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbWxlZnQ6IHtcbiAgICAgICAgICB4OiA1MCxcbiAgICAgICAgICB5OiBzaXplLmhlaWdodCAtIDUwXG4gICAgICAgIH0sXG4gICAgICAgIGJvdHRvbXJpZ2h0OiB7XG4gICAgICAgICAgeDogc2l6ZS53aWR0aCAtIDUwLFxuICAgICAgICAgIHk6IHNpemUuaGVpZ2h0IC0gNTBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgY3JvcHBlckNoYW5nYWJsZURhdGEgPSB0aGlzLmNyb3BwZXJDaGFuZ2FibGVEYXRhXG4gICAgICBjcm9wcGVyQ2hhbmdhYmxlRGF0YS5vcmlnaW5hbFNpemUgPSB7XG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgIH1cbiAgICAgIGNyb3BwZXJDaGFuZ2FibGVEYXRhLnNjYWxlU2l6ZSA9IHtcbiAgICAgICAgd2lkdGg6IHNpemUud2lkdGgsXG4gICAgICAgIGhlaWdodDogc2l6ZS5oZWlnaHRcbiAgICAgIH1cblxuICAgICAgdXBkYXRlRGF0YS5jcm9wcGVyQ2hhbmdhYmxlRGF0YSA9IGNyb3BwZXJDaGFuZ2FibGVEYXRhXG5cbiAgICAgIHRoaXMuY3JvcHBlckRhdGE9dXBkYXRlRGF0YS5jcm9wcGVyRGF0YTtcbiAgICAgIHRoaXMuY3JvcHBlck1vdmFibGVJdGVtcz11cGRhdGVEYXRhLmNyb3BwZXJNb3ZhYmxlSXRlbXM7XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibG9hZEltYWdlIHNpemU6XCIgKyB3aWR0aCArIFwiKlwiICsgaGVpZ2h0KVxuICAgICAgdGhpcy5kcmF3SW1hZ2Uoe1xuICAgICAgICBwYXRoOiB0aGlzLmNyb3BwZXJEYXRhLmltYWdlSW5mby5wYXRoLFxuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICB9KVxuICAgICAgLy8gdGhhdC5kcmF3SW1hZ2UodGhhdC5kYXRhLmNyb3BwZXJEYXRhLmltYWdlSW5mbylcbiAgICAgIHRoaXMuZHJhd0xpbmVzKHRoaXMuY3JvcHBlck1vdmFibGVJdGVtcywgdGhpcy5jcm9wcGVyRGF0YS5pbWFnZUluZm8pXG4gICAgfVxuXG4gICAgLy8g5riF56m6Y2FudmFz5LiK55qE5pWw5o2uXG4gICAgY2xlYXJDYW52YXMoaW1hZ2VJbmZvKXtcbiAgICAgIGxldCBjcm9wcGVyRGF0YSA9IHRoaXMuY3JvcHBlckRhdGFcbiAgICAgIGxldCBzaXplID0gY3JvcHBlclV0aWwuZ2V0QWRqdXN0U2l6ZShXLCBILCBpbWFnZUluZm8ud2lkdGgsIGltYWdlSW5mby5oZWlnaHQpXG5cbiAgICAgIGlmIChpbWFnZUluZm8ucGF0aCAhPSAnJykge1xuICAgICAgICBsZXQgY29tcHJlc3NlZFNjYWxlID0gdGhpcy5jcm9wcGVyRGF0YS5vcmlnaW5hbCA/IDEuMCA6IDAuNFxuXG4gICAgICAgIC8v5riF56m65Y6f5Zu+XG4gICAgICAgIGxldCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KFwib3JpZ2luYWxDYW52YXNcIilcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBpbWFnZUluZm8ud2lkdGggKiBjb21wcmVzc2VkU2NhbGUsIGltYWdlSW5mby5oZWlnaHQgKiBjb21wcmVzc2VkU2NhbGUpXG4gICAgICAgIGN0eC5kcmF3KClcblxuICAgICAgICAvL+a4heepuumAieaLqeWMuuWbvueJh1xuICAgICAgICBsZXQgY2FudmFzID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dChcImNhbnZhc1wiKVxuICAgICAgICBjYW52YXMuY2xlYXJSZWN0KDAsIDAsIHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KVxuICAgICAgICBjYW52YXMuZHJhdygpXG5cbiAgICAgICAgLy8g5riF56m655m957q/5qGGXG4gICAgICAgIGxldCBtb3ZlQ2FudmFzID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dChcIm1vdmVDYW52YXNcIilcbiAgICAgICAgbW92ZUNhbnZhcy5jbGVhclJlY3QoMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpXG4gICAgICAgIG1vdmVDYW52YXMuZHJhdygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy/nu5jliLblm77niYdcbiAgICBkcmF3SW1hZ2UoaW1hZ2VJbmZvKXtcbiAgICAgIGxldCBjcm9wcGVyRGF0YSA9IHRoaXMuY3JvcHBlckRhdGFcbiAgICAgIGxldCBzaXplID0gY3JvcHBlclV0aWwuZ2V0QWRqdXN0U2l6ZShXLCBILCBpbWFnZUluZm8ud2lkdGgsIGltYWdlSW5mby5oZWlnaHQpXG5cbiAgICAgIGlmIChpbWFnZUluZm8ucGF0aCAhPSAnJykge1xuICAgICAgICBsZXQgcGF0aCA9IGltYWdlSW5mby5wYXRoXG4gICAgICAgIGxldCBjb21wcmVzc2VkU2NhbGUgPSB0aGlzLmNyb3BwZXJEYXRhLm9yaWdpbmFsID8gMS4wIDogMC40XG4gICAgICAgIGxldCByb3RhdGVEZWdyZWUgPSB0aGlzLmNyb3BwZXJDaGFuZ2FibGVEYXRhLnJvdGF0ZURlZ3JlZVxuXG4gICAgICAgIC8v57uY5Yi25Y6f5Zu+XG4gICAgICAgIGNyb3BwZXJVdGlsLmRyYXdJbWFnZVdpdGhEZWdyZWUoXG4gICAgICAgICAgXCJvcmlnaW5hbENhbnZhc1wiLFxuICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgaW1hZ2VJbmZvLndpZHRoICogY29tcHJlc3NlZFNjYWxlLFxuICAgICAgICAgIGltYWdlSW5mby5oZWlnaHQgKiBjb21wcmVzc2VkU2NhbGUsXG4gICAgICAgICAgcm90YXRlRGVncmVlXG4gICAgICAgIClcbiAgICAgICAgLy8gbGV0IG9yaWdpbmFsQ2FudmFzID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dChcIm9yaWdpbmFsQ2FudmFzXCIpXG4gICAgICAgIC8vIG9yaWdpbmFsQ2FudmFzLmRyYXdJbWFnZShwYXRoLCAwLCAwLCBpbWFnZUluZm8ud2lkdGggKiBjb21wcmVzc2VkU2NhbGUsIGltYWdlSW5mby5oZWlnaHQgKiBjb21wcmVzc2VkU2NhbGUpXG4gICAgICAgIC8vIG9yaWdpbmFsQ2FudmFzLmRyYXcoKVxuXG4gICAgICAgIC8v57uY5Yi26YCJ5oup5Yy65Zu+54mHXG4gICAgICAgIGNyb3BwZXJVdGlsLmRyYXdJbWFnZVdpdGhEZWdyZWUoXCJjYW52YXNcIiwgcGF0aCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQsIHJvdGF0ZURlZ3JlZSlcbiAgICAgICAgLy8gbGV0IGNhbnZhcyA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoXCJjYW52YXNcIilcbiAgICAgICAgLy8gY2FudmFzLmRyYXdJbWFnZShwYXRoLCAwLCAwLCBzaXplLndpZHRoLCBzaXplLmhlaWdodClcbiAgICAgICAgLy8gY2FudmFzLmRyYXcoKVxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImRyYXc9XCIgKyBwYXRoKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOWNleeLrOe7mOWItuWOn+Wbvu+8jOW9k+WIh+aNouWOn+WbvuS4jumdnuWOn+WbvuaXtuS9v+eUqFxuICAgIGRyYXdPcmlnaW5hbEltYWdlKCl7XG4gICAgICBsZXQgY3JvcHBlckRhdGEgPSB0aGlzLmNyb3BwZXJEYXRhXG4gICAgICBsZXQgaW1hZ2VJbmZvID0gY3JvcHBlckRhdGEuaW1hZ2VJbmZvXG4gICAgICBsZXQgb3JpZ2luYWxTaXplID0gdGhpcy5jcm9wcGVyQ2hhbmdhYmxlRGF0YS5vcmlnaW5hbFNpemVcblxuICAgICAgaWYgKGltYWdlSW5mby5wYXRoICE9ICcnKSB7XG4gICAgICAgIGxldCBwYXRoID0gaW1hZ2VJbmZvLnBhdGhcbiAgICAgICAgbGV0IGNvbXByZXNzZWRTY2FsZSA9IHRoaXMuY3JvcHBlckRhdGEub3JpZ2luYWwgPyAxLjAgOiAwLjRcbiAgICAgICAgbGV0IHJvdGF0ZURlZ3JlZSA9IHRoaXMuY3JvcHBlckNoYW5nYWJsZURhdGEucm90YXRlRGVncmVlXG5cbiAgICAgICAgLy/nu5jliLbljp/lm75cbiAgICAgICAgY3JvcHBlclV0aWwuZHJhd0ltYWdlV2l0aERlZ3JlZShcbiAgICAgICAgICBcIm9yaWdpbmFsQ2FudmFzXCIsXG4gICAgICAgICAgcGF0aCxcbiAgICAgICAgICBvcmlnaW5hbFNpemUud2lkdGggKiBjb21wcmVzc2VkU2NhbGUsXG4gICAgICAgICAgb3JpZ2luYWxTaXplLmhlaWdodCAqIGNvbXByZXNzZWRTY2FsZSxcbiAgICAgICAgICByb3RhdGVEZWdyZWVcbiAgICAgICAgKVxuICAgICAgICAvLyBsZXQgb3JpZ2luYWxDYW52YXMgPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KFwib3JpZ2luYWxDYW52YXNcIilcbiAgICAgICAgLy8gb3JpZ2luYWxDYW52YXMuZHJhd0ltYWdlKHBhdGgsIDAsIDAsIGltYWdlSW5mby53aWR0aCAqIGNvbXByZXNzZWRTY2FsZSwgaW1hZ2VJbmZvLmhlaWdodCAqIGNvbXByZXNzZWRTY2FsZSlcbiAgICAgICAgLy8gb3JpZ2luYWxDYW52YXMuZHJhdygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy/nu5jliLbpgInmoYZcbiAgICBkcmF3TGluZXMoY3JvcHBlck1vdmFibGVJdGVtcywgaW1hZ2VJbmZvLCBjYWxsYmFjayl7XG4gICAgICBsZXQgY3JvcHBlckRhdGEgPSB0aGlzLmNyb3BwZXJEYXRhXG4gICAgICBsZXQgbW9kZSA9IGNyb3BwZXJEYXRhLm1vZGVcbiAgICAgIGxldCBzaXplID0gY3JvcHBlclV0aWwuZ2V0QWRqdXN0U2l6ZShXLCBILCBpbWFnZUluZm8ud2lkdGgsIGltYWdlSW5mby5oZWlnaHQpXG5cbiAgICAgIGxldCBjb252ZXhEb3RzID0gW11cbiAgICAgIGxldCBvcmRlcmVkRG90cyA9IFtdXG4gICAgICBvcmRlcmVkRG90cy5wdXNoKGNyb3BwZXJNb3ZhYmxlSXRlbXNbJ3RvcGxlZnQnXSlcbiAgICAgIG9yZGVyZWREb3RzLnB1c2goY3JvcHBlck1vdmFibGVJdGVtc1sndG9wcmlnaHQnXSlcbiAgICAgIG9yZGVyZWREb3RzLnB1c2goY3JvcHBlck1vdmFibGVJdGVtc1snYm90dG9tcmlnaHQnXSlcbiAgICAgIG9yZGVyZWREb3RzLnB1c2goY3JvcHBlck1vdmFibGVJdGVtc1snYm90dG9tbGVmdCddKVxuXG4gICAgICAvLyDojrflj5blh7jovrnlvaLnmoTngrlcbiAgICAgIGNvbnZleERvdHMgPSBjcm9wcGVyVXRpbC5jb252ZXhIdWxsKG9yZGVyZWREb3RzLCBvcmRlcmVkRG90cy5sZW5ndGgpXG5cbiAgICAgIC8vIOWbm+S4queCuee7hOaIkOeahOWbm+i+ueW9ouaYr+S4jeaYr+WHuOWbm+i+ueW9olxuICAgICAgbGV0IGNhbkNyb3AgPSBjb252ZXhEb3RzLmxlbmd0aCA9PSA0XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soY2FuQ3JvcClcbiAgICAgIH1cblxuICAgICAgbGV0IGN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQoXCJtb3ZlQ2FudmFzXCIpXG5cbiAgICAgIC8v57uY5Yi26auY5Lqu6YCJ5Lit5Yy65Z+fXG4gICAgICBsZXQgcmVjdCA9IGNyb3BwZXJVdGlsLmdldENyb3BSZWN0KGNvbnZleERvdHMpXG5cbiAgICAgIGlmIChtb2RlID09ICdyZWN0YW5nbGUnKSB7XG4gICAgICAgIC8vIOe7mOWItuWNiumAj+aYjumBrue9qVxuICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCdyZ2JhKDAsMCwwLDAuNSknKVxuICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpXG5cbiAgICAgICAgLy8g5riF6Zmk6YCJ5Lit5Yy65Z+f55qE5Y2K6YCP5piO6YGu572p77yM5L2/6YCJ5Lit5Yy65Z+f6auY5LquXG4gICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJ3JnYmEoMCwwLDAsMCknKVxuICAgICAgICBjdHguY2xlYXJSZWN0KHJlY3QueCwgcmVjdC55LCByZWN0LncsIHJlY3QuaClcblxuICAgICAgICAvL+e7mOWItumAieS4rei+ueahhlxuICAgICAgICBjdHguc2V0U3Ryb2tlU3R5bGUoJ3doaXRlJylcbiAgICAgICAgY3R4LnNldExpbmVXaWR0aCgyKVxuICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgY3R4Lm1vdmVUbyhyZWN0LngsIHJlY3QueSlcbiAgICAgICAgY3R4LmxpbmVUbyhyZWN0LnggKyByZWN0LncsIHJlY3QueSlcbiAgICAgICAgY3R4LmxpbmVUbyhyZWN0LnggKyByZWN0LncsIHJlY3QueSArIHJlY3QuaClcbiAgICAgICAgY3R4LmxpbmVUbyhyZWN0LngsIHJlY3QueSArIHJlY3QuaClcbiAgICAgICAgY3R4LmxpbmVUbyhyZWN0LngsIHJlY3QueSlcblxuICAgICAgICBjdHguc3Ryb2tlKClcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy/nu5jliLbpgInkuK3ovrnmoYZcbiAgICAgICAgLy8g5aaC5p6c5Zub5Liq54K557uE5oiQ55qE5Zub6L655b2i5LiN5piv5Ye45Zub6L655b2i77yM5YiZ5pi+56S657qi6Imy77yM6KGo56S65LiN5Y+v5Y+WXG4gICAgICAgIGxldCBjb2xvciA9IGNhbkNyb3AgPyAnd2hpdGUnIDogJ3JlZCdcblxuICAgICAgICBjdHguc2V0U3Ryb2tlU3R5bGUoY29sb3IpXG4gICAgICAgIGN0eC5zZXRMaW5lV2lkdGgoMilcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjb252ZXhEb3RzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgbGV0IGRvdCA9IGNvbnZleERvdHNbaV1cbiAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICBjdHgubW92ZVRvKGRvdC54LCBkb3QueSlcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdHgubGluZVRvKGRvdC54LCBkb3QueSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRvdCA9IGNvbnZleERvdHNbMF1cbiAgICAgICAgY3R4LmxpbmVUbyhkb3QueCwgZG90LnkpXG5cbiAgICAgICAgY3R4LnN0cm9rZSgpXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgICAgfVxuXG4gICAgICAvL+e7mOWItuWbm+S4quinklxuICAgICAgbGV0IGNvcm5lclR5cGUgPSBtb2RlID09ICdyZWN0YW5nbGUnID8gJ3JlY3QnIDogJ2NpcmNsZSdcbiAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJ3doaXRlJylcbiAgICAgIGN0eC5zZXRTdHJva2VTdHlsZSgnd2hpdGUnKVxuXG4gICAgICAvLyDnu5jliLbkuI3lkIzmoLflvI/nmoTop5JcbiAgICAgIGlmIChjb3JuZXJUeXBlID09ICdjaXJjbGUnKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBvcmRlcmVkRG90cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGxldCBkb3QgPSBvcmRlcmVkRG90c1tpXVxuXG4gICAgICAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgICAgY3R4LmFyYyhkb3QueCwgZG90LnksIDEwLCAwLCAyICogTWF0aC5QSSwgdHJ1ZSlcbiAgICAgICAgICBjdHguZmlsbCgpXG4gICAgICAgICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNvcm5lclR5cGUgPT0gJ3JlY3QnKSB7XG4gICAgICAgIGxldCBsZW4gPSAyMCwgdyA9IDMuMCwgb2Zmc2V0ID0gdyAvIDIuMFxuXG4gICAgICAgIGN0eC5zZXRMaW5lV2lkdGgodylcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpXG5cbiAgICAgICAgY3R4Lm1vdmVUbyhyZWN0LnggLSBvZmZzZXQsIHJlY3QueSAtIG9mZnNldCArIGxlbilcbiAgICAgICAgY3R4LmxpbmVUbyhyZWN0LnggLSBvZmZzZXQsIHJlY3QueSAtIG9mZnNldClcbiAgICAgICAgY3R4LmxpbmVUbyhyZWN0LnggLSBvZmZzZXQgKyBsZW4sIHJlY3QueSAtIG9mZnNldClcblxuICAgICAgICBjdHgubW92ZVRvKHJlY3QueCArIG9mZnNldCArIHJlY3QudyAtIGxlbiwgcmVjdC55IC0gb2Zmc2V0KVxuICAgICAgICBjdHgubGluZVRvKHJlY3QueCArIG9mZnNldCArIHJlY3QudywgcmVjdC55IC0gb2Zmc2V0KVxuICAgICAgICBjdHgubGluZVRvKHJlY3QueCArIG9mZnNldCArIHJlY3QudywgcmVjdC55IC0gb2Zmc2V0ICsgbGVuKVxuXG4gICAgICAgIGN0eC5tb3ZlVG8ocmVjdC54ICsgb2Zmc2V0ICsgcmVjdC53LCByZWN0LnkgKyBvZmZzZXQgKyByZWN0LmggLSBsZW4pXG4gICAgICAgIGN0eC5saW5lVG8ocmVjdC54ICsgb2Zmc2V0ICsgcmVjdC53LCByZWN0LnkgKyBvZmZzZXQgKyByZWN0LmgpXG4gICAgICAgIGN0eC5saW5lVG8ocmVjdC54ICsgb2Zmc2V0ICsgcmVjdC53IC0gbGVuLCByZWN0LnkgKyBvZmZzZXQgKyByZWN0LmgpXG5cbiAgICAgICAgY3R4Lm1vdmVUbyhyZWN0LnggLSBvZmZzZXQsIHJlY3QueSArIG9mZnNldCArIHJlY3QuaCAtIGxlbilcbiAgICAgICAgY3R4LmxpbmVUbyhyZWN0LnggLSBvZmZzZXQsIHJlY3QueSArIG9mZnNldCArIHJlY3QuaClcbiAgICAgICAgY3R4LmxpbmVUbyhyZWN0LnggLSBvZmZzZXQgKyBsZW4sIHJlY3QueSArIG9mZnNldCArIHJlY3QuaClcblxuICAgICAgICBjdHguc3Ryb2tlKClcblxuICAgICAgICBjdHguY2xvc2VQYXRoKClcbiAgICAgIH1cblxuICAgICAgY3R4LmRyYXcoKVxuICAgIH1cblxuICAgIC8vIG1vdmUgZXZlbnRzXG4gICAgc2V0dXBNb3ZlSXRlbShrZXksIGNoYW5nZWRUb3VjaGVzLCBpbWFnZUluZm8sIGNhbGxiYWNrKXtcbiAgICAgIGxldCBjcm9wcGVyRGF0YSA9IHRoaXMuY3JvcHBlckRhdGFcbiAgICAgIGxldCBjcm9wcGVyTW92YWJsZUl0ZW1zID0gdGhpcy5jcm9wcGVyTW92YWJsZUl0ZW1zXG4gICAgICBsZXQgbGVmdCA9IGNyb3BwZXJEYXRhLmxlZnRcbiAgICAgIGxldCB0b3AgPSBjcm9wcGVyRGF0YS50b3BcbiAgICAgIGxldCBtb2RlID0gY3JvcHBlckRhdGEubW9kZVxuICAgICAgbGV0IHNpemUgPSBjcm9wcGVyVXRpbC5nZXRBZGp1c3RTaXplKFcsIEgsIGltYWdlSW5mby53aWR0aCwgaW1hZ2VJbmZvLmhlaWdodClcblxuICAgICAgaWYgKGNoYW5nZWRUb3VjaGVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGxldCB0b3VjaCA9IGNoYW5nZWRUb3VjaGVzWzBdXG4gICAgICAgIGxldCB4ID0gdG91Y2guY2xpZW50WFxuICAgICAgICBsZXQgeSA9IHRvdWNoLmNsaWVudFlcblxuICAgICAgICAvLyDnm7jlr7nnlLvluIPnmoTngrlcbiAgICAgICAgeCA9IHggLSBsZWZ0XG4gICAgICAgIHkgPSB5IC0gdG9wXG5cbiAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1trZXldLnggPSB4XG4gICAgICAgIGNyb3BwZXJNb3ZhYmxlSXRlbXNba2V5XS55ID0geVxuXG4gICAgICAgIC8vIOi+ueeVjOajgOa1i++8jOS9v+aIquWbvuS4jei2heWHuuaIquWbvuWMuuWfn1xuICAgICAgICB4ID0geCA8IDAgPyAwIDogKHggPiBzaXplLndpZHRoID8gc2l6ZS53aWR0aCA6IHgpXG4gICAgICAgIHkgPSB5IDwgMCA/IDAgOiAoeSA+IHNpemUuaGVpZ2h0ID8gc2l6ZS5oZWlnaHQgOiB5KVxuICAgICAgICBjcm9wcGVyTW92YWJsZUl0ZW1zW2tleV0ueCA9IHhcbiAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1trZXldLnkgPSB5XG5cbiAgICAgICAgLy8g5aaC5p6c5piv5Zyo55+p5b2i5qih5byP5LiLXG4gICAgICAgIGlmIChtb2RlID09ICdyZWN0YW5nbGUnKSB7XG4gICAgICAgICAgLy8g5ZCM5pe26K6+572u55u46L+e5Lik5Liq54K555qE5L2N572u77yM5piv55u46YK755qE5Lik5Liq54K56Lef6ZqP552A56e75Yqo54K55Yqo77yM5L+d6K+B6YCJ5qGG5Li655+p5b2iXG4gICAgICAgICAgaWYgKGtleSA9PSAndG9wbGVmdCcpIHtcbiAgICAgICAgICAgIGNyb3BwZXJNb3ZhYmxlSXRlbXNbJ2JvdHRvbWxlZnQnXS54ID0geFxuICAgICAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1sndG9wcmlnaHQnXS55ID0geVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChrZXkgPT0gJ3RvcHJpZ2h0Jykge1xuICAgICAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1snYm90dG9tcmlnaHQnXS54ID0geFxuICAgICAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1sndG9wbGVmdCddLnkgPSB5XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGtleSA9PSAnYm90dG9tbGVmdCcpIHtcbiAgICAgICAgICAgIGNyb3BwZXJNb3ZhYmxlSXRlbXNbJ3RvcGxlZnQnXS54ID0geFxuICAgICAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1snYm90dG9tcmlnaHQnXS55ID0geVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChrZXkgPT0gJ2JvdHRvbXJpZ2h0Jykge1xuICAgICAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1sndG9wcmlnaHQnXS54ID0geFxuICAgICAgICAgICAgY3JvcHBlck1vdmFibGVJdGVtc1snYm90dG9tbGVmdCddLnkgPSB5XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3TGluZXMoY3JvcHBlck1vdmFibGVJdGVtcywgaW1hZ2VJbmZvLCBmdW5jdGlvbiAoY2FuQ3JvcCkge1xuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soY3JvcHBlck1vdmFibGVJdGVtcywgY2FuQ3JvcClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG5cblxuXG4gIH1cbiJdfQ==