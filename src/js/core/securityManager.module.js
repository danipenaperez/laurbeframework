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
        'phoneNumber': '',
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
        let loginView;
        
        if(this.instanceProperties.type == 'phoneValidation'){
            loginView = new laurbe.View({
                id: 'loginView',
                items: [
                    new laurbe.PhoneLoginView({
                        id:'phoneLoginDialog', 
                        title:' Welcome to '+this.instanceProperties.appName,    
                        onSuccess:function(view){
                                view.close();
                                $('#validateCodeLoginDialog_ShowBtn').click();
                        }
                    }),
                    new laurbe.ValidateCodeLoginView({     
                        id:'validateCodeLoginDialog',
                        title:' Verify Code to  access to '+this.instanceProperties.appName, 
                        onSuccess:function(view){
                                view.close();
                                self.continue();
                        }
                    })
                ]
            });
        }else{
            alert(' no hay instance properties type '+ this.instanceProperties.type);
        }
        


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
        type:'no esta definido',

	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.SecurityManager, {instanceProperties:initializationProps});

	return instance;
}

console.log('añadiendo funcion SecurityManager a laurbe');

export default laurbe;