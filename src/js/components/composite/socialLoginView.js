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
	 * If Set login Form
	 */
	loginForm:null,
	/**
	 * Socail Login Buttons
	 */
	socialButtons:null, 
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getSocialButtonsChildWrapperId:function(){
		return this.id+'_buttonsWrapper';
	},
	/**
	* Custom internal Render items
	**/
	_afterRender:function(){
		if(!this.instanceProperties.wrapper){ //usefull when this.instanceProperties.wrapper is undefined
			$('#'+this.id).on('click', this.onclickHandler);
		}
		var self = this;
		
		//Render social Buttons
		if(this.instanceProperties.socialButtons){
			$.each(self.instanceProperties.socialButtons, function( index, item ) {
				item.owner = self;//reference to parent laurbe object
				item._renderTo(self._getSocialButtonsChildWrapperId());
			});
		}
		
		//self.bindEvents();
		if(self.instanceProperties.items){
			$.each(self.instanceProperties.items, function( index, item ) {
				item.owner = self;//reference to parent laurbe object
				item._renderTo(self._getRenderChildWrapperId());
			});
			// for(item of self.instanceProperties.items){
			// 	item.owner = self;//reference to parent laurbe object
			//   	item._renderTo(self._getRenderChildWrapperId());
			// }
			// for  (i=0;i<self.instanceProperties.items.length;i++){
			// 	self.instanceProperties.items[i].owner = self;//reference to parent laurbe object
			// 	self.instanceProperties.items[i]._renderTo(self._getRenderChildWrapperId());
			// }
		}

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