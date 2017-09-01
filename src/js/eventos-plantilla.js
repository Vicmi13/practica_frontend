const $ = require ('jquery');

export default class eventosGrid{

};


$(document).ready(function() {
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
        
        /* Check the location of each desired element */
        $('#sistema-comentarios').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                console.log('must animated something');
                $(this).animate({'opacity':'1'},500);
                    
            }
            
        }); 
    
    });
    
});