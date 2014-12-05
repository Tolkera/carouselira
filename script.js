$(function(){

    $('.first-slider').carouselira({
        speed: 1,
        slide: '.slider__item',
        firstSlide: 2,
        bulletNav: {
            container: function(){
                return $(this).parent().find('.bullet-wrap');
            },
            bulletHtml: '<li class="bullet__nav-item"></li>',
            bulletActive: 'bullet--active'
        },
        arrowNav: {
            enable: true,
            navNext: '.next-1',
            navPrev: '.prev-1'
        },
        effect: 'slide'
    });

    $('.second-slider').carouselira({
        speed: 0.4,
        slide: '.slider__item',
        bulletNav: {
            container: '.bullet-wrap-1',
            bulletHtml: '<li class="bullet__nav-item"></li>',
            bulletActive: 'bullet--active'
        },
        arrowNav: {
            enable: true,
            navNext: function(){return $(this).parent().find('.slider__nav-item--next')},
            navPrev: function(){return $(this).parent().find('.slider__nav-item--prev')}
        }
    });

});
