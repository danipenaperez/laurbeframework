import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";
import BaseViewElement from "./baseView.module.js"

laurbe.prototype.Carousel =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'carousel',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "carouselTemplate",
				url: '/html/components/layout/carouselTemplate.html'
	},
	onclickHandler: function(ev){

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
	},
	onShow:function(){
		if(this.instanceProperties.onShow)
			this.instanceProperties.onShow(this);
	}
		

});


/**
 * Constructor definition
 */
laurbe.Carousel = function Carousel(args){
	
	/** Init values **/
	var defaults = {
			items:[],
			style: {
				/**
				 * Por defecto las cards interiores tendran un padding a izquierda y derecha
				 */
				lateralSpacing:true
				
			},
			/**
			 * Horizontal, vertical or null 
			 */
			scrolling:null,
			wrapper:{
				extraClass: ""
			}
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Carousel.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.Carousel, {instanceProperties:initializationProps});

	/**Set active the first item */
	instance.instanceProperties.items[0].instanceProperties.first=true;
	
	return instance;
}

console.log('Component Carousel Loaded');

export default laurbe;