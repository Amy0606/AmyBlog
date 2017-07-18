/**
 * Created by Administrator on 2017/6/19.
 */
function rightNavInit(){
    var isMobile = false;
    /*===================================================================================*/
    /*	缓慢滑动
     /*===================================================================================*/
    $('.smooth').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'data-href')).offset().top-85
        }, 500);
        return false;
    });
    if (isMobile == false) {
        /*===================================================================================*/
        /*	滑动监听scroll menu appear
         /*===================================================================================*/
        var appear = $(".appear");
        appear.appear();
        appear.on("appear", function () {
            var id = $(this).attr("id");
            jQuery('.cd-vertical-nav a').removeClass('active');
            jQuery(".cd-vertical-nav a[data-href='#" + id + "']").addClass("active");
        });

        var timelineBlocks = $('.cd-timeline-block'),
            offset =0.8;
        /*===================================================================================*/
        /*	侧边栏
         /*===================================================================================*/
        //hide timeline blocks which are outside the viewport
        hideBlocks(timelineBlocks, offset);

        //on scolling, show/animate timeline blocks when enter the viewport
        $(window).on('scroll', function () {
            (!window.requestAnimationFrame)
                ? setTimeout(function () {
                showBlocks(timelineBlocks, offset);
            }, 100)
                : window.requestAnimationFrame(function () {
                showBlocks(timelineBlocks, offset);
            });
        });

        function hideBlocks(blocks, offset) {
            blocks.each(function () {
                ( $(this).offset().top > $(window).scrollTop() + $(window).height() * offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
            });
        }

        function showBlocks(blocks, offset) {
            blocks.each(function () {
                ( $(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
            });
        }
    }
};
(function ($) {
    /*===================================================================================*/
    /*	返回顶部
     /*===================================================================================*/
    !function (a, b, c) {
        a.fn.scrollUp = function (b) {
            a.data(c.body, "scrollUp") || (a.data(c.body, "scrollUp", !0), a.fn.scrollUp.init(b))
        }, a.fn.scrollUp.init = function (d) {
            var e = a.fn.scrollUp.settings = a.extend({}, a.fn.scrollUp.defaults, d),
                f = e.scrollTitle ? e.scrollTitle : e.scrollText,
                g = a("<a/>", {
                    id: e.scrollName,
                    href: "#pageHeader", /*,
                     title: f*/
                    class: "scrollup"
                }).appendTo("body");
            e.scrollImg || g.html(e.scrollText), g.css({
                display: "none",
                zIndex: e.zIndex
            }), e.activeOverlay && a("<div/>", {
                id: e.scrollName + "-active"
            }).css({
                position: "absolute",
                top: e.scrollDistance + "px",
                width: "100%",
                borderTop: "1px dotted" + e.activeOverlay,
                zIndex: e.zIndex
            }).appendTo("body"), scrollEvent = a(b).scroll(function () {
                switch (scrollDis = "top" === e.scrollFrom ? e.scrollDistance : a(c).height() - a(b).height() - e.scrollDistance, e.animation) {
                    case "fade":
                        a(a(b).scrollTop() > scrollDis ? g.fadeIn(e.animationInSpeed) : g.fadeOut(e.animationOutSpeed));
                        break;
                    case "slide":
                        a(a(b).scrollTop() > scrollDis ? g.slideDown(e.animationInSpeed) : g.slideUp(e.animationOutSpeed));
                        break;
                    default:
                        a(a(b).scrollTop() > scrollDis ? g.show(0) : g.hide(0))
                }
            }), g.click(function (b) {
                b.preventDefault(), a("html, body").animate({
                    scrollTop: 0
                }, e.scrollSpeed, e.easingType);
            });
        }, a.fn.scrollUp.defaults = {
            scrollName: "scrollUp",
            scrollDistance: 300,
            scrollFrom: "top",
            scrollSpeed: 300,
            easingType: "linear",
            animation: "fade",
            animationInSpeed: 200,
            animationOutSpeed: 200,
            scrollText: "Scroll to top",
            scrollTitle: !1,
            scrollImg: !1,
            activeOverlay: !1,
            zIndex: 2147483647
        }, a.fn.scrollUp.destroy = function (d) {
            a.removeData(c.body, "scrollUp"), a("#" + a.fn.scrollUp.settings.scrollName).remove(), a("#" + a.fn.scrollUp.settings.scrollName + "-active").remove(), a.fn.jquery.split(".")[1] >= 7 ? a(b).off("scroll", d) : a(b).unbind("scroll", d)
        }, a.scrollUp = a.fn.scrollUp
    }(jQuery, window, document);
    $(document).ready(function () {
        $.scrollUp({
            scrollName: "scrollUp", // Element ID
            scrollDistance: 300, // Distance from top/bottom before showing element (px)
            scrollFrom: "top", // "top" or "bottom"
            scrollSpeed: 500, // Speed back to top (ms)
            easingType: "linear", // Scroll to top easing (see http://easings.net/)
            animation: "fade", // Fade, slide, none
            animationInSpeed: 200, // Animation in speed (ms)
            animationOutSpeed: 200, // Animation out speed (ms)
            scrollText: "<i class='glyphicon glyphicon-chevron-up'></i>", // Text for element, can contain HTML
            scrollTitle: " ", // Set a custom <a> title if required. Defaults to scrollText
            scrollImg: 0, // Set true to use image
            activeOverlay: 0, // Set CSS color to display scrollUp active point, e.g "#00FFFF"
            zIndex: 999999 // Z-Index for the overlay
        });
    });
})(jQuery);