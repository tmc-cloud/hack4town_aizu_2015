var COMPASS_INTERVAL = 100;
// 方角情報を格納する関数
var current_compass = -1;

function compassSuccess(heading) {
  //  alert(heading.magneticHeading);

  current_compass = heading.magneticHeading;
  // 回転させるためのパラメータをCSSに反映させる
  rotate(-1 * current_compass);
}

function compassError(compassError) {
  console.log("取得失敗！！");
}

var options = {
    frequency: COMPASS_INTERVAL
};

// ちょっと遅らせて定期処理を走らせる
setTimeout(function () {
  var watchID = navigator.compass.watchHeading(compassSuccess, compassError, options);
}, 500);

/** 方角情報を取得する関数 */
function getCompassData() {
  return current_compass;
}
