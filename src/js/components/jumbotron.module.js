import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";
import BaseViewElement from "./baseView.module.js"

/**
 * The button
 */
laurbe.prototype.Jumbotron = extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'jumbotron',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "jumbotronTemplate",
				url: '/html/components/jumbotron/jumbotronTemplate.html'
	},
	onclickHandler: function(ev){
		console.log('laurbe.Jumbotron.onclickHandler()');
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
	}
		

});


/**
 * Constructor definition
 */
laurbe.Jumbotron = function Jumbotron(args){
	
	/** Init values **/
	var defaults = {
			title: 'Not Defined',
			//important do not use wrapper!!
            description: 'Push this button to do something....',
			style:{
				titleExtraClass: 'nav-menu-item-typo'
			}
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Jumbotron.type) ;

	/** Return the instance **/
	var instance = extend({}, laurbe.prototype.Jumbotron, {instanceProperties:initializationProps});


	return instance;
}


console.log('Component Jumbotron Loaded');

export default laurbe;