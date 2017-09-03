const $ = require('jquery');
 
export default class listPeticiones{

    constructor(url){
        this.url = url;
    }

    getComentarios(successCallback, errorCallback){
        $.ajax({
            url: `${this.url}`,
            success : successCallback,
            error : errorCallback
        });
    }

    saveComentario(comentario, successCallback, errorCallback){
        $.ajax({
            url: `${this.url}`,
            method: 'post',
            data: comentario,
            success: successCallback,
            error: errorCallback
        });
    }

    
    getDetailComent(comentarioId, successCallback, errorCallback){
         $.ajax({
            url: `${this.url}${comentarioId}`,
            success: successCallback,
            error: errorCallback
        });
    }
 }