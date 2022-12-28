/**
 * The menu item prototype
 */
 laurbe.prototype.SocialLoginView = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'socialLoginView',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "socialLoginTemplate",
				url: '/html/components/login/socialLoginTemplate.html'
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
laurbe.SocialLoginView = function SocialLoginView(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.SocialLoginView.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.SocialLoginView, {instanceProperties:initializationProps});


	return instance;
}