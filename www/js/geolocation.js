var jsonTemp = [{
  "lat": "38.1234",
  "lng": "140.4321"
},{
  "lat": "37.5678",
  "lng": "140.5678"
},{
  "lat": "38.3456",
  "lng": "139.6543"
}];

var CENTER_POINT_WIDTH = 32;
var CENTER_POINT_HEIGHT = 32;

var CENTER_IMG_PATH = "img/center.png";
var MARK_IMG_PATH = "img/mark.png";

var PIC_PATH = ["img/tsuruga.jpeg", "img/inawashiro.jpeg", "img/hakusan.jpeg"];

var temp_current_position = {
  "lat": "38",
  "lng": "140"
};

init();

/** 初期処理関数 */
function init() {

  // 中心点を表示する関数
  plotCenterPoint();

  // 周辺のスポットを全てプロットする関数を1秒間隔で呼び出し
  setInterval(plotAllSpotPoint, 1000);
}

/** 中心点をプロットする関数 */
function plotCenterPoint() {

  // 中心点の要素作成
  var cp = $.parseHTML("<img />");
  cp = cp[0];

  $(cp).prop("src", CENTER_IMG_PATH);
  $(cp).prop("id", "center_point");
  $(cp).css("position", "absolute");
  $(cp).css("top", ($(document).width() * 0.90) / 2);
  $(cp).css("left", "50%");
  $(cp).css("height", CENTER_POINT_HEIGHT + "px");
  $(cp).css("width", CENTER_POINT_WIDTH + "px");

  // レーダーマップに追加
  $("#radar_body").append($(cp));

  // 画像のサイズに合わせて位置を調整
  $(cp).css("top", parseInt($(cp).css("top"), 10) - CENTER_POINT_HEIGHT / 2);
  $(cp).css("left", parseInt($(cp).css("left"), 10) - CENTER_POINT_WIDTH / 2);
}

/** 周辺のスポットを全てプロットする関数 */
function plotAllSpotPoint() {
  console.log('plotAllSpotPoint!!!!!!!!!!!!!!');

  removeAllSpotPoint();

  for (var i = 0; i < jsonTemp.length; i++) {
    plotSpotPoint(jsonTemp[i]);
  }
}

/** 周辺のスポットのプロットを全て削除する関数 */
function removeAllSpotPoint() {
  $(".spot_marker").remove();
}

/** 周辺のスポットをプロットする関数 */
function plotSpotPoint(spot_pos) {

  var cur_pos = getCurrentPosition();

  var res = geoDistance(parseFloat(cur_pos["lat"], 10), parseFloat(cur_pos["lng"], 10), parseFloat(spot_pos["lat"], 10), parseFloat(spot_pos["lng"], 10), 5);

  // 中心点の要素作成
  var spot_marker = $.parseHTML("<img />");
  spot_marker = spot_marker[0];

//  $(spot_marker).prop("src", MARK_IMG_PATH);
  $(spot_marker).prop("src", PIC_PATH[$(".spot_marker").size()]);
  $(spot_marker).prop("class", "spot_marker");
  $(spot_marker).css("position", "absolute");
  $(spot_marker).css("top", parseInt($("#center_point").css("top"), 10));
  $(spot_marker).css("left", parseInt($("#center_point").css("left"), 10));
  $(spot_marker).css("height", CENTER_POINT_HEIGHT + "px");
  $(spot_marker).css("width", CENTER_POINT_WIDTH + "px");

  // レーダーマップに追加
  $("#radar_body").append($(spot_marker));

  // 画像のサイズと座標位置の相対位置に合わせて位置を調整
  // TODO: 緯度経度の差をpxでどれくらいの距離にするか決める
  $(spot_marker).css("top", parseInt($(spot_marker).css("top"), 10) - CENTER_POINT_HEIGHT / 2 + (parseFloat(spot_pos["lat"], 10) - parseFloat(cur_pos["lat"], 10)) * 200);
  $(spot_marker).css("left", parseInt($(spot_marker).css("left"), 10) - CENTER_POINT_WIDTH / 2 + (parseFloat(spot_pos["lng"], 10) - parseFloat(cur_pos["lng"], 10)) * 200);

//  alert($(spot_marker).css("left"));
}

/** 現在位置を取得する関数 */
function getCurrentPosition() {
  return temp_current_position;
}

/** 現在位置をセットする関数 */
function setCurrentPosition(currentPosition) {
  temp_current_position = currentPosition;
}

/** スポットの位置を取得する関数 */
function getSpotPosition() {
  return jsonTemp;
}

function geoDistance(lat1, lng1, lat2, lng2, precision) {
  // 引数　precision は小数点以下の桁数（距離の精度）
  var distance = 0;
  if ((Math.abs(lat1 - lat2) < 0.00001) && (Math.abs(lng1 - lng2) < 0.00001)) {
    distance = 0;
  } else {
    lat1 = lat1 * Math.PI / 180;
    lng1 = lng1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    lng2 = lng2 * Math.PI / 180;

    var A = 6378140;
    var B = 6356755;
    var F = (A - B) / A;

    var P1 = Math.atan((B / A) * Math.tan(lat1));
    var P2 = Math.atan((B / A) * Math.tan(lat2));

    var X = Math.acos(Math.sin(P1) * Math.sin(P2) + Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2));
    var L = (F / 8) * ((Math.sin(X) - X) * Math.pow((Math.sin(P1) + Math.sin(P2)), 2) / Math.pow(Math.cos(X / 2), 2) - (Math.sin(X) - X) * Math.pow(Math.sin(P1) - Math.sin(P2), 2) / Math.pow(Math.sin(X), 2));

    distance = A * (X + L);
    var decimal_no = Math.pow(10, precision);
    distance = Math.round(decimal_no * distance / 1) / decimal_no;   // kmに変換するときは(1000で割る)
  }
  return distance;
}
