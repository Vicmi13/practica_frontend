window.$ = window.jQuery = require("jquery");
const $ =require("jquery"); 


import EventosPlantilla from './eventos-plantilla';
import EventosGrid from './eventos-grid';


//const eventosGrid = new EventosGrid(".like");
//$(".toque").click(eventosGrid.init());    

/*
$.ajax({
    url: "/comentarios/",
    success: comentarios => {

        if(comentarios.length == 0){
            //en mi caso CREO no es necesario el estado de loading
            $('.comentarios-list').removeClass('loading').addClass('empty');
        }else{
            let html= '';
            console.log('success', comentarios);
            for(let comentario of comentarios){
                html += `
                <h2>${comentario.nombre}</h2>
                <h4>${comentario.apellidos}</h4>
                <h4>${comentario.comentarios}</h4>
                `;
        }
            $(".comentarios-list ui-status.ideal").html(html);

            //remover clase 'loading' ->Se encadenan metodos
            $('.comentarios-list').removeClass('loading').addClass('ideal');
        }      
    },
    error: error => {
     $('.comentarios-list').removeClass('loading').addClass('errorServidor');
      console.log('Error al cargar las canciones', error);
    }
});

*/

    

     
   