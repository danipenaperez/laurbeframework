import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";
import BaseViewElement from "./baseView.module.js"

laurbe.prototype.Title =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'title',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "titleTemplate",
				url: '/html/components/layout/titleTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		console.log("this element not allows child objects");
	}
		

});


/**
 * Constructor definition
 */
laurbe.Title = function Title(args){
	
	/** Init values **/
	var defaults = {
			wrapper:null,//no use wrapper
			//text:'Region',
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Title.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.Title, {instanceProperties:initializationProps});


	return instance;
}

console.log('Component Title Loaded');

export default laurbe;