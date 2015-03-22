var COMPASS_INTERVAL = 100;

function compassSuccess(heading) {
  //  alert(heading.magneticHeading);

  // 回転させるためのパラメータをCSSに反映させる
  rotate(-1 * heading.magneticHeading);
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
