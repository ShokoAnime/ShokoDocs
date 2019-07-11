// Theme Switcher
// 0 = Light Theme
// 1 = Dark Theme

let themeID = 0;

function getRootUrl() {
	return window.location.origin ? window.location.origin + '/' : window.location.protocol + '/' + window.location.host + '/';
}

$(window).on("load", function () {

	let rootURL = getRootUrl();

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

	let rootURL = getRootUrl();

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

// Add/Remove 'Active' class for Left Navigation and Page Navigation.

$('a.nav-menu').click(function () {

	let leftNavActive = $('.nav.nav-sidebar.nav-sidebar-pill').find('.nav-link.active');
	let rightNavActive = $('.nav-links-wrapper.page-nav-link-wrapper').find('.nav-link.active');

	$(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');

	leftNavActive.length > 0 ? leftNavActive.removeClass('active') : '';
	rightNavActive.length > 0 ? rightNavActive.removeClass('active') : '';

});

// ----------------------------------------------------------------------------------------------------------------

// Smooth Scroll with position tracking.

$(document).ready(function () {
	$(document).on("scroll", onScroll);

	$('a[href^="#"]').on('click', '.page-nav-link', function (e) {
		console.log("Test");
		e.preventDefault();

		$('a').each(function () {
			$(this).removeClass('active');
		});

		var activeLink = $(this);
		let target = this.hash;

		$target = $(target);
		if (!$target.length) {
			return
		}

		$('html, body').stop().animate({'scrollTop': $target.offset().top - 80}, 500, 'swing', function () {
			activeLink.addClass('active');
		});

	});
});

function onScroll(event) {

	let scrollPos = $(document).scrollTop();

	$('#page-nav li a').each(function () {

		let currLink = $(this);
		let refElement = $(currLink.attr("href"));

		if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
			$('#page-nav ul li a').removeClass("active");
			currLink.addClass("active");
		} else {
			currLink.removeClass("active");
		}

	});
}


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
