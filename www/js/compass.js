var COMPASS_INTERVAL = 500;

function compassSuccess(heading) {
  // 回転させるためのパラメータをCSSに反映させる
  alert(heading.magneticHeading);
}

function compassError(compassError) {
  alert("失敗！！");
}

var options = {
    frequency: COMPASS_INTERVAL
};

// ちょっと遅らせて定期処理を走らせる
setTimeout(function () {
  var watchID = navigator.compass.watchHeading(compassSuccess, compassError, options);
}, 500);
