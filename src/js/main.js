window.$ = window.jQuery = require("jquery");
const $ =require("jquery"); 

document.write(console.log('Entrando a main.js'));

import eventos from './eventos-plantilla';
import EventosGrid from './eventos-grid';


    
const eventosGrid = new EventosGrid(".like");


$(".toque").click(eventosGrid.init());    
    

     
   