/**
 * The menu item prototype
 */
 laurbe.prototype.SocialLoginButton = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'socialLoginButton',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "socialLoginButtonTemplate",
				url: '/html/components/login/socialLoginButtonTemplate.html'
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
	}
		

});


/**
 * Constructor definition
 */
laurbe.SocialLoginButton = function SocialLoginButton(args){
	
	/** Init values **/
	var defaults = {
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.SocialLoginButton.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.SocialLoginButton, {instanceProperties:initializationProps});


	return instance;
}