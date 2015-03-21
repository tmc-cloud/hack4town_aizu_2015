var jsonTemp = {
  "lat": "38.1234",
  "lon": "140.4321"
};

var CENTER_POINT_WIDTH = 32;
var CENTER_POINT_HEIGHT = 32;

var CENTER_IMG_PATH = "img/center.png";
var MARK_IMG_PATH = "img/mark.png"

plotCenterPoint();
plotSpotPoint();
/** 中心点をプロットする関数 */
function plotCenterPoint() {

  // 中心点の要素作成
  var cp = $.parseHTML("<img />");
  cp = cp[0];

  $(cp).prop("src", CENTER_IMG_PATH);
  $(cp).css("position", "absolute");
  $(cp).css("top", "30%");
  $(cp).css("left", "50%");
  $(cp).css("height", CENTER_POINT_HEIGHT + "px");
  $(cp).css("width", CENTER_POINT_WIDTH + "px");

  // レーダーマップに追加
  $("#radar_body").append($(cp));

  // 画像のサイズに合わせて位置を調整
  $(cp).css("top", parseInt($(cp).css("top"), 10) - CENTER_POINT_HEIGHT / 2);
  $(cp).css("left", parseInt($(cp).css("left"), 10) - CENTER_POINT_WIDTH / 2);

//  $("#radar_body").append("<img src='' style='top: 30%; left: 30%; width:32px; height: 32px;' />");
}

/** 周辺のスポットをプロットする関数 */
function plotSpotPoint() {
//  alert(jsonTemp["lat"]);
}
