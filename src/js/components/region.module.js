import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";
import BaseViewElement from "./baseView.module.js"

laurbe.prototype.Region =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'region',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "regionTemplate",
				url: '/html/components/layout/regionTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	}
		

});


/**
 * Constructor definition
 */
laurbe.Region = function Region(args){
	
	/** Init values **/
	var defaults = {
			wrapper:null,//no use wrapper
			//text:'Region',
			//align:'float-right',
			fixedSize:'',
			extraClass:'' ,
			extraStyle: ''

	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Region.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.Region, {instanceProperties:initializationProps});


	return instance;
}

console.log('Component Region Loaded');

export default laurbe;