/**
 * Se podrian hacer varias implementaciones de DataStorage
 * Una que se  InMemoryStorage (que lo que haga es que lo meta en un objeto local, pero se pierde luego al cerrar)
 * Otra que sea InLocalStorage (que guarda en localStorage)
 */
 laurbe.prototype.LocalStorageManager = $.extend({}, laurbe.LocalStorageManager, {

	storage: localStorage, //la implementacion del storage
	/**
	* Initialization 
	**/
	init:function(){

	},
	/**
	 * Save the object
	 * @param {*} id 
	 * @param {*} object 
	 */
	save:function(id, object){
		this.storage.setItem(id, object);
	},
	/**
	* Returns th object
	**/
	get: function(id){
		return this.storage.getItem(id);
	}
});


/**
 * Constructor definition
 * for a common Rest DaO
 */
laurbe.LocalStorageManager = function LocalStorageManager(args){
	
	/** Init values **/
	var defaults = {

	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.LocalStorageManager, initializationProps);


	return instance;
}