jQuery(document).ready(function () {
        theme.init();
        theme.initEventSlider();
        theme.initIsotope();
        theme.initTestimonials();        
        theme.initLastTweet();
        theme.initAnimation();

        var rtl = false;
        if( jQuery('html').attr('dir') == 'rtl' ){
            rtl = true;
        }

        
        jQuery(".gallery_schedule").owlCarousel({
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
});

jQuery(window).load(function () {
    jQuery('body').scrollspy({
        offset: 100,
        target: '.navigation'
    });
    jQuery(window).stellar({
        horizontalScrolling: false
    });
});

jQuery(document).ready(function(){
    jQuery('#sidebar img').addClass('img-responsive');
    jQuery('#sidebar img').css('display','inline-block');    
});
