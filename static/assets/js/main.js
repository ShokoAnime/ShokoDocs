// Theme Switcher
// 0 = Light Theme
// 1 = Dark Theme

let themeID = 0;

$(window).on("load", function () {

	if (localStorage.getItem('theme') === 'light' || localStorage.getItem('theme') === null) {
		$('link[id="dark"]').prop('disabled', true);
		$("body").css("display", "initial");
	} else {
		$('link[id="light"]').prop('disabled', true);
		$("body").css("display", "initial");
		themeID++;
	}

});

$('#themeSwitcher').click(function () {

	if (themeID === 1) {
		localStorage.setItem('theme', 'light');
		$('link[id="dark"]').prop('disabled', true);
		$('link[id="light"]').prop('disabled', false);
		themeID--;
	} else {
		localStorage.setItem('theme', 'dark');
		$('link[id="light"]').prop('disabled', true);
		$('link[id="dark"]').prop('disabled', false);
		themeID++;
	}

});

// ----------------------------------------------------------------------------------------------------------------

// Add/Remove 'Active' class for Side Navigation.

$('a.sidenav-menu').click(function () {

	let leftNavActive = $('.nav.nav-sidebar.nav-sidebar-pill').find('.nav-link.nav-menu.sidenav-menu.active');

	$(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');

	leftNavActive.length > 0 ? leftNavActive.removeClass('active') : '';

});

// ----------------------------------------------------------------------------------------------------------------

// Smooth Scroll for Page Navigation.

$('a[href^="#"].page-nav-link').on('click', function (e) {

	e.preventDefault();
	let hash = this.hash;

	$('html, body').animate({scrollTop: $(hash).offset().top - 50}, 1000, function () {

		// Add Active class to selected anchor.
		$(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');

	});
});


// ----------------------------------------------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------------------------------------------
