
setInterval(changeCurrentPosition, 1000);

/** 自分がいる位置少しだけ前ににする関数 */
function changeCurrentPosition() {
  console.log('changeCurrentPosition!!!!!!!!!!!!!!!');

  var degree = getCompassData();

  // -1 の場合は地磁気がまだ準備されていない状態なので、何もしない
  if(degree == -1) return;

  // 角度が0度の場合の歩く距離
  var diffLatCurrent = -0.05;
  var diffLngCurrent = 0;

  // 角度に合わせて歩く距離を調整する
  var rad = -degree * Math.PI / 180;
  var diffLat = diffLatCurrent * Math.cos(rad) - diffLngCurrent * Math.sin(rad);
  var diffLng = diffLatCurrent * Math.sin(rad) + diffLngCurrent * Math.cos(rad);

  // 前に歩く
  var curPos = getCurrentPosition();
  var newLat = parseFloat(curPos["lat"], 10) + diffLat;
  var newLng = parseFloat(curPos["lng"], 10) + diffLng;
  curPos["lat"] = newLat + " ";
  curPos["lng"] = newLng + " ";
  setCurrentPosition(curPos);
}
