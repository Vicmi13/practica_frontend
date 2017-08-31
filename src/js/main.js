window.$ = window.jQuery = require("jquery");
const $ =require("jquery"); 

document.write(console.log('Entrando a main.js'));

        
        $(document).ready(function() {
            $('#ir-arriba').click(function(){  //referimos el elemento ( clase o identificador de acción )
                $('html, body').animate({scrollTop:0}, 'slow'); //seleccionamos etiquetas,clase o identificador destino, creamos animación hacia top de la página.
                return false;
            });
        });


    
        $( "#target" ).click(function() {
            if(typeof(Storage) !== "undefined") {
                if (localStorage.clickcount) {
                    localStorage.clickcount = Number(localStorage.clickcount)+1;
                } else {
                localStorage.clickcount = 1;
                 }
                 document.getElementById("like").innerHTML =" " +localStorage.clickcount;
                 $("#like").css({"font-size": "12px", "border-radius": "50%", "background": "#ff4081",
                                 "color": "#fff", "position": "absolute", "padding-bottom": "2px;",
                                 "width": "22px", "heigth": "22px", "text-align": "center"});
            }else{
                 document.getElementById("like").innerHTML ="0";
            }
        });

        //Script para esconder header
        function toggleMobileMenu() {
            var $mobileMenu = $('#mobile-main-menu');   
            $mobileMenu.slideToggle('fast');
        
        };

        $(document).ready(function() {
            $('#mobile-menu-button').on('click', toggleMobileMenu);
        });

            $(window).scroll(function() {
            var hT = $('#sistema-comentarios').offset().top,
                hH = $('#sistema-comentarios').outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();
            if (wS > (hT+hH-wH)){
                $("#sistema-comentarios").css("display","block");
                console.log('H1 on the view!');
            }
        });

    
    

     
   