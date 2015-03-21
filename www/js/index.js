$(document).ready(function(){
    var viewheight = $(document).height();
    var viewwidth = $(document).width();
    var v_middle = (viewheight/2) - (viewwidth *0.9/ 2);

    $("#radar_body").css({"height":viewwidth*0.9, "top":v_middle, "left":(viewwidth * 0.05), "border-radius":viewwidth/2});

});