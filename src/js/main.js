window.$ = window.jQuery = require("jquery");
document.write(console.log('Entrando a main.js'));


const $ =require("jquery");
    
        $( "#target" ).click(function() {
                if (localStorage.clickcount) {
                    localStorage.clickcount = Number(localStorage.clickcount)+1;
                } else {
                localStorage.clickcount = 0;
                 }
                 document.getElementById("like").innerHTML =" " +localStorage.clickcount;
                 $("#like").css({"font-size": "12px", "border-radius": "50%", "background": "#ff4081",
                                 "color": "#fff", "position": "absolute", "padding-bottom": "2px;",
                                 "width": "22px", "heigth": "22px", "text-align": "center"});
        });

    //Script para esconder header
    function toggleMobileMenu() {
         var $mobileMenu = $('#mobile-main-menu');   
         $mobileMenu.slideToggle('fast');
     
     };

     $(document).ready(function() {
         $('#mobile-menu-button').on('click', toggleMobileMenu);
    });

    

     
   