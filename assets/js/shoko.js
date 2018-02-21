$(function() {

    "use strict";

    // Back to top
    $('#scroll-up').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 900);
        return false;
    });

    // Smooth scroll for ToC
    $('.toc a, .sidenav.nav a').click(function() {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 80
        }, 500);
        return false;
    });

    // Smoothscroll to anchor in page load
    var hash = location.hash.replace('#', '');
    if (hash != '' && $("#" + hash).length > 0) {
        $('html, body').animate({
            scrollTop: $("#" + hash).offset().top - 100
        }, 600);
    }


    // Full height body to make sure footer will place in bottom of the page
    if ($(window).height() > $('body').height()) {
        var min_height = $(window).height() - $('.site-header').outerHeight() - $('.site-footer').outerHeight();
        $('body > main').css('min-height', min_height);
    }

    // Set the height of sidebar if it's fixed
    // We don't set height anymore
    //
    /*
    if ($('.sidenav.sticky').length > 0) {
      var offset_top = 20;

      if ( $('.site-header.sticky').length ) {
        offset_top = 100;
      }

      var sidenav_max_height = $(window).height() - $('.sidenav.sticky').position().top - offset_top;
      $('.sidenav.sticky').height(sidenav_max_height);
    }
    */

    //
    // Top navbar
    //
    if ($('.site-header').hasClass('sticky') && !$('.site-header').hasClass('navbar-sm')) {
        var navbar_lg = false;
        if ($('.site-header').hasClass('navbar-lg')) {
            navbar_lg = true;
        }

        $(window).on('scroll', function() {
            var offset = $('.site-header').offset().top + $('.site-header').height();

            if ($(window).scrollTop() > offset) {
                if (navbar_lg) {
                    $('.site-header').removeClass('navbar-lg');
                }
                $('.site-header').addClass('navbar-sm');

            } else {
                if (navbar_lg) {
                    $('.site-header').addClass('navbar-lg');
                }
                $('.site-header').removeClass('navbar-sm');
            }
        });
    }

    // Manage transparent navbar
    if ($('.site-header').hasClass('navbar-transparent') && $('.site-header').hasClass('sticky')) {

        if ($('.site-header > .banner').length == 0) {
            $('.site-header').removeClass('navbar-transparent');
        } else {
            if ($('.site-header').hasClass('sticky')) {

                $(window).on('scroll', function() {
                    var offset = $('.site-header .navbar').height();
                    if ($(window).scrollTop() > offset) {
                        $('.site-header').removeClass('navbar-transparent')
                    } else {
                        $('.site-header').addClass('navbar-transparent')
                    }
                });

            }
        }

    }

    // Margin top for sticky navbar without banner
    if ($('.site-header').hasClass('sticky') && $('.site-header > .banner').length == 0) {
        $('.site-header').css('padding-top', $('.site-header > .navbar').height() + 30);
    }

    // Add .force-middle if navbar-brand contains image
    //
    // Remove it, because it make a jump on page load
    /*
    if ('.navbar-brand > img') {
      $('.navbar-brand').prepend('<span class="force-middle"></span>');
    }
    */



    //
    // Sidebar
    //

    var offcanvas_open = function() {
        $('body').addClass('open-sidebar');
        $('body').prepend('<div class="offcanvas-backdrop"></div>');
        $('html').css('overflow', 'hidden');
        //$('.site-header .jumbotron').slideUp(50);
    }

    var offcanvas_close = function() {
        $('body').removeClass('open-sidebar');
        $('.offcanvas-backdrop').remove();
        $('html').css('overflow', 'visible');
        //$('.site-header .jumbotron').slideDown(900);
    }

    // Offcanvas
    //
    $('[data-toggle="offcanvas"]').on('click', function() {
        if ($('body').hasClass('open-sidebar')) {
            offcanvas_close();
        } else {
            offcanvas_open();
        }
    });


    // Close offcanvas upon clicking on backdrop
    //
    $(document).on('click', '.offcanvas-backdrop', function() {
        offcanvas_close();
    });


    // Close offcanvas in single page layouts upon clicking on a menu
    //
    $('.nav.sidenav a').on('click', function() {
        offcanvas_close();
    });


    // Dropdown
    //
    $('.sidenav.dropable > li > a').on('click', function(e) {

        if (0 < $(this).next("ul").length) {
            e.preventDefault();
        }

        if (0 == $(this).next("ul").length) {
            return;
        }

        if ($(this).hasClass('open')) {
            $(this).removeClass('open').next("ul").slideUp(300);
            return;
        }

        $(this).closest(".sidenav").find("> li > a").removeClass('open');
        $(this).closest(".sidenav").find("ul:visible").slideUp(300);
        $(this).addClass('open').next("ul").slideDown(300, function() {
            update_scrollbar();
        });

    });

    $('.sidenav.dropable > li > a.active').addClass('open');
    $('.sidenav.dropable > li > ul').prev('a').addClass('has-child');


    // Inner menus dropable
    $('.sidenav .dropable a').on('click', function(e) {

        if (0 < $(this).next("ul").length) {
            e.preventDefault();
        }

        if (0 == $(this).next("ul").length) {
            return;
        }

        if ($(this).hasClass('open')) {
            $(this).removeClass('open').next("ul").slideUp(300);
            return;
        }

        $(this).closest("ul").find("> li > a").removeClass('open');
        $(this).closest("ul").find("> li > ul:visible").slideUp(300);
        $(this).addClass('open').next("ul").slideDown(300, function() {
            update_scrollbar();
        });
    });

    $('.sidenav .dropable a.active').addClass('open');
    $('.sidenav .dropable ul').prev('a').addClass('has-child');



    // Perfect scrollbar for sidebar
    $('.sidebar-boxed, .sidenav.sticky').perfectScrollbar({
        wheelSpeed: 0.4,
    });

    var update_scrollbar = function() {
        $('.sidebar-boxed, .sidenav.sticky').perfectScrollbar('update');
    }


    if ($(window).width() < 768) {
        $('.sidebar-boxed').removeClass('sidebar-dark');
    }

    // Sticky behaviour
    if ($('.sidenav').hasClass('sticky')) {
        $(window).on('scroll', function() {
            var $sidenav = $('.sidenav'),
                offset = $('.sidebar').offset(),
                offset_top = 40;

            if ($(window).scrollTop() > offset.top) {
                if ($('.site-header.sticky').length) {
                    offset_top = 100;
                }

                $sidenav.css({
                    position: 'fixed',
                    top: offset_top + 'px'
                });
            } else {
                $sidenav.css('position', 'static');
            }

            // If we are in footer area
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 80) {
                $sidenav.css('bottom', '80px');
                update_scrollbar();
            } else {
                $sidenav.css('bottom', '40px');
            }

        });
    }

    // Auto link creator for headings
    $('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]').each(function(index, value) {
        if ($(this).hasClass('no-anchor')) {
            return;
        }
        var link = '<a href="#' + $(this).attr("id") + '">' + $(this).html() + '</a>';
        $(this).html(link);
    });




    //
    // FAQ Component
    //

    // Case insensitive contains selector
    jQuery.expr[':'].icontains = function(a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    // Search
    $('.faq-search').on('keyup', function(e) {
        var s = $(this).val().trim(),
            result = $(this).parent().find("li");
        if (s === '') {
            result.show();
            return true;
        }
        result.not(':icontains(' + s + ')').hide();
        result.filter(':icontains(' + s + ')').show();
    });

    $('.faq li > h6').on('click', function() {
        $(this).toggleClass('open').next('div').slideToggle(300);
    });

    //Taking care of video
    if ($.fn.mediaelementplayer) {
        $('video').mediaelementplayer();
    }

    if ($.fn.fitVids) {
        $('.video').fitVids();
    }

    //
    // File Tree
    //
    $('.file-tree li.is-file').on('click', function(e) {
        e.stopPropagation();
    });

    $('.file-tree li.is-folder').on('click', function(e) {
        $(this).find('ul:first').slideToggle(400, function() {
            $(this).parent('li').toggleClass('open');
        });
        e.stopPropagation();
    });


    //Equal height for grid view
    $('.grid-view > li, .categorized-view > li, .promo.small-icon').matchHeight();

    //
    // Code viewers
    //

    // Copy to clipboard
    // It doesn't support Safari yet, and also has some minor bugs
    $('pre').each(function(index, value) {
        $(this).prepend('<a class="btn btn-sm btn-purple clipboard-copy" data-original-title="Copied!">Copy</a>');
    });

    // Code snippet
    $('pre').each(function(index, value) {
        if ($(this).parents('.code-window').length || $(this).parents('.code-taps').length) {
            return;
        }
        var title = "";
        if ($(this).children("code").attr('class')) {
            title = $(this).children("code").attr('class');
            title = title.replace("language-", "");
            title = title.toLowerCase();
            if (title == "markup") {
                title = "html";
            }
        }
        var span = '<span class="language-name">' + title + '</span>';
        $(this).prepend(span);
    });

    $('pre .language-name').parent().on('scroll', function() {
        $(this).find('.language-name').css('transform', 'translate(' + $(this).scrollLeft() + 'px, ' + $(this).scrollTop() + 'px)');
    });

    // Code window
    $('.code-window').each(function(index, value) {
        var topbar = '<div class="window-bar"><div class="circles">';
        topbar += '<span class="circle circle-red"></span> <span class="circle circle-yellow"></span> <span class="circle circle-green"></span>';
        if ($(this).attr('data-title')) {
            topbar += '<span class="window-title">' + $(this).data('title') + '</span>';
        }
        topbar += '</div>'; //.circles

        //Languages
        if ($(this).children().length > 1) {
            topbar += '<div class="languages"><div class="btn-group" data-toggle="buttons">';

            $(this).children(':not(.prism-show-language)').each(function(index, value) {
                var active = '',
                    check = '',
                    title = '';
                if (index == 0) {
                    active = ' active';
                    check = ' checked';
                }
                if ($(this).children("code").attr('class')) {
                    title = $(this).children("code").attr('class');
                    title = title.replace("language-", "");
                    title = title.toLowerCase();
                    if (title == "markup") {
                        title = "html";
                    }
                } else if ($(this).hasClass('code-preview')) {
                    title = 'Example';
                }
                topbar += '<label class="btn' + active + '"><input type="radio" autocomplete="off"' + check + '>' + title + '</label>';
            });

            topbar += '</div></div>';
        }

        topbar += '</div>'; //.window-bar

        $(this).children(':not(:first)').hide(0);
        $(this).children().wrapAll('<div class="window-content"></div>');
        $(this).prepend(topbar);

        //Event handler, change tab
        var window_content = $(this).children('.window-content');
        $(this).find(".btn-group .btn").on('click', function() {
            var i = $(this).index();
            window_content.children(":visible").fadeOut(200, function() {
                window_content.children(":not(.prism-show-language):eq(" + i + ")").fadeIn(200);
            });
        });
    });

    // Code tabs
    $('.code-tabs').each(function(index, value) {
        var topbar = '';

        //Languages
        if ($(this).children().length > 1) {
            topbar += '<div class="languages"><div class="btn-group" data-toggle="buttons">';

            $(this).children(':not(.prism-show-language)').each(function(index, value) {
                var active = '',
                    check = '',
                    title = '';
                if (index == 0) {
                    active = ' active';
                    check = ' checked';
                }
                if ($(this).children("code").attr('class')) {
                    title = $(this).children("code").attr('class');
                    title = title.replace("language-", "");
                    title = title.toLowerCase();
                    if (title == "markup") {
                        title = "html";
                    }
                } else if ($(this).hasClass('code-preview')) {
                    title = 'Example';
                }
                topbar += '<label class="btn' + active + '"><input type="radio" autocomplete="off"' + check + '>' + title + '</label>';
            });

            topbar += '</div></div>';
        }

        $(this).children(':not(:first)').hide(0);
        $(this).children().wrapAll('<div class="window-content"></div>');
        $(this).prepend(topbar);

        //Event handler, change tab
        var window_content = $(this).children('.window-content');
        $(this).find(".btn-group .btn").on('click', function() {
            var i = $(this).index();
            window_content.children(":visible").fadeOut(200, function() {
                window_content.children(":not(.prism-show-language):eq(" + i + ")").fadeIn(200);
            });
        });
    });

    // Trim code blocks
    $('pre code').each(function() {
        $(this).html($.trim($(this).html()));
    });


    // Copy to clipboard
    $('.code-preview .clipboard-copy').remove();
    $('.clipboard-copy').tooltip({
        placement: 'bottom',
        trigger: 'manual'
    });
    // Move copy button when the content is scrolling
    $('.clipboard-copy').parent().on('scroll', function() {
        $(this).find('.clipboard-copy').css('transform', 'translate(' + $(this).scrollLeft() + 'px, ' + $(this).scrollTop() + 'px)');
    });

    if ($('.clipboard-copy').length > 0) {

        var clipboardSnippets = new Clipboard('.clipboard-copy', {
            target: function(trigger) {
                return trigger.nextElementSibling;
            }
        });

        clipboardSnippets.on('success', function(e) {
            e.clearSelection();
            $(e.trigger).tooltip('show');
            setTimeout(function(el) {
                $(el.trigger).tooltip('hide');
            }, 1000, e);
        });
    }


});

$(document).ready(function() {
    if (location.hash != null && location.hash != "") {
        $('.collapse').removeClass('in');
        $(location.hash + '.collapse').collapse('show');
    }
});

$('.panel-collapse').on('show.bs.collapse', function(e) {
    $(e.target).closest('.panel').siblings().find('.panel-collapse').collapse('hide');
});

$('.panel-collapse').on('shown.bs.collapse', function(e) {
    var $panel = $(this).closest('.panel');
    $('html,body').animate({
        scrollTop: $panel.offset().top
    }, 500);
});

$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('h2 > a[href^="#"]').not('[data-toggle="collapse"]') .not('[data-toggle="tab"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
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

var themes = {
    "default": "127.0.0.1:4000/assets/css/shoko.css",
    "dark": "127.0.0.1:4000/assets/css/shokodark.css",
}

//switches
$(function() {
    var themesheet = $('<link href="' + themes['default'] + '" rel="stylesheet" />');
    themesheet.appendTo('head');
    $('.theme-link').click(function() {
        var themeurl = themes[$(this).attr('data-theme')];
        themesheet.attr('href', themeurl);
    });
});