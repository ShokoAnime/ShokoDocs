// Add heading anchors.
$('h2[id]').each(function () {

	return $(this).hasClass('no-anchor') ? '' : $(this).append('<a class="anchor" href="#' + $(this).attr('id') + '"></a>');

});

// Prevent anchors from showing up in address bar.
$("a.anchor").click(function (event) {

	event.preventDefault();
	$('html,body').animate({scrollTop: $(this.hash).offset().top - 30}, 300);

});

// Add active class for submenus.
$('a.nav-link').click(function () {

	$(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');

});



