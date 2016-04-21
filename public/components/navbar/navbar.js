$(document).ready(function(){
  
       $(window).scroll(function() {
         if ($(this).scrollTop() > 10){
           $('nav').addClass('sticky');
         } else {
           $('nav').removeClass('sticky');
         }
       });
});
