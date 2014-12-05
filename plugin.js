(function($, $window){

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
        this.init();
    }

    Carouselira.prototype = {
        init: function(){
            this.slides = this.slider.find(this.options.slide);
            this.slidesLen = this.slides.length;
            this.lastSlide = this.slidesLen - 1;
            this.current = this.options.firstSlide;
            this.nextSlide = this.current;
            this.setInitialDisplay();
        },

        setInitialDisplay: function(){
            if(this.options.effect == 'slide') {
                this.slides.hide().eq(this.options.firstSlide).show();
            }

            if(this.options.effect == 'fade') {
                this.slides.css('opacity', 0).eq(this.options.firstSlide).css('opacity', 1);
            }

            this.slideContainer = this.slides.parent();

            this.slideContainer.css({
                position: 'relative',
                overflow: 'hidden',
                height: '100%'
            });

            this.slides.css({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            });

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
                btn.on('click.carouselira', function(){
                    if(!(self.slider.hasClass('transitioning'))){
                        self.findNextSlide({direction: dir, method: 'arrow'});
                    }
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

            this.bullet.on('click.carouselira', function(){
                if(!(self.slider.hasClass('transitioning'))){
                    var clickedBulletIndex = $(this).index();
                    if(clickedBulletIndex != self.current) {
                        if(self.options.effect == "slide") {
                            var dir = '';
                            if (self.current == 0) {
                                (clickedBulletIndex == self.lastSlide) ? dir = "prev" : dir = "next"
                            } else if (self.current == self.lastSlide) {
                                (clickedBulletIndex == 0) ? dir = "next" : dir = "prev"
                            } else {
                                (clickedBulletIndex > self.current) ? dir = "next" : dir = "prev"
                            }
                        }
                        self.findNextSlide({nextSlide: clickedBulletIndex + "", direction: dir, method: 'bullet'});
                    }
                }
            })
        },

        findNextSlide: function(options){
            if(options.method == "arrow"){
                if(options.direction == "next") {
                    this.nextSlide = (this.current == this.lastSlide) ? 0 : this.current + 1;
                } else {
                    this.nextSlide = (this.current == 0) ? this.lastSlide : this.current - 1;
                }
            }

            if(options.method == "bullet") {
                this.nextSlide = options.nextSlide;
            }

            this.changeSlides(options.direction);
        },

        changeSlides: function(options){
            var self = this;
            var currentSlide = self.slides.eq(self.current);
            var nextSlide = self.slides.eq(self.nextSlide);

            self.slider.addClass('transitioning');

            if(this.options.effect == "fade") {
                currentSlide.css({'opacity': 0,'transition': 'opacity ' + this.options.speed/1000 + 's' + ' ease-in-out'});
                nextSlide.css({'opacity': 1,'transition': 'opacity ' + self.options.speed/1000 +'s' + ' ease-in-out'});
           }

           if(this.options.effect == "slide") {
               var currentSlidePositioning, nextSlidePositioning;
               if (options == "next") {
                   currentSlidePositioning = '-100%';
                   nextSlidePositioning = '100%'
               } else {
                   currentSlidePositioning = '100%';
                   nextSlidePositioning = '-100%'
               }

               nextSlide.css({'left': nextSlidePositioning}).show().delay()
                    .queue(function() {
                        $(this).css({'transition': 'left ' + self.options.speed/1000 +'s' + ' ease-in-out', 'left': '0'});
                        currentSlide.css({'left': currentSlidePositioning,'transition': 'left ' + self.options.speed/1000 +'s' + ' ease-in-out'});
                        $(this).on('transitionend', function(){
                            $(this).dequeue();
                            currentSlide.hide().css({ left: 0, 'transition': 'none'});
                        })
                    })
           }

           nextSlide.on('transitionend', function(){
               currentSlide.off('transitionend');
               nextSlide.off('transitionend');
               self.slider.removeClass('transitioning');
               self.updateCurrent();
           });
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

}(jQuery, window));