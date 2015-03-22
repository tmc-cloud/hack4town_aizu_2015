
setInterval(changeCurrentPosition, 1000);

/** 自分がいる位置少しだけ前ににする関数 */
function changeCurrentPosition() {
  console.log('changeCurrentPosition!!!!!!!!!!!!!!!');

  // 前に歩く
  var curPos = getCurrentPosition();
  var newLat = parseFloat(curPos["lat"], 10) - 0.05;
  curPos["lat"] = newLat + " ";
}
