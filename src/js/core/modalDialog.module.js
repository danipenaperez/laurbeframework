import laurbe from "./core.module.js";

var modalDialogManager ={
    templatePath: '.',
    initialized:false,
    _init: function(){
        if(!this.initialized){
            //OLD $('<div/>', { 'id':'modalDialogManager'}).appendTo('body');
            var modalDialogManagerDiv = document.createElement('div');
            modalDialogManagerDiv.id="modalDialogManager";
            document.body.appendChild(modalDialogManagerDiv);

            console.log('modalDialogManager Initialized OK.');
        }else{
            console.log('modalDialogManager Already Initialized.');
        }
    }	
}

laurbe.modalDialogManager = modalDialogManager;
console.log('añadiendo funcion modalDialogManager a laurbe');

export default laurbe;