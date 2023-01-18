import laurbe from "./core.module.js";
import extend from "./common.module.js";

laurbe.prototype.SecurityManager =  extend({}, {}, {
    /**
     * Flag to indicate current session status
     */
    isLoggedIn:false,
    /**
     * Intercepted callbak
     */
    continue:null,
    /**
     * Current Login View  
     */ 
    loginView:null,
    templates:{
        'phoneNumber': ' ',
        'socialLogin': ''
    },
    templatePath: '.',
    initialized:false,
    
    /**Initialize a hidded div to store all loaded templates */
    _init: function(){
        if(!this.initialized){
            // $('<div/>', { 'id':'templateManager'}).appendTo('body');
            var templateManagerDiv = document.createElement('div');
            templateManagerDiv.id="securityManager";
            document.body.appendChild(templateManagerDiv);
            this._preLoadLogin();
            console.log('SecurityMAnager Initialized OK.');
        }else{
            console.log('templateManager Already Initialized.');
        }
    },
    /*
    * Based on configuration prepare the login pop-up view
    **/
    _preLoadLogin:function(){
        var self=this;
        let loginView = new laurbe.View({
            id: 'loginView',
            items: [
                new laurbe.PhoneLoginView({
                    id:'phoneLoginDialog',     
                    onSuccess:function(view){
                            view.close();
                            $('#validateCodeLoginDialog_ShowBtn').click();
                    }
                }),
                new laurbe.ValidateCodeLoginView({     
                    id:'validateCodeLoginDialog',
                    onSuccess:function(view){
                            view.close();
                            self.continue();
                    }
                })
                // , new laurbe.Wizard({
                //         title:'Alta Nueva',
                //         description: 'Darse de Alta',
                //         steps:[
                //             new laurbe.WizardStep({
                //                                 stepTitle:'Telefono', formTitle:'' , description: '', 
                //                                 items:[
                //                                     new laurbe.PhoneLoginView({     
                //                                         onSuccess:function(view){
                //                                                 view.close();
                //                                                 self.continue();
                //                                         }
                //                                     })
                //                                 ] 
                //             }),
                //             new laurbe.WizardStep({
                //                 stepTitle:'Finalizado', formTitle:'Registrado OK' , description: 'Vas a quedar to guapo', 
                //                 items:[
                //                     new laurbe.Image({
                //                     img_src: 'https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif',
                //                     alt:'Finalizado',
                //                     onclick: function(){
                                    
                //                     }
                //                 })
                //                 ] 
                //             })
                //         ]
                // })
            ]
        });


        loginView._renderTo('securityManager');
        this.loginView=loginView;
    },
    /**public configuration overwrite */
    _configure:function(args){
        if(args.templatePath)
            this.templatePath=args.templatePath;
    },
    /**
     * If user is not logged, is shown the login view
     */
    checkLogged:function(callback){
        if(!this.isLoggedIn){
            this.continue=callback;
            setTimeout(() => {
                $('#phoneLoginDialog_ShowBtn').click();  //TODO: Change it
                this.isLoggedIn =true;
              }, 1000)
            
        }else{
            callback();
        }
    }

});

/**
 * Constructor definition
 * for a common Rest DaO
 */
laurbe.SecurityManager = function SecurityManager(args){
	
	/** Init values **/
	var defaults = {
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.SecurityManager, initializationProps);


	return instance;
}

console.log('añadiendo funcion SecurityManager a laurbe');

export default laurbe;