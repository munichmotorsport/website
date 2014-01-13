+function ($) { "use strict";

	var isMobile = function()
	{
		return ($(window).innerWidth() < 768) ? true : false;
	};

	var repositionNavbar = function()
	{
		if(!isMobile()) {

			// fake static variable
			if(typeof repositionNavbar.staticVars == 'undefined') {
				repositionNavbar.staticVars = true;
				repositionNavbar.initialNavbarPos = $('.navbar').offset().top;
				repositionNavbar.flag = -1;
				repositionNavbar.diff = 0;
				repositionNavbar.brand = $('.navbar-brand > img');
				repositionNavbar.brandWidth = repositionNavbar.brand.outerWidth();
				repositionNavbar.brandMarginLeft = parseFloat(repositionNavbar.brand.css('margin-left'));
				$('.navbar-brand').css('overflow', 'hidden');
				repositionNavbar.brand.css('margin-left', -repositionNavbar.brandWidth+'px');
			}

			repositionNavbar.diff = repositionNavbar.initialNavbarPos;
			repositionNavbar.diff = repositionNavbar.initialNavbarPos - $(document).scrollTop();

			if(repositionNavbar.diff <= 0) {
				$('.navbar').addClass('navbar-fixed-top');
				$('header').css('margin-bottom', $('.navbar').outerHeight()+parseFloat($('.navbar').css('margin-bottom')));
				if(parseFloat(repositionNavbar.brand.css('margin-left')) == -repositionNavbar.brandWidth)
					repositionNavbar.brand.stop(true, true).animate({'margin-left': 0}, 400, 'easeOutQuart');
			} else {
				$('.navbar').removeClass('navbar-fixed-top');
				$('header').css('margin-bottom', -1);
				if(parseFloat(repositionNavbar.brand.css('margin-left')) == 0)
					repositionNavbar.brand.stop(true, true).animate({'margin-left': -repositionNavbar.brandWidth}, 400, 'easeOutQuart');
			}
		} else {
			$('.navbar').removeClass('navbar-fixed-top');
			$('header').css('margin-bottom', -1);
		}
	};

	var fadeDropdownOnHover = function()
	{
		if(!isMobile()) {
			$('ul.nav li.dropdown').hover(
				function() {
					$(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(150, function(){$(this).parent().addClass('open');});
				}, function() {
					$(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(150, function(){$(this).parent().removeClass('open');});
				}
			);
			/*console.log("on");*/
		}/* else {
			$('ul.nav li.dropdown').unbind("mouseenter mouseleave");
			$('.dropdown-toggle').dropdown();
			console.log("off");
		}
		console.log($._data($('ul.nav li.dropdown')[0], 'events'));*/
	};

	var resizeJumbotronCarousel = function()
	{
		if($('.jumbotron .carousel').size() > 0) {
			var carouselHeight = Math.ceil($(window).height() - $('.jumbotron .carousel').offset().top);
			$('.jumbotron .carousel .item').css('max-height', carouselHeight+'px');
		}
	}

	$(document).ready(function()
	{
		$(window).resize($.debounce(200, fadeDropdownOnHover));
		fadeDropdownOnHover();

		$(window).resize($.debounce(200, resizeJumbotronCarousel));
		resizeJumbotronCarousel();

		$(this).on('scroll', function(ev){
			repositionNavbar();
		});
		repositionNavbar();

		$('.socialmedia-feed .nav a:first').tab('show');

		$('.footer-sponsors .nav-pills > li > a').each(function(){
			this.image = $(this).find('img');
			this.srcOrig = this.image.attr('src');
			$(this).hover(
				function(){
					this.image.attr('src', this.image.data('hoverimg'));
				}, function(){
					this.image.attr('src', this.srcOrig);
				}
			);
		});
	});

}(jQuery);
