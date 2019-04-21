// Prevent link hashes from showing in address bar and add smooth scrolling when clicked.
$("a.anchor").click(smoothScroll);
$("a.nav-link.page-nav-link").click(smoothScroll);

function smoothScroll(event) {

	event.preventDefault();
	$('html,body').animate({scrollTop: $(this.hash).offset().top - 30}, 300);

}

// Add/Remove 'Active' class for Left Navigation and Page Navigation.
$('a.nav-link').click(function () {

	let leftNavActive = $('.nav.nav-sidebar.nav-sidebar-pill').find('.nav-link.active');
	let rightNavActive = $('.nav-links-wrapper.page-nav-link-wrapper').find('.nav-link.active');

	$(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');

	leftNavActive.length > 0 ? leftNavActive.removeClass('active') : '';
	rightNavActive.length > 0 ? rightNavActive.removeClass('active') : '';

});

// Left Navigation Submenu & Arrow rotations.
let navItemShow = $('.nav-sidebar .nav-item.show');
let navSidebarIsAccordion = false;

navItemShow.find('> .nav-link .nav-angle').addClass('rotate');
navItemShow.find('> .nav').css('display', 'block');

if ($('.nav-sidebar').attr('data-accordion', 'false') === 'true') {
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
	link.parent().siblings().children().next().slideUp().prev('.nav-link').children('.nav-angle').removeClass('rotate');

});
