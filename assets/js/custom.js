/*
 * Custom JS 
 * Place all JS changes and additions in the section below. Every so often we wil re-minify the 
 * JS and include all additions in this section. If you are adding new JS functions please indicate
 * that's its addition. 
 *
 * Changes to existing functions will be rejected unless previously discussed.  
*/

(function() {

$(document).ready(function () {

    $('.btn-filter').on('click', function () {
      var $target = $(this).data('target');
      if ($target !== 'all') { 
        $('.table tr').css('display', 'none');
        $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
      } else {
        $('.table tr').css('display', 'none').fadeIn('slow');
      }
        
      if ($target = 'head') { 
        $('.table tr[data-status="' + $target + '"]').fadeIn('fast');
      }
    });

 });
    
$(document).ready(function () {
    $(document).on("scroll", onScroll);

    // Activate collapsibles so they can be controlled from js
    $('a[data-toggle="collapse"]').each(function () {
        var $target = $(this.hash);
        $target.collapse({
            toggle: false
        });
    });

    //smoothscroll
    $('a[href^="#"]').not('a[href="#"]').not('[data-toggle="collapse"]').not('[data-toggle="tab"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        var target = this.hash,
        $target = $(target);

        // Open the panel if it is collapsed
        $target.each(function(){
            $(this).find('a[data-toggle="collapse"]').each(function () {
                var $collapsible = $(this.hash);
                $collapsible.collapse('show');
            });
        });

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#menu-center a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-center ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}
    
})(jQuery);