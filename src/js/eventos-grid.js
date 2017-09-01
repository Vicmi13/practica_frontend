const $ =require("jquery");
document.write(console.log('Entrando a eventos.js'));

export default class Eventosgrid{
    constructor(classSelector){
        this.element= $(classSelector);
    }

    init(){
        this.likeLocalStorage();
    }

    likeLocalStorage(){
         console.log('click');
         if(typeof(Storage) !== "undefined") {
            if (localStorage.clickcount) {
                localStorage.clickcount = Number(localStorage.clickcount)+1;
            } else {
            localStorage.clickcount = 1;
            }
            this.element.html(" " +localStorage.clickcount);
            this.element.css({"font-size": "12px", "border-radius": "50%", "background": "#ff4081",
                            "color": "#fff", "position": "absolute", "padding-bottom": "2px;",
                            "width": "22px", "heigth": "22px", "text-align": "center"});
                            
        }else{
            $(".like").innerHTML ="0";
        }
    }
} //Se cierra   class Eventosgrid  
    $(document).ready(function() {
                //Go to the top
                $('#ir-arriba').click(function(){  //referimos el elemento ( clase o identificador de acción )
                    $('html, body').animate({scrollTop:0}, 'slow'); //seleccionamos etiquetas,clase o identificador destino, creamos animación hacia top de la página.
                    return false;
                });
                //mobile button
                $('#mobile-menu-button').on('click', toggleMobileMenu);

               
    });

  

    //local storage button like                            
    $( "#target" ).click(function() {
        if(typeof(Storage) !== "undefined") {
            if (localStorage.clickcount) {
                console.log('click');
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
        console.log('click');
        var $mobileMenu = $('#mobile-main-menu');   
        $mobileMenu.slideToggle('fast');
    
    };

   

    

