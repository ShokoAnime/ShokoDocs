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
		$('#themeSwitcher, #themeSwitcherMobile').text('Light Theme');
		themeID++;
	}

});

$('#themeSwitcher, #themeSwitcherMobile').click(function (e) {

	if (themeID === 1) {
		e.preventDefault();
		localStorage.setItem('theme', 'light');
		$('link[id="dark"]').prop('disabled', true);
		$('link[id="light"]').prop('disabled', false);
		$('#themeSwitcher, #themeSwitcherMobile').text('Dark Theme');
		themeID--;
	} else {
		e.preventDefault();
		localStorage.setItem('theme', 'dark');
		$('link[id="light"]').prop('disabled', true);
		$('link[id="dark"]').prop('disabled', false);
		$('#themeSwitcher, #themeSwitcherMobile').text('Light Theme');
		themeID++;
	}

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

// Add/Remove 'Active' class for Side Navigation.
$('a.sidenav-menu').click(function () {

	let leftNavActive = $('.nav.nav-sidebar.nav-sidebar-pill').find('.nav-link.nav-menu.sidenav-menu.active');

	$(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');
	leftNavActive.length > 0 ? leftNavActive.removeClass('active') : '';

});
// ----------------------------------------------------------------------------------------------------------------

// Show submenu for selected menu.
$(window).on("load", function () {

	let submenuContents = $('.nav.nav-title-wrapper').find('.active');
	submenuContents.closest('.nav.nav-title-wrapper').css('display', 'block');

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

// Mobile Sidenav
function openNav() {
	document.getElementById("mobileSidenav").style.display = "initial";
	document.getElementById('mobileSidenav').classList.add('sidenav');
	document.getElementById("mobileSidenav").style.width = "248px";
}

function closeNav() {
	document.getElementById("mobileSidenav").style.width = "0";
}

// ----------------------------------------------------------------------------------------------------------------

//Lightbox - Has to be last.
document.addEventListener('DOMContentLoaded',function(){
	new SmartPhoto(".js-smartPhoto",{
		resizeStyle: 'fit'
	});
});
