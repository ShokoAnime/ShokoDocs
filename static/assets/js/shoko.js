// Add heading anchors.
$('h2[id]').each(function () {

	return $(this).hasClass('no-anchor') ? '' : $(this).append('<a class="anchor" href="#' + $(this).attr('id') + '"></a>');

});

// Prevent link hashes from showing in address bar and add smooth scrolling when clicked.
$("a.anchor").click(smoothScroll);
$("a.nav-link.right-nav-link").click(smoothScroll);

function smoothScroll(event) {

	event.preventDefault();
	$('html,body').animate({scrollTop: $(this.hash).offset().top - 30}, 300);

}

// Add active class for submenus.
$('a.nav-link').click(function () {

	$(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');

});


// Left Nav
let navItemShow = $('.nav-sidebar .nav-item.show');

navItemShow.find('> .nav-link .nav-angle').addClass('rotate');
navItemShow.find('> .nav').css('display', 'block');
navItemShow.removeClass('show');

let navSidebarIsAccordion = false;
if ($('.nav-sidebar').attr('accordion', 'false') === 'true') {
	navSidebarIsAccordion = true;
}

$(document).on('click', '.nav-sidebar > .nav-item > .nav-link', function (event) {

	event.preventDefault();

	let link = $(this);
	link.next('.nav').slideToggle();

	if (navSidebarIsAccordion) {
		link.closest('.nav-item').siblings('.nav-item').children('.nav:visible').slideUp().prev('.nav-link').children('.nav-angle').removeClass('rotate');
	}
	link.children('.nav-angle').toggleClass('rotate');

});


