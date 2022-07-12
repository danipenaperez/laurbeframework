/**
 * The menu item prototype
 */
 laurbe.prototype.NavigatorManager = $.extend({}, laurbe.Navigator, {

	/**
	 * Base host url (http://localhost:3000/myapi)
	 */
	urlParamsMap:{
        viewId: 'viewId'
    },
    /**
     * History loading
     */
    history:[],
    /**
     * Related Main APP
     */
    relatedApp:null,
	/**
	* Initialization DAO Phase
	**/
	init:function(){
	},
    /**
     * From a queryString key=val$key2=val2 ... returns ajavascript object
     * can be used as var val1 = laurbe.utils.getUrlVars()["key1"];
     * @returns 
     */
    _getURLArgs:function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    /**
     * Return a String with this format key1=val1&key2=val2&key3=val3 ....
     * @param {javascript object} obj 
     */
    _toKeyValueQueryParams:function(data){
        var str = Object.keys(data).map(key => `${key}=${data[key]}`).join("&");
        return str;
    },
	/**
	* Return the current viewId Url Parameter
	**/
	getCurrentViewId: function(){
		return this._getURLArgs()[this.urlParamsMap.viewId];
	},
    /**
	* Return the current viewId Url Arg Parameter
	**/
	getCurrentViewArg: function(paramName){
        console.log('los argumentos actuales son ');
        console.log(this._getURLArgs());
        console.log('------');
		return this._getURLArgs()[paramName];
	},
    /**
     * 
     * @returns Returns the whole URL for the current View
     */
    getCurrentViewCompleteURL: function(){
        return window.location.href;
    },
    /**
	* Return the current viewId Url All args
	**/
	getCurrentViewAllArgs: function(){
		return this._getURLArgs();
	},
    /**
     * Store Navigation Info
     * @param {} viewId 
     * @param {*} args 
     */
    storeNavigationInfo:function(viewId, args){
		if(!args)
			args={};
		args.viewId=viewId;
		var view_args = this._toKeyValueQueryParams(args);
		//1.Set the navigation params and add to history
		var destinationURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?'+view_args;    
        //2.store local array
        this.history.push({viewId:viewId, args:args});
        
        window.location.hash=viewId;
        //3.Write to URL Navbar
        window.history.pushState({ path: destinationURL }, '', destinationURL);
    },
    onBackPressNavigation:function(){
        //alert('vamos patras ');
        var hist='';
        for(i=0;i<this.history.length;i++){
            hist=hist+this.history[i]+' \r ';
        }

        //alert(hist);
        // console.log('y la app es');
        // console.log(this.relatedApp);
        
        //alert('la ulrima vista es '+ last.viewId+ ' '+last.args);

        if(this.history.length > 1 ){
            var last = this.history[this.history.length - 2];
            alert('estoy en '+ this.getCurrentViewId()+' y last es '+ last.viewId);

            //if(JSON.stringify(last) == JSON.stringify())
            //this.relatedApp._navigate(last.viewId, last.args);
        }else{
            alert('No tengo historial');
        }
          
    }
	

});


/**
 * Constructor definition
 * for a common Rest DaO
 */
laurbe.NavigatorManager = function NavigatorManager(args){
	
	/** Init values **/
	var defaults = {
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.NavigatorManager, initializationProps);


	return instance;
}