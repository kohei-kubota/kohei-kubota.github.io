$(function() {
  var width = jQuery(window).width();
  if(width <= 640) {
    $(window).on('load', function(){
      window.h = $(window).height();
      $('#first-view,.my-work,canvas').css('height',h);
    });
  } else {
    $(window).on('load resize', function(){
      window.h = $(window).height();
      $('#first-view,.my-work,canvas').css('height',h);
    });
  }
});