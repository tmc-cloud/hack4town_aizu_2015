function initialize() {
  $("#link_list").css("top", "50%");
//  $("#link_list").css("left", "50%");

//  alert('link_list.top = ' + $("#link_list").css("top"));
//  alert('link_list.left = ' + $("#link_list").css("left"));
  $("#link_list").css("top", parseInt($("#link_list").css("top"), 10) - parseInt($("#link_list").css("height"), 10) / 2);
//  $("#link_list").css("left", parseInt($("#link_list").css("left"), 10) - parseInt($("#link_list").css("width"), 10) / 2);
//  alert('link_list.top = ' + $("#link_list").css("height"));
//  alert('link_list.left = ' + $("#link_list").css("width"));

//  alert('link_list.top = ' + $("#link_list").css("top"));
//  alert('link_list.left = ' + $("#link_list").css("left"));
}

$(document).ready(function() {
  initialize();
});
