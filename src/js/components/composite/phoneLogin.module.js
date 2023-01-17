import laurbe from "../../core/core.module.js";
import extend from "../../core/common.module.js";

laurbe.prototype.PhoneLoginView = extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'phoneLoginView',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "phoneLoginTemplate",
				url: '/html/components/login/phoneLoginTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
    onShow(){
        
        var self=this;
        $('#'+this.id+'_continue_button').on('click', function(){
            //self.destroy();
			self.instanceProperties.onSuccess(self);
        });
    },
	close:function(){
		$('#'+this.id+'_close_button').click();
	}
		

});


/**
 * Constructor definition
 */
laurbe.PhoneLoginView = function PhoneLoginView(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
		onSuccess:function(){
			console.log('not Defined on Success behavour');
		}
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.PhoneLoginView.type) ;

	/** Return the instance **/
	var instance = extend({}, laurbe.prototype.PhoneLoginView, {instanceProperties:initializationProps});


	return instance;
}

console.log('Component PhoneLoginView view Loaded');

export default laurbe;