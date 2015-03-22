
// すでに定義されているintervalをクリア
clearInterval(timer_plotAllSoptPoint);

// 関数をハック
var currentPlotAllSpotPoint = plotAllSpotPoint;
plotAllSpotPoint = overridePlotAllSpotPoint

// ハック後の関数でintervalを再定義
timer_plotAllSoptPoint = setInterval(plotAllSpotPoint, 500);

/** plotAllSpotPointハック用関数 */
function overridePlotAllSpotPoint() {
  console.log('overridePlotAllSpotPoint!!!!!!!!!!!!!!!');

  // 前に歩く
  var curPos = getCurrentPosition();
  var newLat = parseFloat(curPos["lat"], 10) - 0.1;
  curPos["lat"] = newLat + " ";

  // プロット
  currentPlotAllSpotPoint();
}
