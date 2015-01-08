carouselira
===========

Carouselira is a jQuery slider plugin

Support
------------
IE8+ (uses transitions with a fallback for older browsers)

Details
----------
The slider should be initialized on the slides immediate parent.

The slides will be set with `position: absolute` so the slider should have explicit height in CSS (for example, `300px`, you can manage the responsiveness with CSS via media queries) or its parent should have explicit height and the slider itself then should be set to `height: 100%`.

Example
--------

      <div class="slider-section-wrap">
      <ul class="slider">
      	<li class="slide" style="background-image: url('image.img')">
      	<li class="slide" style="background-image: url('image2.img')">
      </ul>
      
      <button class="arrow-nav--prev">
      <button class="arrow-nav--next">
      
      <ol class="bullet-nav-container"></ol>
      
Initialize and specify options:

    $('.slider').carouselira({
        speed: 1,       // speed in seconds; 1 by default
        firstSlide: 0, // initial slide that will be shown (it does not reorder the html)
        bulletNav: {   // bullet navigation if needed; you should provide a container in your html
            container: '.bullet-nav-container', //specify the container for the bullets -- provide a function or a string
            bulletHtml: '<li class="bullet__item"></li>', //provide HTML for a bullet
            bulletActive: '.bullet--active' //specify CSS class for the active state of bullets
        },
        arrowNav: { //arrow navigation if needed
            navNext: '.arrow-nav--next', // specify a function or a string,
            navPrev: function(){return $(this).parent().find('.arrow-nav--prev')}
        },
        effect: 'fade' //visual effects: slide/fade(default)
    })


Troubleshooting
----------

If the slider doesn't show up check if it's has explicit height in CSS.

If it doesn't work in IE8, check if you have the correct version of jQuery.