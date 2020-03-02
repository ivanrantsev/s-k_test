$('document').swipe( {
    swipeLeft: function() {
      $('.nav__check').attr('checked', false);
    },
    swipeRight: function() {
      $('.nav__check').attr('checked', true);
    }
  } );