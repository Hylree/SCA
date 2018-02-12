//detect scroll for change css of navbar
$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if(scroll <= 1){
        console.log('test ' + scroll);
        $(".color_ul_large a").css("color", "white");
        $(".icon_menu").css("color", "white");
        $("#navbar_scroll_child").removeClass();
        $("#navbar_scroll_child").addClass("nav-extend transparent z-depth-0");
    }else{
        $(".icon_menu").css("color", "black");
        $(".color_ul_large a").css("color", "black");
        $("#navbar_scroll_child").removeClass();
        $("#navbar_scroll_child").addClass("nav-extend grey lighten-5");
    }
});