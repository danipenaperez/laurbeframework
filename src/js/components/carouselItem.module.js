import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";


/**
 * The menu item prototype
 */
laurbe.prototype.CarouselItem =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'carouselItem',
	/**
	* flag for initialization of current Object
	**/
	initialized:false,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
		scriptId : "carouselItemTemplate",
		url: '/html/components/carousel/carouselItemTemplate.html'
	},

	onclickHandler: function(ev){
		console.log('laurbe.Card.onclickHandler()');
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
		console.log('laurbe.Card.onItemClicked()');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	onShow: function(){
		// console.log('pues han hecho onShow en un Card'+ this.id);
		if(this.instanceProperties.onShow)
			this.instanceProperties.onShow(this);
	}
	

});


/**
 * Constructor definition
 */
laurbe.CarouselItem = function CarouselItem(args){
	
	/** Init values **/
	var defaults = {
			items:[],
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			template:{
				shareSocial:false,
				footer: false
			}
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.CarouselItem.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.CarouselItem, {instanceProperties:initializationProps});


	return instance;
}

console.log('Component CarouselItem Loaded');

export default laurbe;