import laurbe from "./core.module.js";

var templateManager ={
    templatePath: '.',
    initialized:false,
    
    /**Initialize a hidded div to store all loaded templates */
    _init: function(){
        if(!this.initialized){
            // $('<div/>', { 'id':'templateManager'}).appendTo('body');
            var templateManagerDiv = document.createElement('div');
            templateManagerDiv.id="templateManager";
            document.body.appendChild(templateManagerDiv);
            console.log('templateManager Initialized OK.');
        }else{
            console.log('templateManager Already Initialized.');
        }
    },
    /**public configuration overwrite */
    _configure:function(args){
        if(args.templatePath)
            this.templatePath=args.templatePath;
    },
    /**
     * Load template, verify if is not already loaded (cached)
     * intente verificar si ya habiamos cargado la templateURL pero falla :-( habria que volver a intentarlo)
     * @param {} templateURL 
     * @param {*} callback 
     */
    _loadTemplate:function( templateURL,  callback){
        var _self = this;
        $('#templateManager').load(laurbe.templateManager.templatePath+templateURL, function(templateString,  ajaxObject, ajaxState){
            callback();
        });
        
    }
}

laurbe.templateManager = templateManager;
console.log('añadiendo funcion templateManager a laurbe');

export default laurbe;