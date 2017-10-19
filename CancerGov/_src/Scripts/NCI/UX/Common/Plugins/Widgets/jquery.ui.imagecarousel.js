/*!
 * jQuery UI Widget-factory plugin for supporting an image carousel.  Currently this uses slick for functionality.
 * this widget should be called on a element that matches the following structure:
 * <div class="ic-carousel">
 *   <div class="ic-carousel-title"><h4>Title</h4></div>
 *   <div class="row">
 *      <div class="slider">
 *        <div>
 *          <img alt="alt" src="/image.jpg" />
 *          <div class="ic-credit">Credit: Credit</div>
 *          <div class="ic-caption">...</div>
 *        </div>
 *        ... more images ...
 *      </div>
 *   </div>
 * </div>
 * Author: @bryanp
 */

(function( factory ) {
    if ( typeof define === "function" && define.amd ) {

        // AMD. Register as an anonymous module.
        define(["jquery", "jquery-ui", 'slick-carousel', 'Modules/carousel/slick-patch'], factory );
    } else {
        // Browser globals
        factory( jQuery );
    }
}(function( $ ) {

    var ENG_PREV_TEXT = "Previous";
    var ENG_NEXT_TEXT = "Next";
    var SPN_PREV_TEXT = "Anterior";
    var SPN_NEXT_TEXT = "Siguiente";

    /**
     * Add the prev/next controls to the DOM
     * @param {*} thisCarousel the widget instance.
     */
    function addControls(thisCarousel) {

        thisCarousel.controls = {};
        
        var prevButtonTxt = ENG_PREV_TEXT;
        var nextButtonTxt = ENG_NEXT_TEXT;

        if ('language' == 'spanish') {
            prevButtonTxt = SPN_PREV_TEXT;
            nextButtonTxt = SPN_NEXT_TEXT;    
        }

        // Script for custom arrows
        // NOTE: The slick library comes with arrows, but they are pre-styled
        // and they go after the carousel. Front End Devs can decide if they'd
        // rather style the old ones or edit the HTML of the new ones, but
        // make sure to change arrow setting in .slick() declaration
        //
        // Draw Controls
        thisCarousel.controls.$prevButton = $('<button>', {
            "class": 'previous',
            type: 'button'
        }).append('<span>', {
            "class": "ic-arrow-button",
            text: prevButtonTxt
        })           

        thisCarousel.controls.$nextButton = $('<button>', {
            "class": 'next'
        }).append('<span>', {
            "class": "ic-arrow-button",
            text: nextButtonTxt
        });

        thisCarousel.controls.$status = $('<div>', {
            "class": 'pagingInfo'
        });

        var controls = $('<div>', {
            "class": 'row ic-controls'
        }).append(
            $('<div>', {
                "class": 'controls'
            }).append(
                $('<div>').append(
                    thisCarousel.controls.$status,
                    $('<div>', {
                        "class": 'arrows arrows-for-ic-carousel'
                    }).append(thisCarousel.controls.$prevButton, thisCarousel.controls.$nextButton)
                )
            )
        );

        thisCarousel.$el.append(controls);

    }

    return $.widget("nci.imagecarousel", {

        options: {
            //Examples
            //fetchSrc: false, //String or Promise
            //queryParam: false,
            //buttonText: 'Clear Selection'
            //handle on click/on swipe
            //
            //
        },
        _create: function () {     

            var thisCarousel = this;
            thisCarousel.$el = $(this.element);
            thisCarousel.$sliderEl = thisCarousel.$el.find('.slider').first();

            //Add the controls
            addControls(thisCarousel);

            //Attach some events on the slider element, this is done before initializing slick as
            //we need init to fire off when we call slick below
            thisCarousel.$sliderEl.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
                var i = (currentSlide ? currentSlide : 0) + 1;
                thisCarousel.controls.$status.text(i + '/' + slick.slideCount);
            });

            //Find and Attach an instance on the carousel and Enable Slick
            thisCarousel.$sliderEl.slick({
                lazyLoad: 'ondemand',
                arrows: true,
                slidesToShow: 1,
                previewMode: true,
                slidesToScroll: 1,
                speed: 500,
                dots: false,
                //customPaging: function(slider,index){return index + ' of ' + slider.slideCount;},
                customPaging : function(slider, i) {
                    var thumb = $(slider.$slides[i]).data();
                    return '<a>'+i+'</a>'; },
                responsive: [
                    //alter breakpoint settings for image carousel
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                            speed: 1000,
                            slidesToScroll: 1
                        }
                    },

                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            speed: 700,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                            speed: 500,
                            slidesToScroll: 1
                        }
                    }
                ]
            })

            //Handle Pager Actions here
            thisCarousel.controls.$prevButton.click(function(){
                thisCarousel.$sliderEl.slick("slickPrev");
            }); 
            
            thisCarousel.controls.$nextButton.click(function(){
                thisCarousel.$sliderEl.slick("slickNext");
            });

            thisCarousel.$sliderEl.closest('section').click(function() {
                thisCarousel.$sliderEl.slick('setPosition');
            });
        }


    });

}));