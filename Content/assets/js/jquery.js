
//$(document).ready(function () {
    
//    $(".kt-aside").hover(function () {
//        if ($("body").hasClass("kt-aside--minimize")) {
//            $(this).css({"width": "265px"});
                //$(".kt-menu__link-text").css({"display": "block"})
//        }
       
//    }, function () {
//            if ($("body").hasClass("kt-aside--minimize")) {
//                $(this).css({ "width": "70px" });
//            }
        
//    });
//});


//$(document).ready(function () {
//    $(".kt-aside").mouseenter(function () {
//        if ($("body").hasClass("kt-aside--minimize")) {
//            console.log("testing");
//            $("#kt_aside_toggler").click();
//            //$(".kt-aside").css({ "width": "265px" });
//            //$(".kt-menu__link-text").css({ "display": "block" })
           
            
// }
//    });

//});


//$(document).ready(function () {
//    $('.menuhover-sidebar').mouseenter(function () {
//        if ($('#kt_aside_toggler').hasClass('kt-aside__brand-aside-toggler--active')) {
//            $('#kt_aside_toggler').removeClass('kt-aside__brand-aside-toggler--active');
//            $('.logo-custom-hover').attr("src", "/Content/assets/media/logos/logo-light.png");
//        }
//        if ($('.kt-quick-panel--right').hasClass('kt-aside--minimize')) {
//            $('.kt-quick-panel--right').removeClass('kt-aside--minimize');

//        }
//    });
//});



//$(".menuhover-sidebar").mouseenter(function () {
//    if ($("body").hasClass("kt-aside--minimize")) {
//        debugger;
//        var toggler = 0;

//        if (toggler == 0 &
//            $("#kt_aside_toggler").hasClass("kt-aside__brand-aside-toggler--active")
//        ) {
//            $("#kt_aside_toggler").removeClass(
//                "kt-aside__brand-aside-toggler--active"
//            );
//            $('.kt-aside__brand-logo img').attr('src', '/Content/assets/media/logos/logo-light.png');
//            setTimeout(function () {
//                $('.kt-aside__brand-logo img').css('width', '170px');
//            }, 10)
//            toggler = 0;
//            Cookies.set('kt_aside_toggle_state', "true");
//        }
//        if ($(".kt-quick-panel--right").hasClass("kt-aside--minimize")) {
//            $(".kt-quick-panel--right").removeClass("kt-aside--minimize");
//        }
       
//    }


 
//});
$(document).ready(function () {
    $(".menuhover-sidebar").mouseenter(function () {
        var toggler = 0;
        var ssrrcc = '';
        if (toggler == 0 &
            $("#kt_aside_toggler-new").hasClass("kt-aside__brand-aside-toggler--active")
        ) {
            $("#kt_aside_toggler-new").removeClass(
                "kt-aside__brand-aside-toggler--active"
            );
            
            var imgUrllight = $('input[name=dynamicImageUrllight]').val();
            $('.kt-aside__brand-logo img').attr('src', imgUrllight);
            setTimeout(function () {
                $('.kt-aside__brand-logo img').css('width', '170px');
            }, 10)
            toggler = 0;
            localStorage.setItem("toggleStatus", "off")
        }
        if ($(".kt-quick-panel--right").hasClass("kt-aside--minimize")) {
            $(".kt-quick-panel--right").removeClass("kt-aside--minimize");
        }
    });
    $('#kt_aside_toggler-new').on("click", function () {
        if (
            $("#kt_aside_toggler-new").hasClass("kt-aside__brand-aside-toggler--active")
        ) {
            $("#kt_aside_toggler-new").removeClass(
                "kt-aside__brand-aside-toggler--active"
            );
            
            var imgUrllight = $('input[name=dynamicImageUrllight]').val();
           
            $('.kt-aside__brand-logo img').attr('src', imgUrllight);
            setTimeout(function () {
                $('.kt-aside__brand-logo img').css('width', '170px');
            }, 10)
            localStorage.setItem("toggleStatus", "off")
        } else {
            $("#kt_aside_toggler-new").addClass(
                "kt-aside__brand-aside-toggler--active"
            );
            var imgUrl = $('input[name=dynamicImageUrl]').val();
            $('.kt-aside__brand-logo a img').css('width', '50px').attr('src', imgUrl);

            localStorage.setItem("toggleStatus", "on")
        }

        if ($(".kt-quick-panel--right").hasClass("kt-aside--minimize")) {
            $(".kt-quick-panel--right").removeClass("kt-aside--minimize");
        } else {
            $(".kt-quick-panel--right").addClass("kt-aside--minimize");
        }
    })


});



    $(document).ready(function () {
        debugger;
        var currentStyle = localStorage.getItem('theme-color');
        $('#currentStyle').val(currentStyle);
        setTheme(currentStyle);
    });

function setTheme(theme) {
    debugger;
    localStorage.setItem('theme-color', theme);
    var classRemoved = false;
    //var currentStyle = $('#currentStyle').val();
    var classList = $('#mainDiv').attr('class').split(/\s+/);
    for (let i = 0; i < classList.length; i++) {
        if (classList[i].indexOf('theme-') != -1 && classList[i] != theme) {
            $('#mainDiv').removeClass(classList[i]);
            classRemoved = true;
        }
    }
    if (classRemoved == true)
        $('#mainDiv').addClass(theme);
}


function lockscreenclick() {

    $(".kt-wrapper").css("position", "fixed");
}

function lockscreenexit() {
    $(".kt-wrapper").css("position", "initial");
}