define(function(require) {
    
        var $script = require('scriptjs');
    
        $script('//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js',function(){
    
            require('./slick-patch');
            // var flexVideo = require('Modules/videoPlayer/flexVideo');
            
            //custom function showing current slide
            var $status = $('.pagingInfo');
            var $slickElement = $('.slider');
    
            $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
                var i = (currentSlide ? currentSlide : 0) + 1;
                $status.text(i + '/' + slick.slideCount);
            });
    
            // Script for carousel
            $(function() {
                $('.slider').slick({
                    lazyLoad: 'ondemand',
                    arrows: true,
                    slidesToShow: 1,
                    previewMode: true,
                    centerItems: true,
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
                });
    
                // Script for custom arrows
                // NOTE: The slick library comes with arrows, but they are pre-styled
                // and they go after the carousel. Front End Devs can decide if they'd
                // rather style the old ones or edit the HTML of the new ones, but
                // make sure to change arrow setting in .slick() declaration
                $('.ic-controls .previous').click(function() {
                    $('.slider').slick("slickPrev");
                });
                $('.ic-controls .next').click(function() {
                    $('.slider').slick("slickNext");
                });
    
    
            });
        });
    });