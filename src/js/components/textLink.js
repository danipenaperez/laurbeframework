define(['laurbe','jquery'], function (laurbe, $) {
/**
 * The menu item prototype
 */
laurbe.prototype.TextLink = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'textLink',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "textLinkTemplate",
				url: '/html/components/form/textLinkTemplate.html'
	},
	onclickHandler: function(ev){
		console('TEXT Link PULSADO');
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
	}
		

});


/**
 * Constructor definition
 */
laurbe.TextLink = function TextLink(args){
	
	/** Init values **/
	var defaults = {
		text: ''
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.TextLink.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.TextLink, {instanceProperties:initializationProps});


	return instance;
}

return laurbe.TextLink;

});