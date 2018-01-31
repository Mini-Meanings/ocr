/**
 * Created by wyq on 18/1/30.
 */

/**
 * 将百度aip接口返回的数据点转换为矩形的四条边
 * @param left
 * @param top
 * @param width
 * @param height
 * @returns {*[]}
 */
exports.aip2RectLine = function (left, top, width, height) {
	let xLeft = left;     //左上
	let yTop = top;
	let xRight = left + width;  //右下
	let yBottom = top + height;
	//矩形的四个顶点
	let pA = [xLeft, yTop];     //左上
	let pB = [xRight, yTop];    //右上
	let pC = [xRight, yBottom]; //右下
	let pD = [xLeft, yBottom];  //左下
	return [  //返回构成矩形的四条线段
		[pA[0], pA[1], pB[0], pB[1]], //AB
		[pB[0], pB[1], pC[0], pC[1]], //BC
		[pC[0], pC[1], pD[0], pD[1]], //CD
		[pD[0], pD[1], pA[0], pA[1]]  //DA
	];
};