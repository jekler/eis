$(function() {
    if (window.PIE) {
		setTimeout(function(){
			$('.spot, .radius, .navbar-wrapper .navbar').each(function() {
				PIE.attach(this);
			});
		}, 100);
    };
});