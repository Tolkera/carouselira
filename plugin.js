(function($){

    $.fn.carouselira = function(options){
        var settings = $.extend({
            slide: '',
            speed: 250,
            firstSlide: '',

            bulletNav: {
                enable: false,
                container: '',
                bulletHtml: '',
                bulletActive: ''
            },
            arrowNav: {
                enable: false,
                navNext: '',
                navPrev: ''
            }
        }, options);

        return this.each(function(){
            var slider = $(this);
            var speed = settings.speed;
            var slides = slider.find(settings.slide);
            var firstSlide = settings.firstSlide || 0;
            var slidesLen = slides.length;
            var current = firstSlide;
            var lastSlide = slidesLen - 1;
            var nextSlide = firstSlide;

            slides.hide().eq(firstSlide).show();

            if(settings.arrowNav.enable) {
                var prevBtn = slider.find(settings.arrowNav.navPrev);
                var nextBtn = slider.find(settings.arrowNav.navNext);

                nextBtn.on('click', function(){
                    animateWithArrowNav('next');
                });
                prevBtn.on('click', function(){
                    animateWithArrowNav('prev');
                });
            }

            if(settings.bulletNav.enable) {
                var navContainer = slider.find(settings.bulletNav.container);
                var bulletActiveClass = settings.bulletNav.bulletActive;
                createBulletNav();
                var bullet = navContainer.children();
                updateCurrentBullet();

                bullet.on('click', function(){
                    var clickedBulletIndex = $(this).index();
                    slideBullet(clickedBulletIndex);
                    updateCurrentBullet()
                })
            }

            function changeSlides(){
                slides.eq(current).fadeOut(speed, function(){
                    slides.eq(nextSlide).fadeIn(speed);
                });
                current = nextSlide;
                if(settings.bulletNav.enable) {
                    updateCurrentBullet()
                }
            }

            function animateWithArrowNav(direction) {
                if(direction == "next") {
                    nextSlide = (current == lastSlide) ? 0 : current + 1;
                } else {
                    nextSlide = (current == 0) ? lastSlide : current - 1;
                }
                changeSlides();
            }

            function createBulletNav() {
                var bulletsHtml = "";
                for ( var i = 0; i < slidesLen; i++ ){
                    bulletsHtml += settings.bulletNav.bulletHtml;
                }

                navContainer.html(bulletsHtml);
            }

            function slideBullet(clickedBulletIndex){
                if(!(clickedBulletIndex == current)) {
                    nextSlide = clickedBulletIndex;
                    changeSlides();
                }
            }

            function updateCurrentBullet(){
                bullet.removeClass(bulletActiveClass);
                bullet.eq(current).addClass(bulletActiveClass);
            }
        });

    };

}(jQuery));

