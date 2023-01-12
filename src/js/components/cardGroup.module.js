import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";
import BaseViewElement from "./baseView.module.js"

laurbe.prototype.CardGroup =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'cardGroup',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "cardGroupTemplate",
				url: '/html/components/layout/cardGroupTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy container');
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
	},
	onShow:function(){
		laurbe.logger.log('estoy haciendo onshow de una CardGroup '+this.id );
		if(this.instanceProperties.onShow)
			this.instanceProperties.onShow(this);
	}
		

});


/**
 * Constructor definition
 */
laurbe.CardGroup = function CardGroup(args){
	
	/** Init values **/
	var defaults = {
			items:[],
			style: {
				/**
				 * Por defecto las cards interiores tendran un padding a izquierda y derecha
				 */
				lateralSpacing:true
			},
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
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.CardGroup.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.CardGroup, {instanceProperties:initializationProps});

	/**
	 * Processing
	 */
	if(true == instance.instanceProperties.style.lateralSpacing){ //hace que las cards no esten pegadas a los bordes
		instance.instanceProperties.wrapper.extraStyle="padding-left: .75rem ;padding-right: .75rem ";
	}

	return instance;
}

console.log('Component CardGroup Loaded');

export default laurbe;