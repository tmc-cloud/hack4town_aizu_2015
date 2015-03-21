$(document).ready(function(){
    var viewheight = $(document).height();
    var viewwidth = $(document).width();
    var v_middle = (viewheight/2) - (viewwidth / 2);

    $("#radar_body").css({"height":viewwidth, "top":v_middle, "border-radius":viewwidth/2});

});