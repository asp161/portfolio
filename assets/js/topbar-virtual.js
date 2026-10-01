$(function() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $grid = $('.gridder').isotope({
    itemSelector: '.grid-item',
    percentPosition: true
  });

  // Card heights can change once the web font is in
  $(window).on('load', function() {
    $grid.isotope('layout');
  });

  // filter items on button click
  $('.filterable-button').on('click', 'button', function() {
    var $button = $(this);

    $button.addClass('selected').attr('aria-pressed', 'true');
    $button.siblings().removeClass('selected').attr('aria-pressed', 'false');
    $grid.isotope({ filter: $button.attr('data-filter') });
  });

  // Page animation initialize
  if (!reduceMotion) {
    $('html').addClass('has-wow');

    new WOW({
      // WOW drops its own class when the animation ends, this one stays
      callback: function(box) {
        $(box).addClass('revealed');
      }
    }).init();
  }
});

$(document).ready(function() {

  /* Navigation */

  var $nav = $('.site-nav');
  var $navLinks = $nav.find('.nav-link');
  var $navCollapse = $('#main-navbar');
  var $backTop = $('.btn-back_to_top');

  var update = function() {
    var windowTop = Math.floor($(window).scrollTop());
    var readingLine = windowTop + $(window).height() * 0.35;
    var $current = $navLinks.first();

    $nav.toggleClass('floating', windowTop > 40);
    $backTop.toggleClass('visible', windowTop > 400);

    // Links are in page order, so the last section above the line wins
    $navLinks.each(function() {
      var $target = $($(this).attr('href'));

      if ($target.length && $target.offset().top <= readingLine) {
        $current = $(this);
      }
    });

    // The footer is too short to ever reach the line
    if (windowTop + $(window).height() >= $(document).height() - 2) {
      $current = $navLinks.last();
    }

    $navLinks.parent().removeClass('active');
    $current.parent().addClass('active');
  };

  $(window).on('scroll resize', update);
  update();

  /* Mobile menu */

  $navCollapse.on('show.bs.collapse', function() {
    $nav.addClass('menu-open');
  });

  $navCollapse.on('hidden.bs.collapse', function() {
    $nav.removeClass('menu-open');
  });

  $navLinks.on('click', function() {
    $navCollapse.collapse('hide');
  });
});
