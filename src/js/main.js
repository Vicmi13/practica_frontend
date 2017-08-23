window.$ = window.jQuery = require("jquery");
document.write(console.log('Entrando a main.js'));


const $ =require("jquery");

    //Script para esconder header
    function toggleMobileMenu() {
        var $mobileMenu = $('#mobile-main-menu');   
         $mobileMenu.slideToggle('fast');
     };

     $(document).ready(function() {
         $('#mobile-menu-button').on('click', toggleMobileMenu);
    });

     
