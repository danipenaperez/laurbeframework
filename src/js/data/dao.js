/**
 * The menu item prototype
 */
laurbe.prototype.RestDAO = $.extend({}, laurbe.DAOManager, {
	/**
	* Rest entity paths Ma
	**/
	entityPaths: null,
	headers:null,
	/**
	 * Base host url (http://localhost:3000/myapi)
	 */
	basePath:null,
	/**
	* Initialization DAO Phase
	**/
	init:function(){
		$.ajaxSetup({
		    beforeSend: function (xhr)
			    {
			       //xhr.setRequestHeader("Accept","application/vvv.website+json;version=1");
			       //xhr.setRequestHeader("Authorization","Token token=\"FuHCLyY46\"");        
			    }
		});
	},

	/**
	* String type definition
	**/
	get: function(entityName, callback, _errCallback){
		$.ajax ({
	        type: "GET",
			dataType:'json',
	        url: this.entityPaths[entityName],
	        //accept: 'application/json',
	        //async: false,
	        success: function (data) {
	        	callback(data);
	        },error:function(err){
	        	console.log(err);
	        	_errCallback(err);
	        }
	    });
	    
	},
		/**
	* String type definition
	**/
	getURL: function(url, callback, _errCallback){
		$.ajax ({
	        type: "GET",
			dataType:'json',
	        url: this.basePath+url,
	        //accept: 'application/json',
	        //async: false,
	        success: function (data) {
	        	callback(data);
	        },error:function(err){
	        	
	        	console.log(err);
	        	_errCallback(err);
	        }
	    });
	}

});


/**
 * Constructor definition
 * for a common Rest DaO
 */
laurbe.RestDAO = function RestDAO(args){
	
	/** Init values **/
	var defaults = {
		entityPaths: {
			person: '/persons',
		},
		headers: { 
	        Accept : "application/json; charset=utf-8",
	        contentType:"application/json; charset=utf-8"
	    }	
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.RestDAO, initializationProps);


	return instance;
}