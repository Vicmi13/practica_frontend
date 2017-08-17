window.$ = window.jQuery = require("jquery");
document.write(console.log('Entrando a main.js'));

$(document).ready(function(){
    $("#hide").click(function(){
        $("p").hide();
    });
    $("#show").click(function(){
        $("p").show();
    });
});