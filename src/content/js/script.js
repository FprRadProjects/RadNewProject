import $ from 'jquery';

$(document).on('click', ".mobile-sidebar .switch-state", function () {
    $(".page-body-wrapper").toggleClass("sidebar-close");
    if (!$(".page-body-wrapper").hasClass('sidebar-close')) {
        $('.page-main-header .main-header-left').css({
            "box-shadow": "-1px 0 20px 0 rgba(0,0,0,.07)",
            "background": "rgb(63,78,255)",
            "background": "-moz-linear-gradient(left, rgba(63,78,255,1) 0%, rgba(60,122,243,1) 100%)",
            "background": "-webkit-linear-gradient(left, rgba(63,78,255,1) 0%,rgba(60,122,243,1) 100%)",
            "background": "linear-gradient(to right, rgba(63,78,255,1) 0%,rgba(60,122,243,1) 100%)",
            "filter": "progid:DXImageTransform.Microsoft.gradient( startColorstr='#3f4eff', endColorstr='#3c7af3',GradientType=1 )"
        })
    }
    else {
        $('.page-main-header .main-header-left').css({
            "box-shadow": "none",
            "background": "none"
        })
    }
});
$('.loader-wrapper').fadeOut('slow', function () {
    $(this).remove();
});
$(document).on('click', '.mobile-toggle', function (e) {
    $(".nav-menus").toggleClass("open");
});
$(document).on('click', '.sidebar-menu li a', function (e) {
    var $this = $(this);
    var checkElement = $this.next();
    if (checkElement.is('.sidebar-submenu') && checkElement.is(':visible')) {
        checkElement.slideUp(100, function () {
            checkElement.removeClass('menu-open');
            //add n
            checkElement.find('ul').removeClass('menu-open');
            checkElement.find('ul').hide();
            //add n
        });
        checkElement.parent("li").removeClass("active");
        //add n
        checkElement.find('li').removeClass('active');
        //add n
    }
    else if ((checkElement.is('.sidebar-submenu')) && (!checkElement.is(':visible'))) {
        var parent = $this.parents('ul').first();
        var ul = parent.find('ul:visible').toggle(100);
        ul.removeClass('menu-open');
        var parent_li = $this.parent("li");
        checkElement.toggle(100, function () {
            checkElement.addClass('menu-open');
            parent.find('li.active').removeClass('active');
            parent_li.addClass('active');
        });
    }
    if (checkElement.is('.sidebar-submenu')) {
        e.preventDefault();
    }
});

$(document).ready(function () {
    if ($(window).width() <= 991) {
        $(".sidebar-toggle").prop('checked', false);
        $(".page-body-wrapper").addClass("sidebar-close");
    }
    $(".sidebar-toggle").change(function () {
        if ($(".sidebar-toggle").attr('checked', true)) {
            $(".page-sidebar").addClass("page-sidebar-open");
        }
    });
});