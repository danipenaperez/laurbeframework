import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";
import BaseViewElement from "./baseView.module.js"

laurbe.prototype.Image =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'image',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "imageTemplate",
				url: '/html/components/image/imageTemplate.html'
	},
	onclickHandler: function(ev){
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
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
laurbe.Image = function Image(args){
	
	/** Init values **/
	var defaults = {
			wrapper:{
				tag:'<div>', 
				class:'d-flex justify-content-center align-self-center'
			}
			//,width:"32"
			//,height:"32"
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Image.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.Image, {instanceProperties:initializationProps});


	return instance;
}

console.log('Component Image Loaded');

export default laurbe;