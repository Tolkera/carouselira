$(function(){

    $('.owl-slider').carouselira({
        speed: 1,
        slide: '.slider__item',
        firstSlide: 0,
        bulletNav: {
            container: function(){
                return $(this).parent().find('.owl-slider__bullet-wrap');
            },
            bulletHtml: '<li class="owl-slider__nav-item"></li>',
            bulletActive: 'owl-slider__nav-item--active'
        },
        arrowNav: {
            enable: true,
            navNext: '.next-1',
            navPrev: '.prev-1'
        },
        effect: 'slide'
    });

    $('.rainforest-slider').carouselira({
        speed: 0.4,
        slide: '.slider__item',
        bulletNav: {
            container: '.rainforest-slider__bullet-wrap',
            bulletHtml: '<li class="rainforest-slider__nav-item"></li>',
            bulletActive: 'rainforest-slider__nav-item--active'
        },
        arrowNav: {
            enable: true,
            navNext: function(){return $(this).parent().find('.slider__nav-item--next')},
            navPrev: function(){return $(this).parent().find('.slider__nav-item--prev')}
        }
    });

});
