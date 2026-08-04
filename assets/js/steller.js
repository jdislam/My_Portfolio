/*!
=========================================================
* Steller Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function(){
	$(".nav-link").on('click', function(event) {

    	if (this.hash !== "") {

			event.preventDefault();

			var hash = this.hash;
			var navHeight = $('.navbar').outerHeight() || 0;

			$('html, body').animate({
				scrollTop: $(hash).offset().top - navHeight + 1
			}, 700, function(){
				if (history.pushState) {
					history.pushState(null, null, hash);
				} else {
					window.location.hash = hash;
				}
			});
       	}
    });

	var navHeight = $('.navbar').outerHeight() || 0;
	$('body').scrollspy({
		target: '.navbar',
		offset: navHeight + 2
	});
	$('body').scrollspy('refresh');
});