const $ =require("jquery");

//Script para esconder header
        function toggleMobileMenu() 
        {
          var $mobileMenu = $('#mobile-main-menu');   
         $mobileMenu.slideToggle('fast');
     }

     $(document).ready(function() {
         $('#mobile-menu-button').on('click', toggleMobileMenu);
        });

     $(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });
});   