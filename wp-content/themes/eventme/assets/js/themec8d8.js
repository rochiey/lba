"use strict";
var theme = function ($) {
    
    // Fix RTL
    function fixrtl(){
        if( $('html').attr('dir') == 'rtl' ){
            $('[data-vc-full-width="true"]').each( function(i,v){
                $(this).css('right' , $(this).css('left') ).css( 'left' , 'auto');
                
            });
        }
    }


    // ---------------------------------------------------------------------------------------
    // prevent empty links
    function handlePreventEmptyLinks() {
        $('a[href="#"]').click(function (event) {
            event.preventDefault();
        });
    }

   

    // ---------------------------------------------------------------------------------------
    // Placeholdem
    function handlePlaceholdem() {
        Placeholdem(document.querySelectorAll('[placeholder]'));
    }

    // ---------------------------------------------------------------------------------------
    // add hover class for correct view on mobile devices
    function handleHoverClass() {
        var hover = $('.thumbnail');
        hover.hover(
            function () {
                $(this).addClass('hover');
            },
            function () {
                $(this).removeClass('hover');
            }
        );
    }

    // ---------------------------------------------------------------------------------------
    // superfish menu
    function handleSuperFish() {
        $('ul.sf-menu').superfish();
        $('ul.sf-menu a').click(function() {
            $('body').scrollspy('refresh');
        });
    }

    // ---------------------------------------------------------------------------------------
    // create mobile menu from exist superfish menu
    function handleMobileMenu() {
        var $menu = $('.navigation > ul'),
            optionsList = '<option value="" selected> - - Main Navigation - - </option>';

        $menu.find('li').each(function () {
            var $this = $(this),
                $anchor = $this.children('a'),
                depth = $this.parents('ul').length - 1,
                indent = '';

            if (depth) {
                while (depth > 0) {
                    indent += ' ::: ';
                    depth--;
                }
            }

            optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
        }).end().parent().parent().find('#mobile-menu').append('<select class="mobile-menu">' + optionsList + '</select><div class="mobile-menu-title"><i class="fa fa-bars"></i></div>');

        $('.mobile-menu').on('change', function () {
            window.location = $(this).val();
        });
    }

    // ---------------------------------------------------------------------------------------
    // Sticky Menu
    function handleStickyMenu() {

        function addStickyClass() {
            if ($(window).scrollTop() > 50) {
                $('header.header').addClass('sticky-header');
            }
            else {
                $('header.header').removeClass('sticky-header');
            }
        }

        addStickyClass();

        $(window).scroll(function () {
            addStickyClass()
        });
    }

    // Smooth scrolling
    // ---------------------------------------------------------------------------------------
    function handleSmoothScroll(){
        $(".sf-menu a, .scroll-to").click(function () {

            var headerH = $('header').outerHeight();
            $(".sf-menu a").removeClass('active');
            $(this).addClass('active');
            $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top - 44 + "px"
            }, {
                duration: 1200,
                easing: "easeInOutExpo"
            });
            return false;
        });

    }

    // ---------------------------------------------------------------------------------------
    // prettyPhoto
    function handlePrettyPhoto() {
        $("a[data-gal^='prettyPhoto']").prettyPhoto({
            theme: 'dark_square'
        });
    }

    // ---------------------------------------------------------------------------------------
    // Scroll totop button
    function handleToTopButton() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1) {
                $('.totop').css({bottom: "25px"});
            } else {
                $('.totop').css({bottom: "-100px"});
            }
        });
        $('.totop').click(function () {
            $('html, body').animate({scrollTop: '0px'}, 800);
            return false;
        });
    }


    // ---------------------------------------------------------------------------------------
    // CountDown
    function handleCountDown() {
        //
        var austDay = new Date();
        austDay = new Date(austDay.getFullYear() + 1, 1 - 1, 26);
        $('#defaultCountdown').countdown({until: austDay});
        $('#year').text(austDay.getFullYear());

        $('#defaultCountdown2').countdown({until: austDay});
    }

    // ---------------------------------------------------------------------------------------
    // adopt testimonials owl carousel to design
    function testimonialsFix() {
        var count = $('.testimonials_ova').find('.owl-pagination .owl-page').length;
        count = (count / 2) - 1;
        $('.testimonials_ova').find('.owl-pagination .owl-page').eq(Math.ceil(count)).addClass('nth');
        if (count < Math.ceil(count)) {
            $('.testimonials_ova').find('.owl-pagination').addClass('odd');
        }
    }
    $(window).load(function(){ testimonialsFix() });
    $(window).resize(function(){ testimonialsFix() });

    // ---------------------------------------------------------------------------------------
    // Resize main slider // Responsive fixs
    function resizeSlider() {

        var wh = $(window).height();
        var ih = 0;
        var mh = 0;
        var nh = 0;

        $("#event-slider").find('.owl-item').each(function(){
            if(ih < $(this).find('.slide-caption-inner').outerHeight()){
                ih = $(this).find('.slide-caption-inner').outerHeight();
                ih = ih + 140;
            }
        });

        if (wh < ih ) {
            nh = ih;
        } else {
            nh = wh;
        }

        $('.main-slider').css("height", nh);

        // boxed

        if($('body').hasClass('boxed')) {
            $("#event-slider").find('.owl-item').each(function(){

                $(this).find('.slide-caption-inner').removeAttr('style');

                if(mh < $(this).find('.slide-caption-inner').outerHeight()){
                    mh = $(this).find('.slide-caption-inner').outerHeight();
                }
            });
            $("#event-slider").find('.owl-item').each(function(){
                $(this).find('.slide-caption-inner').css("min-height", mh);
            });
        }
        mh = 0;

    }
    $(window).load(function(){ resizeSlider() });
    $(window).resize(function(){ resizeSlider() });

    // ---------------------------------------------------------------------------------------
    // preloader
    $(window).load(function() {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
    });

    // ---------------------------------------------------------------------------------------
    //

    // INIT FUNCTIONS
    // ---------------------------------------------------------------------------------------
    return {
        onResize: function() {
            fixrtl();
            resizeSlider();
        },
        init: function () {
            fixrtl();
            handlePreventEmptyLinks();
            // handlePlaceholder();
            // handlePlaceholdem();
            handleHoverClass();
            handleSuperFish();
            handleMobileMenu();
            handleStickyMenu();
            handleSmoothScroll();
            //handleCountDown();
            handlePrettyPhoto();
            handleToTopButton();
            //handleTabs();
        },
        // Isotope
        initIsotope: function () {
            var $container = $('.timeline0');
            var $container2 = $('.timeline1');
            var $container3 = $('.timeline2');
            var $container4 = $('.timeline3');

            function addMarker() {
                // add marker
                $container.addClass('vline');
                $container.find('.item').each(function () {

                    
                   
                    var str = $(this).css('transform');

                 
                    var substr = str.split(', ');

                   

                   var substrNumber = substr[substr.length - 2];

                    // add class
                    if (substrNumber < 1) {
                        $(this).removeClass('item-left').removeClass('item-right');
                        $(this).addClass('item-left');
                    } else {
                        $(this).removeClass('item-left').removeClass('item-right');
                        $(this).addClass('item-right');
                    }
                });
            }

            function addMarker2() {
                $container2.addClass('vline');
                $container2.find('.item').each(function () {

                   
                    var substrNumber = 2;

                    // add class
                    if (substrNumber < 1) {
                        $(this).removeClass('item-left').removeClass('item-right');
                        $(this).addClass('item-left');
                    } else {
                        $(this).removeClass('item-left').removeClass('item-right');
                        $(this).addClass('item-right');
                    }
                });
            }
            function addMarker3() {
                $container3.addClass('vline');
                $container3.find('.item').each(function () {

                   
                    var substrNumber = 2;

                    // add class
                    if (substrNumber < 1) {
                        $(this).removeClass('item-left').removeClass('item-right');
                        $(this).addClass('item-left');
                    } else {
                        $(this).removeClass('item-left').removeClass('item-right');
                        $(this).addClass('item-right');
                    }
                });
            }
            function addMarker4() {
                $container4.addClass('vline');
                $container4.find('.item').each(function () {

                   
                   var substrNumber = 2;

                    // add class
                    if (substrNumber < 1) {
                        $(this).removeClass('item-left').removeClass('item-right');
                        $(this).addClass('item-left');
                    } else {
                        $(this).removeClass('item-left').removeClass('item-right');
                        $(this).addClass('item-right');
                    }
                });
            }
            $(window).resize(function () {
                // relayout on window resize
                $container.isotope('reLayout', function(){addMarker();});
                $container2.isotope('reLayout', function(){addMarker2();});
                $container3.isotope('reLayout', function(){addMarker3();});
                $container4.isotope('reLayout', function(){addMarker4();});
                $.waypoints('refresh');
            });
            $(window).load(function () {
                // initialize isotope
                $container.isotope({itemSelector: '.item', animationEngine: 'css'});
                $container.isotope('reLayout', function(){addMarker();});
                $container2.isotope({itemSelector: '.item', animationEngine: 'css'});
                $container2.isotope('reLayout', function(){addMarker2();});
                $container3.isotope({itemSelector: '.item', animationEngine: 'css'});
                $container3.isotope('reLayout', function(){addMarker3();});
                $container4.isotope({itemSelector: '.item', animationEngine: 'css'});
                $container4.isotope('reLayout', function(){addMarker4();});
            });
			$(document).ready(function () {
                // initialize isotope
                $container.isotope({itemSelector: '.item', animationEngine: 'css'});
                $container.isotope('reLayout', function(){addMarker();});
                $container2.isotope({itemSelector: '.item', animationEngine: 'css'});
                $container2.isotope('reLayout', function(){addMarker2();});
                $container3.isotope({itemSelector: '.item', animationEngine: 'css'});
                $container3.isotope('reLayout', function(){addMarker3();});
                $container4.isotope({itemSelector: '.item', animationEngine: 'css'});
                $container4.isotope('reLayout', function(){addMarker4();});
            });
            $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
              
            });
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                $container.isotope('reLayout', function(){ addMarker(); });
                $container2.isotope('reLayout', function(){ addMarker2(); });
                $container3.isotope('reLayout', function(){ addMarker3(); });
                $container4.isotope('reLayout', function(){ addMarker4(); });
                $.waypoints('refresh');
            });
            
        },
        // EventSlider
        initEventSlider: function () {
            
            var rtl = false;
            if( $('html').attr('dir') == 'rtl' ){
                rtl = true;
            }

            $("#event-slider").owlCarousel({
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                loop: true,
                margin: 0,
                dots: false,
                autoplaySpeed: 100,
                rtl:rtl,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsiveRefreshRate: 100,
                responsive: {
                    0:    {items: 1},
                    479:  {items: 1},
                    768:  {items: 1},
                    991:  {items: 1},
                    1024: {items: 1}
                }
            });
        },
        // Testimonials
        initTestimonials: function () {
            var rtl = false;
            if( $('html').attr('dir') == 'rtl' ){
                rtl = true;
            }
            $(".testimonials_ova").owlCarousel({
                 autoplay: true,
                autoplayHoverPause: true,
                loop: true,
                margin: 0,
                dots: false,
                rtl:rtl,
                navText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                responsiveRefreshRate: 100,
                responsive: {
                    0:    {items: 1},
                    479:  {items: 1},
                    768:  {items: 1},
                    991:  {items: 1},
                    1024: {items: 1}
                }
            });
        },

        initLastTweet: function () {
            var rtl = false;
            if( $('html').attr('dir') == 'rtl' ){
                rtl = true;
            }

            $('.ova_twitter').each(function(){

                $(this).find('.slide_twitter').owlCarousel({

                    autoplay: true,
                    autoplayHoverPause: true,
                    loop: true,
                    margin: 0,
                    dots: false,
                    rtl:rtl,
                    navText: [
                        "<i class='fa fa-angle-left'></i>",
                        "<i class='fa fa-angle-right'></i>"
                    ],
                    responsiveRefreshRate: 100,
                    responsive: {
                        0:    {items: 1},
                        479:  {items: 1},
                        768:  {items: 1},
                        991:  {items: 1},
                        1024: {items: 1}
                    }

                 });

                $(this).find("#next-tweet").click(function () {
                    $('.slide_twitter').trigger("owl.next");
                    return false;
                });

                $(this).find("#prev-tweet").click(function () {
                    $('.slide_twitter').trigger("owl.prev");
                    return false;
                });

            });
        },

            
         
        
        
        // Animation on Scroll
        initAnimation: function () {
            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile == false) {
                $('*[data-animation]').addClass('animated');
                $('.animated').waypoint(function (down) {
                    var elem = $(this);
                    var animation = elem.data('animation');
                    if (!elem.hasClass('visible')) {
                        var animationDelay = elem.data('animation-delay');
                        if (animationDelay) {
                            setTimeout(function () {
                                elem.addClass(animation + " visible");
                            }, animationDelay);
                        } else {
                            elem.addClass(animation + " visible");
                        }
                    }
                }, {
                    offset: $.waypoints('viewportHeight')
                   
                });
            }
        }
    };
}(jQuery);
