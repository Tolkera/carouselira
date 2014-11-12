(function($){

    function Carouselira(element, options){
        this.options = $.extend({}, {
            slide: '',
            speed: 1500,
            firstSlide: 0,

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
            },

            effect: 'fade'

        }, options);

        this.slider = $(element);
        this.speed = this.options.speed;
        this.slides = this.slider.find(this.options.slide);
        this.firstSlide = this.options.firstSlide;
        this.slidesLen = this.slides.length;
        this.lastSlide = this.slidesLen - 1;
        this.init();
    }

    Carouselira.prototype = {
        init: function(){
                this.current = this.firstSlide;
                this.nextSlide = this.firstSlide;
                this.slides.hide().eq(this.firstSlide).show();

                if(this.options.bulletNav.enable) {
                    this.bulletActiveClass = this.options.bulletNav.bulletActive;
                    this.createBulletNav();
                }

                if(this.options.arrowNav.enable) {
                    var navPrev = this.slider.find(this.options.arrowNav.navPrev);
                    var navNext = this.slider.find(this.options.arrowNav.navNext);
                    this.createArrowNav(navPrev, navNext);
                }

        },

        createArrowNav: function(prev, next){
            var self = this;

            passDirection(prev, 'prev');
            passDirection(next, 'next');

            function passDirection(btn, dir){
                btn.on('click', function(){
                    self.findNextSlide({direction: dir})
                })
            }
        },

        createBulletNav: function() {
            var bulletsHtml = "";
            var bullet = this.options.bulletNav.bulletHtml;
            var navContainer = this.slider.find(this.options.bulletNav.container);
            for ( var i = 0; i < this.slidesLen; i++ ){
                bulletsHtml += bullet;
            }
            navContainer.html(bulletsHtml);
            this.bullet = navContainer.children();
            this.updateCurrent();
            var self = this;

            this.bullet.on('click', function(){
                var clickedBulletIndex = $(this).index();
                self.findNextSlide({nextSlide: clickedBulletIndex + ""});
            })
        },

        findNextSlide: function(options){
            if(options.direction){
                if(options.direction == "next") {
                    this.nextSlide = (this.current == this.lastSlide) ? 0 : this.current + 1;
                } else {
                    this.nextSlide = (this.current == 0) ? this.lastSlide : this.current - 1;
                }
            }

            if(options.nextSlide) {
                if(!(options.nextSlide == this.current)) {
                    this.nextSlide = options.nextSlide;
                }
            }
            this.changeSlides();
        },


        changeSlides: function(){
                var self = this;
                this.slides.eq(this.current).fadeOut(this.speed, function(){
                    self.slides.eq(self.nextSlide).fadeIn(self.speed);
                });
                this.updateCurrent()
        },

        updateCurrent: function(){
            this.current = this.nextSlide;
            if(this.options.bulletNav.enable) {
                this.bullet.removeClass(this.bulletActiveClass);
                this.bullet.eq(this.current).addClass(this.bulletActiveClass);
            }
        }
    };

    $.fn.carouselira = function(options){
        return this.each(function(){
            new Carouselira(this, options)
        })
    }

}(jQuery));

