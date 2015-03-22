$(document).ready(function(){
    var viewheight = $(document).height();
    var viewwidth = $(document).width();
    var v_middle = (viewheight/2) - (viewwidth *0.9/ 2);

    $("#radar_body").css({"height":viewwidth*0.9, "top":v_middle, "left":(viewwidth * 0.05), "border-radius":viewwidth/2});

});

document.addEventListener('deviceready',
    function(){
        console.log("!!!!!!!!!!!");
        startBLEScan("00000000-0AC6-1001-B000-001C4D7F9BAD", findBeacon);
    },
    false
);


function takephoto(){
    $("#detail_box").css({"display":"none"});
    $("#photo_box").css({"display":"block"});
    navigator.camera.getPicture(onPhotoDataSuccess, function(){}, { quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL });
}

function onPhotoDataSuccess(imageData) { 
    setTimeout(function(){
        $("#photo").attr({"src": "data:image/jpeg;base64," + imageData});
    },1000);   
}

function findBeacon(uuid, major, minor, proximity){
    $("#search").css({"-webkit-filter":"blur(10px)"});
    $("#find_box").css({"display":"block"});
}

function showDetail(){
    $("#find_box").css({"display":"none"});
    $("#detail_box").css({"display":"block"});
}

function hideDialog(){
    $("#find_box").css({"display":"none"});
    $("#detail_box").css({"display":"none"});
    $("#search").css({"-webkit-filter":""});
    $("#photo_box").css({"display":"none"});
}

function rotate(deg){
    $("#radar_body").css({"transform":"rotate("+ deg +"deg)"})
}