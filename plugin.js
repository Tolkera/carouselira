(function($, $window){

    function Carouselira(element, options){
        this.options = $.extend({}, {
            slide: '',
            speed: 1,
            firstSlide: 0,
            bulletNav: {
                container: '',
                bulletHtml: '',
                bulletActive: ''
            },
            arrowNav: {
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
            switch(this.options.effect) {
                case 'slide':
                    this.slides.hide().eq(this.options.firstSlide).show();
                    break;
                case 'fade':
                    this.slides.css('opacity', 0).eq(this.options.firstSlide).css('opacity', 1);
            }

            this.slider.css({
                position: 'relative',
                overflow: 'hidden'
            });

            this.slides.css({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            });


            if(this.options.bulletNav.container && this.options.bulletNav.bulletHtml) {
                this.buildBulletNav = true;
                this.initializeBulletNav();
            }

            if(this.options.arrowNav.navNext && this.options.arrowNav.navPrev) {
                this.buildArrowNav = true;
                this.initializeArrowNav();
            }
        },

        initializeArrowNav: function(){
            var self = this;

            var navPrev = this.checkOptionType(this.options.arrowNav.navPrev);
            var navNext = this.checkOptionType(this.options.arrowNav.navNext);

            passDirection(navPrev, 'prev');
            passDirection(navNext, 'next');

            function passDirection(btn, dir){
                btn.on('click.carouselira', function(){
                    if(!(self.slider.hasClass('transitioning'))){
                        self.findNextSlide({direction: dir, method: 'arrow'});
                    }
                })
            }
        },

        initializeBulletNav: function() {
            var self = this;
            this.createBulletNav();
            this.updateCurrent();

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
                        self.findNextSlide({nextSlide: clickedBulletIndex, direction: dir, method: 'bullet'});
                    }
                }
            })
        },

        createBulletNav: function(){
            var bulletsHtml = "";
            var bullet = this.options.bulletNav.bulletHtml;
            var navContainer;
            navContainer = this.checkOptionType(this.options.bulletNav.container);

            for ( var i = 0; i < this.slidesLen; i++ ){
                bulletsHtml += bullet;
            }
            navContainer.html(bulletsHtml);
            this.bullet = navContainer.children();
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

            switch (this.options.effect) {
                case "fade":
                    this.changeSlidesWithFading(currentSlide, nextSlide, self);
                    break;
                case "slide":
                    this.changeSlidesWithSliding(currentSlide, nextSlide, self, options);
                    break;
            }

           nextSlide.on('transitionend', function(){
               currentSlide.off('transitionend');
               nextSlide.off('transitionend');
               self.slider.removeClass('transitioning');
               self.updateCurrent();
           });
        },

        changeSlidesWithFading: function(currentSlide, nextSlide, self){
            currentSlide.css({'opacity': 0,'transition': 'opacity ' + self.options.speed + 's' + ' ease-in-out'});
            nextSlide.css({'opacity': 1,'transition': 'opacity ' + self.options.speed +'s' + ' ease-in-out'});
        },

        changeSlidesWithSliding: function(currentSlide, nextSlide, self, options){
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
                    $(this).css({'transition': 'left ' + self.options.speed +'s' + ' ease-in-out', 'left': '0'});
                    currentSlide.css({'left': currentSlidePositioning,'transition': 'left ' + self.options.speed +'s' + ' ease-in-out'});
                    $(this).on('transitionend', function(){
                        $(this).dequeue();
                        currentSlide.hide().css({ left: 0, 'transition': 'none'});
                    })
                })
        },

        updateCurrent: function(){
            this.current = this.nextSlide;
            var activeClass = this.options.bulletNav.bulletActive;
            if(this.buildBulletNav) {
                this.bullet.removeClass(activeClass).eq(this.current).addClass(activeClass);
            }
        },

        checkOptionType: function(option){
            switch (typeof(option)){
                case 'function':
                    return option.call(this.slider);
                case 'string':
                    return $(option)
            }
        }
    };

    $.fn.carouselira = function(options){
        return this.each(function(){
            new Carouselira(this, options)
        })
    }

}(jQuery, window));