$(function(){
    $('.main-slider').carouselira({
        speed: 300,
        slide: '.slider__item',
        bulletNav: {
            enable: true,
            container: '.bullet-wrap',
            bulletHtml: '<li class="bullet__nav-item"></li>',
            bulletActive: 'bullet--active'
        },
        arrowNav: {
            enable: true,
            navNext: '.slider__nav-item--prev',
            navPrev: '.slider__nav-item--next'
        }
    })
})
